document.addEventListener('click', function(e) {
  const promoModal = document.getElementById('promo');
  if (promoModal.classList.contains('show')) {
    const img = promoModal.querySelector('.imgpop');
    if (!img.contains(e.target)) {
      const modal = bootstrap.Modal.getInstance(promoModal);
      modal.hide();
    }
  }
});