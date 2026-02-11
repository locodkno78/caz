const load = async (id, file) => {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
};

export const cargarComponentesComunes = async () => {
  await Promise.all([
    load("navBar", "../navBar.html"),
    load("whatsApp", "../whatsApp.html"),
    load("footer", "../footer.html"),
    load("cards", "../../cards.html"),
  ]);
};


