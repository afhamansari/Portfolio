// Global projects data - embedded to avoid CORS issues
let projectsData = [
    {
        "id": 1,
        "number": "01",
        "title": "Evo-fox",
        "shortDescription": "A simple line follower using a PID algorithm",
        "fullDescription": "A line follower bot using PID algorithm, it uses a 5 channel infrared sensor array to track the line, an arduino nano for computation, a motor driver with 2 small dc motors and battery module with a 3d printed body",
        "tags": ["C++"],
        "features": [
            "Atuomated path finding",
            "Continuous error correction",
            "Modular design"
        ],
        "link": "https://github.com/afhamansari/Evo-fox-line-follower-",
        "websiteUrl": "",
        "image": "Assets/project1.jpeg"
    },
    {
        "id": 2,
        "number": "02",
        "title": "Tracy",
        "shortDescription": "A prototype for a physical aim assist",
        "fullDescription": "A versatile device that can be used for projects ranging from automated face tracking for filmmakers to drone defence systems for the military, It uses multiple python libraries like mediapipe and numpy for accurate tracking",
        "tags": ["Python", "C++", "Computer Vision", "Machine Learning"],
        "features": [
            "Real time tracking",
            "Versatile applications",
        ],
        "link": "https://github.com/afhamansari/Tracy",
        "websiteUrl": "",
        "image": "Assets/project2.jpeg"
    },
    {
        "id": 3,
        "number": "03",
        "title": "Beep",
        "shortDescription": "A small handheld 8 bit style game console powered by esp8266",
        "fullDescription": "Beep is a small handheld game console, it runs games like snake, flappy bird, tetris and space inavders, along with these it can also be used for wifi packet tracking, a timer and a stopwatch, the setup is very user friendly and allows users to code thier own application for beep",
        "tags": ["C++"],
        "features": [
            "Multiple retro style games",
            "Clean UI",
            "Easy upgradability"
        ],
        "link": "https://github.com/afhamansari/Beep",
        "websiteUrl": "",
        "image": "Assets/project3.jpeg"
    },
    {
        "id": 4,
        "number": "04",
        "title": "Ping",
        "shortDescription": "A simple chat app with complete database integration",
        "fullDescription": "Ping is a simple chat app made using react, it uses supabase for backend and database, it includes text as well as media transfer.",
        "tags": ["React", "SQL", "Database integration"],
        "features": [
            "Scalability",
            "Responsive UI",
            "Cross platform compatibility",
            "User Authentication"
        ],
        "link": "https://github.com/afhamansari/ping",
        "websiteUrl": "https://ping-six-snowy.vercel.app/",
        "image": "Assets/project4.png"
    },
    {
        "id": 5,
        "number": "05",
        "title": "WordUp",
        "shortDescription": "A flashcard based vocabulary learning mobile app",
        "fullDescription": "A flashcard app to improve your vocabulary, Word up makes learning fun and engaging, you can learn new words or polish up your existing vocabulary, words up makes it easier for people to connect to thier roots or pick up a new language in a non-boring way.",
        "tags": ["reactnative", "javascript",],
        "features": [
            "Engaging lessons",
            "Gamified learning",
            "Cross platform support"
        ],
        "link": "https://github.com/afhamansari/WordUp",
        "websiteUrl": "",
        "image": "Assets/project5.png"
    },
    {
        "id": 6,
        "number": "06",
        "title": "Book-let",
        "shortDescription": "A place to help readers share books",
        "fullDescription": "Book-let provides a place to allow people to share books with each other, you can borrow the books other people are willing to lend or if you have books lieing around that you wish to share with people then you can lend them here, creating a social network of readers.",
        "tags": ["HTML", "CSS", "Javascript", "Google API"],
        "features": [
            "Scalability",
            "User first approach",
            "Cross platform compatibility"
        ],
        "link": "https://github.com/afhamansari/booklet",
        "websiteUrl": "https://afhamansari.github.io/booklet/",
        "image": "Assets/project6.png"
    }
];

// Load projects from JSON (optional - will use embedded data as fallback)
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (response.ok) {
            const data = await response.json();
            projectsData = data.projects;
        }
    } catch (error) {
        console.log('Using embedded project data (fetch not available)');
    }
    renderProjects();
}

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
    
    // Set GitHub link
    document.getElementById('githubLink').href = project.link;
    
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


// Smooth page navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Load projects
    loadProjects();
    
    // Modal close handlers
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
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target page
            const targetId = link.getAttribute('href').substring(1);
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link and corresponding page
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, '', `#${targetId}`);
        });
    });
    
    // Handle direct URL navigation (e.g., page refresh on #projects)
    function showPageFromHash() {
        const hash = window.location.hash.substring(1) || 'home';
        const targetPage = document.getElementById(hash);
        
        if (targetPage) {
            pages.forEach(p => p.classList.remove('active'));
            navLinks.forEach(l => l.classList.remove('active'));
            
            targetPage.classList.add('active');
            const activeLink = document.querySelector(`[href="#${hash}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }
    
    // Show correct page on load
    showPageFromHash();
    
    // Handle browser back/forward
    window.addEventListener('hashchange', showPageFromHash);
    
    // Add scroll reveal animation for project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
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
            observer.observe(card);
        });
    }, 100);
    
    // Add cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.cursor = 'pointer';
        });
    });
    
    // Parallax effect for background shapes
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
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Don't navigate if modal is open
        if (modal.classList.contains('active')) return;
        
        const currentPage = document.querySelector('.page.active').id;
        const pages = ['home', 'projects', 'contact'];
        const currentIndex = pages.indexOf(currentPage);
        
        if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            const nextPage = pages[currentIndex + 1];
            document.querySelector(`[href="#${nextPage}"]`).click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevPage = pages[currentIndex - 1];
            document.querySelector(`[href="#${prevPage}"]`).click();
        }
    });
    
    // Add click ripple effect
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
