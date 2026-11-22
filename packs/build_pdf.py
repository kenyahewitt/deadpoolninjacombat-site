#!/usr/bin/env python3
"""Build the Bot Risk Rules Pack PDF. Generic starter rules only. No secrets."""
from pathlib import Path

from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, HRFlowable, ListFlowable, ListItem, PageBreak, CondPageBreak,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

OUT = Path(__file__).resolve().parent / "bot-risk-rules-pack.pdf"

GOLD = HexColor("#ffd400")
GOLD_DIM = HexColor("#c9a803")
ORANGE = HexColor("#ff8a2a")
RED = HexColor("#8a1510")
INK = HexColor("#1a0b0b")
MUTED = HexColor("#4a3a3a")
RULE = HexColor("#d9c27a")
PAPER = HexColor("#fbf7f0")
BAND = HexColor("#140404")
DRAFT_RED = Color(0.72, 0.12, 0.10, alpha=0.045)


def draw_page(c: canvas.Canvas, doc):
    w, h = letter
    c.saveState()
    c.setFillColor(PAPER)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    # top band
    c.setFillColor(BAND)
    c.rect(0, h - 0.42 * inch, w, 0.42 * inch, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont("Times-Bold", 8)
    c.drawString(0.75 * inch, h - 0.26 * inch, "DEADPOOL NINJA COMBAT STORE")
    c.setFont("Times-Roman", 8)
    c.setFillColor(HexColor("#f5ece4"))
    c.drawRightString(w - 0.75 * inch, h - 0.26 * inch, "CYBER MONDAY ADD-ON  ·  DRAFT")
    # gold rule under band
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(0, h - 0.42 * inch, w, h - 0.42 * inch)
    # footer
    c.setFillColor(BAND)
    c.rect(0, 0, w, 0.42 * inch, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setLineWidth(2)
    c.line(0, 0.42 * inch, w, 0.42 * inch)
    c.setFont("Times-Roman", 8)
    c.setFillColor(HexColor("#f5ece4"))
    c.drawString(0.75 * inch, 0.18 * inch, "Not financial advice.  No wallets, keys, or live bot access.")
    c.setFillColor(GOLD)
    c.drawRightString(w - 0.75 * inch, 0.18 * inch, f"Page {doc.page}")
    # draft watermark
    c.saveState()
    c.setFillColor(DRAFT_RED)
    c.translate(w / 2, h / 2)
    c.rotate(32)
    c.setFont("Times-Bold", 54)
    c.drawCentredString(0, 40, "DRAFT")
    c.setFont("Times-Bold", 16)
    c.drawCentredString(0, 10, "NOT FOR SALE UNTIL PUBLISHED")
    c.restoreState()
    c.restoreState()


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle(
        name="Kicker", fontName="Times-Bold", fontSize=9, leading=12,
        textColor=ORANGE, tracking=1, spaceAfter=4, alignment=TA_LEFT,
    ))
    s.add(ParagraphStyle(
        name="CoverTitle", fontName="Times-Bold", fontSize=26, leading=30,
        textColor=INK, spaceAfter=6, alignment=TA_LEFT,
    ))
    s.add(ParagraphStyle(
        name="Deck", fontName="Times-Italic", fontSize=11, leading=15,
        textColor=MUTED, spaceAfter=10,
    ))
    s.add(ParagraphStyle(
        name="Body", fontName="Times-Roman", fontSize=10.5, leading=15,
        textColor=INK, spaceAfter=8, alignment=TA_JUSTIFY,
    ))
    s.add(ParagraphStyle(
        name="H", fontName="Times-Bold", fontSize=13, leading=17,
        textColor=INK, spaceBefore=12, spaceAfter=6,
    ))
    s.add(ParagraphStyle(
        name="HRule", fontName="Times-Bold", fontSize=11.5, leading=15,
        textColor=INK, spaceBefore=8, spaceAfter=2,
    ))
    s.add(ParagraphStyle(
        name="RuleBody", fontName="Times-Roman", fontSize=10.5, leading=15,
        textColor=INK, spaceAfter=4, leftIndent=12,
    ))
    s.add(ParagraphStyle(
        name="Example", fontName="Times-Bold", fontSize=10.5, leading=15,
        textColor=HexColor("#6a2a08"), spaceAfter=8, leftIndent=12,
    ))
    s.add(ParagraphStyle(
        name="Fine", fontName="Times-Roman", fontSize=8.5, leading=12,
        textColor=MUTED, spaceBefore=8,
    ))
    s.add(ParagraphStyle(
        name="Check", fontName="Times-Roman", fontSize=10, leading=15,
        textColor=INK, leftIndent=8, spaceAfter=2,
    ))
    s.add(ParagraphStyle(
        name="CellH", fontName="Times-Bold", fontSize=8.5, leading=11,
        textColor=GOLD,
    ))
    s.add(ParagraphStyle(
        name="Cell", fontName="Times-Roman", fontSize=8.5, leading=11,
        textColor=INK,
    ))
    s.add(ParagraphStyle(
        name="CellW", fontName="Times-Roman", fontSize=8.5, leading=11,
        textColor=HexColor("#f5ece4"),
    ))
    return s


def rule_block(st, num, title, body, example=None):
    bits = [
        Paragraph(f"{num}.  {title}", st["HRule"]),
        Paragraph(body, st["RuleBody"]),
    ]
    if example:
        bits.append(Paragraph(example, st["Example"]))
    return KeepTogether(bits)


def build():
    st = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
        title="Bot Risk Rules Pack",
        author="Deadpool Ninja Combat store",
        subject="Cyber Monday digital add-on — draft preview. Not financial advice.",
        creator="Deadpool Ninja Combat store",
    )
    story = []

    story.append(Paragraph("CYBER MONDAY DIGITAL ADD-ON", st["Kicker"]))
    story.append(Paragraph("Bot Risk Rules Pack", st["CoverTitle"]))
    story.append(Paragraph(
        "A concise starter rulebook for trading bots. Copy the limits. Leave the switches on.",
        st["Deck"],
    ))
    story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=12))
    story.append(Paragraph(
        "This pack is a starter rulebook you can copy into your own trading bot or checklist. "
        "The numbers below are <b>example starter limits</b>. Change them to fit your capital. "
        "Leave the switches on. If a rule and a “hot tip” disagree, the rule wins.",
        st["Body"],
    ))
    story.append(Paragraph(
        "Do not put seed phrases, private keys, RPC secrets, or wallet addresses in this pack "
        "or in your config file. This pack does not include a live bot, keys, or wallet access.",
        st["Body"],
    ))

    story.append(Paragraph("How to use this pack", st["H"]))
    story.append(Paragraph(
        "1. Copy <b>bot-risk-rules.example.json</b> and rename it.<br/>"
        "2. Put your own numbers in. Keep every switch enabled until you have a written reason to change it.<br/>"
        "3. Make your bot read the file on every loop, and log every skip, halt, stop, and lock.<br/>"
        "4. Keep a KILL switch you can flip by hand.",
        st["Body"],
    ))

    # summary table
    story.append(Paragraph("Starter limits at a glance", st["H"]))
    header = [
        Paragraph("Rule", st["CellH"]),
        Paragraph("Example starter", st["CellH"]),
    ]
    rows_data = [
        ("Per-trade cap", "0.10 SOL per meme-coin entry, or $3 per prediction-market trade"),
        ("Total-open cap", "$10 total open"),
        ("Max open sleeves", "1 — one trade at a time"),
        ("Stops", "−15% default; −10% early-tier; flatten on slippage"),
        ("Daily halt", "$5 realized loss, then no new buys until the next day"),
        ("KILL file", "On. Blocks all new buys; exits may still run"),
        ("Rugcheck", "Must pass before a buy; fail or timeout = skip and log"),
        ("Liquidity floor", "$8,000; launch-curve coins need a fast-exit path"),
        ("Bot-farm / clone skip", "On, including factory-band and brand-costume names"),
        ("BE lock", "Arm at +10%; trail a floor at +3%"),
        ("Exploit-coin skip", "Skip hack/exploit names from the last 72 hours"),
        ("Take profit / time exit", "+20% take profit; 15-minute time exit"),
    ]
    data = [header]
    for a, b in rows_data:
        data.append([Paragraph(a, st["Cell"]), Paragraph(b, st["Cell"])])
    table = Table(data, colWidths=[1.85 * inch, 5.15 * inch])
    style_cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), BAND),
        ("TEXTCOLOR", (0, 0), (-1, 0), GOLD),
        ("FONTNAME", (0, 0), (-1, 0), "Times-Bold"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("GRID", (0, 0), (-1, -1), 0.4, HexColor("#e6d9b0")),
        ("BACKGROUND", (0, 1), (-1, 1), HexColor("#fff8e6")),
    ]
    for i in range(2, len(data)):
        if i % 2 == 1:
            style_cmds.append(("BACKGROUND", (0, i), (-1, i), HexColor("#fff8e6")))
        else:
            style_cmds.append(("BACKGROUND", (0, i), (-1, i), HexColor("#fffdf8")))
    table.setStyle(TableStyle(style_cmds))
    story.append(table)
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "These figures are examples, not a recommendation for your account size. Tighten them if your book is smaller.",
        st["Fine"],
    ))

    story.append(CondPageBreak(2.2 * inch))
    story.append(Paragraph("The rules", st["H"]))

    story.append(rule_block(
        st, "1", "Per-trade cap",
        "Never risk more than a fixed size on one entry. If the wallet is smaller than about three to five times this cap, cut the cap, not the rule.",
        "Example starter: 0.10 SOL per meme-coin entry, or $3 per prediction-market trade.",
    ))
    story.append(rule_block(
        st, "2", "Total-open cap",
        "A hard ceiling on the dollar value of all open positions at once. New entries that would break the ceiling are skipped and logged.",
        "Example starter: $10 total open.",
    ))
    story.append(rule_block(
        st, "3", "Max open sleeves",
        "Cap how many positions may be open at the same time. No stacking “just one more.”",
        "Example starter: 1 — one trade at a time.",
    ))
    story.append(rule_block(
        st, "4", "Stops",
        "Every open trade has a stop from the start. If a stop cannot fill at the target because of slippage, flatten anyway. Do not wait for a perfect price.",
        "Example starter: −15% default; −10% for early-tier or newly launched coins.",
    ))
    story.append(rule_block(
        st, "5", "Daily halt",
        "After a set realized loss for the day, stop opening new buys until the next day. Existing exits may still run.",
        "Example starter: $5 daily halt.",
    ))
    story.append(rule_block(
        st, "6", "KILL file",
        "A local, manual kill switch — a file or flag your bot checks every loop. When it is present, all new buys are blocked immediately. Selling and other exits may still run so you can flatten. Keep this on a path you control. This pack does not include any live paths, wallets, or keys.",
        "Example starter: enabled, checked every loop.",
    ))
    story.append(rule_block(
        st, "7", "Rugcheck",
        "No buy until an automated rug or safety check passes. A fail or a timeout is a skip, and it gets logged. Do not bypass the check to “catch the move.”",
        "Example starter: required before every buy.",
    ))
    story.append(rule_block(
        st, "8", "Liquidity floor",
        "Skip pools below a liquidity floor. Thin pools are where exits slip and rugs complete. An optional exemption may apply to coins still on a launch bonding curve — only if that path has a fast-exit rule.",
        "Example starter: $8,000 liquidity floor; launch-curve exemption only with a fast stop.",
    ))
    story.append(rule_block(
        st, "9", "Bot-farm / clone skip",
        "Skip tokens that look like copies of a coin that already launched: same or near-same name, factory-band lookalikes, and template swarms. Also skip brand-costume names (tokens posing as real companies, products, or major coins) unless you can verify they are official. Log every skip.",
        "Example starter: all three skip classes on.",
    ))
    story.append(rule_block(
        st, "10", "Breakeven (BE) lock",
        "Once a trade is far enough ahead, lock in a floor so a winner cannot fall back to a full stop. You can trail a small cushion above entry, or lock exactly at breakeven if you want it tighter.",
        "Example starter: arm at +10% unrealized; trail a floor at +3%.",
    ))
    story.append(rule_block(
        st, "11", "Exploit-coin skip",
        "Skip any token named after a hack, exploit, or “stolen / printed” event from a recent lookback window. Copycat “hack” meme coins show up fast after headlines. Position limits stay the same. Log every skip.",
        "Example starter: skip names tied to a hack or exploit from the last 72 hours.",
    ))

    story.append(Paragraph("Completing the book", st["H"]))
    story.append(Paragraph(
        "These exits close the loop with the rules above. Use them together, not as a substitute for caps and stops.",
        st["Body"],
    ))
    story.append(Paragraph(
        "<b>Take profit.</b> Example starter: +20%.<br/>"
        "<b>Time exit.</b> Example starter: 15 minutes if neither the stop nor the target has hit.<br/>"
        "<b>Launch-curve fast stop.</b> Use a tighter, faster exit while a coin is still on its launch curve.",
        st["Body"],
    ))

    story.append(Paragraph("Logging", st["H"]))
    story.append(Paragraph(
        "Log every skip, halt, kill, stop, and BE arm, with the time, the reason, and the contract address when you have it. "
        "Never write seed phrases, private keys, or other secrets into logs or into the config file.",
        st["Body"],
    ))

    story.append(Paragraph("One-page checklist", st["H"]))
    checks = [
        "Per-trade cap is set and enforced",
        "Total-open cap is set and enforced",
        "Only one sleeve may be open",
        "Default stop −15%; early-tier stop −10%; flatten on slippage",
        "Daily halt is on",
        "KILL switch is on and tested",
        "Rugcheck must pass before a buy",
        "Liquidity floor is on (launch-curve path has a fast exit)",
        "Bot-farm / clone / brand-costume skips are on",
        "BE lock arms at +10% with a +3% floor",
        "Exploit-coin skip covers headlines from the last 72 hours",
        "Take profit and time exit are on",
        "Skips and exits are logged, with no secrets in the logs",
    ]
    for item in checks:
        story.append(Paragraph(f"[  ]  {item}", st["Check"]))

    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceBefore=8, spaceAfter=8))
    story.append(Paragraph("What this pack is not", st["H"]))
    story.append(Paragraph(
        "This is not financial advice, a signal service, or a promise of profit. It is not a live bot, an API key, or a wallet. "
        "You are responsible for your own settings and funds. The companion file "
        "<b>bot-risk-rules.example.json</b> is a copy-paste template with the same example values.",
        st["Body"],
    ))
    story.append(Paragraph(
        "Deadpool Ninja Combat store  ·  Draft preview, November 2026  ·  Not for sale until published.",
        st["Fine"],
    ))

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
