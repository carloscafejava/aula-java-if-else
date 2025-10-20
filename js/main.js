// ========== TEMA CLARO/ESCURO ==========
(function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    const theme = saved || (prefersDark ? 'dark' : 'light');

    html.setAttribute('data-theme', theme);

    if (toggle) {
        toggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
})();

// ========== GERAR MENU DINÂMICO ==========
function gerarMenu() {
    const menu = document.getElementById('scrollMenu');
    if (!menu) return;

    const ul = menu.querySelector('ul');
    if (!ul) return;

    const isContent = window.location.pathname.includes('/pages/');
    let html = '';

    if (isContent) {
        const sections = document.querySelectorAll('.section h2, .content > h1, .conclusion-box h2');
        
        sections.forEach(function(sec, idx) {
            if (!sec.id) sec.id = 'section-' + idx;
            const titulo = sec.textContent.trim();
            html += '<li><a href="#' + sec.id + '" class="scroll-menu-link">' + titulo + '</a></li>';
        });
        
        html += '<li><a href="../index.html" class="scroll-menu-link">🏠 Home</a></li>';
    } else {
        var items = [
            {href: '#inicio', label: 'Início'},
            {href: '#conteudo', label: 'Fundamentos'},
            {href: '#poo', label: 'POO'},
            {href: '#estruturas', label: 'Estruturas'},
            {href: '#avancado', label: 'Avançado'},
            {href: '#frameworks', label: 'Frameworks'}
        ];
        
        items.forEach(function(item) {
            html += '<li><a href="' + item.href + '" class="scroll-menu-link">' + item.label + '</a></li>';
        });
    }

    ul.innerHTML = html;
}

// ========== SCROLL TO TOP BUTTON ==========
(function initScroll() {
    var btn = document.getElementById('scrollToTop');
    var menu = document.getElementById('scrollMenu');
    var menuOpen = false;

    if (!btn || !menu) return;

    gerarMenu();

    // Mostrar/esconder botão
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
            fecharMenu();
        }
    });

    // Clicar no botão
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        menuOpen ? fecharMenu() : abrirMenu();
    });

    function abrirMenu() {
    const menu = document.getElementById('scrollMenu');
    menu.classList.add('visible');
}

function fecharMenu() {
    const menu = document.getElementById('scrollMenu');
    menu.classList.remove('visible');
}


    // function abrirMenu() {
    //     menu.classList.add('visible');
    //     btn.classList.add('menu-open');
    //     menuOpen = true;
    // }

    // function fecharMenu() {
    //     menu.classList.remove('visible');
    //     btn.classList.remove('menu-open');
    //     menuOpen = false;
    // }

    // Clicar em um link do menu
    menu.addEventListener('click', function(e) {
        if (e.target.classList.contains('scroll-menu-link')) {
            e.preventDefault();
            var href = e.target.getAttribute('href');
            
            if (href.includes('../index.html')) {
                fecharMenu();
                window.location.href = href;
                return;
            }

            var target = document.querySelector(href);
            fecharMenu();
            
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.scroll-to-top-wrapper') && menuOpen) {
            fecharMenu();
        }
    });

    // Duplo clique volta ao topo
    btn.addEventListener('dblclick', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
})();