import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
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
    calendar_grid_wrapper: "calendar_grid_wrapper",
    caption_grid_label: "caption_grid_label",
    caption_grid_btn: "caption_grid_btn",
    caption_year_chevron: "caption_year_chevron",
    caption_year_chevron_open: "caption_year_chevron_open",
    gridOverlay: "gridOverlay",
    gridOverlayYears: "gridOverlayYears",
    gridOverlayCaption: "gridOverlayCaption",
    gridOverlayYearsNav: "gridOverlayYearsNav",
    gridCells: "gridCells",
    gridCellsYears: "gridCellsYears",
    gridCell: "gridCell",
    gridCellActive: "gridCellActive",
    gridNavBtn: "gridNavBtn",
    chevron_wrapper: "chevron_wrapper",
  },
}));

// Captura das props passadas ao DayPicker para verificação
let capturedProps: Record<string, unknown> = {};

vi.mock("react-day-picker", () => {
  const DayPicker: React.FC<any> = (props) => {
    capturedProps = props;
    const MonthCaption = (props.components as any)?.MonthCaption;
    const fakeCalendarMonth = { date: new Date(2026, 2, 1) };
    return (
      <div data-testid="day-picker">
        {MonthCaption && (
          <MonthCaption calendarMonth={fakeCalendarMonth} displayIndex={0} />
        )}
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
        <button
          data-testid="range-start-button"
          onClick={() =>
            props.onSelect &&
            props.onSelect(
              { from: new Date(2026, 2, 10), to: new Date(2026, 2, 10) },
              new Date(2026, 2, 10),
            )
          }
        >
          range-start
        </button>
        <button
          data-testid="range-end-button"
          onClick={() =>
            props.onSelect &&
            props.onSelect(
              { from: new Date(2026, 2, 10), to: new Date(2026, 2, 20) },
              new Date(2026, 2, 20),
            )
          }
        >
          range-end
        </button>
        <button
          data-testid="range-reset-button"
          onClick={() =>
            props.onSelect &&
            props.onSelect(
              { from: new Date(2026, 2, 5), to: new Date(2026, 2, 5) },
              new Date(2026, 2, 5),
            )
          }
        >
          range-reset
        </button>
      </div>
    );
  };
  return { DayPicker };
});

