// Modul-modul yang akan dimuat
const modulesToLoad = [
  '/engine/entry/bootloader.js',
  '/engine/segments/invoke.js'
];

// Fungsi utama untuk memuat dan menjalankan semua modul
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
        console.log(`[core] Modul ${modulePath} dimuat (tanpa fungsi init/default).`);
      }
    } catch (err) {
      console.error(`[core] Gagal memuat modul: ${modulePath}`, err);
    }
  }

  // Inisialisasi komponen UI
  initNavbar();
  initSidebarToggle();
}

// Fungsi untuk menginisialisasi tombol login dan modal
function initNavbar() {
  const loginBtn = document.querySelector('.btn.login');
  const modal = document.getElementById('loginModal');
  const closeBtn = modal?.querySelector('.close-btn');

  if (loginBtn && modal && closeBtn) {
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

    console.log('[core] Navbar dan modal login siap.');
  } else {
    console.warn('[core] Elemen login/modal tidak ditemukan.');
  }
}

// Fungsi untuk toggle sidebar (expand/collapse)
function initSidebarToggle() {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('expanded');
      sidebar.classList.toggle('collapsed');
    });

    console.log('[core] Sidebar toggle siap.');
  } else {
    console.warn('[core] Sidebar atau tombol toggle tidak ditemukan.');
  }
}

// Jalankan semua saat DOM sudah siap
document.addEventListener('DOMContentLoaded', initializeCoreApp);
