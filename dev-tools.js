/* Development only: version number and Edit link, top right of every page.
   Before launch, delete this file and the <script ... dev-tools.js> line on each page, or move the link. */
(function () {
  "use strict";
  var VERSION = "v3.11"; /* change this one line to bump the version */
  window.SITE_VERSION = VERSION;

  /* The editor only needs the number, which it shows in its own header. */
  var label = document.getElementById("siteVersion");
  if (label) { label.textContent = VERSION; return; }

  var root = new URL(".", document.currentScript.src).pathname;
  var page = location.pathname.slice(root.length);
  if (!page || page.slice(-1) === "/") page += "index.html";

  var bar = document.createElement("div");
  bar.id = "devTools";
  bar.style.cssText = "display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:4px 12px;background:#000;color:#d8cbb7;font:700 12px/1.4 system-ui,sans-serif";
  var version = document.createElement("span");
  version.textContent = VERSION;
  var edit = document.createElement("a");
  edit.href = root + "editor/?page=" + encodeURIComponent(page);
  edit.textContent = "✎ Edit";
  edit.style.cssText = "color:#21170a;background:#f89317;border-radius:999px;padding:3px 12px;text-decoration:none";
  bar.append(version, edit);
  document.body.prepend(bar);
})();
