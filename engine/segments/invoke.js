// Fungsi buka popup promo
  function showPromo() {
    // Cek apakah user sebelumnya memilih untuk menyembunyikan popup
    if (!sessionStorage.getItem('hidePromo')) {
      document.getElementById('promoModal').style.display = 'flex';
    }
  }

  // Fungsi tutup popup
  function closePromo() {
    const hideCheckbox = document.getElementById('hidePromoCheckbox');
    if (hideCheckbox.checked) {
      // Simpan di sessionStorage agar popup tidak muncul lagi di tab ini
      sessionStorage.setItem('hidePromo', 'true');
    }
    document.getElementById('promoModal').style.display = 'none';
  }

  // Event: setelah site loader selesai, tampilkan popup
  document.addEventListener('DOMContentLoaded', function() {
    const siteLoader = document.getElementById('siteLoader');

    if (siteLoader) {
      // Observasi loader sampai hilang
      const observer = new MutationObserver(() => {
        if (siteLoader.style.display === 'none' || siteLoader.classList.contains('hidden')) {
          observer.disconnect();
          setTimeout(showPromo, 500); // beri jeda 0.5 detik biar smooth
        }
      });
      observer.observe(siteLoader, { attributes: true, attributeFilter: ['style', 'class'] });
    } else {
      // Kalau loader gak ada, langsung tampilkan popup
      setTimeout(showPromo, 500);
    }
  });