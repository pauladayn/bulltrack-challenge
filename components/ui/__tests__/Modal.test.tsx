import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";

describe("Modal", () => {
  it("should not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call onClose when clicking overlay", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    // Click on the overlay (bg-black/25)
    const overlay = document.querySelector(".bg-black\\/25");
    if (overlay) {
      await user.click(overlay);
    }
    
    expect(handleClose).toHaveBeenCalled();
  });

  it("should not call onClose when clicking modal content", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    await user.click(screen.getByTestId("modal-content"));
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("should call onClose when pressing Escape key", () => {
    const handleClose = vi.fn();
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: "Escape" });
    
    expect(handleClose).toHaveBeenCalled();
  });

  it("should not call onClose when pressing other keys", () => {
    const handleClose = vi.fn();
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: "Enter" });
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("should set body overflow to hidden when open", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should reset body overflow when closed", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe("unset");
  });

  it("should apply custom className", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="max-w-[500px]">
        <div data-testid="content">Modal Content</div>
      </Modal>
    );
    
    const contentWrapper = screen.getByTestId("content").parentElement;
    expect(contentWrapper).toHaveClass("max-w-[500px]");
  });
});
