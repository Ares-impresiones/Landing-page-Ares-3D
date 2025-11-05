// Datos de las galerías - AQUÍ AGREGAS TUS IMÁGENES
const galleries = {
    // Perros - Realista (archivos en "realista perro")
    'perros-realista': [
        { src: 'realista perro/1.1.jpeg', title: 'Realista 1', desc: 'Referencia realista 1' },
        { src: 'realista perro/1.jpeg', title: 'Realista 2', desc: 'Referencia realista 2' },
        { src: 'realista perro/6.1.jpeg', title: 'Realista 3', desc: 'Referencia realista 3' },
        { src: 'realista perro/6.jpg', title: 'Realista 4', desc: 'Referencia realista 4' }
    ],

    // Perros - Semi-realista (archivos en "semi-realista perro")
    'perros-semi-realista': [
        { src: 'semi-realista perro/4.1.jpeg', title: 'Semi 1', desc: 'Referencia semi-realista 1' },
        { src: 'semi-realista perro/4.jpg', title: 'Semi 2', desc: 'Referencia semi-realista 2' },
        { src: 'semi-realista perro/5..jpeg', title: 'Semi 3', desc: 'Referencia semi-realista 3' },
        { src: 'semi-realista perro/5.1.jpeg', title: 'Semi 4', desc: 'Referencia semi-realista 4' }
    ],

    // Perros - Cartoon (archivos en "cartoon perro")
    'perros-cartoon': [
        { src: 'cartoon perro/2.1 refefrencia.png', title: 'Cartoon 1', desc: 'Referencia cartoon 1' },
        { src: 'cartoon perro/2.jpeg', title: 'Cartoon 2', desc: 'Referencia cartoon 2' },
        { src: 'cartoon perro/3.1.png', title: 'Cartoon 3', desc: 'Referencia cartoon 3' },
        { src: 'cartoon perro/3.jpg', title: 'Cartoon 4', desc: 'Referencia cartoon 4' }
    ],

    // Gatos - Semi-realista (carpeta vacía actualmente)
    'gatos-semi-realista': [],

    // Gatos - Cartoon (archivos en "cartoon gato")
    'gatos-cartoon': [
        { src: 'cartoon gato/a.1.jpeg', title: 'Gato Cartoon 1', desc: 'Referencia cartoon felina 1' },
        { src: 'cartoon gato/a.jpeg', title: 'Gato Cartoon 2', desc: 'Referencia cartoon felina 2' },
        { src: 'cartoon gato/b.1 referencia.png', title: 'Gato Cartoon 3', desc: 'Referencia cartoon felina 3' },
        { src: 'cartoon gato/b.jpeg', title: 'Gato Cartoon 4', desc: 'Referencia cartoon felina 4' }
    ]
};

// Crear estrellas
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Menu toggle
function setupMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Cerrar menú al hacer click en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

// Intersection Observer para animaciones
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.style-card, .step, .testimonial-card, .emotional-quote').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Sistema de Modal y Galerías
function setupGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const galleryGrid = document.getElementById('galleryGrid');

    // Abrir galería cuando se hace click en una tarjeta de estilo
    document.querySelectorAll('.style-card').forEach(card => {
        card.addEventListener('click', function() {
            const galleryType = this.getAttribute('data-gallery');
            openGallery(galleryType);
        });
    });

    // Función para abrir la galería
    function openGallery(type) {
        const galleryData = galleries[type];
        // Mapear claves que pueden venir con prefijos de especie
        function prettyTitle(key) {
            // key examples: 'perros-realista', 'gatos-semi-realista', 'perros-cartoon'
            const parts = key.split('-');
            if (parts.length === 2) {
                const [specie, style] = parts;
                const specieTitle = specie === 'perros' ? 'Perros' : (specie === 'gatos' ? 'Gatos' : '');
                const styleTitle = style.replace(/\b\w/g, c => c.toUpperCase()).replace('-', ' ');
                return `${specieTitle} — ${styleTitle}`;
            }
            // fallback
            return key.charAt(0).toUpperCase() + key.slice(1);
        }

    modalTitle.textContent = prettyTitle(type) || 'Galería';
        galleryGrid.innerHTML = '';

        if (galleryData && galleryData.length > 0) {
            galleryData.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" onerror="this.src='placeholder.jpg'">
                    <div class="gallery-item-info">
                        <div class="gallery-item-title">${item.title}</div>
                        <div class="gallery-item-desc">${item.desc}</div>
                    </div>
                `;
                // Añadir handler para abrir imagen en vista ampliada / fullscreen
                galleryItem.addEventListener('click', function(e) {
                    // si el click viene desde el botón del propio modal fuera de la imagen, igualmente abrimos la imagen
                    openFullscreenViewer(item.src, item.title);
                });

                // También permitir que el usuario haga click directamente en la imagen (evita burbujeo doble)
                const imgEl = galleryItem.querySelector('img');
                if (imgEl) {
                    imgEl.style.cursor = 'zoom-in';
                    imgEl.addEventListener('click', function(e) {
                        e.stopPropagation();
                        openFullscreenViewer(item.src, item.title);
                    });
                }

                galleryGrid.appendChild(galleryItem);
            });
        } else {
            galleryGrid.innerHTML = `
                <div class="empty-gallery">
                    <div class="empty-gallery-icon">🖼️</div>
                    <p>Próximamente agregaremos imágenes de referencia.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem;">Mientras tanto, ¡contactanos para ver nuestros trabajos!</p>
                </div>
            `;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    function closeGalleryModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Fullscreen / lightbox viewer ---
    function openFullscreenViewer(src, title) {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'image-fullscreen-overlay';
        overlay.innerHTML = `
            <button class="image-fullscreen-close" aria-label="Cerrar">&times;</button>
            <figure class="image-fullscreen-figure">
                <img src="${src}" alt="${title}" onerror="this.src='placeholder.jpg'">
                <figcaption>${title || ''}</figcaption>
            </figure>
        `;

        // Añadir comportamiento de cierre
        overlay.querySelector('.image-fullscreen-close').addEventListener('click', closeFullscreenViewer);
        overlay.addEventListener('click', function(e) {
            // cerrar si se hace click fuera de la figura
            if (e.target === overlay) closeFullscreenViewer();
        });

        document.addEventListener('keydown', escClose);

        document.body.appendChild(overlay);

        // NO entrar en modo fullscreen: mostramos solo un overlay centrado con buen zoom

        function escClose(e) {
            if (e.key === 'Escape') closeFullscreenViewer();
        }

        function closeFullscreenViewer() {
            // salir de fullscreen si estamos en modo fullscreen
            // no usamos fullscreen; si por alguna razón el documento está en fullscreen, intentamos salir
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
            // quitar listeners y overlay
            document.removeEventListener('keydown', escClose);
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }
    }

    closeModal.addEventListener('click', closeGalleryModal);

    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeGalleryModal();
        }
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setupMenu();
    setupAnimations();
    setupSmoothScroll();
    setupGalleryModal();
});

// Prevenir errores de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
    }
}, true);