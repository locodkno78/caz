const load = async (id, file) => {
  const container = document.getElementById(id);
  if (!container) return; // 👈 evita el error

  const res = await fetch(file);
  container.innerHTML = await res.text();
};


export const cargarComponentesComunes = async () => {
  await Promise.all([
    load("navBar", "../navBar.html"),
    load("whatsApp", "../whatsApp.html"),
    load("footer", "../footer.html"),
    load("cards", "../../cards.html"),
  ]);
};


