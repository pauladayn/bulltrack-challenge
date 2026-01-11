import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { FiltersProvider, useFilters } from "../FiltersContext";
import { STORAGE_KEYS } from "@/lib/constants";

// Test component to access context
function TestComponent() {
  const {
    origin,
    coat,
    forHeifer,
    sortOrder,
    searchQuery,
    favorites,
    viewMode,
    setOrigin,
    setCoat,
    setForHeifer,
    setSortOrder,
    setSearchQuery,
    setViewMode,
    toggleFavorite,
    isFavorite,
  } = useFilters();

  return (
    <div>
      <span data-testid="origin">{origin}</span>
      <span data-testid="coat">{coat}</span>
      <span data-testid="forHeifer">{forHeifer.toString()}</span>
      <span data-testid="sortOrder">{sortOrder}</span>
      <span data-testid="searchQuery">{searchQuery}</span>
      <span data-testid="favorites">{favorites.join(",")}</span>
      <span data-testid="viewMode">{viewMode}</span>
      <span data-testid="isFavorite1">{isFavorite(1).toString()}</span>
      
      <button onClick={() => setOrigin("propio")} data-testid="setOrigin">Set Origin</button>
      <button onClick={() => setCoat("negro")} data-testid="setCoat">Set Coat</button>
      <button onClick={() => setForHeifer(true)} data-testid="setForHeifer">Set ForHeifer</button>
      <button onClick={() => setSortOrder("score_asc")} data-testid="setSortOrder">Set SortOrder</button>
      <button onClick={() => setSearchQuery("test")} data-testid="setSearchQuery">Set SearchQuery</button>
      <button onClick={() => setViewMode("grid")} data-testid="setViewMode">Set ViewMode</button>
      <button onClick={() => toggleFavorite(1)} data-testid="toggleFavorite">Toggle Favorite</button>
    </div>
  );
}

describe("FiltersContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  describe("Initial State", () => {
    it("should have correct initial values", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      expect(screen.getByTestId("origin")).toHaveTextContent("todos");
      expect(screen.getByTestId("coat")).toHaveTextContent("todos");
      expect(screen.getByTestId("forHeifer")).toHaveTextContent("false");
      expect(screen.getByTestId("sortOrder")).toHaveTextContent("score_desc");
      expect(screen.getByTestId("searchQuery")).toHaveTextContent("");
      expect(screen.getByTestId("viewMode")).toHaveTextContent("list");
    });
  });

  describe("State Updates", () => {
    it("should update origin filter", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("setOrigin").click();
      });

      expect(screen.getByTestId("origin")).toHaveTextContent("propio");
    });

    it("should update coat filter", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("setCoat").click();
      });

      expect(screen.getByTestId("coat")).toHaveTextContent("negro");
    });

    it("should update forHeifer toggle", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("setForHeifer").click();
      });

      expect(screen.getByTestId("forHeifer")).toHaveTextContent("true");
    });

    it("should update sort order", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("setSortOrder").click();
      });

      expect(screen.getByTestId("sortOrder")).toHaveTextContent("score_asc");
    });

    it("should update search query", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("setSearchQuery").click();
      });

      expect(screen.getByTestId("searchQuery")).toHaveTextContent("test");
    });

    it("should update view mode", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("setViewMode").click();
      });

      expect(screen.getByTestId("viewMode")).toHaveTextContent("grid");
    });
  });

  describe("Favorites", () => {
    it("should toggle favorite on", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      expect(screen.getByTestId("isFavorite1")).toHaveTextContent("false");

      act(() => {
        screen.getByTestId("toggleFavorite").click();
      });

      expect(screen.getByTestId("isFavorite1")).toHaveTextContent("true");
      expect(screen.getByTestId("favorites")).toHaveTextContent("1");
    });

    it("should toggle favorite off", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      // Toggle on
      act(() => {
        screen.getByTestId("toggleFavorite").click();
      });

      expect(screen.getByTestId("isFavorite1")).toHaveTextContent("true");

      // Toggle off
      act(() => {
        screen.getByTestId("toggleFavorite").click();
      });

      expect(screen.getByTestId("isFavorite1")).toHaveTextContent("false");
    });

    it("should persist favorites to sessionStorage", () => {
      render(
        <FiltersProvider>
          <TestComponent />
        </FiltersProvider>
      );

      act(() => {
        screen.getByTestId("toggleFavorite").click();
      });

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify([1])
      );
    });
  });

  describe("Error Handling", () => {
    it("should throw error when useFilters is used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow("useFilters must be used within a FiltersProvider");

      consoleSpy.mockRestore();
    });
  });
});
