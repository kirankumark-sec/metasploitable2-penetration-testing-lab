const searchInput = document.getElementById("searchInput");
const cards = [...document.querySelectorAll("#moduleGrid .card")];

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const text = (card.textContent + " " + (card.dataset.keywords || "")).toLowerCase();
      card.style.display = text.includes(q) ? "block" : "none";
    });
  });
}
