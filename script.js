// Efecto de escritura en el título
const words = ["Frontend ", "Backend ", "Full Stack "];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const typingSpan = document.querySelector(".typing");

function type() {
  currentWord = words[i];
  if (isDeleting) {
    typingSpan.textContent = currentWord.substring(0, j--);
  } else {
    typingSpan.textContent = currentWord.substring(0, j++);
  }

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }
  setTimeout(type, isDeleting ? 100 : 150);
}
type();


const rootStyles = getComputedStyle(document.documentElement);
const colorPrimary = rootStyles.getPropertyValue('--primary-color').trim();

const wordsLogo = ["FAZE", "SEBASTIAN"];
let iLogo = 0;
let jLogo = 0;
let isDeletingLogo = false;

const typingLogoSpan = document.querySelector(".typingLogo");

function typeLogo() {
  
  const rootStyles = getComputedStyle(document.documentElement);
  const colorPrimary = rootStyles.getPropertyValue('--primary-color').trim();

  const fullWord = wordsLogo[iLogo];
  let displayedText = "";

  if (isDeletingLogo) {
    jLogo--;
  } else {
    jLogo++;
  }

  if (jLogo > fullWord.length) jLogo = fullWord.length;
  if (jLogo < 0) jLogo = 0;

  if (jLogo === fullWord.length) {
  displayedText = fullWord + `<span class="dot">.</span>`;
} else if (jLogo > 0) {
  displayedText = fullWord.substring(0, jLogo);
} else {
  displayedText = "";
}
typingLogoSpan.innerHTML = displayedText;


  if (!isDeletingLogo && jLogo === fullWord.length) {
    isDeletingLogo = true;
    setTimeout(typeLogo, 1000);
    return;
  } else if (isDeletingLogo && jLogo === 0) {
    isDeletingLogo = false;
    iLogo = (iLogo + 1) % wordsLogo.length;
  }
  setTimeout(typeLogo, isDeletingLogo ? 100 : 150);
}

typeLogo();


// Referencias DOM
const proyectosGrid = document.getElementById("proyectos-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxLink = document.getElementById("lightbox-link");
const closeBtn = lightbox.querySelector(".close-btn");
const prevBtn = lightbox.querySelector(".prev-btn");
const nextBtn = lightbox.querySelector(".next-btn");

let currentIndex = 0;

// Renderizar proyectos
function renderProyectos() {
  proyectosGrid.innerHTML = "";
  proyectos.forEach((proyecto, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Abrir proyecto ${proyecto.titulo}`);

    card.innerHTML = `
      <img src="${proyecto.imagen}" alt="Imagen proyecto ${proyecto.titulo}" />
      <h3>${proyecto.titulo}</h3>
      <p>${proyecto.descripcion}</p>
    `;

    card.addEventListener("click", () => openLightbox(index));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openLightbox(index);
    });

    proyectosGrid.appendChild(card);
  });
}

// Abrir lightbox
function openLightbox(index) {
  currentIndex = index;
  const proyecto = proyectos[index];
  lightboxImg.src = proyecto.imagen;
  lightboxImg.alt = `Imagen proyecto ${proyecto.titulo}`;
  lightboxTitle.textContent = proyecto.titulo;
  lightboxDesc.textContent = proyecto.descripcion;
  lightboxLink.href = proyecto.link;
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Cerrar lightbox
function closeLightbox() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "";
}

// Navegar lightbox
function prevProyecto() {
  currentIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
  openLightbox(currentIndex);
}

function nextProyecto() {
  currentIndex = (currentIndex + 1) % proyectos.length;
  openLightbox(currentIndex);
}

// Eventos lightbox
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", prevProyecto);
nextBtn.addEventListener("click", nextProyecto);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Menú hamburguesa toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// Toggle tema claro/oscuro
const themeToggleCheckbox = document.getElementById("theme-toggle");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let currentTheme = localStorage.getItem("theme") || (prefersLight ? "light" : "dark");

applyTheme(currentTheme);

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
    themeToggleCheckbox.checked = true;
  } else {
    document.body.classList.remove("light-theme");
    themeToggleCheckbox.checked = false;
  }
}

themeToggleCheckbox.addEventListener("change", () => {
  currentTheme = themeToggleCheckbox.checked ? "light" : "dark";
  applyTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);
});

// Renderizar proyectos
renderProyectos();

// Contact form con Formspree
const form = document.getElementById("contact-form");
const statusDiv = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita recargar la página

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Mensaje de éxito
      statusDiv.textContent = "✅ Mensaje enviado correctamente";
      statusDiv.className = "success";
      statusDiv.style.display = "block";
      form.reset(); // Limpia el formulario

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 5000);

    } else {
      throw new Error("Error al enviar el formulario");
    }
  } catch (error) {
    // Mensaje de error
    statusDiv.textContent = "❌ Hubo un problema al enviar el mensaje";
    statusDiv.className = "error";
    statusDiv.style.display = "block";
  }
});
// Script para cambiar el activo al hacer click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");
  });
});
document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita recarga

  const form = document.getElementById("contact-form");
const statusDiv = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita recargar la página

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Mensaje de éxito
      statusDiv.textContent = "✅ Mensaje enviado correctamente";
      statusDiv.className = "success";
      statusDiv.style.display = "block";
      form.reset();

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 3000);

    } else {
      // Si Formspree responde con error real
      const data = await response.json();
      throw new Error(data.error || "Error al enviar el formulario");
    }

  } catch (error) {
    // Solo mostrar error si realmente falló el envío
    statusDiv.textContent = "❌ Hubo un problema al enviar el mensaje";
    statusDiv.className = "error";
    statusDiv.style.display = "block";

   
  }
});

});