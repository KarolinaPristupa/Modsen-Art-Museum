import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Favorites } from "@pages/favorites";
import { useFavorites } from "@hooks/use_favorite";

jest.mock("@hooks/use_favorite"); // Мокаем весь модуль
jest.mock("@components/favorite_list", () => ({
  FavoriteList: jest.fn(() => (
    <div data-testid="favorite-list">Mocked Favorite List</div>
  )),
}));

describe("Favorites Page", () => {
  it("renders the title and favorite list", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [{ id: "1", title: "Artwork 1", isPublic: true }],
    });

    render(<Favorites />);

    expect(screen.getByText(/Here Are Your/i)).toBeInTheDocument();
    expect(screen.getByTestId("favorite-list")).toBeInTheDocument();
  });

  it("renders an empty state if there are no favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
    });

    render(<Favorites />);

    expect(screen.getByText(/Here Are Your/i)).toBeInTheDocument();
    expect(screen.getByTestId("favorite-list")).toBeInTheDocument();
  });
});
