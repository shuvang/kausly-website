/* ── HAMBURGER MENU ── */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  // Close when any nav link is clicked
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the navbar area
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Auto-close and reset on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 769) {
      closeMenu();
    }
  });
})();

/* ── SERVICES CARDS ── */
(function () {
  const cards = Array.from(document.querySelectorAll('.service-card'));
  const isDesktop = function () { return window.innerWidth >= 769; };

  function closeAll() {
    cards.forEach(function (c) { c.classList.remove('active'); });
  }

  cards.forEach(function (card) {
    const btn = card.querySelector('.service-plus-btn');

    // Desktop: hover open/close
    card.addEventListener('mouseenter', function () {
      if (isDesktop()) card.classList.add('active');
    });
    card.addEventListener('mouseleave', function () {
      if (isDesktop()) card.classList.remove('active');
    });

    // Mobile: plus button toggles; only one open at a time
    btn.addEventListener('click', function (e) {
      if (isDesktop()) return;
      e.stopPropagation();
      var isOpen = card.classList.contains('active');
      closeAll();
      if (!isOpen) card.classList.add('active');
    });
  });

  // Clicking outside closes all on mobile
  document.addEventListener('click', function () {
    if (!isDesktop()) closeAll();
  });

  // Stagger-in on scroll into view (once)
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (card) { observer.observe(card); });
  } else {
    // Fallback: show all immediately
    cards.forEach(function (card) { card.classList.add('in-view'); });
  }
})();

/* ── TESTIMONIALS SLIDER ── */
(function () {
  const cards    = Array.from(document.querySelectorAll('.testimonial-card'));
  const prevBtns = Array.from(document.querySelectorAll('.t-arrow-prev'));
  const nextBtns = Array.from(document.querySelectorAll('.t-arrow-next'));
  const slider   = document.getElementById('testimonials-slider');

  let current     = 0;
  let autoTimer   = null;
  let resumeTimer = null;
  let isAnimating = false;

  // Init: show first card
  cards[0].classList.add('active');

  function goTo(index, direction) {
    if (isAnimating || index === current) return;
    isAnimating = true;

    const prev = current;
    current = (index + cards.length) % cards.length;

    // Exit current card
    cards[prev].classList.remove('active');
    cards[prev].classList.add(direction === 'next' ? 'exit-left' : 'exit-right');

    // Prepare incoming card on the opposite side, then animate in
    cards[current].style.transition = 'none';
    cards[current].style.transform  = direction === 'next' ? 'translateX(40px)' : 'translateX(-40px)';
    cards[current].style.opacity    = '0';
    cards[current].offsetHeight; // force reflow
    cards[current].style.transition = '';
    cards[current].style.transform  = '';
    cards[current].style.opacity    = '';
    cards[current].classList.add('active');

    setTimeout(function () {
      cards[prev].classList.remove('exit-left', 'exit-right');
      isAnimating = false;
    }, 420);
  }

  function next() { goTo(current + 1, 'next'); }
  function prev() { goTo(current - 1, 'prev'); }

  function startAuto()      { autoTimer = setInterval(next, 4000); }
  function stopAuto()       { clearInterval(autoTimer); }
  function pauseAndResume() { stopAuto(); clearTimeout(resumeTimer); resumeTimer = setTimeout(startAuto, 6000); }

  prevBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { prev(); pauseAndResume(); });
  });
  nextBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { next(); pauseAndResume(); });
  });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', function () { clearTimeout(resumeTimer); startAuto(); });

  var touchStartX = 0;
  var touchStartY = 0;
  slider.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    dx < 0 ? next() : prev();
    pauseAndResume();
  }, { passive: true });

  startAuto();
})();

/* ── CTA EFFECTS ── */
(function () {
  var box      = document.getElementById('cta-box');
  var glow     = document.getElementById('cta-glow');
  if (!box || !glow) return;

  var lastSpawn = 0;
  var chars = ['0', '1'];

  // --- Cursor glow ---
  box.addEventListener('mousemove', function (e) {
    var rect = box.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    glow.style.background =
      'radial-gradient(400px circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.04) 0%, transparent 70%)';

    // --- Floating binary chars (throttled) ---
    var now = Date.now();
    if (now - lastSpawn < 80) return;
    lastSpawn = now;

    var span = document.createElement('span');
    span.textContent = chars[Math.random() < 0.5 ? 0 : 1];
    span.style.cssText = [
      'position:absolute',
      'font-size:11px',
      'font-family:monospace',
      'color:rgba(255,255,255,0.25)',
      'pointer-events:none',
      'user-select:none',
      'z-index:2',
      'left:' + (x + (Math.random() * 40 - 20)) + 'px',
      'top:'  + (y + (Math.random() * 40 - 20)) + 'px',
      'transition:transform 1.2s ease, opacity 1.2s ease',
      'will-change:transform,opacity'
    ].join(';');

    box.appendChild(span);

    // Trigger animation next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        span.style.transform = 'translateY(-40px)';
        span.style.opacity   = '0';
      });
    });

    setTimeout(function () { span.remove(); }, 1300);
  });

  // Fade glow out on leave
  box.addEventListener('mouseleave', function () {
    glow.style.background = 'transparent';
  });

  // --- Static binary background grid ---
  for (var i = 0; i < 40; i++) {
    var s = document.createElement('span');
    s.textContent = chars[Math.random() < 0.5 ? 0 : 1];
    s.style.cssText = [
      'position:absolute',
      'font-size:10px',
      'font-family:monospace',
      'color:rgba(255,255,255,0.04)',
      'pointer-events:none',
      'user-select:none',
      'z-index:0',
      'left:' + Math.random() * 100 + '%',
      'top:'  + Math.random() * 100 + '%'
    ].join(';');
    box.appendChild(s);
  }
})();

/* ── BILLING TOGGLE ── */
let annual = false;

const monthly = { basic: 'Rs.39,999', pro: 'Rs.79,999', max: 'Rs.1,29,999' };
const annualP = { basic: 'Rs.35,999', pro: 'Rs.71,999', max: 'Rs.1,16,999' };

function toggleBilling() {
  annual = !annual;
  const track = document.getElementById('toggle-track');
  const lblM  = document.getElementById('lbl-monthly');
  const lblA  = document.getElementById('lbl-annual');
  const prices = annual ? annualP : monthly;

  track.classList.toggle('on', annual);
  lblM.className = annual ? 'billing-label dim' : 'billing-label';
  lblA.className = annual ? 'billing-label' : 'billing-label dim';

  document.getElementById('price-basic').textContent = prices.basic;
  document.getElementById('price-pro').textContent   = prices.pro;
  document.getElementById('price-max').textContent   = prices.max;
}
