// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
});

// ========================================
// INITIALIZE AOS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }
    initParticles();
    initHeaderParticles();
    initSkillBars();
});

// ========================================
// CUSTOM CURSOR - FASTEST POSSIBLE
// ========================================
(function() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    // Cek apakah di desktop & bukan touch device
    if (!dot || !outline || window.innerWidth <= 992 || 'ontouchstart' in window) {
        return; // Exit - jangan load cursor
    }
    
    // Variables
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let isScrolling = false;
    
    // Track mouse position - SUPER FAST
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot langsung ikut (instant)
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true, capture: true });
    
    // Outline smooth follow dengan RAF
    function animateOutline() {
        if (!isScrolling) {
            // Lerp cepat (0.25 = smooth tapi responsif)
            outlineX += (mouseX - outlineX) * 0.25;
            outlineY += (mouseY - outlineY) * 0.25;
            
            outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        }
        
        requestAnimationFrame(animateOutline);
    }
    
    requestAnimationFrame(animateOutline);
    
    // Hover effect - SIMPLE & FAST
    let isHovering = false;
    
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.matches('a, button, input, textarea, select, .tilt-card, .project-card, .highlight-card, .org-card, .cert-card, .achievement-card, .contact-item, .info-item, .tool-tag, .tech-item')) {
            if (!isHovering) {
                outline.classList.add('hover');
                isHovering = true;
            }
        }
    }, { passive: true });
    
    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.matches('a, button, input, textarea, select, .tilt-card, .project-card, .highlight-card, .org-card, .cert-card, .achievement-card, .contact-item, .info-item, .tool-tag, .tech-item')) {
            outline.classList.remove('hover');
            isHovering = false;
        }
    }, { passive: true });
    
    // Hide cursor saat scroll (untuk performa)
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            dot.style.opacity = '0';
            outline.style.opacity = '0';
        }
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            isScrolling = false;
            dot.style.opacity = '1';
            outline.style.opacity = '1';
        }, 150);
    }, { passive: true });
    
    // Hide saat keluar window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    });
    
    console.log('⚡ Ultra fast cursor loaded!');
})();
{
    
    // ========================================
    // HOVER EFFECTS - Optimized dengan delegation
    // ========================================
    const interactiveSelector = 'a, button, .tilt-card, input, textarea, select, .project-card, .highlight-card, .org-card, .cert-card, .achievement-card';
    
    // Gunakan event delegation (lebih efisien)
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorOutline.classList.add('hover');
            cursorDot.classList.add('hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorOutline.classList.remove('hover');
            cursorDot.classList.remove('hover');
        }
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('click');
        cursorOutline.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('click');
        cursorOutline.classList.remove('click');
    });
    
    // Update saat scroll (biar cursor tetap di posisi mouse)
    window.addEventListener('scroll', () => {
        // Force update posisi
        dotX = mouseX;
        dotY = mouseY;
    }, { passive: true });
    
    // Hide cursor saat keluar window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    console.log('🎯 Custom cursor loaded with high performance!');
}

// ========================================
// PARTICLE BACKGROUND (HERO)
// ========================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// HEADER PARTICLES (SUBPAGES)
// ========================================
function initHeaderParticles() {
    const canvases = document.querySelectorAll('.header-particles');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
                if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();
    });
}

// ========================================
// SCROLL PROGRESS
// ========================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.glass-navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// ========================================
// BACK TO TOP
// ========================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const texts = ['Web Developer', 'UI/UX Enthusiast', 'Mahasiswa IT', 'Freelancer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ========================================
// SKILL BARS ANIMATION
// ========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ========================================
// 3D TILT EFFECT - ONLY DESKTOP
// ========================================
if (window.innerWidth > 992 && !('ontouchstart' in window)) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        let ticking = false;
        
        card.addEventListener('mousemove', (e) => {
            if (ticking) return; // Prevent multiple calls
            
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25; // Kurangi intensitas
                const rotateY = (centerX - x) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                
                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.left = `${x - rect.width}px`;
                    glow.style.top = `${y - rect.height}px`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
// MAGNETIC BUTTONS - SIMPLIFIED
// ========================================
if (window.innerWidth > 992) {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Kurangi intensitas (0.15 bukan 0.2)
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ========================================
// PROJECT FILTER
// ========================================
const filterButtons = document.querySelectorAll('.btn-filter');
const projectItems = document.querySelectorAll('.project-item');

if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        if (!submitBtn || !formMessage) return;
        
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            formMessage.innerHTML = `
                <div class="alert alert-success" style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--success); color: var(--success); border-radius: 12px;">
                    <i class="bi bi-check-circle-fill"></i> 
                    <strong>Pesan terkirim!</strong> Terima kasih telah menghubungi saya.
                </div>
            `;
            this.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        }, 1500);
    });
}

// ========================================
// NAVBAR CLOSE ON MOBILE
// ========================================
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (typeof bootstrap !== 'undefined') {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        }
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// THEME TOGGLE (Placeholder)
// ========================================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('bi-moon-fill')) {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    });
}

console.log('✨ Premium Portfolio Loaded Successfully!');