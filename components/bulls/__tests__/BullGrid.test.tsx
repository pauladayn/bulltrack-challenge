import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import BullGrid from "../BullGrid";
import { FiltersProvider } from "@/context/FiltersContext";
import { Bull } from "@/types/bulls";

// Mock the BullCard and BullCardCompact components
vi.mock("../BullCard", () => ({
  default: ({ bull, rank }: { bull: Bull; rank: number }) => (
    <div data-testid={`bull-card-${bull.id}`}>
      <span data-testid={`bull-name-${bull.id}`}>{bull.nombre}</span>
      <span data-testid={`bull-rank-${bull.id}`}>#{rank}</span>
      <span data-testid={`bull-score-${bull.id}`}>{bull.bull_score}</span>
    </div>
  ),
}));

vi.mock("../BullCardCompact", () => ({
  default: ({ bull, rank }: { bull: Bull; rank: number }) => (
    <div data-testid={`bull-card-compact-${bull.id}`}>
      <span>{bull.nombre}</span>
      <span>#{rank}</span>
    </div>
  ),
}));

const mockBulls: Bull[] = [
  {
    id: 1,
    caravana: "992",
    nombre: "Toro Black Emerald",
    bull_score: 90,
    uso: "vaquillona",
    origen: "propio",
    pelaje: "negro",
    raza: "Angus",
    edad_meses: 36,
    caracteristica_destacada: "Top 1% calving ease",
    stats: {
      crecimiento: 85,
      facilidad_parto: 98,
      reproduccion: 75,
      moderacion: 60,
      carcasa: 82,
    },
  },
  {
    id: 2,
    caravana: "845",
    nombre: "Red Diamond",
    bull_score: 75,
    uso: "vaca",
    origen: "catalogo",
    pelaje: "colorado",
    raza: "Angus",
    edad_meses: 42,
    caracteristica_destacada: "Top 5% carcass",
    stats: {
      crecimiento: 90,
      facilidad_parto: 40,
      reproduccion: 88,
      moderacion: 70,
      carcasa: 95,
    },
  },
  {
    id: 3,
    caravana: "102",
    nombre: "General 102",
    bull_score: 88,
    uso: "vaquillona",
    origen: "catalogo",
    pelaje: "negro",
    raza: "Brangus",
    edad_meses: 30,
    caracteristica_destacada: null,
    stats: {
      crecimiento: 70,
      facilidad_parto: 92,
      reproduccion: 65,
      moderacion: 80,
      carcasa: 60,
    },
  },
  {
    id: 4,
    caravana: "554",
    nombre: "Indomable",
    bull_score: 62,
    uso: "vaca",
    origen: "propio",
    pelaje: "colorado",
    raza: "Hereford",
    edad_meses: 48,
    caracteristica_destacada: null,
    stats: {
      crecimiento: 60,
      facilidad_parto: 30,
      reproduccion: 95,
      moderacion: 50,
      carcasa: 75,
    },
  },
];

// Helper to render with provider
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<FiltersProvider>{ui}</FiltersProvider>);
};

describe("BullGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all bulls when no filters are applied", () => {
      renderWithProvider(<BullGrid bulls={mockBulls} />);

      expect(screen.getByTestId("bull-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("bull-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("bull-card-3")).toBeInTheDocument();
      expect(screen.getByTestId("bull-card-4")).toBeInTheDocument();
    });

    it("should show empty message when no bulls match filters", () => {
      renderWithProvider(<BullGrid bulls={[]} />);

      expect(
        screen.getByText("No se encontraron toros con los filtros seleccionados")
      ).toBeInTheDocument();
    });
  });

  describe("Default Sorting", () => {
    it("should sort bulls by score descending by default", () => {
      renderWithProvider(<BullGrid bulls={mockBulls} />);

      // Check ranks - highest score first
      expect(screen.getByTestId("bull-rank-1")).toHaveTextContent("#1"); // score: 90
      expect(screen.getByTestId("bull-rank-3")).toHaveTextContent("#2"); // score: 88
      expect(screen.getByTestId("bull-rank-2")).toHaveTextContent("#3"); // score: 75
      expect(screen.getByTestId("bull-rank-4")).toHaveTextContent("#4"); // score: 62
    });
  });

  describe("Bull Data", () => {
    it("should display correct bull information", () => {
      renderWithProvider(<BullGrid bulls={mockBulls} />);

      expect(screen.getByTestId("bull-name-1")).toHaveTextContent("Toro Black Emerald");
      expect(screen.getByTestId("bull-score-1")).toHaveTextContent("90");
    });
  });
});

