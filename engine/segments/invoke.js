// Fungsi buka popup promo
function showPromo() {
  const promoModal = document.getElementById('promoModal');
  if (promoModal && !sessionStorage.getItem('hidePromo')) {
    promoModal.style.display = 'flex';
    promoModal.classList.add('fade-in');
  }
}

// Fungsi tutup popup
function closePromo() {
  const hideCheckbox = document.getElementById('hidePromoCheckbox');
  const promoModal = document.getElementById('promoModal');

  if (hideCheckbox?.checked) {
    sessionStorage.setItem('hidePromo', 'true');
  }

  if (promoModal) {
    promoModal.style.display = 'none';
    promoModal.classList.remove('fade-in');
  }
}

// Event: setelah site loader selesai, tampilkan popup
document.addEventListener('DOMContentLoaded', () => {
  const siteLoader = document.getElementById('siteLoader');

  // Kalau ada site loader, tunggu sampai hilang
  if (siteLoader) {
    const observer = new MutationObserver(() => {
      const hiddenByStyle = siteLoader.style.display === 'none';
      const hiddenByClass = siteLoader.classList.contains('hidden');
      const removedFromDOM = !document.body.contains(siteLoader);

      if (hiddenByStyle || hiddenByClass || removedFromDOM) {
        observer.disconnect();
        setTimeout(showPromo, 500); // Delay 0.5 detik biar smooth
      }
    });

    observer.observe(siteLoader, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  } 
  // Kalau loader nggak ada, langsung tampilkan popup
  else {
    setTimeout(showPromo, 500);
  }
});