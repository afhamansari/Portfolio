// Global variable to hold fetched data
let projectsData = [];

// Render projects dynamically
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectCard.dataset.projectId = project.id;
        
        projectCard.innerHTML = `
            <div class="project-number">${project.number}</div>
            <div class="project-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'placeholder-image\\'></div>';">` : '<div class="placeholder-image"></div>'}
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.shortDescription}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="#" class="project-link" onclick="openProjectModal(${project.id}); return false;">View Details →</a>
                    ${project.websiteUrl ? `<a href="${project.websiteUrl}" class="project-link website-link" target="_blank" rel="noopener noreferrer">Visit Website →</a>` : ''}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
        
        // Add click event to entire card
        projectCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('project-link')) {
                openProjectModal(project.id);
            }
        });
    });
}

// Open project modal - MUST be global for onclick to work
window.openProjectModal = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    
    // Populate modal content
    modal.querySelector('.modal-number').textContent = project.number;
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-description').textContent = project.fullDescription;
    
    // Populate modal image
    const modalImageContainer = modal.querySelector('.modal-project-image');
    if (project.image) {
        modalImageContainer.innerHTML = `<img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'placeholder-image\\'></div>';">`;
    } else {
        modalImageContainer.innerHTML = '<div class="placeholder-image"></div>';
    }
    
    // Populate tags
    const tagsContainer = modal.querySelector('.modal-tags');
    tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Populate features
    const featuresList = modal.querySelector('.features-list');
    featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Populate links dynamically
    const linksContainer = modal.querySelector('.modal-links');
    const githubSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`;
    const itchSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.13 1.338C2.08 1.96.02 4.328 0 5.157v1.105c0 1.43 1.334 2.687 2.56 2.687 1.47 0 2.697-1.22 2.697-2.668 0 1.447 1.185 2.668 2.656 2.668 1.47 0 2.616-1.22 2.616-2.668 0 1.447 1.26 2.668 2.73 2.668h.027c1.47 0 2.73-1.22 2.73-2.668 0 1.447 1.147 2.668 2.617 2.668 1.47 0 2.656-1.22 2.656-2.668 0 1.447 1.226 2.668 2.697 2.668C23.666 8.949 25 7.692 25 6.262V5.157c-.02-.83-2.08-3.196-3.13-3.82C20.29.043 3.79-.043 3.13 1.338zM9 9.386v1.217H6.635v8.824H17.35v-8.824H15V9.386H9zm1.33 1.743h3.34v.9h-3.34v-.9zm-2.032 2.4h7.389v5.35H8.298v-5.35zm1.44 1.024v3.29h4.49v-3.29h-4.49z"/>
    </svg>`;

    let linksHTML = '';
    if (project.link) {
        linksHTML += `<a href="${project.link}" class="modal-link modal-link-primary" target="_blank" rel="noopener noreferrer">
            ${githubSVG} View on GitHub
        </a>`;
    }
    if (project.itchUrl) {
        linksHTML += `<a href="${project.itchUrl}" class="modal-link modal-link-itch" target="_blank" rel="noopener noreferrer">
            ${itchSVG} View on itch.io
        </a>`;
    }
    if (!linksHTML) {
        linksHTML = `<span class="modal-no-links">No links available</span>`;
    }
    linksContainer.innerHTML = linksHTML;
    
    // Show modal with smooth animation
    modal.style.display = 'flex';
    // Force reflow
    modal.offsetHeight;
    // Add active class for animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    document.body.style.overflow = 'hidden';
}

// Close modal - MUST be global
window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    
    // Remove active class for exit animation
    modal.classList.remove('active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}


// Single-page navigation & Initialization
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page');
    
    // FETCH DATA FROM JSON FILE
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            projectsData = data;
            renderProjects(); // Call render only after data is loaded
        })
        .catch(error => console.error('Error loading the projects data:', error));
    
    // ── Modal setup ──────────────────────────────────────────────
    const modal = document.getElementById('projectModal');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    modalClose.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', closeProjectModal);
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ── Bio typing animation ──────────────────────────────────────
    const bioEl = document.querySelector('.bio');
    if (bioEl) {
        const fullText = bioEl.textContent.trim();
        bioEl.textContent = '';

        // Cursor element
        const cursor = document.createElement('span');
        cursor.className = 'bio-cursor';
        bioEl.appendChild(cursor);

        let i = 0;
        const SPEED = 22; // ms per character — lower = faster

        // Start typing after the name slide-up has settled (~500ms)
        setTimeout(() => {
            const timer = setInterval(() => {
                if (i < fullText.length) {
                    cursor.insertAdjacentText('beforebegin', fullText[i]);
                    i++;
                } else {
                    clearInterval(timer);
                    // Remove cursor after a short pause
                    setTimeout(() => cursor.remove(), 1800);
                }
            }, SPEED);
        }, 500);
    }

    // ── Active nav link on click ─────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ── Active nav link on scroll (IntersectionObserver) ─────────
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));
    
    // ── Scroll-reveal for project cards ──────────────────────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards when they come into view
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            cardObserver.observe(card);
        });
    }, 100);
    
    // ── Cursor pointer for interactive elements ───────────────────
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.cursor = 'pointer';
        });
    });
    
    // ── Parallax effect for background shapes ─────────────────────
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
        
        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ── Page load fade-in ─────────────────────────────────────────
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ── Button ripple effect ──────────────────────────────────────
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Console easter egg
    console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold;');
    console.log('%cInterested in how this was built? Feel free to reach out!', 'font-size: 14px;');
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Additional styles for project images */
    .project-image img,
    .modal-project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
    }
    
    /* Stack project links vertically */
    .project-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .project-link {
        display: block;
        width: 100%;
    }
`;
document.head.appendChild(style);