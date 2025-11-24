// --- Localization ---
const defaultLang = localStorage.getItem('language') || 'en';
let currentLang = defaultLang;

// Hardcoded translations to bypass CORS (file:// protocol)
const translations = {
    "en": {
        "nav_home": "Home",
        "nav_about": "About",
        "nav_skills": "Skills",
        "nav_experience": "Experience",
        "nav_education": "Education",
        "nav_projects": "Projects",
        "nav_contact": "Contact",
        "hero_greeting": "Hi, I'm",
        "hero_subtitle": "DevOps and Cloud Engineer",
        "hero_view_work": "View Work",
        "hero_download_cv": "Download CV",
        "about_title": "About Me",
        "about_text_1": "DevOps engineer passionate about automation, orchestration, and continuous integration. Experienced in infrastructure management and CI/CD pipeline implementation.",
        "about_text_2": "Based in",
        "about_location": "Casablanca, Morocco",
        "skills_title": "Technical Skills",
        "skills_cicd": "CI/CD & Automation",
        "skills_containerization": "Containerization",
        "skills_cloud": "Cloud & Infra",
        "skills_systems": "Systems & Security",
        "skills_monitoring": "Monitoring",
        "skills_languages": "Languages",
        "skills_databases": "Databases",
        "skills_ai": "AI & LLMOps",
        "skills_frameworks": "Frameworks",
        "experience_title": "Experience",
        "exp_beebay_role": "Cloud DevOps Engineer",
        "exp_beebay_desc": "Working on Python Automation, Reporting, and Security Aggregation.",
        "exp_beebay_detail_1": "Development of a full Python module to centralize and analyze CI security reports.",
        "exp_beebay_detail_2": "Advanced parsing of XML/JSON reports (SpotBugs, PMD, Checkstyle, Gitleaks).",
        "exp_beebay_detail_3": "Multi-source aggregation of vulnerabilities and automated executive reporting.",
        "exp_beebay_detail_4": "LLM API integration for report enrichment.",
        "exp_k8s_role": "Self-Managed Kubernetes Platform on Azure",
        "exp_k8s_desc": "Implementation of a secure Kubernetes foundation on Azure.",
        "exp_k8s_detail_1": "Network segmentation with dedicated subnets.",
        "exp_k8s_detail_2": "Infrastructure provisioning via Terraform.",
        "exp_k8s_detail_3": "Secrets management with Vault.",
        "exp_k8s_detail_4": "K8s cluster bootstrap via Ansible.",
        "exp_backup_role": "Azure Backup & Recovery",
        "exp_backup_desc": "Full-stack backup and recovery strategy on Azure.",
        "exp_backup_detail_1": "Infrastructure-level snapshots and DB-level PITR.",
        "exp_backup_detail_2": "Automated recovery testing.",
        "exp_infra_role": "Azure Infrastructure Provisioning",
        "exp_infra_desc": "Modular cloud environment management using Terraform.",
        "exp_infra_detail_1": "Designed reusable network and compute modules.",
        "exp_infra_detail_2": "Implemented environment-specific configurations (dev/prod).",
        "exp_cicd_role": "CI/CD Pipelines",
        "exp_cicd_desc": "Automated pipelines with GitLab CI/CD, Spring Boot, Next.js.",
        "exp_cicd_detail_1": "Automated build, test, and docker image generation.",
        "exp_cicd_detail_2": "Deployment to dedicated VMs using Docker Compose.",
        "github_stats_title": "GitHub Statistics",
        "projects_title": "R&D Projects",
        "proj_llm_azure_title": "LLM Infrastructure on Azure",
        "proj_llm_azure_desc": "Design and operation of an LLM application on Azure with GPU-enabled VMs.",
        "proj_llm_aws_title": "LLM Infrastructure on AWS",
        "proj_llm_aws_desc": "Deployment of an LLM application on AWS supporting GPU-based options.",
        "proj_vsphere_title": "vSphere Infrastructure Automation",
        "proj_vsphere_desc": "Full automation of VMware vSphere environment including vCenter and ESXi.",
        "proj_oracle_title": "Automated Oracle Cloud Deployment",
        "proj_oracle_desc": "Infrastructure automation on Oracle Cloud covering VM and VCN provisioning.",
        "proj_k8s_auto_title": "Kubernetes Cluster Automation",
        "proj_k8s_auto_desc": "Bash scripts for efficient Kubernetes cluster management and monitoring.",
        "education_title": "Education & Certifications",
        "edu_master_title": "Master’s in Computer Science: Big Data and Cloud Computing",
        "edu_master_school": "École Normale Supérieure de l’Enseignement Technique Mohammadia",
        "edu_master_detail_1": "Cloud Computing & DevOps",
        "edu_master_detail_2": "Big Data Architectures",
        "edu_master_detail_3": "Distributed Systems",
        "edu_master_pfe": "E-commerce SaaS Platform",
        "edu_bachelor_title": "Bachelor’s in Mathematics and Statistics",
        "edu_bachelor_school": "Faculty of Sciences Semlalia Marrakech",
        "edu_bachelor_detail_1": "Mathematical Statistics",
        "edu_bachelor_detail_2": "Probability Theory",
        "edu_bachelor_detail_3": "Hierarchical Clustering",
        "edu_pfe": "PFE:",
        "download_pfe": "Download PFE Report",
        "download_internship": "Download Internship Report",
        "cert_title": "Certifications",
        "cert_aws": "AWS Certificate",
        "cert_k8s": "Kubernetes Certificates",
        "cert_sql": "SQL Certificates",
        "cert_docker": "Docker Certificates",
        "cert_linux": "Linux Certificates",
        "cert_networking": "Networking Certificates",
        "cert_other": "Other Certificates",
        "contact_title": "Get In Touch",
        "contact_text": "I'm currently open to new opportunities. Feel free to reach out!",
        "contact_email": "Email Me",
        "footer_rights": "All rights reserved."
    },
    "fr": {
        "nav_home": "Accueil",
        "nav_about": "À propos",
        "nav_skills": "Compétences",
        "nav_experience": "Expérience",
        "nav_education": "Éducation",
        "nav_projects": "Projets",
        "nav_contact": "Contact",
        "hero_greeting": "Bonjour, je suis",
        "hero_subtitle": "Ingénieur DevOps et Cloud",
        "hero_view_work": "Voir mes travaux",
        "hero_download_cv": "Télécharger CV",
        "about_title": "À propos de moi",
        "about_text_1": "Ingénieur DevOps passionné par l'automatisation, l'orchestration et l'intégration continue. Expérimenté dans la gestion d'infrastructure et la mise en œuvre de pipelines CI/CD.",
        "about_text_2": "Basé à",
        "about_location": "Casablanca, Maroc",
        "skills_title": "Compétences Techniques",
        "skills_cicd": "CI/CD & Automatisation",
        "skills_containerization": "Conteneurisation",
        "skills_cloud": "Cloud & Infra",
        "skills_systems": "Systèmes & Sécurité",
        "skills_monitoring": "Monitoring",
        "skills_languages": "Langages",
        "skills_databases": "Bases de données",
        "skills_ai": "IA & LLMOps",
        "skills_frameworks": "Frameworks",
        "experience_title": "Expérience",
        "exp_beebay_role": "Ingénieur Cloud DevOps",
        "exp_beebay_desc": "Travail sur l'automatisation Python, le reporting et l'agrégation de sécurité.",
        "exp_beebay_detail_1": "Développement d'un module Python complet pour centraliser et analyser les rapports de sécurité CI.",
        "exp_beebay_detail_2": "Analyse avancée des rapports XML/JSON (SpotBugs, PMD, Checkstyle, Gitleaks).",
        "exp_beebay_detail_3": "Agrégation multi-sources des vulnérabilités et reporting exécutif automatisé.",
        "exp_beebay_detail_4": "Intégration d'API LLM pour l'enrichissement des rapports.",
        "exp_k8s_role": "Plateforme Kubernetes autogérée sur Azure",
        "exp_k8s_desc": "Mise en œuvre d'une fondation Kubernetes sécurisée sur Azure.",
        "exp_k8s_detail_1": "Segmentation réseau avec sous-réseaux dédiés.",
        "exp_k8s_detail_2": "Provisionnement de l'infrastructure via Terraform.",
        "exp_k8s_detail_3": "Gestion des secrets avec Vault.",
        "exp_k8s_detail_4": "Bootstrap de cluster K8s via Ansible.",
        "exp_backup_role": "Sauvegarde et récupération Azure",
        "exp_backup_desc": "Stratégie complète de sauvegarde et de récupération sur Azure.",
        "exp_backup_detail_1": "Snapshots au niveau de l'infrastructure et PITR au niveau de la base de données.",
        "exp_backup_detail_2": "Tests de récupération automatisés.",
        "exp_infra_role": "Provisionnement d'infrastructure Azure",
        "exp_infra_desc": "Gestion modulaire de l'environnement cloud utilisant Terraform.",
        "exp_infra_detail_1": "Conception de modules réseau et de calcul réutilisables.",
        "exp_infra_detail_2": "Mise en œuvre de configurations spécifiques à l'environnement (dev/prod).",
        "exp_cicd_role": "Pipelines CI/CD",
        "exp_cicd_desc": "Pipelines automatisés avec GitLab CI/CD, Spring Boot, Next.js.",
        "exp_cicd_detail_1": "Build, test et génération d'images docker automatisés.",
        "exp_cicd_detail_2": "Déploiement sur des VMs dédiées utilisant Docker Compose.",
        "github_stats_title": "Statistiques GitHub",
        "projects_title": "Projets R&D",
        "proj_llm_azure_title": "Infrastructure LLM sur Azure",
        "proj_llm_azure_desc": "Conception et exploitation d'une application LLM sur Azure avec des VMs compatibles GPU.",
        "proj_llm_aws_title": "Infrastructure LLM sur AWS",
        "proj_llm_aws_desc": "Déploiement d'une application LLM sur AWS prenant en charge les options basées sur GPU.",
        "proj_vsphere_title": "Automatisation de l'infrastructure vSphere",
        "proj_vsphere_desc": "Automatisation complète de l'environnement VMware vSphere incluant vCenter et ESXi.",
        "proj_oracle_title": "Déploiement automatisé Oracle Cloud",
        "proj_oracle_desc": "Automatisation de l'infrastructure sur Oracle Cloud couvrant le provisionnement de VM et VCN.",
        "proj_k8s_auto_title": "Automatisation de cluster Kubernetes",
        "proj_k8s_auto_desc": "Scripts Bash pour une gestion et un monitoring efficaces des clusters Kubernetes.",
        "education_title": "Éducation & Certifications",
        "edu_master_title": "Master en Informatique : Big Data et Cloud Computing",
        "edu_master_school": "École Normale Supérieure de l’Enseignement Technique Mohammedia",
        "edu_master_detail_1": "Cloud Computing & DevOps",
        "edu_master_detail_2": "Architectures Big Data",
        "edu_master_detail_3": "Systèmes Distribués",
        "edu_master_pfe": "Plateforme E-commerce SaaS",
        "edu_bachelor_title": "Licence en Mathématiques et Statistiques",
        "edu_bachelor_school": "Faculté des Sciences Semlalia Marrakech",
        "edu_bachelor_detail_1": "Statistiques Mathématiques",
        "edu_bachelor_detail_2": "Théorie des Probabilités",
        "edu_bachelor_detail_3": "Classification Hiérarchique",
        "edu_pfe": "PFE :",
        "download_pfe": "Télécharger le Rapport PFE",
        "download_internship": "Télécharger le Rapport de Stage",
        "cert_title": "Certifications",
        "cert_aws": "Certificat AWS",
        "cert_k8s": "Certificats Kubernetes",
        "cert_sql": "Certificats SQL",
        "cert_docker": "Certificats Docker",
        "cert_linux": "Certificats Linux",
        "cert_networking": "Certificats Réseau",
        "cert_other": "Autres Certificats",
        "contact_title": "Contactez-moi",
        "contact_text": "Je suis actuellement ouvert à de nouvelles opportunités. N'hésitez pas à me contacter !",
        "contact_email": "Envoyez-moi un email",
        "footer_rights": "Tous droits réservés."
    }
};

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update CV link based on language if needed (optional, currently same CV)
}

function updateActiveLangButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Expose changeLanguage globally for buttons
window.changeLanguage = (lang) => {
    applyLanguage(lang);
    updateActiveLangButton(lang);
};

// Initialize
applyLanguage(currentLang);
updateActiveLangButton(currentLang);

// Clear URL hash to prevent auto-scroll
if (window.location.hash) {
    history.replaceState(null, null, ' ');
    window.scrollTo(0, 0);
}

// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- Mobile Menu ---
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navList) {
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
}

// --- GitHub Stats ---
const githubContainer = document.getElementById('github-stats-container');
if (githubContainer) {
    fetchGitHubStats();
}

async function fetchGitHubStats() {
    const username = 'zakaria-statistics';
    try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        // Fetch repos to calculate total stars (simplified)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();

        const totalStars = Array.isArray(reposData) ? reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0) : 0;

        if (userData.message === "Not Found") {
            githubContainer.innerHTML = '<p>GitHub profile not found.</p>';
            return;
        }

        const html = `
            <div class="github-profile-card">
                <div class="gh-header">
                    <div class="gh-user-info">
                        <h3>${userData.name || username}</h3>
                        <p class="gh-bio">${userData.bio || 'No bio available'}</p>
                    </div>
                    <a href="${userData.html_url}" target="_blank" class="gh-btn">View Profile</a>
                </div>
                <div class="gh-stats-grid">
                    <div class="gh-stat">
                        <span class="gh-value">${userData.public_repos}</span>
                        <span class="gh-label">Repos</span>
                    </div>
                    <div class="gh-stat">
                        <span class="gh-value">${userData.followers}</span>
                        <span class="gh-label">Followers</span>
                    </div>
                    <div class="gh-stat">
                        <span class="gh-value">${totalStars}</span>
                        <span class="gh-label">Stars</span>
                    </div>
                        <div class="gh-stat">
                        <span class="gh-value">${userData.following}</span>
                        <span class="gh-label">Following</span>
                    </div>
                </div>
            </div>
        `;
        githubContainer.innerHTML = html;

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        githubContainer.innerHTML = '<p>Failed to load GitHub stats.</p>';
    }
}

// --- PDF Download Tracking ---
// Initialize PDF download tracking when DOM is ready
(function() {
    function initPDFTracking() {
        document.querySelectorAll('.pdf-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const pdfName = this.getAttribute('href');
                console.log(`Downloading: ${pdfName}`);
                
                // Optional: Add analytics tracking here
                // gtag('event', 'download', { file_name: pdfName });
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPDFTracking);
    } else {
        initPDFTracking();
    }
})();