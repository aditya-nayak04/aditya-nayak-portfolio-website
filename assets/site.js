// Mobile nav
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (!nav) return;
  nav.classList.toggle('open');
}

function applyTheme(isDark) {
  document.body.classList.toggle('theme-dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(isDark));
  });
  document.querySelectorAll('[data-theme-label]').forEach(label => {
    label.textContent = isDark ? 'Light Theme' : 'Dark Theme';
  });
}

function toggleTheme() {
  const isDark = !document.body.classList.contains('theme-dark');
  applyTheme(isDark);
  try {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  } catch (err) {
    // Ignore storage errors and keep the in-memory toggle working.
  }
  updateActiveNavState();
}

// Tabs
function switchTab(idx) {
  document.querySelectorAll('.tab-content').forEach((c,i) => {
    c.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.tab-btn').forEach((b,i) => {
    b.classList.toggle('active', i === idx);
    b.classList.toggle('text-slate-600', i !== idx);
  });
}

// Scroll Reveal with IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Counter Animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const steps = 55;
  let current = 0;
  const inc = target / steps;
  el.textContent = '0' + suffix;
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, duration / steps);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const metricsSection = document.querySelector('[data-metrics]');
if (metricsSection) counterObserver.observe(metricsSection);

// Smooth nav scroll — offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Nav active state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
function updateActiveNavState() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  const activeColor = document.body.classList.contains('theme-dark') ? '#eef4ff' : '#0f172a';
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? activeColor : '';
    a.style.fontWeight = a.getAttribute('href') === '#' + current ? '700' : '';
  });
}
window.addEventListener('scroll', updateActiveNavState);

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('portfolio-theme');
} catch (err) {
  savedTheme = null;
}
applyTheme(savedTheme === 'dark');
updateActiveNavState();



// ══ Swiper — iPhone 17 Pro ═════════════════════════════════════
const swipers = {};
function initSwiper(id, autoMs) {
  const track = document.getElementById(id+'-track');
  const dotsEl = document.getElementById(id+'-dots');
  const thumbsEl = document.getElementById(id+'-thumbs');
  if (!track) return;
  const slides = track.querySelectorAll('.sw-slide');
  const count = slides.length;
  let cur=0, timer=null, dragging=false, sx=0;
  if (dotsEl) {
    dotsEl.innerHTML='';
    slides.forEach((_,i)=>{
      const d=document.createElement('div');
      d.className='sw-dot'+(i===0?' on':'');
      d.onclick=()=>goTo(i);
      dotsEl.appendChild(d);
    });
  }
  function syncUI(){
    dotsEl&&dotsEl.querySelectorAll('.sw-dot').forEach((d,i)=>d.classList.toggle('on',i===cur));
    thumbsEl&&thumbsEl.querySelectorAll('.pm-thumb').forEach((t,i)=>t.classList.toggle('active',i===cur));
  }
  function goTo(idx){
    cur=((idx%count)+count)%count;
    track.style.transform=`translateX(-${cur*100}%)`;
    syncUI();
  }

  function startAuto(){clearInterval(timer);timer=setInterval(()=>goTo(cur+1),autoMs);}
  function stopAuto(){clearInterval(timer);}
  const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?startAuto():stopAuto()),{threshold:.3});
  io.observe(track.closest('.sw-outer')||track);
  const el=track.closest('.sw-outer')||track.parentElement;
  el.addEventListener('mousedown',e=>{dragging=true;sx=e.clientX;stopAuto();});
  el.addEventListener('touchstart',e=>{dragging=true;sx=e.touches[0].clientX;stopAuto();},{passive:true});
  window.addEventListener('mouseup',e=>{if(!dragging)return;dragging=false;const dx=e.clientX-sx;if(Math.abs(dx)>40)goTo(dx>0?cur-1:cur+1);startAuto();});
  window.addEventListener('touchend',e=>{if(!dragging)return;dragging=false;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)goTo(dx>0?cur-1:cur+1);startAuto();});
  swipers[id]={goTo,startAuto,stopAuto};
  goTo(0);
}
document.addEventListener('click',e=>{
  const t=e.target.closest('.pm-thumb[data-sw]');
  if(t&&swipers[t.dataset.sw]) swipers[t.dataset.sw].goTo(+t.dataset.idx);
});
initSwiper('sw0',2800);
initSwiper('sw1',3400);
initSwiper('sw2',2600);

// Scroll reveal
const srObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.07,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.sr').forEach(el=>srObs.observe(el));

const origSwitch = typeof window.switchTab === 'function' ? window.switchTab : null;
if (origSwitch) {
  window.switchTab = function(idx) {
    origSwitch(idx);
    setTimeout(() => {
      document.querySelectorAll('.sr').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
      const sw = ['sw0', 'sw1', 'sw2'][idx];
      if (sw && swipers[sw]) swipers[sw].startAuto();
    }, 80);
  };
}
