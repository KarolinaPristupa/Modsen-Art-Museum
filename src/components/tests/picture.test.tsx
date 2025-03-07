import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PictureCard } from "@components/picture";
import { useFavorites } from "@hooks/use_favorite";

jest.mock("@hooks/use_favorite", () => ({
  useFavorites: jest.fn(),
}));

describe("PictureCard component", () => {
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      isFavorite: mockIsFavorite,
    });
  });

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <PictureCard
          id="1"
          title="Test Picture"
          isPublic={true}
          artist="Test Artist"
          image="test-image.jpg"
          variant="big"
          {...props}
        />
      </BrowserRouter>,
    );
  };

  it("renders picture title and artist", () => {
    renderComponent();

    expect(screen.getByText("Test Picture")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("displays 'Public' or 'Private' based on isPublic prop", () => {
    renderComponent({ isPublic: true });
    expect(screen.getByText("Public")).toBeInTheDocument();

    renderComponent({ isPublic: false });
    expect(screen.getByText("Private")).toBeInTheDocument();
  });

  it("renders an image with correct src", () => {
    renderComponent();
    const img = screen.getByAltText("Test Picture") as HTMLImageElement;
    expect(img.src).toContain("test-image.jpg");
  });

  it("renders default image when img fails to load", () => {
    renderComponent();
    const img = screen.getByAltText("Test Picture");

    fireEvent.error(img);
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("calls favorite toggle function on button click", () => {
    mockIsFavorite.mockReturnValue(false);
    renderComponent();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockAddFavorite).toHaveBeenCalledWith("1");
  });

  it("removes from favorites if already favorite", () => {
    mockIsFavorite.mockReturnValue(true);
    renderComponent();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith("1");
  });
});
