const isGitHubPages = location.hostname.includes("github.io");
const BASE_PATH = isGitHubPages ? "/caz" : "";

const load = async (id, file) => {
  const container = document.getElementById(id);
  if (!container) return;

  const res = await fetch(`${BASE_PATH}${file}`);
  if (!res.ok) {
    console.error("No se pudo cargar:", file);
    return;
  }

  container.innerHTML = await res.text();
};

export const cargarComponentesComunes = async () => {
  await Promise.all([
    load("navBar", "/COMPONENTS/navBar.html"),
    load("whatsApp", "/COMPONENTS/whatsApp.html"),
    load("footer", "/COMPONENTS/footer.html"),
    load("cards", "/COMPONENTS/cards.html"),
  ]);
};



