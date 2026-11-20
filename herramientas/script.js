/* =========================================================
   IST TOOLS CENTER · LÓGICA Y CATÁLOGO
   Archivo: herramientas/script.js

   ADMINISTRACIÓN:
   - Edita las herramientas dentro de TOOLS_DATA.
   - Cambia officialUrl para modificar el sitio de respaldo.
   - Para una descarga directa, configura mode: "direct" y
     coloca el enlace directo en url dentro de downloadOptions.
   - Para servicios web, usa mode: "online".
   - Los códigos son temporales y están preparados para Sheets.
========================================================= */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const grid = $("[data-tools-grid]");
  if (!grid) return;

  /* =======================================================
     01 · CATEGORÍAS Y SISTEMAS
  ======================================================= */

  const CATEGORY_LABELS = {
    remote: "Acceso remoto",
    diagnostics: "Diagnóstico",
    utilities: "Utilidades esenciales",
    browsers: "Navegadores",
    online: "Pruebas en línea",
    requirements: "Requisitos del sistema",
    guides: "Guías y procedimientos"
  };

  const SYSTEM_LABELS = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    android: "Android",
    ios: "iOS / iPadOS",
    unknown: "Sistema no identificado",
    all: "Todos los sistemas"
  };

  /* =======================================================
     02 · CATÁLOGO DE HERRAMIENTAS

     mode:
       official = abre la página oficial del fabricante.
       direct   = inicia una descarga desde el enlace configurado.
       online   = abre una herramienta que funciona en navegador.

     downloadOptions permite definir una URL distinta por sistema.
     Verifica los enlaces y las versiones antes de publicar.
  ======================================================= */

  const TOOLS_DATA = [
    // ACCESO REMOTO
    {
      id: "rustdesk", name: "RustDesk", category: "remote",
      icon: "selfhst:rustdesk",
      description: "Accede y controla equipos a distancia mediante una solución de escritorio remoto.",
      mode: "official", officialUrl: "https://rustdesk.com/download/",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Instaladores disponibles en el sitio oficial.", url: "https://github.com/rustdesk/rustdesk/releases/download/1.5.3/rustdesk-1.5.3-x86_64.exe", mode: "official" },
        { system: "macos", label: "macOS", detail: "Versión para equipos Mac.", url: "https://github.com/rustdesk/rustdesk/releases/download/1.5.3/rustdesk-1.5.3-x86_64.dmg", mode: "official" },
        { system: "linux", label: "Linux", detail: "Paquetes para distribuciones compatibles.", url: "https://github.com/rustdesk/rustdesk/releases/download/1.5.3/rustdesk-1.5.3-x86_64.deb", mode: "official" },
        { system: "android", label: "Android", detail: "Aplicación móvil.", url: "https://github.com/rustdesk/rustdesk/releases/download/1.5.3/rustdesk-1.5.3-universal-signed.apk", mode: "official" },
        { system: "ios", label: "iOS / iPadOS", detail: "Aplicación móvil.", url: "https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015", mode: "official" }
      ]
    },
    {
      id: "anydesk", name: "AnyDesk", category: "remote",
      icon: "thesvg-color:anydesk",
      description: "Conéctate a otros dispositivos y proporciona asistencia remota.",
      mode: "official", officialUrl: "https://anydesk.com/en/downloads",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Selecciona la versión correspondiente.", url: "https://anydesk.com/en/downloads/thank-you?dv=win_exe", mode: "official" },
        { system: "macos", label: "macOS", detail: "Descarga para Mac.", url: "https://anydesk.com/en/downloads/thank-you?dv=mac_dmg", mode: "official" },
        { system: "linux", label: "Linux", detail: "Paquetes para Linux.", url: "https://anydesk.com/en/downloads/linux", mode: "official" },
        { system: "android", label: "Android", detail: "Aplicación para Android.", url: "https://anydesk.com/en/downloads/android", mode: "official" },
        { system: "ios", label: "iOS / iPadOS", detail: "Aplicación para dispositivos Apple.", url: "https://anydesk.com/en/downloads/ios", mode: "official" }
      ]
    },

    // DIAGNÓSTICO
    {
      id: "crystaldiskinfo", name: "CrystalDiskInfo", category: "diagnostics",
      icon: "lucide:hard-drive",
      description: "Consulta el estado de salud de tus unidades de almacenamiento mediante datos S.M.A.R.T.",
      mode: "official", officialUrl: "https://crystalmark.info/en/software/crystaldiskinfo/",
      supportedSystems: ["windows"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Consulta las ediciones disponibles.", url: "https://crystalmark.info/en/software/crystaldiskinfo/", mode: "official" }
      ]
    },
    {
      id: "cpu-z", name: "CPU-Z", category: "diagnostics",
      icon: "lucide:cpu",
      description: "Identifica el procesador, la memoria, la placa base y otros componentes del equipo.",
      mode: "official", officialUrl: "https://www.cpuid.com/softwares/cpu-z.html",
      supportedSystems: ["windows", "android"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Versiones para equipos de escritorio y portátiles.", url: "https://www.cpuid.com/softwares/cpu-z.html", mode: "official" },
        { system: "android", label: "Android", detail: "Aplicación móvil CPU-Z.", url: "https://play.google.com/store/apps/details?id=com.cpuid.cpu_z", mode: "official" }
      ]
    },

    // UTILIDADES ESENCIALES
    {
      id: "winrar", name: "WinRAR", category: "utilities",
      icon: "openmoji:winrar",
      description: "Comprime, descomprime y administra archivos en distintos formatos.",
      mode: "official", officialUrl: "https://www.win-rar.com/download.html?&L=0",
      supportedSystems: ["windows", "android"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Selecciona la arquitectura correspondiente.", url: "https://www.win-rar.com/download.html?&L=0", mode: "official" },
        { system: "android", label: "Android", detail: "Aplicación RAR para Android.", url: "https://play.google.com/store/apps/details?id=com.rarlab.rar", mode: "official" }
      ]
    },
    {
      id: "rufus", name: "Rufus", category: "utilities",
      icon: "lucide:usb",
      description: "Crea unidades USB booteables para instalar o ejecutar sistemas operativos.",
      mode: "official", officialUrl: "https://rufus.ie/",
      supportedSystems: ["windows"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Consulta las versiones disponibles.", url: "https://rufus.ie/", mode: "official" }
      ]
    },
    {
      id: "ventoy", name: "Ventoy", category: "utilities",
      icon: "lucide:disc-3",
      description: "Prepara unidades USB multiboot para iniciar distintas imágenes ISO.",
      mode: "official", officialUrl: "https://www.ventoy.net/en/download.html",
      supportedSystems: ["windows", "linux"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Paquete para Windows.", url: "https://www.ventoy.net/en/download.html", mode: "official" },
        { system: "linux", label: "Linux", detail: "Paquete para Linux.", url: "https://www.ventoy.net/en/download.html", mode: "official" }
      ]
    },

    // NAVEGADORES
    {
      id: "chrome", name: "Google Chrome", category: "browsers",
      icon: "logos:chrome",
      description: "Navegador web de Google para acceder a sitios, aplicaciones y servicios en línea.",
      mode: "official", officialUrl: "https://www.google.com/chrome/",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Descarga oficial para Windows.", url: "https://www.google.com/chrome/", mode: "official" },
        { system: "macos", label: "macOS", detail: "Descarga oficial para Mac.", url: "https://www.google.com/chrome/", mode: "official" },
        { system: "linux", label: "Linux", detail: "Paquetes disponibles para Linux.", url: "https://www.google.com/chrome/", mode: "official" },
        { system: "android", label: "Android", detail: "Disponible en Google Play.", url: "https://play.google.com/store/apps/details?id=com.android.chrome", mode: "official" },
        { system: "ios", label: "iOS / iPadOS", detail: "Disponible en App Store.", url: "https://apps.apple.com/app/google-chrome/id535886823", mode: "official" }
      ]
    },
    {
      id: "brave", name: "Brave", category: "browsers",
      icon: "logos:brave",
      description: "Navegador enfocado en privacidad, protección frente a rastreadores y rendimiento.",
      mode: "official", officialUrl: "https://brave.com/download/",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"],
      downloadOptions: [
        { system: "windows", label: "Windows", detail: "Descarga oficial para Windows.", url: "https://brave.com/download/", mode: "official" },
        { system: "macos", label: "macOS", detail: "Descarga oficial para Mac.", url: "https://brave.com/download/", mode: "official" },
        { system: "linux", label: "Linux", detail: "Paquetes oficiales para Linux.", url: "https://brave.com/linux/", mode: "official" },
        { system: "android", label: "Android", detail: "Disponible en Google Play.", url: "https://play.google.com/store/apps/details?id=com.brave.browser", mode: "official" },
        { system: "ios", label: "iOS / iPadOS", detail: "Disponible en App Store.", url: "https://apps.apple.com/app/brave-private-web-browser-vpn/id1052879175", mode: "official" }
      ]
    },

    // PRUEBAS EN LÍNEA
    {
      id: "speedtest", name: "Speedtest", category: "online",
      icon: "simple-icons:speedtest",
      description: "Mide la velocidad de descarga, carga y latencia de tu conexión a internet.",
      mode: "online", officialUrl: "https://www.speedtest.net/",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"]
    },
    {
      id: "fast", name: "Fast.com", category: "online",
      icon: "lucide:gauge",
      description: "Comprueba rápidamente la velocidad de descarga de tu conexión.",
      mode: "online", officialUrl: "https://fast.com/",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"]
    },
    {
      id: "cloudflare-speed", name: "Cloudflare Speed Test", category: "online",
      icon: "devicon:cloudflare",
      description: "Analiza el rendimiento de tu conexión, incluyendo latencia, descarga y carga.",
      mode: "online", officialUrl: "https://speed.cloudflare.com/",
      supportedSystems: ["windows", "macos", "linux", "android", "ios"]
    },

    // REQUISITOS DEL SISTEMA
    {
      id: "visual-cpp", name: "Visual C++ Redistributable", category: "requirements",
      icon: "ant-design:windows-filled",
      description: "Bibliotecas de ejecución necesarias para numerosos programas desarrollados con Microsoft C++.",
      mode: "official", officialUrl: "https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist",
      supportedSystems: ["windows"],
      downloadOptions: [
        { system: "windows", label: "Windows · x64 / x86 / ARM64", detail: "Selecciona el paquete adecuado en Microsoft.", url: "https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist", mode: "official" }
      ]
    },
    {
      id: "dotnet-desktop", name: ".NET Desktop Runtime", category: "requirements",
      icon: "logos:dotnet",
      description: "Entorno de ejecución requerido por aplicaciones de escritorio desarrolladas con .NET.",
      mode: "official", officialUrl: "https://dotnet.microsoft.com/en-us/download/dotnet",
      supportedSystems: ["windows"],
      downloadOptions: [
        { system: "windows", label: "Windows · x64 / x86 / ARM64", detail: "Selecciona la versión requerida por la aplicación.", url: "https://dotnet.microsoft.com/en-us/download/dotnet", mode: "official" }
      ]
    },

    // GUÍAS Y PROCEDIMIENTOS
    {
      id: "guide-windows-media", name: "Crear medios de instalación", category: "guides",
      icon: "lucide:hard-drive-download",
      description: "Consulta la herramienta oficial de Microsoft para crear medios de instalación de Windows.",
      mode: "official", officialUrl: "https://www.microsoft.com/software-download/windows11",
      supportedSystems: ["windows"], noVersionModal: true
    },
    {
      id: "guide-windows-support", name: "Centro de ayuda de Windows", category: "guides",
      icon: "lucide:book-open-check",
      description: "Accede a documentación y recursos de soporte para resolver problemas de Windows.",
      mode: "official", officialUrl: "https://support.microsoft.com/windows",
      supportedSystems: ["windows"], noVersionModal: true
    },
    {
      id: "guide-dotnet", name: "Documentación de .NET", category: "guides",
      icon: "logos:dotnet",
      description: "Consulta documentación, requisitos y recursos oficiales del entorno .NET.",
      mode: "official", officialUrl: "https://dotnet.microsoft.com/en-us/learn",
      supportedSystems: ["windows", "macos", "linux"], noVersionModal: true
    }
  ];

  /* =======================================================
     03 · CÓDIGOS IST (TEMPORAL)
     visible=true muestra el código.
     visible=false lo oculta visualmente, pero permite copiarlo.
     active=false excluye el registro del módulo.
  ======================================================= */

  const CODE_ENTRIES = [
    {
      id: "systeminfo",
      title: "Información del sistema",
      description: "Consulta información general del equipo desde la terminal de Windows.",
      code: "systeminfo",
      visible: true,
      active: true,
      order: 1,
      language: "CMD · WINDOWS",
      systems: ["windows"]
    },
    {
      id: "office",
      title: "Instalación IST",
      description: "Código necesario para instalaciones a distancia IST.",
      code: "systeminfo",
      visible: true,
      active: true,
      order: 2,
      language: "CMD · WINDOWS",
      systems: ["windows", "macos", "linux", "android", "ios"]
    },
    {
      id: "ipconfig",
      title: "Configuración de red",
      description: "Muestra los parámetros de red del equipo. Este ejemplo queda oculto visualmente.",
      code: "ipconfig /all",
      visible: false,
      active: true,
      order: 3,
      language: "CMD · WINDOWS",
      systems: ["windows"]
    }
  ];

  /* =======================================================
     04 · REFERENCIAS DOM
  ======================================================= */

  const osSelect = $("[data-os-select]");
  const osLabel = $("[data-os-label]");
  const osDescription = $("[data-os-description]");
  const osIcon = $("[data-os-icon]");
  const osTag = $("[data-os-tag]");
  const smartToggle = $("[data-smart-toggle]");
  const smartLabel = $("[data-smart-label]");
  const smartDescription = $("[data-smart-description]");
  const smartStatus = $("[data-smart-status]");
  const searchInput = $("[data-tools-search]");
  const filterButtons = $$("[data-category-filter]");
  const resultsCount = $("[data-results-count]");
  const resultsLabel = $("[data-results-label]");
  const emptyState = $("[data-tools-empty]");
  const clearFiltersButton = $("[data-clear-filters]");
  const modal = $("[data-download-modal]");
  const modalTitle = $("[data-modal-title]");
  const modalDescription = $("[data-modal-description]");
  const modalOptions = $("[data-modal-options]");
  const modalClose = $("[data-modal-close]");

  let activeCategory = "all";

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  /* =======================================================
     05 · DETECCIÓN DEL SISTEMA OPERATIVO
  ======================================================= */

  function detectSystem() {
    const ua = navigator.userAgent || "";
    const platform = navigator.userAgentData?.platform || navigator.platform || "";

    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
    if (/Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) return "macos";
    if (/Linux/i.test(platform) || /Linux/i.test(ua)) return "linux";
    return "unknown";
  }

  function getSelectedSystem() {
    return osSelect?.value || "unknown";
  }

  function updateSystemDisplay() {
    const system = getSelectedSystem();
    const label = SYSTEM_LABELS[system] || SYSTEM_LABELS.unknown;
    const iconMap = {
      windows: "ant-design:windows-filled",
      macos: "basil:apple-solid",
      linux: "codicon:terminal-linux",
      android: "ant-design:android-filled",
      ios: "basil:apple-solid",
      unknown: "lucide:monitor"
    };

    if (osLabel) osLabel.textContent = label;
    if (osDescription) {
      osDescription.textContent = system === "unknown"
        ? "No pudimos identificar el sistema. Selecciónalo manualmente."
        : "Sistema seleccionado para orientar las opciones disponibles.";
    }
    if (osIcon) osIcon.innerHTML = `<iconify-icon icon="${iconMap[system] || iconMap.unknown}"></iconify-icon>`;
    if (osTag) osTag.textContent = system === "unknown" ? "MANUAL" : "SELECCIONADO";

    renderTools();
    updateCodeSystem();
  }

  /* =======================================================
     06 · DESCARGA INTELIGENTE
  ======================================================= */

  function updateSmartCopy() {
    const enabled = Boolean(smartToggle?.checked);

    if (smartLabel) smartLabel.textContent = enabled
      ? "Selección automática activada"
      : "Selección manual activada";

    if (smartDescription) smartDescription.textContent = enabled
      ? "Utilizamos el sistema seleccionado para orientar la descarga."
      : "Podrás elegir manualmente entre las versiones disponibles.";

    if (smartStatus) smartStatus.textContent = enabled
      ? "Si existe una descarga directa verificada, se utilizará. En caso contrario, te dirigiremos al sitio oficial."
      : "Al pulsar Descargar podrás seleccionar el sistema o la versión que necesitas.";

    renderTools();
  }

  function getModeLabel(mode) {
    if (mode === "direct") return "Descarga directa";
    if (mode === "online") return "Herramienta en línea";
    return "Sitio oficial";
  }

  function getModeIcon(mode) {
    if (mode === "direct") return "lucide:download";
    if (mode === "online") return "lucide:external-link";
    return "lucide:shield-check";
  }

  function getEffectiveMode(tool) {
    if (tool.mode === "online") return "online";
    const option = (tool.downloadOptions || []).find(item => item.system === getSelectedSystem());
    return option?.mode || tool.mode || "official";
  }

  function getToolActionLabel(tool) {
    if (tool.mode === "online") return "Abrir herramienta";
    if (tool.category === "guides") return "Consultar guía";
    if (smartToggle?.checked && getEffectiveMode(tool) === "direct") return "Descarga directa";
    return smartToggle?.checked ? "Descargar" : "Elegir versión";
  }

  function getCompatibilityText(tool) {
    if (tool.mode === "online") return "Disponible desde el navegador";
    if (tool.category === "guides") return "Documentación de referencia";
    const system = getSelectedSystem();
    if (tool.supportedSystems?.includes(system)) return `Compatible con ${SYSTEM_LABELS[system]}`;
    if (system === "unknown") return "Consulta las versiones disponibles";
    return "Consulta otras versiones disponibles";
  }

  /* =======================================================
     07 · RENDERIZADO DE TARJETAS
  ======================================================= */

  function renderToolCard(tool) {
    const category = CATEGORY_LABELS[tool.category] || "Herramienta";
    const actionLabel = getToolActionLabel(tool);
    const effectiveMode = getEffectiveMode(tool);
    const actionClass = tool.mode === "online"
      ? "tools-card__action tools-card__action--online"
      : "tools-card__action";

    return `
      <article class="tools-card" data-tool-card="${escapeHTML(tool.id)}">
        <div class="tools-card__top">
          <div class="tools-card__icon" aria-hidden="true"><iconify-icon icon="${escapeHTML(tool.icon)}"></iconify-icon></div>
          <div class="tools-card__identity">
            <h4>${escapeHTML(tool.name)}</h4>
            <span class="tools-card__category">${escapeHTML(category)}</span>
          </div>
        </div>
        <div class="tools-card__mode"><iconify-icon icon="${getModeIcon(effectiveMode)}" aria-hidden="true"></iconify-icon>${escapeHTML(getModeLabel(effectiveMode))}</div>
        <p class="tools-card__description">${escapeHTML(tool.description)}</p>
        <div class="tools-card__compat"><iconify-icon icon="lucide:monitor-check" aria-hidden="true"></iconify-icon><span>${escapeHTML(getCompatibilityText(tool))}</span></div>
        <div class="tools-card__footer">
          <span class="tools-card__source">Fuente del desarrollador</span>
          <button type="button" class="${actionClass}" data-tool-action="${escapeHTML(tool.id)}"><span>${escapeHTML(actionLabel)}</span><iconify-icon icon="lucide:arrow-up-right" aria-hidden="true"></iconify-icon></button>
        </div>
      </article>`;
  }

  function renderTools() {
    const query = (searchInput?.value || "").trim().toLocaleLowerCase("es");
    const filtered = TOOLS_DATA.filter(tool => {
      const categoryMatch = activeCategory === "all" || tool.category === activeCategory;
      const searchable = [tool.name, tool.description, CATEGORY_LABELS[tool.category]].join(" ").toLocaleLowerCase("es");
      return categoryMatch && (!query || searchable.includes(query));
    });

    grid.innerHTML = filtered.map(renderToolCard).join("");
    if (resultsCount) resultsCount.textContent = String(filtered.length).padStart(2, "0");

    if (resultsLabel) {
      if (activeCategory === "all" && !query) resultsLabel.textContent = "Mostrando todas las herramientas";
      else if (activeCategory !== "all" && !query) resultsLabel.textContent = `Categoría: ${CATEGORY_LABELS[activeCategory]}`;
      else resultsLabel.textContent = `Resultados para: “${searchInput.value.trim()}”`;
    }

    if (emptyState) emptyState.hidden = filtered.length !== 0;
  }

  /* =======================================================
     08 · FILTROS Y BÚSQUEDA
  ======================================================= */

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.categoryFilter || "all";
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderTools();
    });
  });

  searchInput?.addEventListener("input", renderTools);

  // Los tres pilares del hero también pueden activar su filtro correspondiente.
  const HERO_HASH_CATEGORIES = {
    "#distance": "remote",
    "#digital": "diagnostics",
    "#presencial": "utilities"
  };

  function applyHeroHashFilter() {
    const category = HERO_HASH_CATEGORIES[window.location.hash];
    if (!category) return;
    const targetButton = filterButtons.find(button => button.dataset.categoryFilter === category);
    if (targetButton && activeCategory !== category) targetButton.click();
  }

  window.addEventListener("hashchange", applyHeroHashFilter);
  if (HERO_HASH_CATEGORIES[window.location.hash]) {
    requestAnimationFrame(applyHeroHashFilter);
  }

  clearFiltersButton?.addEventListener("click", () => {
    activeCategory = "all";
    if (searchInput) searchInput.value = "";
    filterButtons.forEach(button => {
      const active = button.dataset.categoryFilter === "all";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderTools();
  });

  /* =======================================================
     09 · ENLACES Y MODAL DE VERSIONES
  ======================================================= */

  function safeOpen(url) {
    if (!url) return;
    try {
      const parsed = new URL(url, window.location.href);
      if (!["http:", "https:"].includes(parsed.protocol)) return;
      window.open(parsed.href, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("IST Tools: URL no válida.", error);
    }
  }

  function getOptionsForTool(tool) {
    if (Array.isArray(tool.downloadOptions) && tool.downloadOptions.length) return tool.downloadOptions;
    return [{ system: "all", label: "Sitio oficial", detail: "Consulta las versiones disponibles en el sitio del desarrollador.", url: tool.officialUrl, mode: tool.mode || "official" }];
  }

  function openVersionModal(tool) {
    if (!modal || !modalOptions) {
      safeOpen(tool.officialUrl);
      return;
    }

    modalTitle.textContent = tool.name;
    modalDescription.textContent = "Selecciona una versión o sistema operativo para continuar al recurso correspondiente.";

    const options = getOptionsForTool(tool);
    modalOptions.innerHTML = options.map(option => `
      <a class="tools-modal__option" href="${escapeHTML(option.url || "#")}" target="_blank" rel="noopener noreferrer">
        <span><strong>${escapeHTML(option.label || SYSTEM_LABELS[option.system] || "Versión disponible")}</strong><small>${escapeHTML(option.detail || getModeLabel(option.mode || "official"))}</small></span>
        <iconify-icon icon="lucide:arrow-up-right" aria-hidden="true"></iconify-icon>
      </a>`).join("");

    if (typeof modal.showModal === "function") modal.showModal();
    else safeOpen(tool.officialUrl);
  }

  function handleToolAction(tool) {
    if (!tool) return;

    // Las pruebas en línea y las guías abren directamente su recurso.
    if (tool.mode === "online" || tool.category === "guides" || tool.noVersionModal) {
      safeOpen(tool.officialUrl);
      return;
    }

    if (smartToggle?.checked) {
      const system = getSelectedSystem();
      const matchingOption = (tool.downloadOptions || []).find(option => option.system === system);
      // Si no hay una opción específica para el sistema, se utiliza la página oficial de respaldo.
      safeOpen(matchingOption?.url || tool.officialUrl);
      return;
    }

    openVersionModal(tool);
  }

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-tool-action]");
    if (!button) return;
    const tool = TOOLS_DATA.find(item => item.id === button.dataset.toolAction);
    handleToolAction(tool);
  });

  modalClose?.addEventListener("click", () => modal.close());
  modal?.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });

  
  
  /* =======================================================
     10 · CÓDIGO RÁPIDO IST · GOOGLE SHEETS
     
     GOOGLE SHEETS CONTROLA:
       id      → identifica el recurso
       code    → contenido que se copia
       visible → muestra u oculta el contenido en pantalla

     Los metadatos permanecen en CODE_ENTRIES:
       title, description, systems, language, active, order.
  ======================================================= */

  const GOOGLE_SHEETS_CODE_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTV08zaBQamhewJsGp1EmsAJPmHnEwYKyQXdxOx5n0CYm9U-pkhIsyP-D2M41xDqyB4QYwNAeezqzpX/pub?gid=0&single=true&output=csv";

  const codeSelect = $("[data-code-select]");
  const codeTitle = $("[data-code-title]");
  const codeDescription = $("[data-code-description]");
  const codeSystem = $("[data-code-system]");
  const codeContent = $("[data-code-content]");
  const codeLanguage = $("[data-code-language]");
  const codeVisibility = $("[data-code-visibility]");
  const copyButton = $("[data-copy-code]");
  const copyFeedback = $("[data-copy-feedback]");

