const load = async (id, file) => {
  const res = await fetch(file);
  document.getElementById(id).innerHTML = await res.text();
};

export const cargarComponentesComunes = () => {
  load("navBar", "../navBar.html");
  load("whatsApp", "../whatsApp.html");
  load("footer", "../footer.html");
};

const cargarCards = async () => {
  const res = await fetch("../../cards.html");
  const html = await res.text();
  document.getElementById("cards").innerHTML = html;
};

cargarCards();
