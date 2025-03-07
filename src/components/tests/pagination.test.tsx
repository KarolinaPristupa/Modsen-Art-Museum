import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@components/pagination";

describe("Pagination component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("disables the current page button", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("2")).toBeDisabled();
  });

  it("calls onPageChange when clicking a page number", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText("3"));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when clicking the next button", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByLabelText("next page");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when clicking the previous button", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByLabelText("previous page");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("does not render previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.queryByLabelText("previous page")).not.toBeInTheDocument();
  });

  it("does not render next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.queryByLabelText("next page")).not.toBeInTheDocument();
  });
});
