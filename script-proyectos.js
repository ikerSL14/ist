

/* =========================================================
   IST PROYECTOS · COUNTERS
   RANDOM ROLL + SMOOTH SETTLE
========================================================= */

(() => {

  const group = document.querySelector(
    '.projects-hero-pillars'
  );

  if (!group) return;

  const counters = group.querySelectorAll(
    '.pillar-number[data-count]'
  );

  if (!counters.length) return;


  const ROLL_DURATION = 900;
  const SETTLE_DURATION = 750;


  // Formato numérico
  function formatNumber(value, minDigits) {

    const rounded = Math.round(value);

    if (minDigits > 1 && rounded < 10) {
      return String(rounded).padStart(minDigits, '0');
    }

    return new Intl.NumberFormat('es-MX').format(rounded);

  }


  // Número aleatorio
  function randomBetween(min, max) {

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  }


  // Valor definitivo
  function setFinalValue(element) {

    const target = Number(element.dataset.count);
    const digits = Number(element.dataset.minDigits || 0);
    const suffix = element.dataset.suffix || '';

    element.textContent =
      formatNumber(target, digits) + suffix;

  }


  // Animación premium
  function animateCounter(element) {

    if (element.dataset.animated === 'true') return;

    const target = Number(element.dataset.count);

    if (!Number.isFinite(target) || target < 0) return;

    const digits = Number(element.dataset.minDigits || 0);
    const suffix = element.dataset.suffix || '';

    element.dataset.animated = 'true';

    element.classList.add('is-counting');


    // Cifra máxima temporal
    const ceiling = Math.max(
      target + 8,
      Math.round(target * 4.5)
    );


    // Inicio aleatorio, nunca desde cero
    let currentValue = Math.max(
      1,
      Math.floor(ceiling * 0.15)
    );


    let nextRollAt = 0;
    let settleStartValue = null;

    const startTime = performance.now();


    function render(value) {

      element.textContent =
        formatNumber(value, digits) + suffix;

    }


    // Primera cifra
    render(currentValue);


    function updateCounter(now) {

      const elapsed = now - startTime;


      /* =========================================
         FASE 1 · ASCENSO ALEATORIO
      ========================================= */

      if (elapsed < ROLL_DURATION) {

        if (elapsed >= nextRollAt) {

          const increment = randomBetween(
            Math.max(1, Math.round(ceiling * 0.045)),
            Math.max(2, Math.round(ceiling * 0.10))
          );

          currentValue = Math.min(
            ceiling,
            currentValue + increment
          );

          render(currentValue);


          // Variación en la velocidad del contador
          nextRollAt = elapsed + randomBetween(40, 75);

        }

        requestAnimationFrame(updateCounter);

        return;

      }


      /* =========================================
         FASE 2 · DESCENSO Y DESACELERACIÓN
      ========================================= */

      if (settleStartValue === null) {

        settleStartValue = currentValue;

      }


      const settleProgress = Math.min(
        (elapsed - ROLL_DURATION) / SETTLE_DURATION,
        1
      );


      // Desaceleración progresiva
      const eased = 1 - Math.pow(
        1 - settleProgress,
        3
      );


      const value =
        settleStartValue +
        (target - settleStartValue) * eased;


      render(value);


      /* =========================================
         FASE 3 · VALOR DEFINITIVO
      ========================================= */

      if (settleProgress < 1) {

        requestAnimationFrame(updateCounter);

      } else {

        setFinalValue(element);

        element.classList.remove('is-counting');

      }

    }


    requestAnimationFrame(updateCounter);

  }


  // Accesibilidad
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  if (reducedMotion) {

    counters.forEach(setFinalValue);

    return;

  }


  // Activación cuando el hero es visible
  if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            counters.forEach(animateCounter);

            observer.disconnect();

          }

        });

      },

      {
        threshold: 0.35
      }

    );

    observer.observe(group);

  } else {

    counters.forEach(animateCounter);

  }

})();



/* =========================================================
   IST · PROJECT EXPLORER
   DYNAMIC COLLECTION & TYPE FILTERS
========================================================= */


/* =========================================================
   IST · PROJECT EXPLORER
   COLLECTION & TYPE FILTERS
   SMART STATE RESTORATION
========================================================= */

