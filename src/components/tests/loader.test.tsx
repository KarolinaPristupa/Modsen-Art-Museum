import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Loader } from "@components/loader";

describe("Loader Component", () => {
  test("renders loader when isLoading is true", () => {
    render(<Loader isLoading={true} size={80} />);

    const loaderContainer = screen.getByTestId("loader-container");
    expect(loaderContainer).toBeInTheDocument();

    expect(loaderContainer).toHaveStyle("width: 80px");
    expect(loaderContainer).toHaveStyle("height: 80px");

    const loadingProgress = loaderContainer.querySelector(".loading_progress");
    expect(loadingProgress).toBeInTheDocument();
  });

  test("does not render loader when isLoading is false", () => {
    render(<Loader isLoading={false} size={80} />);

    const loaderContainer = screen.queryByTestId("loader-container");
    expect(loaderContainer).not.toBeInTheDocument();
  });

  test("renders loader with default size when size is not passed", () => {
    render(<Loader isLoading={true} />);

    const loaderContainer = screen.getByTestId("loader-container");
    expect(loaderContainer).toHaveStyle("width: 80px");
    expect(loaderContainer).toHaveStyle("height: 80px");
  });

  test("renders loader with custom size when size is passed", () => {
    render(<Loader isLoading={true} size={120} />);

    const loaderContainer = screen.getByTestId("loader-container");
    expect(loaderContainer).toHaveStyle("width: 120px");
    expect(loaderContainer).toHaveStyle("height: 120px");
  });
});
