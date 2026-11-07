// js/app.js: Theme Controller, Accessible Modal & Clipboard Actions
import { PROJECTS_DATA, PROFILE_CONFIG } from "./data.js";

class ModalManager {
  constructor() {
    this.modalOverlay = document.getElementById("project-modal-overlay");
    this.modalCloseBtn = document.getElementById("modal-close-btn");
    this.modalTitle = document.getElementById("modal-title");
    this.modalDesc = document.getElementById("modal-desc");
    this.modalTech = document.getElementById("modal-tech");
    this.modalHighlights = document.getElementById("modal-highlights");
    this.modalGithubLink = document.getElementById("modal-github-link");
    this.focusedElementBeforeModal = null;

    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll(".open-modal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-project-id");
        this.openModal(projectId, btn);
      });
    });

    this.modalCloseBtn?.addEventListener("click", () => this.closeModal());

    this.modalOverlay?.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!this.modalOverlay?.classList.contains("open")) return;

      if (e.key === 'Escape') {
        this.closeModal();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = this.modalOverlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
  }

  openModal(projectId, triggerEl) {
    const project = PROJECTS_DATA[projectId];
    if (!project || !this.modalOverlay) return;

    this.focusedElementBeforeModal = triggerEl || document.activeElement;

    this.modalTitle.textContent = project.title;
    this.modalDesc.textContent = project.desc;
    this.modalTech.textContent = project.tech;
    this.modalGithubLink.href = project.github;

    this.modalHighlights.innerHTML = "";
    project.highlights.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      this.modalHighlights.appendChild(li);
    });

    this.modalOverlay.classList.add("open");
    this.modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    this.modalCloseBtn?.focus();
  }

  closeModal() {
    if (!this.modalOverlay || !this.modalOverlay.classList.contains("open")) return;
    this.modalOverlay.classList.remove("open");
    this.modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (this.focusedElementBeforeModal) {
      this.focusedElementBeforeModal.focus();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  // 01. Theme Initialization
  const STORAGE_KEY = "sc-theme-daylight";
  const savedTheme = localStorage.getItem(STORAGE_KEY) || "light";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  const menuToggleBtn = document.getElementById("menu-toggle");
  const mainNavigation = document.getElementById("main-navigation");

  function closeMenu() {
    if (!menuToggleBtn || !mainNavigation) return;
    menuToggleBtn.setAttribute("aria-expanded", "false");
    mainNavigation.classList.add("hidden");
  }

  if (menuToggleBtn && mainNavigation) {
    menuToggleBtn.addEventListener("click", () => {
      const isOpen = menuToggleBtn.getAttribute("aria-expanded") === "true";
      menuToggleBtn.setAttribute("aria-expanded", String(!isOpen));
      mainNavigation.classList.toggle("hidden", isOpen);
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // 02. Accessible Modal
  new ModalManager();

  // 03. Copy Email with Fallback
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    const handle = PROFILE_CONFIG.email;
    const originalLabel = copyEmailBtn.textContent;

    copyEmailBtn.addEventListener("click", async () => {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        alert('Contact email: ' + handle);
        return;
      }

      try {
        await navigator.clipboard.writeText(handle);
        copyEmailBtn.textContent = "Copied: " + handle;
        setTimeout(() => {
          copyEmailBtn.textContent = originalLabel;
        }, 2200);
      } catch (err) {
        alert('Contact email: ' + handle);
      }
    });
  }
});
