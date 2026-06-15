import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Container from "./Container";

describe("Container", () => {
  it("renders children content successfully", () => {
    render(<Container>Test Child Content</Container>);
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });

  it("renders as a 'div' by default", () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild?.nodeName.toLowerCase()).toBe("div");
  });

  it("renders as custom element specified in the 'as' prop", () => {
    const { container } = render(<Container as="section">Content</Container>);
    expect(container.firstChild?.nodeName.toLowerCase()).toBe("section");
  });

  it("merges custom className with default classes", () => {
    const { container } = render(
      <Container className="custom-class-name">
        Content
      </Container>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("custom-class-name");
    // Should also have default class like mx-auto
    expect(element).toHaveClass("mx-auto");
  });
});