vi.mock("react-day-picker/locale", () => ({
  ptBR: { code: "pt-BR" },
  enUS: { code: "en-US" },
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

  it("aplica escala 1.0 por padrão", () => {
    const { container } = render(<Calendar />);
    const wrapper = container.querySelector(".calendar_grid_wrapper") as HTMLElement | null;
    expect(wrapper).not.toBeNull();
    expect(wrapper!.style.getPropertyValue("--giro-scale")).toBe("1");
  });

  it("aplica escala 1.5 quando informado", () => {
    const { container } = render(<Calendar scale={1.5} />);
    const wrapper = container.querySelector(".calendar_grid_wrapper") as HTMLElement | null;
    expect(wrapper).not.toBeNull();
    expect(wrapper!.style.getPropertyValue("--giro-scale")).toBe("1.5");
  });

  it("aplica escala 2.0 quando informado", () => {
    const { container } = render(<Calendar scale={2} />);
    const wrapper = container.querySelector(".calendar_grid_wrapper") as HTMLElement | null;
    expect(wrapper).not.toBeNull();
    expect(wrapper!.style.getPropertyValue("--giro-scale")).toBe("2");
  });

  it("passa mode='single' para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.mode).toBe("single");
  });

  it("em modo grid (padrão), passa captionLayout='label' para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.captionLayout).toBe("label");
  });

  it("passa a propriedade animate para o DayPicker", () => {
    render(<Calendar />);
    expect(capturedProps.animate).toBe(true);
  });

  it("passa o locale ptBR para o DayPicker quando locale='pt-br'", () => {
    render(<Calendar />);
    expect((capturedProps.locale as any)?.code).toBe("pt-BR");
  });

  it("passa o locale enUS para o DayPicker quando locale='en-us'", () => {
    render(<Calendar locale="en-us" />);
    expect((capturedProps.locale as any)?.code).toBe("en-US");
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

  it("chama onClear ao desselecionar o dia clicado", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<Calendar onClear={onClear} />);

    await user.click(screen.getByTestId("day-button"));
    await user.click(screen.getByTestId("clear-button"));

    expect(onClear).toHaveBeenCalledTimes(1);
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

  it("chama onDaySelect ao selecionar um dia", async () => {
    const user = userEvent.setup();
    const onDaySelect = vi.fn();
    render(<Calendar onDaySelect={onDaySelect} />);

    await user.click(screen.getByTestId("day-button"));

    expect(onDaySelect).toHaveBeenCalledWith(new Date(2026, 2, 15));
  });

  it("cria matchers de disabled a partir de minDate e maxDate", () => {
    const minDate = new Date(2026, 0, 1);
    const maxDate = new Date(2026, 11, 31);
    render(<Calendar minDate={minDate} maxDate={maxDate} />);
    expect(capturedProps.disabled).toEqual([{ before: minDate }, { after: maxDate }]);
  });

  it("não passa disabled quando não há restrições", () => {
    render(<Calendar />);
    expect(capturedProps.disabled).toBeUndefined();
  });

  // --- Modo Grid ---

  it("em modo grid (padrão), renderiza o wrapper do grid", () => {
    const { container } = render(<Calendar />);
    expect(container.querySelector(".calendar_grid_wrapper")).not.toBeNull();
  });

  it("em modo grid, passa MonthCaption personalizado ao DayPicker", () => {
    render(<Calendar />);
    expect(typeof (capturedProps.components as any)?.MonthCaption).toBe("function");
  });

  it("em modo grid, MonthCaption exibe botão de ano com aria-pressed=false", () => {
    render(<Calendar />);
    // O mock do DayPicker renderiza o MonthCaption com data março/2026
    const yearBtn = screen.getByRole("button", { pressed: false });
    expect(yearBtn.textContent).toContain("2026");
  });

  it("em modo grid, clicar no botão de ano exibe o overlay de seleção de anos", async () => {
    const user = userEvent.setup();
    render(<Calendar />);

    await user.click(screen.getByRole("button", { pressed: false }));

    expect(screen.getByRole("dialog", { name: "Selecione o ano" })).toBeDefined();
  });

  it("em modo grid, clicar em um ano navega para seleção de mês", async () => {
    const user = userEvent.setup();
    render(<Calendar />);

    // Abre o overlay de anos
    await user.click(screen.getByRole("button", { pressed: false }));

    // Clica no primeiro botão de ano do grid (sem aria-label e sem aria-pressed)
    const yearGridBtn = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          /^\d{4}$/.test(btn.textContent?.trim() ?? "") &&
          !btn.getAttribute("aria-label") &&
          btn.getAttribute("aria-pressed") === null,
      );
    expect(yearGridBtn).toBeDefined();
    await user.click(yearGridBtn!);

    expect(screen.getByRole("dialog", { name: "Selecione o mês" })).toBeDefined();
  });

  it("em modo grid, fechar overlay de anos retorna para visualização de dias", async () => {
    const user = userEvent.setup();
    render(<Calendar />);

    // Abre o overlay de anos
    await user.click(screen.getByRole("button", { pressed: false }));
    expect(screen.getByRole("dialog", { name: "Selecione o ano" })).toBeDefined();

    // Fecha via botão com aria-label específico
    await user.click(screen.getByRole("button", { name: "Fechar seleção de ano" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("Calendar — Modo Range", () => {
  const day5 = new Date(2026, 2, 5);
  const day10 = new Date(2026, 2, 10);
  const day20 = new Date(2026, 2, 20);

  beforeEach(() => {
    capturedProps = {};
    vi.clearAllMocks();
  });

  it("passa mode='range' ao DayPicker", () => {
    render(<Calendar mode="range" />);
    expect(capturedProps.mode).toBe("range");
  });

  it("passa numberOfMonths ao DayPicker", () => {
    render(<Calendar numberOfMonths={2} />);
    expect(capturedProps.numberOfMonths).toBe(2);
  });

  it("inicia sem range selecionado", () => {
    render(<Calendar mode="range" />);
    expect(capturedProps.selected).toBeUndefined();
  });

  it("usa selectedRange controlado quando fornecido", () => {
    const range = { from: day10, to: day20 };
    render(<Calendar mode="range" selectedRange={range} />);
    expect(capturedProps.selected).toEqual(range);
  });

  it("primeiro clique define from e to com a mesma data", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" />);

    await user.click(screen.getByTestId("range-start-button"));

    expect(capturedProps.selected).toEqual({ from: day10, to: day10 });
  });

  it("segundo clique em data diferente completa o range", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" />);

    await user.click(screen.getByTestId("range-start-button"));
    await user.click(screen.getByTestId("range-end-button"));

    expect(capturedProps.selected).toEqual({ from: day10, to: day20 });
  });

  it("chama onRangeSelect ao iniciar seleção", async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(<Calendar mode="range" onRangeSelect={onRangeSelect} />);

    await user.click(screen.getByTestId("range-start-button"));

    expect(onRangeSelect).toHaveBeenCalledWith({ from: day10, to: day10 });
  });

  it("range incompleto (from = to) não reinicia no segundo clique", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" />);

    await user.click(screen.getByTestId("range-start-button"));
    expect(capturedProps.selected).toEqual({ from: day10, to: day10 });

    await user.click(screen.getByTestId("range-end-button"));
    expect(capturedProps.selected).toEqual({ from: day10, to: day20 });
  });

  it("range completo (from ≠ to): clicar reinicia a seleção com novo from", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" />);

    await user.click(screen.getByTestId("range-start-button"));
    await user.click(screen.getByTestId("range-end-button"));
    expect(capturedProps.selected).toEqual({ from: day10, to: day20 });

    await user.click(screen.getByTestId("range-reset-button"));
    expect(capturedProps.selected).toEqual({ from: day5, to: undefined });
  });

  it("range completo: onRangeSelect recebe novo from ao reiniciar", async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(<Calendar mode="range" onRangeSelect={onRangeSelect} />);

    await user.click(screen.getByTestId("range-start-button"));
    await user.click(screen.getByTestId("range-end-button"));
    onRangeSelect.mockClear();

    await user.click(screen.getByTestId("range-reset-button"));
    expect(onRangeSelect).toHaveBeenCalledWith({ from: day5, to: undefined });
  });

  it("clicar no único dia selecionado (from = to) desseleiona o range", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" />);

    await user.click(screen.getByTestId("range-start-button"));
    expect(capturedProps.selected).toEqual({ from: day10, to: day10 });

    // Clica no mesmo dia novamente
    await user.click(screen.getByTestId("range-start-button"));
    expect(capturedProps.selected).toBeUndefined();
  });

  it("após reiniciar range, clicar no from (to=undefined) desseleciona em um clique", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="range" />);

    // Completa o range
    await user.click(screen.getByTestId("range-start-button")); // { from: d10, to: d10 }
    await user.click(screen.getByTestId("range-end-button"));   // { from: d10, to: d20 }

    // Reinicia clicando em day5 → { from: day5, to: undefined }
    await user.click(screen.getByTestId("range-reset-button"));
    expect(capturedProps.selected).toEqual({ from: day5, to: undefined });

    // Clica em day5 novamente → deve desselecionar em UM clique
    await user.click(screen.getByTestId("range-reset-button"));
    expect(capturedProps.selected).toBeUndefined();
  });

  it("chama onClear ao desselecionar o único dia do range", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<Calendar mode="range" onClear={onClear} />);

    await user.click(screen.getByTestId("range-start-button"));
    await user.click(screen.getByTestId("range-start-button"));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
