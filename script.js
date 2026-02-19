// ====== CONFIGURE AQUI ======
const WHATS_NUMBER = "5537991123188"; // DDI+DDD+numero (sem espaços)
const EMAIL = "igor05249@gmail.com";
const GITHUB_URL = "https://github.com/Igor05-hux";
// ============================

/* Ano */
document.getElementById("year").textContent = new Date().getFullYear();

/* Menu mobile */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn?.addEventListener("click", () => menu.classList.toggle("open"));
menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

/* Tema */
const themeBtn = document.getElementById("themeBtn");
function setTheme(mode){
  if(mode === "light") document.documentElement.classList.add("light");
  else document.documentElement.classList.remove("light");
  localStorage.setItem("theme", mode);
  if(themeBtn) themeBtn.textContent = mode === "light" ? "🌞" : "🌙";
}
setTheme(localStorage.getItem("theme") || "dark");
themeBtn?.addEventListener("click", () => {
  const isLight = document.documentElement.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

/* WhatsApp helpers */
function wa(message){
  const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const whatsQuick = document.getElementById("whatsQuick");
if (whatsQuick) {
  whatsQuick.href = `https://wa.me/${WHATS_NUMBER}`;
}

/* Filtro de projetos */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "todos" || tags.includes(filter);
      card.style.display = show ? "grid" : "none";
    });
  });
});

/* Modal de projetos (dados) */
const PROJECTS = {
  docs: {
    title: "Sistema de Documentos",
    desc: "Upload/download, listagem, validações e integração por API.",
    bullets: [
      "CRUD completo com validações",
      "Upload e persistência de arquivos",
      "Integração via endpoints REST",
      "Organização em camadas + boas práticas"
    ],
    tags: ["Java", "Spring", "SQL", "REST"],
    link: GITHUB_URL
  },
  landing: {
    title: "Landing Page",
    desc: "Página moderna e responsiva, focada em conversão.",
    bullets: [
      "CTA estratégico + seções objetivas",
      "Formulário funcional (WhatsApp)",
      "Boa performance e responsividade",
      "Componentes reutilizáveis"
    ],
    tags: ["HTML", "CSS", "JS"],
    link: "#"
  },
  api: {
    title: "API de Pagamentos",
    desc: "Endpoints, regras de negócio e integração com banco de dados.",
    bullets: [
      "Endpoints REST com validação",
      "Camadas (service/repository)",
      "Logs e tratamento de erros",
      "Base SQL + modelagem"
    ],
    tags: ["Spring", "REST", "PostgreSQL"],
    link: GITHUB_URL
  }
};

/* Modal handlers */
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const mTitle = document.getElementById("mTitle");
const mDesc = document.getElementById("mDesc");
const mBullets = document.getElementById("mBullets");
const mTags = document.getElementById("mTags");
const mLink = document.getElementById("mLink");

function openModal(id){
  const p = PROJECTS[id];
  if(!p) return;

  mTitle.textContent = p.title;
  mDesc.textContent = p.desc;

  mBullets.innerHTML = "";
  p.bullets.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    mBullets.appendChild(li);
  });

  mTags.innerHTML = "";
  p.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    mTags.appendChild(span);
  });

  mLink.href = p.link || "#";

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".js-open").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.id));
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  const target = e.target;
  if (target?.dataset?.close === "true") closeModal();
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && modal?.classList.contains("show")) closeModal();
});

/* Contato -> WhatsApp */
const formHint = document.getElementById("formHint");
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const goal = document.getElementById("cGoal").value.trim();
  const msg = document.getElementById("cMsg").value.trim();

  if(!name || !goal || !msg){
    if(formHint) formHint.textContent = "Preencha todos os campos.";
    return;
  }

  if(formHint) formHint.textContent = "Abrindo WhatsApp…";

  const text =
`Olá! Me chamo ${name}.
Preciso de: ${goal}

Detalhes:
${msg}`;

  wa(text);

  setTimeout(() => { if(formHint) formHint.textContent = ""; }, 2500);
  contactForm.reset();
});

/* Copiar email */
const copyEmail = document.getElementById("copyEmail");
const emailText = document.getElementById("emailText");
if(emailText) emailText.textContent = EMAIL;

copyEmail?.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(EMAIL);
    copyEmail.textContent = "Email copiado ✅";
    setTimeout(() => copyEmail.textContent = "Copiar email", 2000);
  }catch{
    alert("Não foi possível copiar. Email: " + EMAIL);
  }
});