(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

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
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Configure WhatsApp number here when available:
  // window.RS_WHATSAPP = "5511999999999";
  const wa = document.getElementById("whatsappCta");
  if (wa && window.RS_WHATSAPP) {
    const msg = encodeURIComponent(
      "Olá, gostaria de solicitar um orçamento da RS Layout."
    );
    wa.href = `https://wa.me/${window.RS_WHATSAPP}?text=${msg}`;
  }
})();
