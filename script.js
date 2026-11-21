(function () {
    var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    // Texto rotativo
    var roles = ['desarrollo Full Stack', 'pruebas de rendimiento y QA', 'apps móviles con Android', 'bases de datos y redes'];
    var el = document.getElementById('typed'), ri = 0, ci = 0, del = false;
    function tick() {
        var w = roles[ri];
        if (reduce) { el.textContent = w; return }
        el.textContent = w.slice(0, ci);
        if (!del && ci === w.length) { del = true; return setTimeout(tick, 1600) }
        if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length }
        ci += del ? -1 : 1; setTimeout(tick, del ? 30 : 60);
    }
    tick();
    // Brillo que sigue al cursor
    var hero = document.querySelector('.hero');
    hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); hero.style.setProperty('--mx', (e.clientX - r.left) + 'px'); hero.style.setProperty('--my', (e.clientY - r.top) + 'px') });
    // Barra de progreso y navegación activa
    var bar = document.getElementById('progress');
    addEventListener('scroll', function () { var h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%' }, { passive: true });
    var links = [].slice.call(document.querySelectorAll('nav ul a'));
    var secObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id) }) } }) }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section').forEach(function (s) { secObs.observe(s) });
    // Aparición, barras y contadores
    function count(n) { var t = +n.dataset.count, i = 0; if (reduce) { n.textContent = t; return } var s = setInterval(function () { i++; n.textContent = i; if (i >= t) clearInterval(s) }, 220) }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); e.target.querySelectorAll('.fill').forEach(function (f) { f.classList.add('go') }); io.unobserve(e.target) } }) }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(function (r) { io.observe(r) });
    document.querySelectorAll('[data-count]').forEach(count);
    // Filtros de proyectos
    var chips = document.querySelectorAll('.chip'), cards = document.querySelectorAll('#proyectos .card');
    chips.forEach(function (c) {
        c.addEventListener('click', function () {
            chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c) });
            cards.forEach(function (k) { k.hidden = !(c.dataset.f === 'all' || k.dataset.c === c.dataset.f) });
        })
    });
})();