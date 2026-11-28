/* Development only: version number, top right of every page. The editor is at /editor/.
   Before launch, delete this file and the <script ... dev-tools.js> line on each page. */
(function () {
  "use strict";
  var VERSION = "v3.17"; /* change this one line to bump the version */
  window.SITE_VERSION = VERSION;

  /* The editor only needs the number, which it shows in its own header. */
  var label = document.getElementById("siteVersion");
  if (label) { label.textContent = VERSION; return; }

  var bar = document.createElement("div");
  bar.id = "devTools";
  bar.style.cssText = "display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:4px 12px;background:#000;color:#d8cbb7;font:700 12px/1.4 system-ui,sans-serif";
  var version = document.createElement("span");
  version.textContent = VERSION;
  bar.append(version);
  document.body.prepend(bar);
})();
