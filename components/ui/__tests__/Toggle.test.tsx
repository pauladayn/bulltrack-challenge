import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "../Toggle";

describe("Toggle", () => {
  it("should render in unchecked state", () => {
    render(<Toggle checked={false} />);
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-black");
  });

  it("should render in checked state", () => {
    render(<Toggle checked={true} />);
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-brand-green");
  });

  it("should call onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Toggle checked={false} onChange={handleChange} />);
    
    await user.click(screen.getByRole("button"));
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("should toggle from checked to unchecked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Toggle checked={true} onChange={handleChange} />);
    
    await user.click(screen.getByRole("button"));
    
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("should not throw when onChange is not provided", async () => {
    const user = userEvent.setup();
    
    render(<Toggle checked={false} />);
    
    // Should not throw
    await user.click(screen.getByRole("button"));
  });

  it("should apply custom className", () => {
    render(<Toggle checked={false} className="custom-class" />);
    
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
