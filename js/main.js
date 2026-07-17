(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll("[data-nav]");

  const setMenu = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("nav-open", open);
  };

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      setMenu(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const sections = [
    { id: "topo", el: document.getElementById("topo") },
    { id: "sobre", el: document.getElementById("sobre") },
    { id: "servicos", el: document.getElementById("servicos") },
    { id: "processo", el: document.getElementById("processo") },
    { id: "contato", el: document.getElementById("contato") },
  ].filter((s) => s.el);

  const setActiveNav = () => {
    const y = window.scrollY + 120;
    let current = "topo";
    for (const section of sections) {
      if (section.el.offsetTop <= y) current = section.id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const id = href.replace("#", "");
      link.classList.toggle("is-active", id === current);
    });
  };
  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.getAttribute("data-delay") || 0);
          window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const formatCount = (value, format) => {
    if (format === "dot") {
      return value.toLocaleString("pt-BR");
    }
    return String(value);
  };

  const animateCount = (el) => {
    const target = Number(el.getAttribute("data-count") || 0);
    const prefix = el.getAttribute("data-prefix") || "";
    const format = el.getAttribute("data-format") || "";
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${formatCount(value, format)}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          cio.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  }
})();
