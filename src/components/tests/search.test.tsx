import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "@components/search";
import { useDebounce } from "@hooks/use_debounce";

jest.mock("@hooks/use_debounce");
jest.mock("@assets/search.svg", () => "svg");

const mockOnChange = jest.fn();

describe("Search component", () => {
  beforeEach(() => {
    (useDebounce as jest.Mock).mockImplementation((value) => value);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders search input and icon", () => {
    render(<Search />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("updates input value and calls onChange with debounce", async () => {
    render(<Search onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText("Search");

    await userEvent.type(input, "test");

    expect(input).toHaveValue("test");
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith("test"), {
      timeout: 2000,
    });
  });

  it("respects max length of 40 characters", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search");
    const longText = "a".repeat(41);

    await userEvent.type(input, longText);

    expect(input).toHaveValue(longText.slice(0, 40));
  });

  it("submits form on enter press", async () => {
    render(<Search onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText("Search");

    await userEvent.type(input, "test");
    await userEvent.keyboard("{Enter}");

    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith("test"), {
      timeout: 2000,
    });
  }, 10000);
});
