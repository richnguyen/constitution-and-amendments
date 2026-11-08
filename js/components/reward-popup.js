// Constitution Quest — celebration modal for a newly earned reward.

const ICON_GLYPH = {
  scroll: "📜",
  capitol: "🏛",
  quill: "🪶",
  star: "★",
  trophy: "🏆",
  stamp: "◈",
  founder: "👤",
};

let activeDialog = null;
let lastFocused = null;

/**
 * Show a reward popup.
 * @param {{kind: string, title: string, description: string}} reward
 * @param {HTMLElement} root - the empty .popup-root container
 * @param {() => void} [onClose]
 */
export function show(reward, root, onClose) {
  close(root);

  lastFocused = document.activeElement;
  const glyph = ICON_GLYPH[reward.kind] || ICON_GLYPH.star;

  const backdrop = document.createElement("div");
  backdrop.className = "popup-backdrop";
  backdrop.innerHTML = `
    <div class="popup" role="dialog" aria-modal="true"
         aria-labelledby="popup-title" aria-describedby="popup-desc">
      <div class="popup-icon" aria-hidden="true">${glyph}</div>
      <h2 id="popup-title"></h2>
      <p id="popup-desc"></p>
      <button type="button" class="btn" data-popup-close>Collect!</button>
    </div>
  `;

  // Reward text comes from content data; assign as text, never as markup.
  backdrop.querySelector("#popup-title").textContent = reward.title;
  backdrop.querySelector("#popup-desc").textContent = reward.description;

  const dismiss = () => {
    close(root);
    if (typeof onClose === "function") onClose();
  };

  backdrop.querySelector("[data-popup-close]").addEventListener("click", dismiss);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) dismiss();
  });

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dismiss();
    }
  };
  document.addEventListener("keydown", onKeydown);

  root.appendChild(backdrop);
  activeDialog = { root, onKeydown };

  backdrop.querySelector("[data-popup-close]").focus();
}

/** Remove any open popup and restore focus. Safe to call when none is open. */
export function close(root) {
  if (activeDialog) {
    document.removeEventListener("keydown", activeDialog.onKeydown);
    activeDialog = null;
  }
  if (root) root.innerHTML = "";
  if (lastFocused && typeof lastFocused.focus === "function") {
    try {
      lastFocused.focus();
    } catch {
      // The trigger may have been re-rendered away; focus loss is acceptable.
    }
  }
  lastFocused = null;
}
