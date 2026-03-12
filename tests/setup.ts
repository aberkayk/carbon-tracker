import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock HTMLDialogElement methods not implemented in jsdom
HTMLDialogElement.prototype.showModal = vi.fn(function (
  this: HTMLDialogElement,
) {
  this.setAttribute("open", "");
});

HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
  this.removeAttribute("open");
});
