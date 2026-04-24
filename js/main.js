const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const pageName = document.body.dataset.page;
const navLinks = document.querySelectorAll("[data-nav]");
const gamesGrid = document.querySelector("#games-grid");
const gameModal = document.querySelector("#game-modal");
const modalTitle = document.querySelector("#modal-title");
const modalStatus = document.querySelector("#modal-status");
const modalDescription = document.querySelector("#modal-description");
const modalGallery = document.querySelector("#modal-gallery");
const modalLinks = document.querySelector("#modal-links");
const modalCloseButton = document.querySelector(".modal-close");

// Add future games here.
// Each object powers both the game card and the modal content.
// When real screenshots are ready, replace the placeholder files below with paths
// inside each game's folder, for example:
// "assets/images/games/find-the-key/screenshot-1.png"
const games = [
  {
    id: "find-the-key",
    title: "Find The Key",
    status: "Prototype",
    shortDescription: "A puzzle-driven game about exploring a compact space, noticing details, and uncovering the way forward.",
    longDescription: "Find The Key is a focused puzzle prototype about searching a small environment, paying attention to visual hints, and turning a simple goal into a satisfying little adventure.",
    images: [
      "assets/images/games/find-the-key/placeholder-room.svg",
      "assets/images/games/find-the-key/placeholder-clue.svg"
    ],
    imageCaptions: [
      "Puzzle room preview",
      "Clue and interaction preview"
    ],
    links: [
      { label: "Download", href: "#" },
      { label: "itch.io", href: "#" },
      { label: "GitHub", href: "#" }
    ]
  },
  {
    id: "dialogue-prototype",
    title: "Dialogue Prototype",
    status: "Prototype",
    shortDescription: "A conversation-focused experiment testing dialogue flow, tone, and interactive storytelling in a simple format.",
    longDescription: "Dialogue Prototype explores simple conversations, character tone, and branching choices. It is designed as a small testbed for learning how dialogue systems can feel expressive without becoming too large.",
    images: [
      "assets/images/games/dialogue-prototype/placeholder-scene.svg",
      "assets/images/games/dialogue-prototype/placeholder-ui.svg"
    ],
    imageCaptions: [
      "Conversation scene preview",
      "Dialogue UI preview"
    ],
    links: [
      { label: "Download", href: "#" },
      { label: "itch.io", href: "#" },
      { label: "GitHub", href: "#" }
    ]
  },
  {
    id: "coming-soon",
    title: "Coming Soon",
    status: "In Planning",
    shortDescription: "A future game slot for the next small but ambitious project. More details will be shared when it is ready.",
    longDescription: "This slot is reserved for a future RyuSaru Studio game. The project is still early, so the details are intentionally lightweight for now while ideas, scope, and direction take shape.",
    images: [
      "assets/images/games/coming-soon/placeholder-concept.svg"
    ],
    imageCaptions: [
      "Early concept board"
    ],
    links: [
      { label: "Download", href: "#" },
      { label: "itch.io", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "YouTube", href: "#" }
    ]
  }
];

function getGameById(gameId) {
  return games.find((game) => game.id === gameId);
}

navLinks.forEach((link) => {
  if (link.dataset.nav === pageName) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function createGameCard(game) {
  return `
    <article class="game-card">
      <span class="status-badge">${game.status}</span>
      <h2>${game.title}</h2>
      <p>${game.shortDescription}</p>
      <div class="card-actions">
        <a class="button button-primary" href="${game.links[0].href}">${game.links[0].label}</a>
        <button class="button button-secondary more-info-button" type="button" data-game="${game.id}">More Info</button>
      </div>
    </article>
  `;
}

function createModalImage(imageSrc, caption) {
  return `
    <figure class="modal-image-card">
      <img src="${imageSrc}" alt="${caption}">
      <figcaption>${caption}</figcaption>
    </figure>
  `;
}

function createModalLink(link) {
  return `
    <a class="button button-secondary" href="${link.href}" target="_blank" rel="noopener noreferrer">
      ${link.label}
    </a>
  `;
}

function renderGames() {
  if (!gamesGrid) {
    return;
  }

  gamesGrid.innerHTML = games.map(createGameCard).join("");
}

function openModal(gameId) {
  const details = getGameById(gameId);

  if (!details || !gameModal) {
    return;
  }

  modalTitle.textContent = details.title;
  modalStatus.textContent = details.status;
  modalDescription.textContent = details.longDescription;
  modalGallery.innerHTML = details.images
    .map((imageSrc, index) => createModalImage(imageSrc, details.imageCaptions[index] || "Game preview"))
    .join("");
  modalLinks.innerHTML = details.links.map(createModalLink).join("");

  gameModal.hidden = false;
  requestAnimationFrame(() => {
    gameModal.classList.add("is-visible");
  });
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!gameModal) {
    return;
  }

  gameModal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    if (!gameModal.classList.contains("is-visible")) {
      gameModal.hidden = true;
    }
  }, 250);
}

renderGames();

if (gamesGrid) {
  gamesGrid.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.classList.contains("more-info-button")) {
      openModal(target.dataset.game);
    }
  });
}

if (modalCloseButton) {
  modalCloseButton.addEventListener("click", closeModal);
}

if (gameModal) {
  gameModal.addEventListener("click", (event) => {
    if (event.target === gameModal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && gameModal && !gameModal.hidden) {
    closeModal();
  }
});
