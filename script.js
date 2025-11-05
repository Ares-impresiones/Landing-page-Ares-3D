
        // ========================================
        // LOADER: Ocultar después de que cargue la página
        // ========================================
        window.addEventListener('load', () => {
            const loader = document.getElementById('pageLoader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });

        // ========================================
        // ESTRELLAS: Crear fondo animado
        // ========================================
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
        createStars();

        // ========================================
        // MENÚ MÓVIL: Toggle hamburguesa
        // ========================================
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

        // ========================================
        // INTERSECTION OBSERVER: Animaciones al scroll
        // ========================================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Agregar delay escalonado para las tarjetas
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observar todos los elementos animables
        document.querySelectorAll('.category-card').forEach(el => {
            observer.observe(el);
        });

        // ========================================
        // SMOOTH SCROLL: Navegación suave
        // ========================================
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

        // ========================================
        // ACTIVE LINK: Resaltar sección actual en el menú
        // ========================================
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#navMenu a');

        function updateActiveLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);

        // ========================================
        // ANIMACIÓN DE CONTADORES (números estadísticos)
        // ========================================
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
                }
            }, 16);
        }

        // Observar la sección de estadísticas
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const isPercent = text.includes('%');
                        const hasPlus = text.includes('+');
                        const number = parseInt(text.replace(/\D/g, ''));
                        
                        animateCounter(stat, number);
                        
                        // Agregar símbolo después de la animación
                        setTimeout(() => {
                            if (isPercent) stat.textContent += '%';
                            if (hasPlus) stat.textContent += '+';
                        }, 2000);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            statsObserver.observe(statsGrid);
        }

        // ========================================
        // TRANSICIÓN ENTRE PÁGINAS
        // ========================================
        document.querySelectorAll('a[href$=".html"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // No aplicar transición a enlaces externos
                if (!href.startsWith('http') && href !== '#') {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
   