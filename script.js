(() => {
  const header = document.querySelector('[data-header]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const navContent = document.querySelector('[data-nav-content]');
  const dropdowns = [...document.querySelectorAll('[data-dropdown]')];

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeDropdowns = (except = null) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      const trigger = dropdown.querySelector('[data-dropdown-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    if (!trigger) return;
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('is-open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  if (mobileToggle && navContent) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      navContent.classList.toggle('is-open', !isOpen);
      if (isOpen) closeDropdowns();
    });

    navContent.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navContent.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir menú');
        closeDropdowns();
      });
    });
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-dropdown]')) closeDropdowns();
    if (navContent && mobileToggle && !event.target.closest('.nav-shell')) {
      navContent.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', 'Abrir menú');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      if (navContent && mobileToggle) {
        navContent.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir menú');
      }
    }
  });
})();


/* ==========================================
   IST - DETECCIÓN Y DESCARGA DE RUSTDESK
========================================== */

document.addEventListener("DOMContentLoaded", initRustDeskButton);

async function initRustDeskButton() {

  const button = document.getElementById("descargar-soporte-remoto");

  if (!button) return;

  const icon = button.querySelector(".support-button__platform-icon");
  const label = button.querySelector(".support-button__label");
  const note = document.getElementById("support-note");

  // Versión estable que utilizaremos.
  const VERSION = "1.5.1";

  const BASE =
    `https://github.com/rustdesk/rustdesk/releases/download/${VERSION}/`;

  const RELEASES =
    "https://github.com/rustdesk/rustdesk/releases/latest";

  const APP_STORE =
    "https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015";

  // Evitar clics mientras se identifica el dispositivo.
  button.addEventListener("click", (event) => {
    if (button.dataset.state !== "ready") {
      event.preventDefault();
    }
  });

  // Obtener arquitectura cuando el navegador lo permita.
  async function getArchitecture() {

    try {

      if (navigator.userAgentData?.getHighEntropyValues) {

        return await navigator.userAgentData.getHighEntropyValues([
          "architecture",
          "bitness"
        ]);

      }

    } catch (error) {
      console.warn("No se pudo identificar la arquitectura:", error);
    }

    return {};
  }

  function getDownload(platform, architecture, bitness) {

    const arch = (architecture || "").toLowerCase();
    const bits = String(bitness || "");

    const arm = arch.includes("arm") ||
                arch.includes("aarch64");

    const x86 = arch.includes("x86") ||
                arch.includes("ia32");

    // WINDOWS
    if (platform === "windows") {

      if (arm) {
        return {
          platform: "windows",
          icon: "ant-design:windows-filled",
          theme: "windows",
          label: "Descargar soporte remoto",
          url: BASE + `rustdesk-${VERSION}-aarch64.exe`
        };
      }

      if (bits === "32") {
        return {
          platform: "windows",
          icon: "ant-design:windows-filled",
          theme: "windows",
          label: "Descargar soporte remoto",
          url: BASE + `rustdesk-${VERSION}-x86-sciter.exe`
        };
      }

      // Windows 64 bits: opción predeterminada.
      return {
        platform: "windows",
        icon: "ant-design:windows-filled",
        theme: "windows",
        label: "Descargar soporte remoto",
        url: BASE + `rustdesk-${VERSION}-x86_64.exe`
      };
    }

    // MACOS
    if (platform === "macos") {

      if (arm) {
        return {
          platform: "macos",
          icon: "ant-design:apple-filled",
          theme: "macos",
          label: "Descargar soporte remoto",
          url: BASE + `rustdesk-${VERSION}-aarch64.dmg`
        };
      }

      if (x86) {
        return {
          platform: "macos",
          icon: "ant-design:apple-filled",
          theme: "macos",
          label: "Descargar soporte remoto",
          url: BASE + `rustdesk-${VERSION}-x86_64.dmg`
        };
      }

      return {
        platform: "macos",
        icon: "ant-design:apple-filled",
        theme: "macos",
        label: "Elegir versión para Mac",
        url: RELEASES,
        external: true
      };
    }

    // ANDROID
    if (platform === "android") {

      let file = `rustdesk-${VERSION}-universal-signed.apk`;

      if (arm && bits === "64") {
        file = `rustdesk-${VERSION}-aarch64-signed.apk`;
      } else if (arm && bits === "32") {
        file = `rustdesk-${VERSION}-armv7-signed.apk`;
      } else if (x86 && bits === "64") {
        file = `rustdesk-${VERSION}-x86_64-signed.apk`;
      }

      return {
        platform: "android",
        icon: "basil:android-solid",
        theme: "android",
        label: "Descargar RustDesk",
        url: BASE + file
      };
    }

    // LINUX
    if (platform === "linux") {

      if (arm && bits === "64") {
        return {
          platform: "linux",
          icon: "codicon:terminal-linux",
          theme: "linux",
          label: "Descargar RustDesk",
          url: BASE + `rustdesk-${VERSION}-aarch64.AppImage`
        };
      }

      if (x86 && bits === "64") {
        return {
          platform: "linux",
          icon: "codicon:terminal-linux",
          theme: "linux",
          label: "Descargar RustDesk",
          url: BASE + `rustdesk-${VERSION}-x86_64.AppImage`
        };
      }

      return {
        platform: "linux",
        icon: "codicon:terminal-linux",
        theme: "linux",
        label: "Elegir versión para Linux",
        url: RELEASES,
        external: true
      };
    }

    // DISPOSITIVO NO IDENTIFICADO
    return {
      platform: "unknown",
      icon: "mdi:github",
      theme: "unknown",
      label: "Ver descargas oficiales",
      url: RELEASES,
      external: true
    };
  }

  async function detectDevice() {

    const ua = navigator.userAgent || "";

    const browserPlatform =
      navigator.userAgentData?.platform || "";

    const platform =
      browserPlatform || navigator.platform || "";

    const isIPad =
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1;

    // iPhone / iPad
    if (/iPhone|iPad|iPod/i.test(ua) || isIPad) {

      return {
        platform: "ios",
        icon: "simple-icons:apple",
        theme: "macos",
        label: "Ver RustDesk para iPhone",
        url: APP_STORE,
        external: true,
        note: "La versión de iOS permite controlar otros equipos, pero no recibir asistencia remota."
      };
    }

    // Android
    if (/Android/i.test(ua)) {
      return "android";
    }

    // Windows
    if (/Windows/i.test(ua) || /Windows/i.test(platform)) {
      return "windows";
    }

    // macOS
    if (
      /Macintosh|Mac OS X/i.test(ua) ||
      /macOS/i.test(platform) ||
      platform === "MacIntel"
    ) {
      return "macos";
    }

    // Linux
    if (/Linux|X11/i.test(ua) || /Linux/i.test(platform)) {
      return "linux";
    }

    return "unknown";
  }

  // Mantener visible la animación al menos un instante.
  const startTime = Date.now();

  try {

    const [device, architecture] = await Promise.all([
      detectDevice(),
      getArchitecture(),
      new Promise(resolve => setTimeout(resolve, 650))
    ]).then(results => [results[0], results[1]]);

    const config = typeof device === "string"
      ? getDownload(
          device,
          architecture.architecture,
          architecture.bitness
        )
      : device;

    // Aplicar identidad visual.
    button.classList.remove(
      "is-loading",
      "is-windows",
      "is-macos",
      "is-android",
      "is-linux",
      "is-unknown"
    );

    button.classList.add(`is-${config.theme}`);

    button.dataset.platform = config.platform;
    button.dataset.state = "ready";

    icon.setAttribute("icon", config.icon);
    label.textContent = config.label;

    button.href = config.url;

    button.target = config.external ? "_blank" : "_self";

    if (config.external) {
      button.rel = "noopener noreferrer";
    } else {
      button.removeAttribute("rel");
    }

    button.setAttribute("aria-label", config.label);
    button.setAttribute("aria-disabled", "false");

    // Mostrar advertencias cuando corresponda.
    if (note && config.note) {
      note.textContent = config.note;
      note.hidden = false;
    }

    console.log("IST - Dispositivo identificado:", config.platform);

  } catch (error) {

    console.error("Error identificando dispositivo:", error);

    button.classList.remove("is-loading");
    button.classList.add("is-unknown");

    button.dataset.platform = "unknown";
    button.dataset.state = "ready";

    icon.setAttribute("icon", "mdi:github");
    label.textContent = "Ver descargas oficiales";

    button.href = RELEASES;
    button.target = "_blank";
    button.rel = "noopener noreferrer";

  }
}


