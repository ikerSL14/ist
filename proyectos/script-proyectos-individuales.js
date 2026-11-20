
/* =========================================================
   IST PROJECT GALLERY
   INTERACTIVE IMAGE VIEWER
========================================================= */

(() => {

  const gallery = document.querySelector(
    '[data-project-gallery]'
  );

  if (!gallery) return;


  const mainImage = gallery.querySelector(
    '[data-gallery-main]'
  );

  const caption = gallery.querySelector(
    '[data-gallery-caption]'
  );

  const counter = gallery.querySelector(
    '[data-gallery-number]'
  );

  const thumbnails = [
    ...gallery.querySelectorAll('[data-gallery-thumb]')
  ];


  if (!mainImage || !thumbnails.length) return;


  function changeImage(button, index) {

    const image = button.dataset.image;

    if (!image) return;


    // Actualizar miniaturas activas

    thumbnails.forEach((thumb, i) => {

      const active = i === index;

      thumb.classList.toggle('is-active', active);

      thumb.setAttribute(
        'aria-pressed',
        String(active)
      );

    });


    // Transición de imagen

    mainImage.style.opacity = '0';


    const nextImage = new Image();

    nextImage.onload = () => {

      mainImage.src = image;

      mainImage.alt = button.dataset.alt || '';

      mainImage.style.opacity = '1';

    };


    nextImage.onerror = () => {

      mainImage.style.opacity = '1';

    };


    nextImage.src = image;


    // Actualizar descripción

    if (caption) {

      caption.textContent =
        button.dataset.caption || '';

    }


    // Actualizar contador

    if (counter) {

      const current = String(index + 1).padStart(2, '0');

      const total = String(thumbnails.length).padStart(2, '0');

      counter.textContent = `${current} / ${total}`;

    }

  }


  // Eventos de miniaturas

  thumbnails.forEach((button, index) => {

    button.addEventListener('click', () => {

      changeImage(button, index);

    });

  });


})();

/* =====================================================
   IST · SMART PROJECT RETURN
   Regreso inteligente al portafolio
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const backButton = document.querySelector(
    "[data-project-back]"
  );

  if (!backButton) return;

  backButton.addEventListener("click", (event) => {

    if (!document.referrer) return;

    try {

      const previousPage = new URL(document.referrer);

      const cameFromProjects =
        previousPage.origin === window.location.origin &&
        previousPage.pathname.endsWith("/proyectos.html");

      if (cameFromProjects && window.history.length > 1) {

        event.preventDefault();

        window.history.back();

      }

    } catch (error) {

      // Si no se puede verificar el origen,
      // funciona el enlace normal como alternativa.

    }

  });

});