import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "../Toggle";

describe("Toggle", () => {
  it("should render in unchecked state", () => {
    render(<Toggle checked={false} />);
    
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).toHaveClass("bg-black");
  });

  it("should render in checked state", () => {
    render(<Toggle checked={true} />);
    
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveClass("bg-brand-green");
  });

  it("should call onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Toggle checked={false} onChange={handleChange} />);
    
    await user.click(screen.getByRole("switch"));
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("should toggle from checked to unchecked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Toggle checked={true} onChange={handleChange} />);
    
    await user.click(screen.getByRole("switch"));
    
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("should not throw when onChange is not provided", async () => {
    const user = userEvent.setup();
    
    render(<Toggle checked={false} />);
    
    // Should not throw
    await user.click(screen.getByRole("switch"));
  });

  it("should apply custom className", () => {
    render(<Toggle checked={false} className="custom-class" />);
    
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveClass("custom-class");
  });
});