const servicesModal = document.getElementById('ist-services-modal');
const openServicesModal = document.getElementById('ist-open-services');

if (servicesModal && openServicesModal) {

  let previousBodyOverflow = '';

  openServicesModal.addEventListener('click', () => {
    previousBodyOverflow = document.body.style.overflow;

    servicesModal.showModal();

    document.body.style.overflow = 'hidden';
  });

  // Cerrar al pulsar fuera de la imagen
  servicesModal.addEventListener('click', (event) => {
    if (event.target === servicesModal) {
      servicesModal.close();
    }
  });

  // Escape también cierra el modal
  servicesModal.addEventListener('close', () => {
    document.body.style.overflow = previousBodyOverflow;
  });

}


/* ========================================
   IST · VISUALIZADOR DE TRABAJOS
========================================= */

(() => {

  const showcase = document.querySelector('[data-ist-work-showcase]');

  if (!showcase) return;


  // TRABAJOS REGISTRADOS EN HTML
  const projects = [
    ...showcase.querySelectorAll('.ist-work-project')
  ];

  if (!projects.length) return;


  // ELEMENTOS
  const thumbnails = showcase.querySelector('.ist-work-thumbnails');

  const stageImage = showcase.querySelector('#ist-work-image');

  const category = showcase.querySelector('#ist-work-category');

  const title = showcase.querySelector('#ist-work-title');

  const description = showcase.querySelector('#ist-work-description');

  const chips = showcase.querySelector('#ist-work-chips');

  const counter = showcase.querySelector('#ist-work-counter');

  const prevButton = showcase.querySelector('#ist-work-prev');

  const nextButton = showcase.querySelector('#ist-work-next');


  let activeIndex = 0;


  // ======================================
  // CREAR MINIATURAS AUTOMÁTICAMENTE
  // ======================================

  projects.forEach((project, index) => {

    const button = document.createElement('button');

    button.type = 'button';

    button.className = 'ist-work-thumb';

    button.setAttribute('role', 'tab');

    button.setAttribute('aria-selected', 'false');

    button.setAttribute(
      'aria-controls',
      'ist-work-stage'
    );

    button.id = `ist-work-tab-${index + 1}`;

    button.setAttribute(
      'aria-label',
      `Ver trabajo ${index + 1}: ${project.dataset.title}`
    );


    // IMAGEN DE MINIATURA
    const image = document.createElement('img');

    image.src = project.dataset.thumb || project.dataset.image;

    image.alt = '';

    image.loading = 'lazy';

    image.decoding = 'async';


    // NÚMERO
    const number = document.createElement('span');

    number.textContent = String(index + 1).padStart(2, '0');


    button.append(image, number);

    button.addEventListener('click', () => {

      showProject(index);

    });

    thumbnails.appendChild(button);

  });


  // ======================================
  // MOSTRAR TRABAJO SELECCIONADO
  // ======================================

  function showProject(index) {

    activeIndex = (index + projects.length) % projects.length;

    const project = projects[activeIndex];


    // IMAGEN
    stageImage.classList.add('is-changing');

    stageImage.onload = () => {

      stageImage.classList.remove('is-changing');

    };

    stageImage.onerror = () => {

      stageImage.classList.remove('is-changing');

      console.warn('No se pudo cargar la imagen:', project.dataset.image);

    };

    stageImage.src = project.dataset.image;

    stageImage.alt =
      project.dataset.alt || project.dataset.title || 'Trabajo de IST';

    stageImage.style.objectPosition =
      project.dataset.position || 'center';


    // INFORMACIÓN
    category.textContent = project.dataset.category || 'TRABAJO IST';

    title.textContent = project.dataset.title || '';

    description.textContent = project.dataset.description || '';


    // CHIPS
    chips.replaceChildren();

    project.querySelectorAll('[data-chip-icon]').forEach(item => {

      const chip = document.createElement('span');

      chip.className = 'ist-work-chip';


      const icon = document.createElement('iconify-icon');

      icon.setAttribute('icon', item.dataset.chipIcon);

      icon.setAttribute('aria-hidden', 'true');


      const label = document.createElement('span');

      label.textContent = item.textContent.trim();


      chip.append(icon, label);

      chips.appendChild(chip);

    });


    // MINIATURAS ACTIVAS
    const buttons = thumbnails.querySelectorAll('.ist-work-thumb');

    buttons.forEach((button, buttonIndex) => {

      const selected = buttonIndex === activeIndex;

      button.classList.toggle('is-active', selected);

      button.setAttribute('aria-selected', String(selected));

      button.tabIndex = selected ? 0 : -1;

    });


    // CONTADOR
    counter.textContent =
      `${String(activeIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

    const selectedButton = buttons[activeIndex];

    showcase.querySelector('.ist-work-stage').setAttribute(
      'aria-labelledby',
      selectedButton.id
    );

  }


  // ======================================
  // NAVEGACIÓN
  // ======================================

  prevButton.addEventListener('click', () => {

    showProject(activeIndex - 1);

  });


  nextButton.addEventListener('click', () => {

    showProject(activeIndex + 1);

  });


  // ======================================
  // INICIAR
  // ======================================

  showProject(0);

})();


/* ========================================
   IST · FILTROS DE SERVICIOS
========================================= */

(() => {

  const section = document.querySelector('.ist-services');

  if (!section) return;


  const filters = section.querySelectorAll('[data-service-filter]');

  const groups = section.querySelectorAll('[data-service-group]');


  filters.forEach(filter => {

    filter.addEventListener('click', () => {

      const selected = filter.dataset.serviceFilter;


      // ACTUALIZAR SELECTORES
      filters.forEach(button => {

        const active = button === filter;

        button.classList.toggle('is-active', active);

        button.setAttribute('aria-pressed', String(active));

      });


      // FILTRAR GRUPOS
      groups.forEach(group => {

        const visible =
          selected === 'all' ||
          group.dataset.serviceGroup === selected;

        group.classList.toggle('is-filtered-out', !visible);

        group.setAttribute('aria-hidden', String(!visible));

        group.inert = !visible;

      });

    });

  });

})();


/* ========================================
   IST · MODAL DE SERVICIOS
========================================= */

(() => {

  const section = document.querySelector('.ist-services');

  if (!section) return;


  const cards = section.querySelectorAll('[data-service-card]');

  const modal = section.querySelector('#ist-service-modal');

  const modalImage = section.querySelector('#ist-service-modal-image');

  const closeButton = section.querySelector('.ist-service-modal__close');


  if (!modal || !modalImage || !closeButton) return;


  // ABRIR MODAL
  cards.forEach(card => {

    card.addEventListener('click', () => {

      const flyer = card.dataset.flyer;

      if (!flyer) return;


      const serviceName =
        card.querySelector('h4')?.textContent.trim() || 'Servicio IST';


      modalImage.alt = `Flyer de ${serviceName}`;

      modalImage.src = flyer;


      if (!modal.open) {

        modal.showModal();

      }

    });

  });


  // CERRAR CON BOTÓN
  closeButton.addEventListener('click', () => {

    modal.close();

  });


  // CERRAR AL HACER CLIC FUERA DE LA IMAGEN
  modal.addEventListener('click', event => {

    if (event.target === modal) {

      modal.close();

    }

  });


  // LIMPIAR IMAGEN AL CERRAR
  modal.addEventListener('close', () => {

    modalImage.removeAttribute('src');

  });


})();


/* ========================================
   IST · DETECCIÓN IOS
   PARALLAX FALLBACK
========================================= */

(() => {

  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";

  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) {
    document.documentElement.classList.add("is-ios");
  }

})();



/* =========================================================
   IST · FACEBOOK LIKE BOX
   LEGACY PLUGIN · RESPONSIVE
   CABECERA FACEBOOK OCULTA
========================================================= */

(function () {

  function initIstFacebookPlugin() {

    const container = document.getElementById(
      "istFacebookContainer"
    );

    if (!container) return;


    // Página oficial de IST
    const FACEBOOK_PAGE =
      "https://www.facebook.com/profile.php?id=818280964690400";


    const PLUGIN_URL =
      "https://www.facebook.com/v2.7/plugins/like_box.php";


    const MIN_WIDTH = 292;
    const MAX_WIDTH = 500;
    const PLUGIN_HEIGHT = 825;


    let resizeTimer = null;
    let lastURL = "";


    function renderFacebookPlugin() {

      const availableWidth = Math.floor(
        container.getBoundingClientRect().width
      );

      if (!availableWidth) return;


      // El Like Box antiguo requiere un mínimo de 292 px.
      const iframeWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, availableWidth)
      );


      // Parámetros del plugin que ya comprobamos
      const params = new URLSearchParams({

        href: FACEBOOK_PAGE,

        width: String(iframeWidth),

        height: String(PLUGIN_HEIGHT),

        show_faces: "false",

        stream: "true",

        show_border: "true",

        header: "false"

      });


      const pluginURL =
        PLUGIN_URL + "?" + params.toString();


      // Evitar reconstrucciones innecesarias
      if (
        pluginURL === lastURL &&
        container.querySelector("iframe")
      ) {
        return;
      }


      lastURL = pluginURL;


      // Crear iframe
      const iframe = document.createElement("iframe");


      iframe.src = pluginURL;

      iframe.width = String(iframeWidth);

      iframe.height = String(PLUGIN_HEIGHT);

      iframe.scrolling = "no";

      iframe.frameBorder = "0";

      iframe.setAttribute(
        "allowTransparency",
        "true"
      );

      iframe.loading = "lazy";

      iframe.title =
        "Publicaciones oficiales de IST en Facebook";


      iframe.style.cssText = `
        display: block;
        width: ${iframeWidth}px;
        max-width: 100%;
        height: ${PLUGIN_HEIGHT}px;
        border: none;
        overflow: hidden;
        border-radius: 14px;
      `;


      container.replaceChildren(iframe);

    }


    // Control de redimensionamiento
    function scheduleRender() {

      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(
        renderFacebookPlugin,
        200
      );

    }


    // Primera carga
    requestAnimationFrame(
      renderFacebookPlugin
    );


    // Observar cambios del contenedor
    if ("ResizeObserver" in window) {

      const observer = new ResizeObserver(
        scheduleRender
      );

      observer.observe(container);

    }

    else {

      window.addEventListener(
        "resize",
        scheduleRender,
        { passive: true }
      );

    }

  }


  // Inicialización
  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initIstFacebookPlugin,
      { once: true }
    );

  }

  else {

    initIstFacebookPlugin();

  }

})();


/* =====================================================
   IST NAVIGATION · ACTIVE SUBLINK
   Detección automática de página actual
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const dropdown = document.querySelector(".nav-dropdown");

  if (!dropdown) return;

  const trigger = dropdown.querySelector(".dropdown-trigger");
  const links = dropdown.querySelectorAll("[data-nav-page]");

  const currentPath = window.location.pathname
    .replace(/\/+$/, "")
    .toLowerCase();

  const currentPage = currentPath
    .split("/")
    .pop()
    .replace(/\.html$/, "") || "index";

  const currentHash = window.location.hash.toLowerCase();

  let hasActiveChild = false;

  links.forEach(link => {

    const target = link.dataset.navPage;

    let isActive = false;

    if (target === "herramientas") {

      isActive =
        currentPage === "herramientas" ||
        (currentPage === "index" &&
         currentHash.includes("herramientas"));

    }

    if (target === "promociones") {

      isActive =
        currentPage === "promociones" ||
        (currentPage === "index" &&
         currentHash.includes("promociones"));

    }

    link.classList.toggle("is-active", isActive);

    if (isActive) {

      link.setAttribute("aria-current", "page");

      hasActiveChild = true;

    } else {

      link.removeAttribute("aria-current");

    }

  });

  // Activar Soluciones cuando alguno de sus subenlaces
  // corresponde a la página actual.

  if (trigger) {
    trigger.classList.toggle("is-active", hasActiveChild);
  }

});



/* =========================================================
   IST V2 · ESSENCE LOADING SYSTEM
   Controlador global de imágenes de los heroes
========================================================= */

(() => {

  const initEssenceLoaders = () => {

    const heroes = document.querySelectorAll(
      '.hero[data-essence-image]'
    );

    heroes.forEach(hero => {

      const imageURL = hero.dataset.essenceImage?.trim();

      if (!imageURL) return;

      const video = hero.querySelector('video');

      let revealed = false;


      /* ACTIVAR LOADER */

      hero.classList.add('is-image-loading');


      /* REVELAR HERO */

      const revealHero = () => {

        if (revealed) return;

        revealed = true;

        hero.classList.remove('is-image-loading');

        hero.classList.add('is-image-ready');

      };


      /* PREPARAR IMAGEN */

      const image = new Image();

      image.decoding = 'async';

      if ('fetchPriority' in image) {
        image.fetchPriority = 'high';
      }


      /* DECODIFICAR IMAGEN */

      const decodeImage = async () => {

        if (revealed) return;

        try {

          if (typeof image.decode === 'function') {
            await image.decode();
          }

        } catch (error) {

          // Continuar si la decodificación
          // no está disponible o falla.

        }

        revealHero();

      };


      /* CARGA COMPLETADA */

      image.addEventListener(
        'load',
        decodeImage,
        { once: true }
      );


      /* ERROR DE IMAGEN */

      image.addEventListener(
        'error',
        revealHero,
        { once: true }
      );


      /* VIDEO DISPONIBLE */

      if (video) {

        video.addEventListener(
          'playing',
          revealHero,
          { once: true }
        );

      }


      /* INICIAR DESCARGA */

      image.src = imageURL;


      /* COMPROBAR CACHÉ */

      if (image.complete) {

        if (image.naturalWidth > 0) {

          decodeImage();

        } else {

          revealHero();

        }

      }

    });

  };


  /* INICIALIZACIÓN */

  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initEssenceLoaders,
      { once: true }
    );

  } else {

    initEssenceLoaders();

  }

})();
