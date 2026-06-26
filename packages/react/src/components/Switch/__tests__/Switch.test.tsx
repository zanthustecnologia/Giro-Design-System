import * as React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Switch from "../Switch";

vi.mock("../Switch.module.scss", () => ({
  __esModule: true,
  default: {
    container: "switch-container",
    switchRoot: "switch-root",
    switchThumb: "switch-thumb",
  },
}));

vi.mock("radix-ui", () => {
  // simple mock exposing Switch.Root and Switch.Thumb
  const Root: React.FC<any> = ({ children, disabled, className, ...rest }) =>
    React.createElement(
      "div",
      { "data-testid": "radix-root", "data-disabled": disabled ? "true" : "false", className, ...rest },
      children
    );
  const Thumb: React.FC<any> = (props) =>
    React.createElement("div", { "data-testid": "radix-thumb", ...props });
  return { Switch: { Root, Thumb } };
});

describe("Switch component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders radix root and thumb", () => {
    render(<Switch />);
    expect(screen.getByTestId("radix-root")).toBeDefined();
    expect(screen.getByTestId("radix-thumb")).toBeDefined();
  });

  it("aplica escala 1.0 por padrão", () => {
    const { container } = render(<Switch />);
    const wrapper = container.querySelector('[style*="--switch-scale"]') as HTMLElement;
    expect(wrapper.style.getPropertyValue('--switch-scale')).toBe('1');
  });

  it("aplica escala 1.5 quando informado", () => {
    const { container } = render(<Switch scale={1.5} />);
    const wrapper = container.querySelector('[style*="--switch-scale"]') as HTMLElement;
    expect(wrapper.style.getPropertyValue('--switch-scale')).toBe('1.5');
  });

  it("aplica escala 2.0 quando informado", () => {
    const { container } = render(<Switch scale={2} />);
    const wrapper = container.querySelector('[style*="--switch-scale"]') as HTMLElement;
    expect(wrapper.style.getPropertyValue('--switch-scale')).toBe('2');
  });

  it("is enabled by default", () => {
    render(<Switch />);
    expect(screen.getByTestId("radix-root").getAttribute("data-disabled")).toBe("false");
  });

  it("passes disabled prop to radix root", () => {
    render(<Switch disabled />);
    expect(screen.getByTestId("radix-root").getAttribute("data-disabled")).toBe("true");
  });
});