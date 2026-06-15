import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Icon from "./Icon";

describe("Icon", () => {
  it("renders a known icon (e.g., tick) correctly", () => {
    const { container } = render(<Icon name="tick" />);
    // Check that we rendered an SVG element
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("applies correct size prop to the SVG element", () => {
    const { container } = render(<Icon name="lock" size={32} />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    // Some custom SVGs/Lucide-like icons define size as width/height attributes or props
    expect(svgElement).toHaveAttribute("width", "32");
    expect(svgElement).toHaveAttribute("height", "32");
  });

  it("applies the custom className", () => {
    const { container } = render(<Icon name="hand" className="custom-icon-class" />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveClass("custom-icon-class");
  });

  it("applies custom strokeWidth to SVG when provided", () => {
    const { container } = render(<Icon name="dropdown" strokeWidth={3} />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("stroke-width", "3");
  });
});
