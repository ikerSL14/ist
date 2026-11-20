
/* =========================================================
   IST · REALIDADES
   INTERACTIVE CONTENT SWITCHER
========================================================= */

(() => {

  const section = document.querySelector(
    ".ist-about-realities"
  );

  if (!section) return;


  /* ================================================
     DATOS DE CADA REALIDAD
  ================================================= */

  const realities = {

    empresas: {
      index: "REALIDAD 01 / EMPRESAS",

      title: "Tecnología que acompaña el crecimiento.",

      description:
        "Integramos herramientas digitales, desarrollo y soporte para ayudar a las empresas a optimizar sus procesos, conectar sus operaciones y avanzar con mayor eficiencia.",

      focus:
        "Procesos · Sistemas · Soporte tecnológico",

      image:
        "nosotros/realidades/empresas.png",

      alt:
        "Soluciones tecnológicas para empresas",

      cta:
        "Hablemos de tu empresa",

      message:
        "Hola IST, quiero conocer sus soluciones tecnológicas para mi empresa."
    },


    instituciones: {
      index: "REALIDAD 02 / INSTITUCIONES",

      title: "Tecnología para una gestión más conectada.",

      description:
        "Desarrollamos recursos y soluciones digitales que ayudan a las instituciones a fortalecer su comunicación, organizar información y mejorar sus procesos de gestión.",

      focus:
        "Gestión · Comunicación · Plataformas digitales",

      image:
        "nosotros/realidades/instituciones.png",

      alt:
        "Soluciones digitales para instituciones",

      cta:
        "Conversemos sobre tu institución",

      message:
        "Hola IST, quiero consultar sobre soluciones tecnológicas para mi institución."
    },


    organizaciones: {
      index: "REALIDAD 03 / ORGANIZACIONES",

      title: "Tecnología que conecta personas e iniciativas.",

      description:
        "Acompañamos organizaciones y equipos mediante herramientas digitales, desarrollo y recursos tecnológicos adaptados a sus objetivos y necesidades.",

      focus:
        "Proyectos · Colaboración · Comunicación",

      image:
        "nosotros/realidades/organizaciones.png",

      alt:
        "Soluciones tecnológicas para organizaciones",

      cta:
        "Hablemos de tu organización",

      message:
        "Hola IST, quiero conocer soluciones para nuestra organización."
    },


    negocios: {
      index: "REALIDAD 04 / NEGOCIOS",

      title: "Soluciones que impulsan cada negocio.",

      description:
        "Ayudamos a negocios y emprendimientos a fortalecer su presencia digital, mejorar sus herramientas de trabajo y aprovechar nuevas oportunidades tecnológicas.",

      focus:
        "Presencia digital · Diseño · Herramientas",

      image:
        "nosotros/realidades/negocios.png",

      alt:
        "Herramientas digitales para negocios",

      cta:
        "Impulsemos tu negocio",

      message:
        "Hola IST, quiero conocer soluciones tecnológicas para mi negocio."
    },


    personas: {
      index: "REALIDAD 05 / PERSONAS",

      title: "Tecnología útil para resolver necesidades reales.",

      description:
        "Ofrecemos servicios y acompañamiento tecnológico para personas que necesitan resolver problemas, utilizar herramientas digitales o mejorar sus equipos.",

      focus:
        "Soporte técnico · Servicios digitales · Asistencia",

      image:
        "nosotros/realidades/personas.png",

      alt:
        "Servicios tecnológicos para personas",

      cta:
        "Cuéntanos qué necesitas",

      message:
        "Hola IST, necesito ayuda con una solución tecnológica."
    }

  };


  /* ================================================
     ELEMENTOS
  ================================================= */

  const buttons = section.querySelectorAll(
    ".ist-about-realities__chip"
  );

  const copy = section.querySelector(
    ".ist-about-realities__copy"
  );

  const index = section.querySelector("#istRealityIndex");
  const title = section.querySelector("#istRealityTitle");

  const description = section.querySelector(
    "#istRealityDescription"
  );

  const focus = section.querySelector("#istRealityFocus");

  const image = section.querySelector("#istRealityImage");

  const cta = section.querySelector("#istRealityCta");

  const ctaLabel = section.querySelector(
    "#istRealityCtaLabel"
  );


  /* ================================================
     ACTUALIZAR CONTENIDO
  ================================================= */

  function selectReality(key) {

    const data = realities[key];

    if (!data) return;


    /* ACTIVAR CHIP */

    buttons.forEach(button => {

      const active = button.dataset.reality === key;

      button.classList.toggle("is-active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    });


    /* CAMBIAR INFORMACIÓN */

    index.textContent = data.index;

    title.textContent = data.title;

    description.textContent = data.description;

    focus.textContent = data.focus;


    /* CAMBIAR IMAGEN */

    image.classList.remove("is-unavailable");

    image.alt = data.alt;

    image.src = data.image;


    /* CAMBIAR CTA */

    ctaLabel.textContent = data.cta;

    cta.href =
      "https://wa.me/529371416282?text=" +
      encodeURIComponent(data.message);


    /* ANIMACIONES */

    [copy, image].forEach(element => {

      element.classList.remove("is-entering");

      void element.offsetWidth;

      element.classList.add("is-entering");

    });

  }


  /* ================================================
     FALLBACK SI FALTA UN PNG
  ================================================= */

  image.addEventListener("error", () => {

    image.classList.add("is-unavailable");

  });


  image.addEventListener("load", () => {

    image.classList.remove("is-unavailable");

  });


  /* ================================================
     EVENTOS
  ================================================= */

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      selectReality(button.dataset.reality);

    });

  });


})();
