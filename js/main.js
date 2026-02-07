/* ============================================
   WATTx Project Website — Interactions
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const body = this.nextElementSibling;

      // Close all other accordion items
      document.querySelectorAll('.accordion-header').forEach(function (h) {
        h.setAttribute('aria-expanded', 'false');
        h.nextElementSibling.style.maxHeight = null;
      });

      // Toggle current
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Animations (IntersectionObserver) ---
  var animTargets = document.querySelectorAll(
    '.card, .spec-card, .download-card, .accordion-item, .table-wrap, .specs-grid'
  );

  animTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Active Nav Highlight on Scroll ---
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          a.style.color = '';
        });
        var active = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (active) {
          active.style.color = '#E8D44D';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // --- Electricity Arcs Around Hero Logo ---
  var bolts = document.querySelectorAll('.bolt');
  var cx = 150, cy = 150, innerR = 70, outerR = 135;

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function generateArc(startAngle) {
    var points = [];
    var angle = startAngle;
    var r = innerR;
    var steps = Math.floor(randomBetween(4, 8));

    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var currentR = innerR + (outerR - innerR) * t;
      var jitterAngle = angle + randomBetween(-0.3, 0.3);
      var jitterR = currentR + randomBetween(-12, 12);
      var x = cx + Math.cos(jitterAngle) * jitterR;
      var y = cy + Math.sin(jitterAngle) * jitterR;
      points.push(x.toFixed(1) + ',' + y.toFixed(1));
    }

    return points.join(' ');
  }

  function fireArc() {
    var bolt = bolts[Math.floor(Math.random() * bolts.length)];
    var angle = Math.random() * Math.PI * 2;
    bolt.setAttribute('points', generateArc(angle));

    // Reset animation
    bolt.style.animation = 'none';
    bolt.offsetHeight; // trigger reflow
    bolt.style.animation = '';

    // Randomize color between bright gold and white
    var colors = ['#E8D44D', '#F5E97D', '#FFFBE6', '#E8D44D', '#FFD700'];
    bolt.style.stroke = colors[Math.floor(Math.random() * colors.length)];
    bolt.style.strokeWidth = randomBetween(1.5, 3).toFixed(1);
  }

  // Fire arcs at random intervals
  function scheduleArc() {
    fireArc();
    setTimeout(scheduleArc, randomBetween(80, 400));
  }

  // Fire 2-3 arcs simultaneously sometimes
  function scheduleBurst() {
    var count = Math.floor(randomBetween(2, 4));
    for (var i = 0; i < count; i++) {
      fireArc();
    }
    setTimeout(scheduleBurst, randomBetween(600, 2000));
  }

  scheduleArc();
  setTimeout(scheduleBurst, 1000);
})();
