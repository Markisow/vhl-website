// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Team logo images
const teamLogoImages = {
    'akm': 'logos/АКМ.png',
    'buran': 'logos/Буран.png',
    'neftyanik': 'logos/Нефтяник.png',
    'diesel': 'logos/Дизель.png',
    'dinamo-altai': 'logos/Динамо-Алтай.png',
    'zauralie': 'logos/Зауралье.png',
    'metallurg': 'logos/Металлург.png',
    'norilsk': 'logos/Норильск.png'
};

// Teams data
const teams = [
    { id: 'akm', name: 'АКМ', city: 'Тула', wins: 0, losses: 0, points: 0 },
    { id: 'buran', name: 'Буран', city: 'Воронеж', wins: 0, losses: 0, points: 0 },
    { id: 'neftyanik', name: 'Нефтяник', city: 'Верхняя Пышма', wins: 0, losses: 0, points: 0 },
    { id: 'diesel', name: 'Дизель', city: 'Пенза', wins: 0, losses: 0, points: 0 },
    { id: 'dinamo-altai', name: 'Динамо-Алтай', city: 'Барнаул', wins: 0, losses: 0, points: 0 },
    { id: 'zauralie', name: 'Зауралье', city: 'Курган', wins: 0, losses: 0, points: 0 },
    { id: 'metallurg', name: 'Металлург', city: 'Новокузнецк', wins: 0, losses: 0, points: 0 },
    { id: 'norilsk', name: 'Норильск', city: 'Норильск', wins: 0, losses: 0, points: 0 }
];

// Initialize standings with zero stats
function generateRandomStandings() {
    teams.forEach(team => {
        team.wins = 0;
        team.losses = 0;
        team.points = 0;
    });
    
    // Keep original order since no games played yet
}

// Populate standings table
function populateStandings() {
    const standingsBody = document.getElementById('standings-body');
    if (!standingsBody) return;

    standingsBody.innerHTML = '';
    
    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        const logoPath = teamLogoImages[team.id];
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div class="team-standings-info">
                    <div class="team-logo-small">
                        <img src="${logoPath}" alt="${team.name}" class="team-logo-small-img">
                    </div>
                    <span class="team-name-standings">${team.name}</span>
                </div>
            </td>
            <td>${team.wins + team.losses}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.points}</td>
        `;
        standingsBody.appendChild(row);
    });
}

// Schedule is not available yet
function generateSchedule() {
    // Schedule will be generated when available
    console.log('Schedule not available yet');
}

// Generate random date
function generateRandomDate() {
    const start = new Date(2024, 0, 15);
    const end = new Date(2024, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toLocaleDateString('ru-RU');
}

// Generate random time
function generateRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 12; // 12:00 - 23:59
    const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Update team stats in cards
function updateTeamStats() {
    teams.forEach(team => {
        const teamCard = document.querySelector(`[data-team="${team.id}"]`);
        if (teamCard) {
            const winsSpan = teamCard.querySelector('.wins');
            const lossesSpan = teamCard.querySelector('.losses');
            
            if (winsSpan) winsSpan.textContent = `Победы: ${team.wins}`;
            if (lossesSpan) lossesSpan.textContent = `Поражения: ${team.losses}`;
        }
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.team-card, .news-card, .match-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Team card click effect
document.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click effect
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
});



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateRandomStandings();
    populateStandings();
    generateSchedule();
    updateTeamStats();
    
    // Add loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// No live updates since no games are being played yet
// setInterval(() => {
//     // Live updates will be enabled when games start
// }, 30000);

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects for better UX
    const allCards = document.querySelectorAll('.team-card, .news-card, .match-card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.cursor = 'default';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Add some visual feedback for user interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons and cards
    const interactiveElements = document.querySelectorAll('.nav-link, .team-card, .news-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
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
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .team-card, .news-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
