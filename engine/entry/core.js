// /engine/entry/core.js
// Core App Initializer (tanpa loader)

const modulesToLoad = [
  '/engine/segments/invoke.js' // hanya popup & logic aktif
];

async function initializeCoreApp() {
  console.log('[core] Inisialisasi aplikasi...');

  for (const modulePath of modulesToLoad) {
    try {
      const mod = await import(modulePath);

      if (typeof mod.default === 'function') {
        mod.default();
        console.log(`[core] Modul ${modulePath} dijalankan.`);
      } else if (typeof mod.init === 'function') {
        mod.init();
        console.log(`[core] Modul ${modulePath} diinisialisasi.`);
      } else {
        console.log(`[core] Modul ${modulePath} dimuat (tanpa init).`);
      }
    } catch (err) {
      console.error(`[core] Gagal memuat modul: ${modulePath}`, err);
    }
  }

  // UI init (aman walau elemennya tidak ada)
  initNavbar();
  initSidebarToggle();
}

/* =========================
   OPTIONAL UI (AMAN)
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
    if (e.target === modal) modal.style.display = 'none';
  });

  console.log('[core] Navbar login siap.');
}

function initSidebarToggle() {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
    sidebar.classList.toggle('collapsed');
  });

  console.log('[core] Sidebar toggle siap.');
}

document.addEventListener('DOMContentLoaded', initializeCoreApp);
