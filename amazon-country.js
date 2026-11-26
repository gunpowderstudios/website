/* Amazon storefront country routing; existing button styling stays unchanged. */
(function () {
  "use strict";
  var stores = {
  "GB": [
    "https://www.amazon.co.uk/stores/page/D555A78A-1CEB-4FA7-8283-CC6BA0D48D96?language=en_GB",
    "UK"
  ],
  "US": [
    "https://www.amazon.com/stores/page/ECFF5B0C-1025-4601-9706-82C53FD9DE30",
    "USA"
  ],
  "CA": [
    "https://www.amazon.ca/stores/page/8C34510D-B4B8-4A9B-8FDB-9DEDECB014E8",
    "Canada"
  ],
  "FR": [
    "https://www.amazon.fr/stores/page/1369DECC-5C73-4A34-862D-BFC8B9480420",
    "France"
  ],
  "DE": [
    "https://www.amazon.de/stores/page/B849F2E1-032D-41BE-82A2-B466A937418F",
    "Germany"
  ],
  "IT": [
    "https://www.amazon.it/stores/page/85926F52-636A-4F2A-91EA-A7F00D839C3B",
    "Italy"
  ],
  "ES": [
    "https://www.amazon.es/stores/page/C53698DD-CE29-4F46-A553-407FF22D3968",
    "Spain"
  ],
  "NL": [
    "https://www.amazon.nl/stores/page/39F72F7F-E16F-42A7-82AC-7E499ECE5FCA",
    "Netherlands"
  ],
  "PL": [
    "https://www.amazon.pl/stores/page/632BF8CD-E325-4522-964E-FF49DC50F6D7",
    "Poland"
  ],
  "SE": [
    "https://www.amazon.se/stores/page/FD50C91C-C6BB-4749-809C-DB26F70F982D",
    "Sweden"
  ],
  "MX": [
    "https://www.amazon.com.mx/stores/page/E816FBEE-5FA7-4409-B92A-BA531815E3A1",
    "Mexico"
  ]
};
  var ukStore = stores.GB[0];
  var links = Array.prototype.slice.call(document.querySelectorAll('a[href]')).filter(function (link) {
    return link.getAttribute('href').indexOf(ukStore) === 0;
  });
  if (!links.length) return;
  fetch("/cdn-cgi/trace", { credentials: "omit" })
    .then(function (response) {
      if (!response.ok) throw new Error("Cloudflare country lookup unavailable");
      return response.text();
    })
    .then(function (data) {
      var match = data.match(/^loc=([A-Z]{2})\s*$/m);
      if (!match || !stores[match[1]]) return;
      var store = stores[match[1]];
      links.forEach(function (link) {
        link.href = store[0];
        /* Keep page's design and label, but add country when label already names Amazon. */
        if (/Amazon/i.test(link.textContent)) {
          var text = link.textContent;
          if (/\bAmazon\s+(UK|USA|Canada|France|Germany|Italy|Spain|Netherlands|Poland|Sweden|Mexico)\b/i.test(text)) {
            link.textContent = text.replace(/\bAmazon\s+(UK|USA|Canada|France|Germany|Italy|Spain|Netherlands|Poland|Sweden|Mexico)\b/i, "Amazon " + store[1]);
          } else {
            link.textContent = text.replace(/Amazon/i, "Amazon " + store[1]);
          }
        }
      });
    })
    .catch(function () {
      /* UK storefront remains the fallback, including on github.io staging. */
    });
})();
