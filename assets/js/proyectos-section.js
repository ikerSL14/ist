
/* ========================================
   IST · CARRUSEL 3D DE PROYECTOS
========================================= */

(() => {

  const section = document.querySelector('.ist-projects-showcase');

  if (!section) return;


  /* =====================================
     ELEMENTOS
  ====================================== */

  const cards = Array.from(
    section.querySelectorAll('.ist-project-card')
  );

  const stage = section.querySelector('.ist-projects-stage');

  const prevBtn = section.querySelector('.ist-projects-nav-prev');
  const nextBtn = section.querySelector('.ist-projects-nav-next');

  const titleEl = section.querySelector('#istProjectTitle');
  const categoryEl = section.querySelector('#istProjectCategory');
  const descEl = section.querySelector('#istProjectDesc');

  const liveLinkEl = section.querySelector('#istProjectLiveLink');
  const detailLinkEl = section.querySelector('#istProjectDetailLink');

  const dotsContainer = section.querySelector('#istProjectDots');


  if (!cards.length) return;


  /* =====================================
     PROYECTO INICIAL
  ====================================== */

  const initialIndex = cards.findIndex(card =>
    card.classList.contains('is-active')
  );

  let activeIndex = initialIndex >= 0 ? initialIndex : 0;


  /* =====================================
     POSICIONES DEL CARRUSEL
  ====================================== */

  function getPositionClass(cardIndex, currentIndex) {

    const total = cards.length;

    const diff = (cardIndex - currentIndex + total) % total;

    if (diff === 0) return 'is-active';

    if (diff === 1) return 'is-next';

    if (diff === 2) return 'is-far-next';

    if (diff === total - 1) return 'is-prev';

    if (diff === total - 2) return 'is-far-prev';

    return 'is-hidden';

  }


  /* =====================================
     CREAR INDICADORES AUTOMÁTICAMENTE
  ====================================== */

  const dots = [];

  if (dotsContainer) {

    dotsContainer.replaceChildren();

    cards.forEach((card, index) => {

      const dot = document.createElement('button');

      dot.type = 'button';

      dot.className = 'ist-project-dot';

      dot.setAttribute(
        'aria-label',
        `Mostrar proyecto ${index + 1}: ${card.dataset.title || ''}`
      );

      dot.addEventListener('click', () => {

        goToProject(index);

      });

      dotsContainer.appendChild(dot);

      dots.push(dot);

    });

  }


  /* =====================================
     ACTUALIZAR INFORMACIÓN
  ====================================== */

  function updateProjectInfo() {

    const activeCard = cards[activeIndex];

    const title = activeCard.dataset.title || '';

    const category = activeCard.dataset.category || '';

    const description = activeCard.dataset.desc || '';

    const liveUrl = activeCard.dataset.liveUrl || '#';

    const detailUrl = activeCard.dataset.detailUrl || '#';


    if (titleEl) {
      titleEl.textContent = title;
    }

    if (categoryEl) {
      categoryEl.textContent = category;
    }

    if (descEl) {
      descEl.textContent = description;
    }


    if (liveLinkEl) {

      liveLinkEl.href = liveUrl;

      liveLinkEl.hidden = liveUrl === '#';

    }


    if (detailLinkEl) {

      detailLinkEl.href = detailUrl;

      detailLinkEl.hidden = detailUrl === '#';

    }


    /* Actualizar indicadores */

    dots.forEach((dot, index) => {

      const isActive = index === activeIndex;

      dot.classList.toggle('is-active', isActive);

      dot.setAttribute('aria-pressed', String(isActive));

    });

  }


  /* =====================================
     ACTUALIZAR POSICIONES
  ====================================== */

  function updateCarousel() {

    cards.forEach((card, index) => {

      card.classList.remove(
        'is-active',
        'is-prev',
        'is-next',
        'is-far-prev',
        'is-far-next',
        'is-hidden'
      );

      const position = getPositionClass(index, activeIndex);

      card.classList.add(position);

      const link = card.querySelector('.ist-project-card-link');

      if (link) {

        link.tabIndex = position === 'is-active' ? 0 : -1;

      }

    });


    updateProjectInfo();

  }


  /* =====================================
     NAVEGACIÓN
  ====================================== */

  function goToProject(index) {

    activeIndex = (index + cards.length) % cards.length;

    updateCarousel();

  }


  function goNext() {

    goToProject(activeIndex + 1);

  }


  function goPrev() {

    goToProject(activeIndex - 1);

  }


  /* =====================================
     EVENTOS DE FLECHAS
  ====================================== */

  if (nextBtn) {

    nextBtn.addEventListener('click', goNext);

  }

  if (prevBtn) {

    prevBtn.addEventListener('click', goPrev);

  }


  /* =====================================
     SELECCIÓN DE PANTALLAS LATERALES
  ====================================== */

  cards.forEach((card, index) => {

    const link = card.querySelector('.ist-project-card-link');

    if (!link) return;

    link.addEventListener('click', (event) => {

      if (index !== activeIndex) {

        event.preventDefault();

        goToProject(index);

      }

      /*
        Si el proyecto ya está activo,
        se permite abrir su página de detalles.
      */

    });

  });


  /* =====================================
     TECLADO
  ====================================== */

  if (stage) {

    stage.addEventListener('keydown', (event) => {

      if (event.key === 'ArrowRight') {

        event.preventDefault();

        goNext();

      }

      if (event.key === 'ArrowLeft') {

        event.preventDefault();

        goPrev();

      }

    });

  }


  /* =====================================
     DESLIZAMIENTO EN MÓVILES
  ====================================== */

  let touchStartX = 0;

  if (stage) {

    stage.addEventListener('touchstart', (event) => {

      touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    stage.addEventListener('touchend', (event) => {

      const touchEndX = event.changedTouches[0].screenX;

      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) < 55) return;

      if (difference > 0) {

        goNext();

      } else {

        goPrev();

      }

    }, { passive: true });

  }


  /* =====================================
     INICIALIZAR
  ====================================== */

  updateCarousel();


})();
