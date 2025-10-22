// Efeito de digitação Hello World em várias linguagens
const helloWorlds = [
    {lang: 'C', code: 'printf("Hello World\\n");'},
    {lang: 'C++', code: 'cout << "Hello World" << endl;\n'},
    {lang: 'Python', code: "print('Hello World')"},
    {lang: 'Java', code: 'System.out.println("Hello World");'},
    {lang: 'JavaScript', code: 'console.log("Hello World");'},
    {lang: 'HTML', code: '<h1>Hello World</h1>'},
];
let hwIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeHelloWorld() {
    const typingDiv = document.getElementById('typing-hello');
    if (!typingDiv) return;
    const current = helloWorlds[hwIndex];
    let display = `<span style='color:#4f8cff'>${current.lang}</span>: <span style='font-family:monospace'>${current.code.substring(0, charIndex)}</span>`;
    typingDiv.innerHTML = display + '<span class="typing-cursor">|</span>';
    if (!isDeleting && charIndex < current.code.length) {
        charIndex++;
        setTimeout(typeHelloWorld, 60);
    } else if (!isDeleting && charIndex === current.code.length) {
        isDeleting = true;
        setTimeout(typeHelloWorld, 1200);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeHelloWorld, 30);
    } else {
        isDeleting = false;
        hwIndex = (hwIndex + 1) % helloWorlds.length;
        setTimeout(typeHelloWorld, 500);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    typeHelloWorld();
});

// Revelar seções ao rolar
function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Fechar o menu ao clicar em um link e rolar suavemente e lentamente até a seção
document.addEventListener('DOMContentLoaded', function() {
    const offcanvas = document.getElementById('menuOffcanvas');
    function scrollToY(targetY, duration = 1200) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let start;
        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY + diff * progress);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
    document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
        link.addEventListener('click', function(e) {
            let targetId = this.getAttribute('href');
            if (this.classList.contains('navbar-brand')) targetId = '#inicio';
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Fecha o menu se estiver aberto
                    if (typeof bootstrap !== 'undefined') {
                        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
                        if (offcanvasInstance) offcanvasInstance.hide();
                    }
                    // Rolagem suave e lenta até a seção, considerando o offset da navbar
                    setTimeout(() => {
                        const y = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                        scrollToY(y, 1100);
                    }, 120);
                }
                e.preventDefault();
            }
        });
    });
});