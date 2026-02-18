const load = async (id, file) => {
  const container = document.getElementById(id);
  if (!container) return; // 👈 evita el error

  const res = await fetch(file);
  container.innerHTML = await res.text();
};


export const cargarComponentesComunes = async () => {
  await Promise.all([
    load("navBar", "./COMPONENTS/navBar.html"),
    load("whatsApp", "./COMPONENTS/whatsApp.html"),
    load("footer", "./COMPONENTS/footer.html"),
    load("cards", "./COMPONENTS/cards.html"),
  ]);
};