let activeCodes = CODE_ENTRIES
  .filter(entry => entry.active)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

  /* =======================================================
     SELECCIÓN DEL RECURSO
  ======================================================= */

  function getSelectedCode() {
    return activeCodes.find(
      entry => entry.id === codeSelect?.value
    ) || activeCodes[0];
  }


  /* =======================================================
     COMPATIBILIDAD DEL CÓDIGO CON EL SISTEMA
  ======================================================= */

  function updateCodeSystem() {

    const entry = getSelectedCode();
    if (!entry) return;

    const available =
      entry.systems?.includes(getSelectedSystem()) ||
      entry.systems?.includes("all");

    if (codeSystem) {

      const labels = (entry.systems || [])
        .map(system => SYSTEM_LABELS[system] || system)
        .join(", ");

      codeSystem.innerHTML =
        `<iconify-icon icon="${available ? "lucide:monitor-check" : "lucide:monitor-x"}" aria-hidden="true"></iconify-icon>${escapeHTML(labels)}`;
    }

    if (copyButton) {

      copyButton.disabled =
        !available || !String(entry.code || "").trim();

      copyButton.style.opacity =
        copyButton.disabled ? ".45" : "1";

      copyButton.style.cursor =
        copyButton.disabled ? "not-allowed" : "pointer";
    }

    if (copyFeedback && !available) {

      copyFeedback.textContent =
        "Este recurso no está configurado para el sistema seleccionado.";

    } else if (copyFeedback && !String(entry.code || "").trim()) {

      copyFeedback.textContent =
        "Este recurso todavía no tiene un código disponible.";

    } else if (copyFeedback) {

      copyFeedback.textContent = "";
    }
  }


  /* =======================================================
     ACTUALIZAR INTERFAZ
  ======================================================= */

  function renderSelectedCode() {

    if (!activeCodes.length) {

      const panel = $("[data-code-panel]");

      if (panel) panel.hidden = true;

      return;
    }

    const entry = getSelectedCode();
    if (!entry) return;

    if (codeTitle)
      codeTitle.textContent = entry.title;

    if (codeDescription)
      codeDescription.textContent = entry.description;

    if (codeLanguage)
      codeLanguage.textContent = entry.language || "IST · CÓDIGO";

    if (codeContent) {

      codeContent.textContent = entry.visible
        ? (entry.code || "Código pendiente de configurar.")
        : "Contenido disponible mediante el botón de copia.";
    }

    if (codeVisibility) {

      codeVisibility.innerHTML = entry.visible
        ? '<iconify-icon icon="lucide:eye" aria-hidden="true"></iconify-icon> Código visible'
        : '<iconify-icon icon="lucide:eye-off" aria-hidden="true"></iconify-icon> Código oculto · Copia disponible';
    }

    updateCodeSystem();
  }


 function refreshCodeSelect() {

  if (!codeSelect) return;

  const previousSelection = codeSelect.value;

  codeSelect.innerHTML = activeCodes
    .map(entry =>
      `<option value="${escapeHTML(entry.id)}">${escapeHTML(entry.title)}</option>`
    )
    .join("");

  codeSelect.value = activeCodes.some(
    entry => entry.id === previousSelection
  )
    ? previousSelection
    : (activeCodes[0]?.id || "");
}


