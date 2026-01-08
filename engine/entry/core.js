// /engine/entry/core.js
// Core initializer – production ready

const modulesToLoad = [
  '/engine/entry/bootloader.js',
  '/engine/segments/invoke.js'
];

async function initializeCoreApp() {
  for (const modulePath of modulesToLoad) {
    try {
      const mod = await import(modulePath);

      if (typeof mod.default === 'function') {
        mod.default();
      } else if (typeof mod.init === 'function') {
        mod.init();
      }
    } catch (err) {
      // Fail silently in production
    }
  }

  initNavbar();
  initSidebarToggle();
}

/* =========================
   NAVBAR / LOGIN MODAL
   ========================= */
function initNavbar() {
  const loginBtn = document.querySelector('.btn.login');
  const modal = document.getElementById('loginModal');
  const closeBtn = modal?.querySelector('.close-btn');

  if (!loginBtn || !modal || !closeBtn) return;

  loginBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

/* =========================
   SIDEBAR TOGGLE
   =========================
