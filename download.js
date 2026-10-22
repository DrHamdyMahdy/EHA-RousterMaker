// Official download page: language switch (Arabic / English) and download links.
// Kept in its own file because the page's Content-Security-Policy allows no inline script.
(function () {
  // ---- Download buttons: latest release of this site's GitHub repository ----
  // The deploy script writes the repository name here; on <owner>.github.io/<repo>/ it is also worked out from the address.
  var repo = 'DrHamdyMahdy/EHA-RousterMaker';
  if (repo.indexOf('__') === 0) {
    var owner = location.hostname.split('.')[0];
    var name = location.pathname.split('/').filter(Boolean)[0] || owner + '.github.io';
    repo = owner + '/' + name;
  }
  document.querySelectorAll('[data-asset]').forEach(function (a) {
    a.href = 'https://github.com/' + repo + '/releases/latest/download/' + a.getAttribute('data-asset');
  });

  // ---- Language ----
  var KEY = 'eha_site_lang';
  var TITLES = { ar: 'EHA_ Rouster Maker — الموقع الرسمي', en: 'EHA_ Rouster Maker — Official Site' };

  // Fills an element from text where [[...]] marks bold words; builds DOM nodes, never HTML strings
  function fill(el, text) {
    while (el.firstChild) el.removeChild(el.firstChild);
    text.split(/(\[\[[^\]]*\]\])/).forEach(function (part) {
      if (!part) return;
      if (part.indexOf('[[') === 0) {
        var b = document.createElement('b');
        b.textContent = part.slice(2, -2);
        el.appendChild(b);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }

  // Step numbers in front of each step's text
  function numberSteps() {
    document.querySelectorAll('.steps').forEach(function (list) {
      list.querySelectorAll('li > div').forEach(function (div, i) {
        var num = document.createElement('span');
        num.className = 'num';
        num.textContent = String(i + 1);
        div.insertBefore(num, div.firstChild);
      });
    });
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = TITLES[lang];
    document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      fill(el, el.getAttribute('data-' + lang));
    });
    numberSteps();
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* storage unavailable: the choice just isn't remembered */
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {
    saved = null;
  }
  // Arabic by default; the visitor's own choice is remembered
  var current = saved === 'en' ? 'en' : 'ar';
  apply(current);

  var toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      current = current === 'ar' ? 'en' : 'ar';
      apply(current);
    });
  }
})();
