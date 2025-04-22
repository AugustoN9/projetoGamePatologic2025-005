const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    document.querySelector("#sec1").scrollIntoView({
  behavior: "smooth",
  block: "start"
});


    // Ativar link da navbar conforme rolagem
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        //if (link.getAttribute("href") === `#${current}`) {
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
          console.log("#" + current)
        }
      });
    });

    // Criar bolinhas para cada carrossel
    document.querySelectorAll(".dots").forEach(dotsContainer => {
      const targetId = dotsContainer.getAttribute("data-dots-for");
      const paginacao = document.getElementById(targetId);
      const items = paginacao.querySelectorAll(".item");

      items.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          paginacao.scrollTo({
            left: index * window.innerWidth,
            behavior: "smooth",
          });
        });
        dotsContainer.appendChild(dot);
      });

      // Atualizar bolinha ativa conforme scroll
      paginacao.addEventListener("scroll", () => {
        const scrollLeft = paginacao.scrollLeft;
        const currentIndex = Math.round(scrollLeft / window.innerWidth);
        dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIndex);
        });
      });
    });

    // Navegar com teclado (← e →)
    window.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      const visibleSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (!visibleSection) return;

      const paginacao = visibleSection.querySelector(".paginacao");
      if (!paginacao) return;

      const direction = e.key === "ArrowRight" ? 1 : -1;
      paginacao.scrollBy({
        left: direction * window.innerWidth,
        behavior: "smooth",
      });
    });