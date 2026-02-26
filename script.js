// ====== CONFIGURE AQUI ======
const WHATS_NUMBER = "5537991123188"; // DDI+DDD+numero (sem espaços)
const EMAIL = "igor05249@gmail.com";
const GITHUB_URL = "https://github.com/Igor05-hux";
// ============================

// ====== ORÇA.DEV (CONFIG) ======
const QUOTE_CONFIG = {
  baseByType: {
    landing: 500,
    institucional: 1200,
    ecommerce: 1800,
    sistema: 2500,
  },
  extraPagePrice: 180,
  deadlineMultiplier: {
    normal: 1.0,
    rapido: 1.2,
    urgente: 1.45,
  },
  extras: {
    seo: 250,
    whats: 120,
    blog: 300,
    login: 600,
  },
};
// ============================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function formatBRL(v) {
  return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------- Base (serve para ambas páginas) ---------- */
function initYear() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

function initMenuMobile() {
  const menuBtn = $("#menuBtn");
  const menu = $("#menu");
  if (!menuBtn || !menu) return;

  menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => menu.classList.remove("open"))
  );
}

function initTheme() {
  const themeBtn = $("#themeBtn");
  const setTheme = (mode) => {
    document.documentElement.classList.toggle("light", mode === "light");
    localStorage.setItem("theme", mode);
    if (themeBtn) themeBtn.textContent = mode === "light" ? "🌞" : "🌙";
  };

  setTheme(localStorage.getItem("theme") || "dark");

  if (!themeBtn) return;
  themeBtn.addEventListener("click", () => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
  });
}

function wa(message) {
  const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function initWhatsQuick() {
  const whatsQuick = $("#whatsQuick");
  if (whatsQuick) whatsQuick.href = `https://wa.me/${WHATS_NUMBER}`;
}

/* ---------- Portfólio (só roda no index) ---------- */
function initProjectFilter() {
  const chips = $$(".chip");
  const cards = $$(".project-card");
  if (chips.length === 0 || cards.length === 0) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ");
        const show = filter === "todos" || tags.includes(filter);
        card.style.display = show ? "grid" : "none";
      });
    });
  });
}

function initProjectModal() {
  const modal = $("#projectModal");
  const modalClose = $("#modalClose");
  const mTitle = $("#mTitle");
  const mDesc = $("#mDesc");
  const mBullets = $("#mBullets");
  const mTags = $("#mTags");
  const mLink = $("#mLink");

  const openBtns = $$(".js-open");
  if (!modal || openBtns.length === 0) return;

  const PROJECTS = {
    docs: {
      title: "Sistema de Documentos",
      desc: "Upload/download, listagem, validações e integração por API.",
      bullets: ["CRUD completo com validações", "Upload e persistência de arquivos", "Integração via REST", "Organização em camadas"],
      tags: ["Java", "Spring", "SQL", "REST"],
      link: GITHUB_URL,
    },
    landing: {
      title: "Landing Page",
      desc: "Página moderna e responsiva, focada em conversão.",
      bullets: ["CTA estratégico", "Formulário (WhatsApp)", "Responsiva", "Componentes reutilizáveis"],
      tags: ["HTML", "CSS", "JS"],
      link: "#",
    },
    api: {
      title: "API de Pagamentos",
      desc: "Endpoints, regras de negócio e integração com banco.",
      bullets: ["Endpoints REST", "Camadas service/repository", "Logs e erros", "Base SQL"],
      tags: ["Spring", "REST", "PostgreSQL"],
      link: GITHUB_URL,
    },
  };

  function openModal(id) {
    const p = PROJECTS[id];
    if (!p) return;

    if (mTitle) mTitle.textContent = p.title;
    if (mDesc) mDesc.textContent = p.desc;

    if (mBullets) {
      mBullets.innerHTML = "";
      p.bullets.forEach((b) => {
        const li = document.createElement("li");
        li.textContent = b;
        mBullets.appendChild(li);
      });
    }

    if (mTags) {
      mTags.innerHTML = "";
      p.tags.forEach((t) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = t;
        mTags.appendChild(span);
      });
    }

    if (mLink) mLink.href = p.link || "#";

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  openBtns.forEach((btn) => btn.addEventListener("click", () => openModal(btn.dataset.id)));
  modalClose?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target?.dataset?.close === "true") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
}

