(function () {
  // Agenda: filtros por categoría
  var botones = document.querySelectorAll('.filtros button');
  botones.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      botones.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var mes = null, visibles = 0;
      function cerrarMes() { if (mes) mes.hidden = visibles === 0; }
      document.querySelectorAll('#agenda-lista > li').forEach(function (li) {
        if (li.classList.contains('mes')) { cerrarMes(); mes = li; visibles = 0; return; }
        var cats = (li.getAttribute('data-c') || '').split(' ');
        li.hidden = !(f === 'todo' || cats.indexOf(f) !== -1);
        if (!li.hidden) visibles++;
      });
      cerrarMes();
    });
  });

  // Contacto: el formulario se envía por FormSubmit al correo del medio (sin código extra).

  // Encuesta: guarda el voto solo en este navegador
  var encuesta = document.getElementById('encuesta');
  if (encuesta) {
    var clave = 'apagon-encuesta-' + encuesta.getAttribute('data-id');
    var ops = encuesta.querySelectorAll('.opciones button');
    var gracias = document.getElementById('gracias');
    function marcar(v) {
      ops.forEach(function (o) { o.setAttribute('aria-pressed', o.getAttribute('data-v') === v ? 'true' : 'false'); });
      gracias.hidden = false;
    }
    try { var previo = localStorage.getItem(clave); if (previo) marcar(previo); } catch (e) {}
    ops.forEach(function (o) {
      o.addEventListener('click', function () {
        var v = o.getAttribute('data-v');
        marcar(v);
        try { localStorage.setItem(clave, v); } catch (e) {}
      });
    });
  }

  // Compartir: arma los links con la dirección de la nota
  var url = encodeURIComponent(location.href.split('#')[0]);
  var titulo = encodeURIComponent(document.title);
  var wa = document.getElementById('sh-wa'), fb = document.getElementById('sh-fb'), x = document.getElementById('sh-x');
  if (wa) wa.href = 'https://wa.me/?text=' + titulo + '%20' + url;
  if (fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  if (x) x.href = 'https://twitter.com/intent/tweet?text=' + titulo + '&url=' + url;
})();
