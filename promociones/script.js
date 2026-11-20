/* =========================================================
   IST · PROMOCIONES
   Archivo: promociones/script.js

   Visor global de flyers:
   - Recorre las dos colecciones como una sola secuencia.
   - Flechas con navegación circular.
   - Teclas izquierda / derecha y Escape.
   - Swipe horizontal en pantallas táctiles.
   - Contador global 01 / 06.
========================================================= */

(() => {
  "use strict";

  const root = document.querySelector("[data-ist-promos]");

  if (!root) {
    return;
  }


  /* =======================================================
     01 · REFERENCIAS
  ======================================================= */

  const cards = Array.from(
    root.querySelectorAll("[data-ist-promo]")
  );

  const viewer = root.querySelector(
    "[data-ist-promo-viewer]"
  );

  const viewerStage = root.querySelector(
    "[data-ist-promo-stage]"
  );

  const viewerImage = root.querySelector(
    "[data-ist-promo-image]"
  );

  const viewerCounter = root.querySelector(
    "[data-ist-promo-counter]"
  );

  const closeButton = root.querySelector(
    "[data-ist-promo-close]"
  );

  const previousButton = root.querySelector(
    "[data-ist-promo-prev]"
  );

  const nextButton = root.querySelector(
    "[data-ist-promo-next]"
  );


  if (
    !viewer ||
    !viewerStage ||
    !viewerImage ||
    !viewerCounter ||
    !closeButton ||
    !previousButton ||
    !nextButton ||
    cards.length === 0
  ) {
    return;
  }


  /* =======================================================
     02 · ESTADO
  ======================================================= */

  let activeIndex = 0;
  let lastTrigger = null;
  let swipeStart = null;

  const formatNumber = (value) => {
    return String(value).padStart(2, "0");
  };


  /* =======================================================
     03 · CONTADORES DE COLECCIÓN
  ======================================================= */

  const updateCollectionCounts = () => {
    const collections = [
      "recientes",
      "plantillas"
    ];

    collections.forEach((collectionName) => {
      const collection = root.querySelector(
        `[data-ist-promo-collection="${collectionName}"]`
      );

      const counter = root.querySelector(
        `[data-ist-promo-count="${collectionName}"]`
      );

      if (!collection || !counter) {
        return;
      }

      const total = collection.querySelectorAll(
        "[data-ist-promo]"
      ).length;

      counter.textContent = formatNumber(total);
    });
  };


  /* =======================================================
     04 · PREPARAR FLYERS
  ======================================================= */

  cards.forEach((card, index) => {
    const image = card.querySelector("img");

    const number = formatNumber(index + 1);

    card.dataset.promoNumber = number;

    card.setAttribute(
      "aria-label",
      `Abrir flyer ${number}`
    );

    const placeholderLabel = card.querySelector(
      ".ist-promos__placeholder-label"
    );

    if (placeholderLabel) {
      placeholderLabel.textContent = `Flyer ${number}`;
    }

    if (!image) {
      card.classList.add("is-missing");
      return;
    }

    const markImageReady = () => {
      card.classList.add("is-ready");
      card.classList.remove("is-missing");
    };

    const markImageMissing = () => {
      card.classList.add("is-missing");
      card.classList.remove("is-ready");
    };

    image.addEventListener(
      "load",
      markImageReady,
      { once: true }
    );

    image.addEventListener(
      "error",
      markImageMissing,
      { once: true }
    );

    if (image.complete) {
      if (image.naturalWidth > 0) {
        markImageReady();
      } else {
        markImageMissing();
      }
    }
  });

  updateCollectionCounts();


  /* =======================================================
     05 · ACTUALIZAR EL VISOR
  ======================================================= */

  const renderActivePromo = () => {
    const card = cards[activeIndex];

    if (!card) {
      return;
    }

    const thumbnail = card.querySelector("img");

    if (!thumbnail) {
      return;
    }

    const source = thumbnail.currentSrc || thumbnail.src;

    viewerImage.classList.remove("is-loaded");

    viewerImage.alt = thumbnail.alt || "Flyer de IST";

    viewerImage.src = source;

    viewerCounter.textContent = [
      formatNumber(activeIndex + 1),
      formatNumber(cards.length)
    ].join(" / ");
  };


  /* =======================================================
     06 · ABRIR Y CERRAR
  ======================================================= */

  const openViewer = (card) => {
    const index = cards.indexOf(card);

    if (index < 0) {
      return;
    }

    activeIndex = index;
    lastTrigger = card;

    renderActivePromo();

    if (!viewer.open) {
      viewer.showModal();
    }

    document.body.classList.add(
      "ist-promos-viewer-open"
    );

    closeButton.focus();
  };


  const closeViewer = () => {
    if (viewer.open) {
      viewer.close();
    }
  };


  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openViewer(card);
    });
  });


  closeButton.addEventListener(
    "click",
    closeViewer
  );


  viewer.addEventListener("close", () => {
    document.body.classList.remove(
      "ist-promos-viewer-open"
    );

    viewerImage.removeAttribute("src");

    if (lastTrigger) {
      lastTrigger.focus();
    }
  });


  /* Clic en el espacio oscuro exterior al flyer. */

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });


  /* =======================================================
     07 · CARRUSEL GLOBAL CON BUCLE
  ======================================================= */

  const showPrevious = () => {
    activeIndex = (
      activeIndex - 1 + cards.length
    ) % cards.length;

    renderActivePromo();
  };


  const showNext = () => {
    activeIndex = (
      activeIndex + 1
    ) % cards.length;

    renderActivePromo();
  };


  previousButton.addEventListener(
    "click",
    showPrevious
  );

  nextButton.addEventListener(
    "click",
    showNext
  );


  /* =======================================================
     08 · TECLADO
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (!viewer.open) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  });


  /* =======================================================
     09 · SWIPE TÁCTIL
  ======================================================= */

  viewerStage.addEventListener(
    "pointerdown",
    (event) => {
      if (
        event.pointerType !== "touch" &&
        event.pointerType !== "pen"
      ) {
        return;
      }

      swipeStart = {
        x: event.clientX,
        y: event.clientY
      };
    }
  );


  viewerStage.addEventListener(
    "pointerup",
    (event) => {
      if (!swipeStart) {
        return;
      }

      const deltaX = event.clientX - swipeStart.x;
      const deltaY = event.clientY - swipeStart.y;

      const isHorizontalSwipe =
        Math.abs(deltaX) > 48 &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

      if (isHorizontalSwipe) {
        if (deltaX < 0) {
          showNext();
        } else {
          showPrevious();
        }
      }

      swipeStart = null;
    }
  );


  viewerStage.addEventListener(
    "pointercancel",
    () => {
      swipeStart = null;
    }
  );


  /* =======================================================
     10 · ESTADO DE CARGA DEL FLYER EN EL VISOR
  ======================================================= */

  viewerImage.addEventListener("load", () => {
    viewerImage.classList.add("is-loaded");
  });

  viewerImage.addEventListener("error", () => {
    const activeCard = cards[activeIndex];

    if (activeCard) {
      activeCard.classList.add("is-missing");
      activeCard.classList.remove("is-ready");
    }

    closeViewer();
  });

})();
