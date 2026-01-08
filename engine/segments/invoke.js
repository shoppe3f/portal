// /engine/segments/invoke.js
// Handle popup promo Alexis4D (tanpa loader)

export default function invoke() {
  document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("promoPopup");
    const closeBtn = popup?.querySelector(".promo-close");
    const hideCheckbox = popup?.querySelector("#hidePromoCheckbox");

    if (!popup) return;

    // Cek apakah user memilih menyembunyikan popup (per tab)
    if (sessionStorage.getItem("hidePromo") === "true") return;

    // Tampilkan popup dengan delay ringan agar smooth
    setTimeout(() => {
      popup.style.display = "flex";
      popup.style.opacity = "1";
    }, 600);

    // Fungsi tutup popup
    function closePopup() {
      popup.style.opacity = "0";
      setTimeout(() => {
        popup.style.display = "none";
      }, 300);

      if (hideCheckbox && hideCheckbox.checked) {
        sessionStorage.setItem("hidePromo", "true");
      }
    }

    // Event close button
    if (closeBtn) {
      closeBtn.addEventListener("click", closePopup);
    }

    // Klik area overlay untuk menutup
    popup.addEventListener("click", (e) => {
      if (e.target === popup) closePopup();
    });
  });
}
