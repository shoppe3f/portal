// /engine/bootloader.js
export default function bootloader() {
  const loader = document.getElementById('siteLoader');
  const popup = document.getElementById('popup-alexis4d');

  if (!loader) return;

  // Fungsi buat sembunyikan loader
  const hideLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.remove();
      if (popup && localStorage.getItem("hideAlexis4DPopup") !== "true") {
        popup.style.display = 'flex';
      }
    }, 400); // sesuai transition CSS
  };

  // Event normal (nunggu semua asset selesai)
  window.addEventListener('load', hideLoader);

  // Safety timeout (misal ada asset yang lama banget)
  setTimeout(hideLoader, 3000); // force hide setelah 3 detik
}
