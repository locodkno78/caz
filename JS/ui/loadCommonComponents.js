const load = async (id, file) => {
  const res = await fetch(file);
  document.getElementById(id).innerHTML = await res.text();
};

export const cargarComponentesComunes = () => {
  load("navBar", "../navBar.html");
  load("whatsApp", "../whatsApp.html");
  load("footer", "../footer.html");
  load("cards", "../../cards.html");
};


