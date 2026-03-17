import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Calendar from "../Calendar";

// Mock dos estilos CSS Modules
vi.mock("../Calendar.module.scss", () => ({
  default: {
    root: "root",
    month: "month",
    caption: "caption",
    nav: "nav",
    table: "table",
    head_row: "head_row",
    head_cell: "head_cell",
    row: "row",
    cell: "cell",
    day: "day",
    day_selected: "day_selected",
    day_today: "day_today",
    day_outside: "day_outside",
    day_disabled: "day_disabled",
  },
}));

// Captura das props passadas ao DayPicker para verificação
let capturedProps: Record<string, unknown> = {};

vi.mock("react-day-picker", () => {
  const DayPicker: React.FC<any> = (props) => {
    capturedProps = props;
    return (
      <div data-testid="day-picker">
        <button
          data-testid="day-button"
          onClick={() => props.onSelect && props.onSelect(new Date(2026, 2, 15))}
        >
          15
        </button>
        <button
          data-testid="clear-button"
          onClick={() => props.onSelect && props.onSelect(undefined)}
        >
          Limpar
        </button>
      </div>
    );
  };
  return { DayPicker };
});

vi.mock("react-day-picker/locale", () => ({
  ptBR: { code: "pt-BR" },
}));

describe("Calendar", () => {
  beforeEach(() => {
    capturedProps = {};
    vi.clearAllMocks();
  });

  it("renderiza sem erros", () => {
    render(<Calendar />);
    expect(screen.getByTestId("day-picker")).toBeDefined();
  });

  it("passa mode='single' para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.mode).toBe("single");
  });

  it("passa captionLayout='dropdown' para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.captionLayout).toBe("dropdown");
  });

  it("passa a propriedade animate para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.animate).toBe(true);
  });

  it("passa o locale ptBR para o DayPicker", () => {
    render(<Calendar />);
    expect((capturedProps.locale as any)?.code).toBe("pt-BR");
  });

  it("passa o timeZone 'America/Sao_Paulo' para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.timeZone).toBe("America/Sao_Paulo");
  });

  it("inicia sem data selecionada (selected=undefined)", () => {
    render(<Calendar />);
    expect(capturedProps.selected).toBeUndefined();
  });

  it("atualiza a data selecionada ao chamar onSelect", async () => {
    const user = userEvent.setup();
    render(<Calendar />);

    expect(capturedProps.selected).toBeUndefined();

    await user.click(screen.getByTestId("day-button"));

    expect(capturedProps.selected).toEqual(new Date(2026, 2, 15));
  });

  it("limpa a seleção ao chamar onSelect com undefined", async () => {
    const user = userEvent.setup();
    render(<Calendar />);

    await user.click(screen.getByTestId("day-button"));
    expect(capturedProps.selected).toEqual(new Date(2026, 2, 15));

    await user.click(screen.getByTestId("clear-button"));
    expect(capturedProps.selected).toBeUndefined();
  });

  it("passa os classNames do módulo SCSS para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.classNames).toBeDefined();
    expect(typeof capturedProps.classNames).toBe("object");
  });

  it("fornece um callback onSelect ao DayPicker", () => {
    render(<Calendar />);
    expect(typeof capturedProps.onSelect).toBe("function");
  });
});
