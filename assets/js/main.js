(function () {
  // Año
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Lightbox
  var gallery = document.getElementById('gallery');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  if (lightbox && lbImg && gallery) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery__item'));
    var idx = 0;

    function visibleItems() {
      return items.filter(function (i) {
        return i.style.display !== 'none';
      });
    }

    function open(item) {
      var vis = visibleItems();
      idx = vis.indexOf(item);
      if (idx < 0) idx = 0;
      show(vis[idx]);
    }

    function show(item) {
      var src = item.getAttribute('data-src') || item.querySelector('img').src;
      lbImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function move(dir) {
      var vis = visibleItems();
      if (!vis.length) return;
      idx = (idx + dir + vis.length) % vis.length;
      show(vis[idx]);
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    gallery.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery__item');
      if (item) open(item);
    });

    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { move(-1); });
    document.getElementById('lbNext').addEventListener('click', function () { move(1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });
  }

  // Formulario → mailto
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var interest = document.getElementById('interest').value;
      var message = document.getElementById('message').value.trim();
      var status = document.getElementById('formStatus');

      if (!name || !email || !message) {
        status.style.display = 'block';
        status.style.color = '#b04a3a';
        status.textContent = (window.I18N && I18N.t('contact.form.required')) ||
          'Por favor, rellena nombre, email y mensaje.';
        return;
      }

      var subject = '[Mas Collades] ' + interest + ' — ' + name;
      var body =
        'Nombre: ' + name + '\n' +
        'Email: ' + email + '\n' +
        (phone ? 'Teléfono: ' + phone + '\n' : '') +
        'Interés: ' + interest + '\n\n' +
        message;

      var href = 'mailto:martha@mascollades.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      status.style.display = 'block';
      status.style.color = '#6f7d52';
      status.textContent = (window.I18N && I18N.t('contact.form.opening')) ||
        'Abriendo tu aplicación de correo...';

      window.location.href = href;
    });
  }
})();
