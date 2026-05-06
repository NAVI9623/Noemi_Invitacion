// ===== REGISTRAR PLUGINS =====
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimations();
  initScrollAnimations();
  initEnvelopeAnimation();
  initParticles();
  initCountdown();
  initMusic();
  initForm();
  initGallery();
});

// ===== 1. ANIMACIONES DEL HERO (Entrada) =====
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".subtitle", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
  })
    .to(
      ".name",
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
      },
      "-=0.5",
    )
    .to(
      ".date-badge",
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )
    .to(
      ".verse",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.3",
    )
    .to(
      ".scroll-btn",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.3",
    )
    .to(
      ".hero-image",
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1",
    );

  // Animación continua del brillo de la imagen
  gsap.to(".image-glow", {
    opacity: 0.8,
    scale: 1.1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// ===== 2. ANIMACIONES CON SCROLL =====
function initScrollAnimations() {
  // Títulos de sección
  gsap.utils.toArray("[data-scroll]").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // Efecto parallax para el hero
  gsap.to(".hero-content", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Rotación sutil de la imagen de Noemí al hacer scroll
  gsap.to(".hero-image img", {
    borderRadius: "50%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

// ===== 3. ANIMACIÓN DEL SOBRE =====
function initEnvelopeAnimation() {
  const envelope = document.getElementById("envelope");

  ScrollTrigger.create({
    trigger: ".invitation-section",
    start: "center center",
    end: "center center",
    onEnter: () => envelope.classList.add("open"),
    onLeaveBack: () => envelope.classList.remove("open"),
  });

  // También abrir al click
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
}

// ===== 4. PARTÍCULAS DORADAS =====
function initParticles() {
  const container = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    container.appendChild(particle);

    // Posición inicial aleatoria
    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
    });

    // Animación flotante
    gsap.to(particle, {
      x: `+=${Math.random() * 200 - 100}`,
      y: `+=${Math.random() * 200 - 100}`,
      duration: Math.random() * 10 + 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Parpadeo
    gsap.to(particle, {
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

// ===== 5. CUENTA REGRESIVA =====
function initCountdown() {
  // Fecha del evento (ajustar según la fecha real)
  const eventDate = new Date("2026-06-19T17:30:00");

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById("countdown").textContent =
        "¡El gran día ha llegado!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").textContent =
      `${days} días, ${hours} horas, ${minutes} minutos`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000); // Actualizar cada minuto
}

// ===== 6. MÚSICA DE FONDO =====
function initMusic() {
  const music = document.getElementById("bgMusic");
  const toggle = document.getElementById("musicToggle");
  let isPlaying = false;

  toggle.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      toggle.classList.remove("playing");
      toggle.textContent = "🎵";
    } else {
      music.play().catch((e) => console.log("Autoplay prevented"));
      toggle.classList.add("playing");
      toggle.textContent = "🔊";
    }
    isPlaying = !isPlaying;
  });
}

// ===== 7. FORMULARIO RSVP =====
// ===== 8. FORMULARIO RSVP → WhatsApp =====
function initForm() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const asistentes = document.getElementById("asistentes").value;

    // Crear el mensaje para WhatsApp
    const mensaje = `Hola, soy *${nombre}* y confirmo mi asistencia a los XV años de Noemí. Somos *${asistentes}* persona(s). Mi teléfono es: ${telefono}. ¡Nos vemos el 19 de junio! 🎉`;

    // Tu número de WhatsApp (el que ya tienes)
    const numeroWhatsApp = "5215541009163";

    // Crear el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Animación del botón
    const btn = form.querySelector(".submit-btn");
    btn.querySelector("span").textContent = "¡Abriendo WhatsApp...";

    // Pequeña pausa para que se vea la animación, luego abrir WhatsApp
    setTimeout(() => {
      window.open(urlWhatsApp, "_blank");

      // Resetear el formulario después de un momento
      setTimeout(() => {
        btn.querySelector("span").textContent = "Confirmar Asistencia";
        form.reset();
      }, 2000);
    }, 800);
  });
}
// ===== 8. GALERÍA DINÁMICA =====
function initGallery() {
  const grid = document.getElementById("galleryGrid");
  // Aquí puedes agregar imágenes dinámicamente
  // Por ahora, creamos placeholders animados

  for (let i = 0; i < 6; i++) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
            <div style="width:100%;height:100%;background:linear-gradient(135deg, var(--rosa-palido), var(--champagne));display:flex;align-items:center;justify-content:center;color:var(--dorado);font-size:3rem;">
                ✦
            </div>
        `;
    grid.appendChild(item);
  }

  // Animación de entrada de la galería
  gsap.from(".gallery-item", {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".gallery-grid",
      start: "top 80%",
    },
  });
}

// ===== 9. FUNCIONES UTILITARIAS =====
function scrollToSection(sectionId) {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: `#${sectionId}`, offsetY: 50 },
    ease: "power3.inOut",
  });
}

function shareInvitation() {
  if (navigator.share) {
    navigator.share({
      title: "XV Años Noemí Carrillo Mendoza",
      text: "Te invito a celebrar mis XV años",
      url: window.location.href,
    });
  } else {
    // Copiar al portapapeles
    navigator.clipboard.writeText(window.location.href);
    alert("¡Link copiado al portapapeles!");
  }
}

// ===== 10. EFECTO DE CURSOR PERSONALIZADO (Opcional) =====
document.addEventListener("mousemove", (e) => {
  // Crear rastro dorado sutil
  if (Math.random() > 0.95) {
    const spark = document.createElement("div");
    spark.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: var(--dorado);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
    document.body.appendChild(spark);

    gsap.to(spark, {
      y: `+=${Math.random() * 50 + 20}`,
      opacity: 0,
      duration: 1,
      onComplete: () => spark.remove(),
    });
  }
});
