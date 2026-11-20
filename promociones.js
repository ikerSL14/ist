
/* =========================================
   IST · SISTEMA DE PROMOCIONES
========================================= */

(() => {

  const tab = document.getElementById('promo-tab');
  const modal = document.getElementById('promo-modal');

  if (!tab || !modal || tab.dataset.promoActive === 'false') {
    return;
  }

  const dialog = modal.querySelector('.promo-dialog');
  const closeButton = modal.querySelector('.promo-close');
  const promoImage = document.getElementById('promo-image');
  const imageFallback = document.getElementById('promo-image-fallback');

  let previousFocus = null;
  let closeTimer = null;


  /* =====================================
     ABRIR MODAL
  ===================================== */

  function openPromo() {

    if (!modal.hidden) return;

    previousFocus = document.activeElement;

    clearTimeout(closeTimer);

    modal.hidden = false;

    document.body.classList.add('promo-modal-open');

    tab.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(() => {

      modal.classList.add('is-open');

      closeButton.focus();

    });

  }


  /* =====================================
     CERRAR MODAL
  ===================================== */

  function closePromo() {

    if (modal.hidden) return;

    modal.classList.remove('is-open');

    document.body.classList.remove('promo-modal-open');

    tab.setAttribute('aria-expanded', 'false');

    closeTimer = window.setTimeout(() => {

      modal.hidden = true;

      if (previousFocus && previousFocus.isConnected) {
        previousFocus.focus();
      }

    }, 300);

  }


  /* =====================================
     EVENTOS DE APERTURA Y CIERRE
  ===================================== */

  tab.addEventListener('click', openPromo);

  modal.addEventListener('click', (event) => {

    if (
      event.target === modal ||
      event.target.closest('[data-promo-close]')
    ) {
      closePromo();
    }

  });


  /* =====================================
     CERRAR CON ESCAPE
  ===================================== */

  document.addEventListener('keydown', (event) => {

    if (modal.hidden) return;

    if (event.key === 'Escape') {

      closePromo();

    }


    /* Mantener el foco dentro del modal */

    if (event.key === 'Tab') {

      const focusable = [
        ...dialog.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ].filter(element => !element.hidden);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {

        event.preventDefault();
        last.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {

        event.preventDefault();
        first.focus();

      }

    }

  });


  /* =====================================
     DETECTAR IMAGEN NO DISPONIBLE
  ===================================== */

  if (promoImage) {

    promoImage.addEventListener('error', () => {

      promoImage.hidden = true;

      if (imageFallback) {
        imageFallback.hidden = false;
      }

    }, { once: true });

  }


  /* =====================================
     MOSTRAR PESTAÑA DESPUÉS DEL HERO
  ===================================== */

  const hero = document.querySelector('.hero');

  if (hero && 'IntersectionObserver' in window) {

    const observer = new IntersectionObserver(([entry]) => {

      const heroHasBeenLeft =
        entry.intersectionRatio < 0.30 &&
        window.scrollY > 100;

      tab.classList.toggle('is-visible', heroHasBeenLeft);

    }, {
      threshold: [0, 0.30, 1]
    });

    observer.observe(hero);

  } else {

    /* Para páginas que no tienen HERO */

    function checkScroll() {

      tab.classList.toggle(
        'is-visible',
        window.scrollY > 220
      );

    }

    window.addEventListener('scroll', checkScroll, {
      passive: true
    });

    checkScroll();

  }

})();