function initializeCodeModule() {

  if (!codeSelect) return;

  refreshCodeSelect();

  codeSelect.addEventListener(
    "change",
    renderSelectedCode
  );

  renderSelectedCode();
}


  /* =======================================================
     CSV PARSER
     Admite comas, comillas dobles y saltos de línea.
  ======================================================= */

  function parseCSV(text) {

    const rows = [];

    let row = [];
    let field = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {

      const char = text[i];
      const next = text[i + 1];

      if (char === '"' && insideQuotes && next === '"') {

        field += '"';
        i++;

      } else if (char === '"') {

        insideQuotes = !insideQuotes;

      } else if (char === "," && !insideQuotes) {

        row.push(field);
        field = "";

      } else if (
        (char === "\n" || char === "\r") &&
        !insideQuotes
      ) {

        if (char === "\r" && next === "\n") i++;

        row.push(field);

        if (row.some(value => String(value).trim() !== "")) {
          rows.push(row);
        }

        row = [];
        field = "";

      } else {

        field += char;
      }
    }

    row.push(field);

    if (row.some(value => String(value).trim() !== "")) {
      rows.push(row);
    }

    return rows;
  }


  /* =======================================================
     INTERPRETAR COLUMNA VISIBLE
  ======================================================= */

  function parseSheetBoolean(value) {

    const normalized = String(value ?? "")
      .trim()
      .toLowerCase();

    return [
      "true",
      "1",
      "si",
      "sí",
      "yes",
      "visible",
      "mostrar"
    ].includes(normalized);
  }


  /* =======================================================
     CONEXIÓN CON GOOGLE SHEETS
  ======================================================= */

  async function loadCodesFromGoogleSheets() {

    try {

      const response = await fetch(
        GOOGLE_SHEETS_CODE_URL,
        {
          method: "GET",
          mode: "cors",
          cache: "no-store"
        }
      );

      if (!response.ok) {

        throw new Error(
          `Google Sheets respondió con estado ${response.status}.`
        );
      }

      const csvText = await response.text();

      if (
        !csvText.trim() ||
        /<html[\s>]/i.test(csvText.slice(0, 300))
      ) {

        throw new Error(
          "La respuesta no parece ser un CSV publicado. Revisa que la pestaña esté publicada en formato CSV."
        );
      }

      const rows = parseCSV(csvText);

      if (rows.length < 2) {

        throw new Error(
          "La hoja no contiene registros para cargar."
        );
      }


      // Leer encabezados.

      const headers = rows[0].map(header =>
        String(header)
          .replace(/^\uFEFF/, "")
          .trim()
          .toLowerCase()
      );

      const idIndex = headers.indexOf("id");

      const codeIndex = headers.findIndex(header =>
        ["code", "codigo", "código"].includes(header)
      );

      const visibleIndex = headers.findIndex(header =>
        ["visible", "mostrar"].includes(header)
      );


      // Comprobar estructura.

      if (
        idIndex === -1 ||
        codeIndex === -1 ||
        visibleIndex === -1
      ) {

        throw new Error(
          "Faltan encabezados. La hoja debe incluir: id, code, visible."
        );
      }


      // Organizar registros por identificador.

      // Organizar registros de Google Sheets.

const sheetEntries = new Map();

rows.slice(1).forEach(row => {

  const id = String(row[idIndex] || "")
    .trim()
    .toLowerCase();

  if (!id) return;

  sheetEntries.set(id, {

    code: String(row[codeIndex] ?? ""),

    visible: parseSheetBoolean(row[visibleIndex])

  });

});


// Google Sheets determina qué comandos están disponibles.

activeCodes = CODE_ENTRIES
  .filter(entry =>
    entry.active &&
    sheetEntries.has(String(entry.id).toLowerCase())
  )
  .sort((a, b) => (a.order || 0) - (b.order || 0));


// Actualizar los datos de cada comando.

activeCodes.forEach(entry => {

  const sheetEntry = sheetEntries.get(
    String(entry.id).toLowerCase()
  );

  entry.code = sheetEntry.code;

  entry.visible = sheetEntry.visible;

});


// Reconstruir el selector con los recursos autorizados
// por la hoja publicada.

refreshCodeSelect();

renderSelectedCode();

console.info(
  `IST Quick Code: ${activeCodes.length} recurso(s) sincronizado(s) desde Google Sheets.`
);


    } catch (error) {

      // Si Sheets falla, se conservan los datos locales.

      console.warn(
        "IST Quick Code: no se pudo sincronizar Google Sheets. Se mantienen los datos locales.",
        error
      );
    }
  }


  /* =======================================================
     COPIAR CÓDIGO
  ======================================================= */

  async function copySelectedCode() {

    const entry = getSelectedCode();

    if (!entry?.code) return;

    const available =
      entry.systems?.includes(getSelectedSystem()) ||
      entry.systems?.includes("all");

    if (!available) return;

    try {

      await navigator.clipboard.writeText(entry.code);

      if (copyFeedback) {

        copyFeedback.textContent =
          "Código copiado al portapapeles.";
      }

    } catch (error) {

      // Método alternativo para navegadores sin Clipboard API.

      const textarea = document.createElement("textarea");

      textarea.value = entry.code;

      textarea.setAttribute("readonly", "");

      textarea.style.position = "fixed";

      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      let copied = false;

      try {

        copied = document.execCommand("copy");

      } catch (_) {

        copied = false;
      }

      textarea.remove();

      if (copyFeedback) {

        copyFeedback.textContent = copied
          ? "Código copiado al portapapeles."
          : "No fue posible copiar automáticamente. Selecciona el texto manualmente.";
      }
    }
  }

  copyButton?.addEventListener(
    "click",
    copySelectedCode
  );


  /* =======================================================
     11 · EVENTOS E INICIALIZACIÓN
  ======================================================= */

  osSelect?.addEventListener(
    "change",
    updateSystemDisplay
  );

  smartToggle?.addEventListener(
    "change",
    updateSmartCopy
  );

  if (osSelect) {
    osSelect.value = detectSystem();
  }

  // Primero muestra el respaldo local.
  initializeCodeModule();

  updateSystemDisplay();

  updateSmartCopy();

  // Después sincroniza los datos publicados.
  loadCodesFromGoogleSheets();

})();