function initContactForm() {
  const contactForm = $("#contactForm");
  const formHint = $("#formHint");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cName")?.value?.trim() || "";
    const goal = $("#cGoal")?.value?.trim() || "";
    const msg = $("#cMsg")?.value?.trim() || "";

    if (!name || !goal || !msg) {
      if (formHint) formHint.textContent = "Preencha todos os campos.";
      return;
    }

    if (formHint) formHint.textContent = "Abrindo WhatsApp…";
    wa(`Olá! Me chamo ${name}.\nPreciso de: ${goal}\n\nDetalhes:\n${msg}`);

    setTimeout(() => { if (formHint) formHint.textContent = ""; }, 2000);
    contactForm.reset();
  });
}

function initCopyEmail() {
  const copyEmail = $("#copyEmail");
  const emailText = $("#emailText");
  if (emailText) emailText.textContent = EMAIL;
  if (!copyEmail) return;

  copyEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyEmail.textContent = "Email copiado ✅";
      setTimeout(() => (copyEmail.textContent = "Copiar email"), 2000);
    } catch {
      alert("Não foi possível copiar. Email: " + EMAIL);
    }
  });
}

/* ---------- Orça.dev (só roda no orca.html) ---------- */
function initQuotePage() {
  const form = $("#quoteForm");
  if (!form) return; // se não existir, não é a página do orçamento

  const elType = $("#tipo");
  const elPages = $("#paginas");
  const elDeadline = $("#prazo");
  const elNotes = $("#obs");
  const elValue = $("#valor");
  const elError = $("#formError");
  const extrasInputs = $$(".check input[type='checkbox']");

  const getSelectedExtras = () =>
    extrasInputs.filter((i) => i.checked).map((i) => i.value);

  function calcQuote() {
    const type = elType?.value || "";
    if (!type || !QUOTE_CONFIG.baseByType[type]) return 0;

    const pages = Number(elPages?.value || 1);
    const deadline = elDeadline?.value || "normal";

    const base = QUOTE_CONFIG.baseByType[type];
    const extraPagesCost = Math.max(0, pages - 1) * QUOTE_CONFIG.extraPagePrice;

    const extrasCost = getSelectedExtras().reduce((sum, key) => {
      return sum + (QUOTE_CONFIG.extras[key] ?? 0);
    }, 0);

    const mult = QUOTE_CONFIG.deadlineMultiplier[deadline] ?? 1.0;
    return Math.round((base + extraPagesCost + extrasCost) * mult);
  }

  function render() {
    if (!elValue) return;
    elValue.textContent = formatBRL(calcQuote());
  }

  function validate() {
    if (elError) elError.textContent = "";
    if (!elType?.value) {
      if (elError) elError.textContent = "Selecione o tipo de projeto antes de enviar.";
      elType?.focus?.();
      return false;
    }
    return true;
  }

  [elType, elPages, elDeadline].forEach((el) => el?.addEventListener("change", render));
  extrasInputs.forEach((el) => el.addEventListener("change", render));
  render();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    const quote = calcQuote();
    const extrasText =
      getSelectedExtras().length === 0
        ? "Nenhum"
        : getSelectedExtras()
            .map((key) => extrasInputs.find((i) => i.value === key)?.parentElement?.textContent?.trim() || key)
            .join(", ");

    const msg =
`Olá! Quero um orçamento.

Tipo: ${elType.options[elType.selectedIndex].text}
Páginas: ${elPages?.value || "—"}
Prazo: ${elDeadline.options[elDeadline.selectedIndex].text}
Extras: ${extrasText}
Observações: ${(elNotes?.value || "").trim() || "—"}

Estimativa: ${formatBRL(quote)}`;

    wa(msg);
  });
}

/* ---------- Init geral ---------- */
(function init() {
  initYear();
  initMenuMobile();
  initTheme();
  initWhatsQuick();

  initProjectFilter();
  initProjectModal();
  initContactForm();
  initCopyEmail();

  initQuotePage();
})();