(() => {

  const STORAGE_KEY = "ist_project_explorer_state_v1";

  const explorer = document.querySelector(
    ".ist-project-explorer"
  );

  if (!explorer) return;


  /* =====================================================
     ELEMENTOS
  ===================================================== */

  const collectionButtons = [
    ...explorer.querySelectorAll("[data-collection-filter]")
  ];

  const typeButtons = [
    ...explorer.querySelectorAll("[data-type-filter]")
  ];

  const collections = [
    ...explorer.querySelectorAll("[data-collection]")
  ];

  const cards = [
    ...explorer.querySelectorAll("[data-project-card]")
  ];

  const results = explorer.querySelector(
    "[data-project-results]"
  );

  const emptyState = explorer.querySelector(
    "[data-empty-state]"
  );

  const resetButton = explorer.querySelector(
    "[data-reset-project-filters]"
  );

  if (!cards.length) return;


  /* =====================================================
     ESTADO
  ===================================================== */

  let activeCollection = "all";
  let activeType = "all";

  let firstRender = true;

  let pendingProjectId = null;


  /* =====================================================
     RECUPERAR ESTADO GUARDADO
  ===================================================== */

  let savedState = null;

  try {

    savedState = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || "null"
    );

  } catch (error) {

    savedState = null;

  }


  const navigationEntry =
    performance.getEntriesByType("navigation")[0];

  const isBackForward =
    navigationEntry?.type === "back_forward";

  const hashId = window.location.hash.slice(1);

  const hashMatchesSavedProject =
    savedState &&
    savedState.projectId &&
    hashId === savedState.projectId;


  const shouldRestore = Boolean(
    savedState &&
    (isBackForward || hashMatchesSavedProject)
  );


  if (shouldRestore) {

    const validCollection =
      savedState.collection === "all" ||
      collectionButtons.some(
        button =>
          button.dataset.collectionFilter ===
          savedState.collection
      );

    const validType =
      savedState.type === "all" ||
      typeButtons.some(
        button =>
          button.dataset.typeFilter ===
          savedState.type
      );


    if (validCollection) {
      activeCollection = savedState.collection;
    }

    if (validType) {
      activeType = savedState.type;
    }

    pendingProjectId = savedState.projectId || null;

  }


  /* =====================================================
     GUARDAR ESTADO
  ===================================================== */

  function saveState(projectId) {

    if (typeof projectId !== "undefined") {

      pendingProjectId = projectId || null;

    }

    const state = {

      collection: activeCollection,

      type: activeType,

      scrollY: window.scrollY,

      projectId: pendingProjectId,

      savedAt: Date.now()

    };


    try {

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );

    } catch (error) {

      // El portafolio sigue funcionando
      // aunque el almacenamiento no esté disponible.

    }

  }


  /* =====================================================
     ACTUALIZAR BOTONES
  ===================================================== */

  function updateButtonStates() {

    collectionButtons.forEach(button => {

      const active =
        button.dataset.collectionFilter ===
        activeCollection;

      button.classList.toggle("is-active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    });


    typeButtons.forEach(button => {

      const active =
        button.dataset.typeFilter === activeType;

      button.classList.toggle("is-active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    });

  }


  /* =====================================================
     APLICAR FILTROS
  ===================================================== */

  function applyFilters() {

    let totalVisible = 0;


    collections.forEach(collection => {

      const collectionName =
        collection.dataset.collection;

      const collectionMatches =
        activeCollection === "all" ||
        activeCollection === collectionName;


      const collectionCards = [
        ...collection.querySelectorAll("[data-project-card]")
      ];

      let visibleCount = 0;


      collectionCards.forEach(card => {

        const cardType = card.dataset.type;

        const typeMatches =
          activeType === "all" ||
          activeType === cardType;


        const shouldShow =
          collectionMatches && typeMatches;


        card.hidden = !shouldShow;


        if (shouldShow) {

          visibleCount++;

          totalVisible++;


          if (!firstRender) {

            card.classList.remove("is-filter-enter");

            void card.offsetWidth;

            card.classList.add("is-filter-enter");

          }

        }

      });


      collection.hidden = visibleCount === 0;


      const counter = collection.querySelector(
        "[data-visible-count]"
      );

      if (counter) {

        counter.textContent =
          visibleCount +
          (visibleCount === 1
            ? " proyecto"
            : " proyectos");

      }

    });


    /* RESULTADOS GENERALES */

    if (results) {

      results.textContent =
        totalVisible +
        (totalVisible === 1
          ? " proyecto visible"
          : " proyectos visibles");

    }


    /* ESTADO VACÍO */

    if (emptyState) {

      emptyState.hidden = totalVisible !== 0;

    }


    updateButtonStates();

    firstRender = false;

  }


  /* =====================================================
     APLICAR FILTROS SIN ALTERAR EL SCROLL
  ===================================================== */

  function applyFiltersKeepingScroll() {

    const currentScroll = window.scrollY;

    const root = document.documentElement;

    const previousBehavior =
      root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";


    applyFilters();

    void explorer.offsetHeight;

    window.scrollTo(0, currentScroll);


    saveState();


    requestAnimationFrame(() => {

      window.scrollTo(0, currentScroll);

      root.style.scrollBehavior = previousBehavior;

      saveState();

    });

  }


  /* =====================================================
     FILTRO DE COLECCIONES
  ===================================================== */

  collectionButtons.forEach(button => {

    button.addEventListener("click", function () {

      activeCollection =
        this.dataset.collectionFilter;

      applyFiltersKeepingScroll();

    });

  });


  /* =====================================================
     FILTRO DE TIPOS
  ===================================================== */

  typeButtons.forEach(button => {

    button.addEventListener("click", function () {

      activeType =
        this.dataset.typeFilter;

      applyFiltersKeepingScroll();

    });

  });


  /* =====================================================
     RESTABLECER FILTROS
  ===================================================== */

  if (resetButton) {

    resetButton.addEventListener("click", function () {

      activeCollection = "all";

      activeType = "all";

      applyFiltersKeepingScroll();

    });

  }


  /* =====================================================
     IDENTIFICAR PROYECTO SELECCIONADO
  ===================================================== */

  cards.forEach(card => {

    card.addEventListener("click", event => {

      // No intervenir en nuevas pestañas
      // ni en clics modificados.

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }


      // Guardar filtros, scroll e ID del proyecto.

      saveState(card.id || null);


      // Controlar nosotros la restauración
      // cuando el navegador reconstruye la página.

      if ("scrollRestoration" in history) {

        history.scrollRestoration = "manual";

      }

    });

  });


  /* =====================================================
     GUARDAR ANTES DE ABANDONAR EL PORTAFOLIO
  ===================================================== */

  window.addEventListener("pagehide", () => {

    saveState();

  });


  /* =====================================================
     REGRESO DESDE BFCACHE
     RESTAURACIÓN NATIVA DEL NAVEGADOR
  ===================================================== */

  window.addEventListener("pageshow", event => {

    if (!event.persisted) return;


    // El navegador ya recuperó el documento,
    // sus filtros y su posición original.

    if ("scrollRestoration" in history) {

      history.scrollRestoration = "auto";

    }


    // Quitar foco de mouse si quedó sobre una card.

    const activeElement = document.activeElement;

    const activeCard =
      activeElement?.closest?.("[data-project-card]");

    if (
      activeCard &&
      !activeElement.matches(":focus-visible")
    ) {

      activeElement.blur();

    }


    // El estado ya fue recuperado por el navegador.

    try {

      sessionStorage.removeItem(STORAGE_KEY);

    } catch (error) {}


    pendingProjectId = null;

  });


  /* =====================================================
     INICIALIZACIÓN
  ===================================================== */

  applyFilters();


  /* =====================================================
     RESTAURAR POSICIÓN SI LA PÁGINA SE RECONSTRUYÓ
  ===================================================== */

  if (shouldRestore) {

    const savedScroll = Number(savedState.scrollY);

    const targetScroll = Number.isFinite(savedScroll)
      ? Math.max(0, savedScroll)
      : 0;


    const root = document.documentElement;

    const previousBehavior =
      root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";


    // Evitar que el hash interfiera
    // con la posición exacta restaurada.

    if (hashMatchesSavedProject) {

      history.replaceState(
        history.state,
        "",
        window.location.pathname +
        window.location.search
      );

    }


    // Esperar a que se apliquen los filtros
    // y se actualice la distribución de las cards.

    requestAnimationFrame(() => {

      window.scrollTo(0, targetScroll);


      requestAnimationFrame(() => {

        window.scrollTo(0, targetScroll);

        root.style.scrollBehavior = previousBehavior;


        try {

          sessionStorage.removeItem(STORAGE_KEY);

        } catch (error) {}


        pendingProjectId = null;


        if ("scrollRestoration" in history) {

          history.scrollRestoration = "auto";

        }

      });

    });

  }

})();
