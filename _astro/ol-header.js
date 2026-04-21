/* ============================================================
   OrigenLab — Controlador de menú desktop (dropdown premium)
   Funciones:
   - Hover con delay de cierre (evita parpadeo al cruzar gap)
   - Click/tap para abrir en touch devices
   - Soporte de teclado: Enter/Space abre, Esc cierra, flechas navegan
   - Click fuera cierra el dropdown
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var dropdowns = document.querySelectorAll('.ol-has-dropdown');
    if (!dropdowns.length) return;

    var CLOSE_DELAY = 180; // ms — pequeño delay antes de cerrar

    dropdowns.forEach(function (dd) {
      var link = dd.querySelector('.ol-nav-link');
      var panel = dd.querySelector('.ol-dropdown');
      if (!link || !panel) return;

      var closeTimer = null;

      function open() {
        clearTimeout(closeTimer);
        // Cerrar otros dropdowns abiertos
        dropdowns.forEach(function (other) {
          if (other !== dd) other.classList.remove('is-open');
        });
        dd.classList.add('is-open');
        link.setAttribute('aria-expanded', 'true');
      }

      function close() {
        dd.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
      }

      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(close, CLOSE_DELAY);
      }

      // Atributos ARIA
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
      panel.setAttribute('role', 'menu');
      var links = panel.querySelectorAll('.ol-dropdown-link');
      links.forEach(function (l) { l.setAttribute('role', 'menuitem'); });

      // Hover: abre al entrar, cierra con delay al salir
      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', scheduleClose);

      // Cancela cierre si el cursor vuelve antes del timeout
      panel.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });

      // Focus: abre al enfocar cualquier elemento dentro
      dd.addEventListener('focusin', open);
      dd.addEventListener('focusout', function (e) {
        // Solo cerrar si el foco sale por completo del dropdown
        setTimeout(function () {
          if (!dd.contains(document.activeElement)) close();
        }, 0);
      });

      // Click en el trigger: alternar (útil para touch)
      link.addEventListener('click', function (e) {
        // Si es touch (sin hover), prevenir navegación en el primer tap
        var isTouch = window.matchMedia('(hover: none)').matches;
        if (isTouch && !dd.classList.contains('is-open')) {
          e.preventDefault();
          open();
        }
      });

      // Teclado
      link.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
          var first = panel.querySelector('.ol-dropdown-link');
          if (first) first.focus();
        } else if (e.key === 'Escape') {
          close();
          link.blur();
        }
      });

      links.forEach(function (l, idx) {
        l.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            var next = links[idx + 1] || links[0];
            next.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            var prev = links[idx - 1] || links[links.length - 1];
            prev.focus();
          } else if (e.key === 'Escape') {
            close();
            link.focus();
          } else if (e.key === 'Tab') {
            // Permite tab normal, pero cierra si sale del panel
            setTimeout(function () {
              if (!dd.contains(document.activeElement)) close();
            }, 0);
          }
        });
      });
    });

    // Click fuera cierra cualquier dropdown abierto
    document.addEventListener('click', function (e) {
      dropdowns.forEach(function (dd) {
        if (!dd.contains(e.target)) {
          dd.classList.remove('is-open');
          var l = dd.querySelector('.ol-nav-link');
          if (l) l.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Esc global
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdowns.forEach(function (dd) {
          dd.classList.remove('is-open');
          var l = dd.querySelector('.ol-nav-link');
          if (l) l.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ============================================================
   FAQ Accordion — universal (usa aria-controls)
   Soporta múltiples secciones FAQ en la misma página.
   ============================================================ */
(function () {
  'use strict';
  function initFaq() {
    var btns = document.querySelectorAll('.ol-faq-question');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      // Resolver id del answer: primero aria-controls, si no usar data-faq
      var ansId = btn.getAttribute('aria-controls') ||
                  ('faq-ans-' + btn.getAttribute('data-faq'));
      btn.addEventListener('click', function () {
        var ans = document.getElementById(ansId);
        var isOpen = btn.classList.contains('active');
        // Cerrar hermanos dentro del mismo ol-faq-list
        var list = btn.closest('.ol-faq-list');
        if (list) {
          list.querySelectorAll('.ol-faq-question').forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-expanded', 'false');
            var bid = b.getAttribute('aria-controls') ||
                      ('faq-ans-' + b.getAttribute('data-faq'));
            var ba = document.getElementById(bid);
            if (ba) ba.style.maxHeight = null;
          });
        }
        if (!isOpen && ans) {
          btn.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaq);
  } else {
    initFaq();
  }
})();
