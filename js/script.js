document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Fetch GitHub Stats
    fetch('http://localhost:8000/stats')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching stats:', data.error);
                document.getElementById('github-stats-container').innerHTML = '<p>Could not load stats.</p>';
                return;
            }
            renderStats(data);
        })
        .catch(error => {
            console.error('Error connecting to backend:', error);
            document.getElementById('github-stats-container').innerHTML = '<p>Backend not running. Start it with <code>uvicorn backend.main:app --reload</code></p>';
        });

    function renderStats(stats) {
        const container = document.getElementById('github-stats-container');

        // Use Infra Stats for the card content
        const displayStats = stats.infra_stats || stats;

        // Sort languages by count
        const sortedLangs = Object.entries(displayStats.languages).sort((a, b) => b[1] - a[1]);
        const topLangs = sortedLangs.slice(0, 5); // Top 5

        let langHtml = '<div class="gh-langs"><h4>Top Languages (Infra)</h4><div class="lang-bars">';
        topLangs.forEach(([lang, count]) => {
            const percentage = (count / displayStats.total_repos) * 100;
            langHtml += `
                <div class="lang-bar-item">
                    <div class="lang-info">
                        <span class="lang-name">${lang}</span>
                        <span class="lang-count">${count}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        });
        langHtml += '</div></div>';

        const cardHtml = `
            <div class="github-profile-card">
                <div class="gh-header">
                    <div class="gh-user-info">
                        <h3>@${stats.username}</h3>
                        <span class="gh-bio">Cloud & DevOps Portfolio</span>
                    </div>
                    <a href="https://github.com/${stats.username}" target="_blank" class="gh-btn">View Profile</a>
                </div>
                <div class="gh-stats-grid">
                    <div class="gh-stat">
                        <span class="gh-value">${displayStats.total_repos}</span>
                        <span class="gh-label">Infra Repos</span>
                    </div>
                    <div class="gh-stat">
                        <span class="gh-value">${displayStats.total_stars}</span>
                        <span class="gh-label">Stars</span>
                    </div>
                    <div class="gh-stat">
                        <span class="gh-value">${displayStats.total_forks}</span>
                        <span class="gh-label">Forks</span>
                    </div>
                    <div class="gh-stat">
                        <span class="gh-value">${stats.followers}</span>
                        <span class="gh-label">Followers</span>
                    </div>
                </div>
                ${langHtml}
            </div>
        `;

        container.innerHTML = cardHtml;

        // Render Infra Projects
        if (stats.infra_projects && stats.infra_projects.length > 0) {
            const projectsContainer = document.querySelector('.projects-grid');
            if (projectsContainer) {
                let projectsHtml = '';
                stats.infra_projects.forEach(project => {
                    projectsHtml += `
                        <article class="project-card">
                            <div class="project-content">
                                <h3 class="project-title">${project.name}</h3>
                                <p class="project-description">${project.description || 'No description available.'}</p>
                                <div class="project-tags">
                                    <span>${project.language || 'Code'}</span>
                                </div>
                                <div class="project-links">
                                    <a href="${project.url}" target="_blank" class="link-item">View on GitHub &rarr;</a>
                                </div>
                            </div>
                        </article>
                    `;
                });
                projectsContainer.innerHTML = projectsHtml;
            }
        }
    }
});
