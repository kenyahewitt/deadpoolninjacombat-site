// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Deployment draft only. It has not been audited, deployed, funded, or connected to the live site.
/// @dev Prize NFTs belong in a separate reward vault; this contract may hold only user-staked collection NFTs.
interface IERC20Minimal {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface IERC721Minimal {
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
}

contract DntcNftStakingVault {
    address public immutable collection;
    address public immutable rewardToken;
    address public immutable admin;
    uint256 public immutable rewardPerSecondPerNft;
    bool public depositsPaused;
    uint256 private entered = 1;

    struct Stake { address staker; uint64 checkpoint; uint192 accrued; }
    mapping(uint256 => Stake) public stakeOf;
    mapping(address => uint256[]) private stakedTokenIds;
    mapping(uint256 => uint256) private tokenIndexPlusOne;

    event Staked(address indexed staker, uint256 indexed tokenId);
    event Withdrawn(address indexed staker, uint256 indexed tokenId);
    event Claimed(address indexed staker, uint256 amount);
    event DepositsPaused(bool paused);
    event RewardsFunded(address indexed funder, uint256 amount);

    modifier onlyAdmin() { require(msg.sender == admin, "admin only"); _; }
    modifier nonReentrant() { require(entered == 1, "reentrant"); entered = 2; _; entered = 1; }

    constructor(address collection_, address rewardToken_, uint256 rewardPerSecondPerNft_) {
        require(collection_ != address(0) && rewardToken_ != address(0), "zero address");
        require(rewardPerSecondPerNft_ > 0, "zero rate");
        collection = collection_;
        rewardToken = rewardToken_;
        admin = msg.sender;
        rewardPerSecondPerNft = rewardPerSecondPerNft_;
    }

    function fundRewards(uint256 amount) external nonReentrant {
        require(amount > 0, "zero amount");
        require(IERC20Minimal(rewardToken).transferFrom(msg.sender, address(this), amount), "fund failed");
        emit RewardsFunded(msg.sender, amount);
    }

    function setDepositsPaused(bool paused) external onlyAdmin { depositsPaused = paused; emit DepositsPaused(paused); }

    function stake(uint256[] calldata tokenIds) external nonReentrant {
        require(!depositsPaused, "deposits paused");
        require(tokenIds.length > 0 && tokenIds.length <= 20, "invalid batch");
        for (uint256 i; i < tokenIds.length; ++i) {
            uint256 tokenId = tokenIds[i];
            require(stakeOf[tokenId].staker == address(0), "already staked");
            stakeOf[tokenId] = Stake(msg.sender, uint64(block.timestamp), 0);
            stakedTokenIds[msg.sender].push(tokenId);
            tokenIndexPlusOne[tokenId] = stakedTokenIds[msg.sender].length;
            IERC721Minimal(collection).safeTransferFrom(msg.sender, address(this), tokenId);
            emit Staked(msg.sender, tokenId);
        }
    }

    function claim() external nonReentrant returns (uint256 amount) {
        amount = _checkpointAll(msg.sender);
        require(amount > 0, "nothing to claim");
        require(IERC20Minimal(rewardToken).transfer(msg.sender, amount), "reward transfer failed");
        emit Claimed(msg.sender, amount);
    }

    /// @notice Withdraw is always available, even if deposits have been paused.
    function withdraw(uint256[] calldata tokenIds) external nonReentrant {
        require(tokenIds.length > 0 && tokenIds.length <= 20, "invalid batch");
        uint256 payout = _checkpointAll(msg.sender);
        for (uint256 i; i < tokenIds.length; ++i) {
            uint256 tokenId = tokenIds[i];
            require(stakeOf[tokenId].staker == msg.sender, "not staker");
            delete stakeOf[tokenId];
            _removeToken(msg.sender, tokenId);
            IERC721Minimal(collection).safeTransferFrom(address(this), msg.sender, tokenId);
            emit Withdrawn(msg.sender, tokenId);
        }
        if (payout > 0) {
            require(IERC20Minimal(rewardToken).transfer(msg.sender, payout), "reward transfer failed");
            emit Claimed(msg.sender, payout);
        }
    }

    function pendingRewards(address staker) external view returns (uint256 amount) {
        uint256[] storage ids = stakedTokenIds[staker];
        for (uint256 i; i < ids.length; ++i) {
            Stake storage position = stakeOf[ids[i]];
            amount += uint256(position.accrued) + (block.timestamp - position.checkpoint) * rewardPerSecondPerNft;
        }
    }

    function stakedTokens(address staker) external view returns (uint256[] memory) { return stakedTokenIds[staker]; }

    function _checkpointAll(address staker) private returns (uint256 amount) {
        uint256[] storage ids = stakedTokenIds[staker];
        for (uint256 i; i < ids.length; ++i) {
            Stake storage position = stakeOf[ids[i]];
            uint256 earned = uint256(position.accrued) + (block.timestamp - position.checkpoint) * rewardPerSecondPerNft;
            position.accrued = 0;
            position.checkpoint = uint64(block.timestamp);
            amount += earned;
        }
    }

    function _removeToken(address staker, uint256 tokenId) private {
        uint256 index = tokenIndexPlusOne[tokenId] - 1;
        uint256[] storage ids = stakedTokenIds[staker];
        uint256 last = ids[ids.length - 1];
        ids[index] = last;
        tokenIndexPlusOne[last] = index + 1;
        ids.pop();
        delete tokenIndexPlusOne[tokenId];
    }

    function onERC721Received(address, address, uint256, bytes calldata) external view returns (bytes4) {
        require(msg.sender == collection, "wrong collection");
        return this.onERC721Received.selector;
    }
}
