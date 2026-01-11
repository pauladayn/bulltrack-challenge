import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  it("should render unchecked state correctly", () => {
    render(<Checkbox checked={false} />);
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("should render checked state correctly", () => {
    render(<Checkbox checked={true} />);
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("should render with label", () => {
    render(<Checkbox checked={false} label="Test Label" />);
    
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should call onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Checkbox checked={false} onChange={handleChange} />);
    
    await user.click(screen.getByRole("checkbox"));
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("should toggle from checked to unchecked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Checkbox checked={true} onChange={handleChange} />);
    
    await user.click(screen.getByRole("checkbox"));
    
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("should not throw when onChange is not provided", async () => {
    const user = userEvent.setup();
    
    render(<Checkbox checked={false} />);
    
    // Should not throw
    await user.click(screen.getByRole("checkbox"));
  });

  it("should apply custom className", () => {
    render(<Checkbox checked={false} className="custom-class" />);
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom-class");
  });
});