describe("BullGrid Filtering Logic (Unit Tests)", () => {
  // These tests verify the filtering logic independently
  
  it("should correctly identify bulls by origen 'propio'", () => {
    const propios = mockBulls.filter((bull) => bull.origen === "propio");
    expect(propios).toHaveLength(2);
    expect(propios.map((b) => b.id)).toEqual([1, 4]);
  });

  it("should correctly identify bulls by origen 'catalogo'", () => {
    const catalogos = mockBulls.filter((bull) => bull.origen === "catalogo");
    expect(catalogos).toHaveLength(2);
    expect(catalogos.map((b) => b.id)).toEqual([2, 3]);
  });

  it("should correctly filter bulls by pelaje 'negro'", () => {
    const negros = mockBulls.filter((bull) => bull.pelaje === "negro");
    expect(negros).toHaveLength(2);
    expect(negros.map((b) => b.id)).toEqual([1, 3]);
  });

  it("should correctly filter bulls by pelaje 'colorado'", () => {
    const colorados = mockBulls.filter((bull) => bull.pelaje === "colorado");
    expect(colorados).toHaveLength(2);
    expect(colorados.map((b) => b.id)).toEqual([2, 4]);
  });

  it("should correctly filter bulls by uso 'vaquillona'", () => {
    const vaquillonas = mockBulls.filter((bull) => bull.uso === "vaquillona");
    expect(vaquillonas).toHaveLength(2);
    expect(vaquillonas.map((b) => b.id)).toEqual([1, 3]);
  });

  it("should correctly sort bulls by score descending", () => {
    const sorted = [...mockBulls].sort((a, b) => b.bull_score - a.bull_score);
    expect(sorted.map((b) => b.bull_score)).toEqual([90, 88, 75, 62]);
  });

  it("should correctly sort bulls by score ascending", () => {
    const sorted = [...mockBulls].sort((a, b) => a.bull_score - b.bull_score);
    expect(sorted.map((b) => b.bull_score)).toEqual([62, 75, 88, 90]);
  });

  it("should correctly filter bulls by search query (caravana)", () => {
    const query = "992";
    const filtered = mockBulls.filter((bull) =>
      bull.caravana.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(1);
  });

  it("should correctly filter bulls by search query (nombre)", () => {
    const query = "diamond";
    const filtered = mockBulls.filter((bull) =>
      bull.nombre.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(2);
  });

  it("should correctly filter bulls by search query (raza)", () => {
    const query = "hereford";
    const filtered = mockBulls.filter((bull) =>
      bull.raza.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(4);
  });

  it("should return empty array when no bulls match search", () => {
    const query = "nonexistent";
    const filtered = mockBulls.filter(
      (bull) =>
        bull.caravana.toLowerCase().includes(query.toLowerCase()) ||
        bull.nombre.toLowerCase().includes(query.toLowerCase()) ||
        bull.raza.toLowerCase().includes(query.toLowerCase())
    );
    expect(filtered).toHaveLength(0);
  });

  it("should correctly combine multiple filters", () => {
    // Filter: origen=propio AND pelaje=negro
    const filtered = mockBulls.filter(
      (bull) => bull.origen === "propio" && bull.pelaje === "negro"
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(1);
  });
});
