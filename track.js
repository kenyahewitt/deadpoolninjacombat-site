/* Privacy-friendly analytics (GoatCounter: no cookies, no personal data)
   + UTM pass-through so campaign tags follow visitors into furbi.world/store. */
(function () {
  var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var params = new URLSearchParams(location.search);
  var utm = {};
  try { utm = JSON.parse(sessionStorage.getItem("dp_utm") || "{}"); } catch (e) {}
  var fresh = false;
  KEYS.forEach(function (k) { var v = params.get(k); if (v) { utm[k] = v.slice(0, 100); fresh = true; } });
  if (fresh) { try { sessionStorage.setItem("dp_utm", JSON.stringify(utm)); } catch (e) {} }
  function tag(a) {
    if (!a || !a.href || !Object.keys(utm).length) return;
    var u; try { u = new URL(a.href, location.href); } catch (e) { return; }
    if (!/(^|\.)furbi\.world$/i.test(u.hostname)) return;
    Object.keys(utm).forEach(function (k) { if (!u.searchParams.has(k)) u.searchParams.set(k, utm[k]); });
    a.href = u.toString();
  }
  function tagAll() { document.querySelectorAll('a[href*="furbi.world"]').forEach(tag); }
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("a"); if (a) tag(a); }, true);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tagAll); else tagAll();
  var s = document.createElement("script");
  s.async = true; s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://deadpoolcombat.goatcounter.com/count");
  document.head.appendChild(s);
})();
