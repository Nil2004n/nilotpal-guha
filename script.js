/* ============================================================
   NILOTPAL GUHA — SHARED JAVASCRIPT
   Performance-conscious, defer'd, RAF-throttled
   ============================================================ */

(function () {
  'use strict';

  /* ---- Page Visibility API — pause animations when hidden ---- */
  let animationsPaused = false;
  document.addEventListener('visibilitychange', function () {
    animationsPaused = document.hidden;
  });

  /* ---- Boot Sequence ---- */
  function initBoot() {
    var overlay = document.querySelector('.boot-overlay');
    if (!overlay) return;
    var lines = overlay.querySelectorAll('.boot-line');
    lines.forEach(function (line, i) {
      setTimeout(function () {
        line.classList.add('visible');
      }, i * 180);
    });
    setTimeout(function () {
      overlay.classList.add('fade-out');
      setTimeout(function () { overlay.remove(); }, 600);
    }, lines.length * 180 + 600);
  }

  /* ---- Mobile Nav Toggle ---- */
  function initNav() {
    var hamburger = document.querySelector('.nav-hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active Nav Link ---- */
  function setActiveNavLink() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '/' || href === '/index.html' || href === 'index.html') {
        if (path === '/' || path.endsWith('/index.html')) {
          link.classList.add('active');
        }
      } else if (path.indexOf(href.replace(/^\.\.?\/?/, '/')) !== -1 && href !== '#') {
        link.classList.add('active');
      }
    });
  }

  /* ---- Scroll Reveal (IntersectionObserver) ---- */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal, .reveal-flip');
    if (!elements.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Card 3D Tilt Toward Cursor ---- */
  function initCardTilt() {
    var cards = document.querySelectorAll('.card, .badge');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        if (animationsPaused) return;
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -5;
        var rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---- Decrypt / Scramble Text Effect ---- */
  function initDecryptText() {
    var elements = document.querySelectorAll('.decrypt-text');
    if (!elements.length) return;
    var chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01';
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          decryptElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    elements.forEach(function (el) { observer.observe(el); });

    function decryptElement(el) {
      var scrambleEl = el.querySelector('.scramble-text');
      var realText = el.querySelector('.real-text');
      if (!scrambleEl || !realText) return;
      var target = realText.textContent;
      var iterations = 0;
      var maxIterations = 20;
      var interval = setInterval(function () {
        if (animationsPaused) return;
        scrambleEl.textContent = target.split('').map(function (char, i) {
          if (i < iterations) return target[i];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iterations += 1;
        if (iterations > target.length) {
          clearInterval(interval);
          el.classList.add('decrypted');
        }
      }, 30);
    }
  }

  /* ---- Matrix Rain (Canvas) ---- */
  function initMatrixRain(canvasId, opacity) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, columns, drops;
    var fontSize = 14;
    var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      columns = Math.floor(W / fontSize);
      drops = [];
      for (var i = 0; i < columns; i++) { drops[i] = Math.random() * -100; }
    }

    function draw() {
      if (animationsPaused) { requestAnimationFrame(draw); return; }
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      for (var i = 0; i < columns; i++) {
        var text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  /* ---- Three.js Hero (lazy load) ---- */
  function initHero3D() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    function loadThree() {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.defer = true;
      script.onload = function () {
        if (typeof THREE === 'undefined') return;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(400, 400);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        var geometry = new THREE.IcosahedronGeometry(1.5, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff41, wireframe: true, transparent: true, opacity: 0.6 });
        var ico = new THREE.Mesh(geometry, material);
        scene.add(ico);

        var innerGeometry = new THREE.IcosahedronGeometry(1.0, 0);
        var innerMaterial = new THREE.MeshBasicMaterial({ color: 0x0d7377, wireframe: true, transparent: true, opacity: 0.3 });
        var inner = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(inner);

        camera.position.z = 4;

        var mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', function (e) {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
        });

        function animate() {
          if (animationsPaused) { requestAnimationFrame(animate); return; }
          requestAnimationFrame(animate);
          ico.rotation.x += 0.003;
          ico.rotation.y += 0.005;
          inner.rotation.x -= 0.005;
          inner.rotation.y -= 0.003;
          ico.rotation.x += mouseY;
          ico.rotation.y += mouseX;
          inner.rotation.x -= mouseY * 0.5;
          inner.rotation.y -= mouseX * 0.5;
          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', function () {
          var size = Math.min(400, window.innerWidth * 0.8);
          renderer.setSize(size, size);
        });
      };
      document.head.appendChild(script);
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadThree);
    } else {
      setTimeout(loadThree, 200);
    }
  }

  /* ---- Typing Effect for Contact ---- */
  function initTypingEffect() {
    var el = document.querySelector('.typing-effect');
    if (!el) return;
    var text = el.getAttribute('data-text');
    el.textContent = '';
    var i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50 + Math.random() * 50);
      }
    }
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        type();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
  }

  /* ---- Footer Year ---- */
  function setFooterYear() {
    var el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initBoot();
    initNav();
    setActiveNavLink();
    initScrollReveal();
    initCardTilt();
    initDecryptText();
    initTypingEffect();
    setFooterYear();

    // Lazy-load matrix rain after first paint
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () {
        var lightCanvas = document.getElementById('matrix-light');
        var fullCanvas = document.getElementById('matrix-full');
        if (lightCanvas) initMatrixRain('matrix-light', 0.04);
        if (fullCanvas) initMatrixRain('matrix-full', 0.07);
      });
    } else {
      setTimeout(function () {
        var lightCanvas = document.getElementById('matrix-light');
        var fullCanvas = document.getElementById('matrix-full');
        if (lightCanvas) initMatrixRain('matrix-light', 0.04);
        if (fullCanvas) initMatrixRain('matrix-full', 0.07);
      }, 300);
    }

    // Lazy-load hero 3D after paint
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initHero3D);
    } else {
      setTimeout(initHero3D, 500);
    }
  });
})();
