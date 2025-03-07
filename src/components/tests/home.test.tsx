import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "@pages/home";

jest.mock("@components/search", () => ({
  Search: ({ onChange }: { onChange: (query: string) => void }) => (
    <input
      data-testid="search-input"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("@components/special_gallery", () => ({
  SpecialGallery: ({ searchQuery }: { searchQuery: string }) => (
    <div data-testid="special-gallery">{searchQuery}</div>
  ),
}));

jest.mock("@components/other_work_list", () => ({
  OtherWorkList: () => <div data-testid="other-work-list">Other works</div>,
}));

describe("Home Component", () => {
  test("renders the component correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByText("Our special gallery")).toBeInTheDocument();
    expect(screen.getByText("Other works for you")).toBeInTheDocument();
  });

  test("updates search query and passes it to SpecialGallery", () => {
    render(<Home />);
    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "abstract" } });

    expect(screen.getByTestId("special-gallery")).toHaveTextContent("abstract");
  });
});
