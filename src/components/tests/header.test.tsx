import "@testing-library/jest-dom";
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { UrlPaths } from "@constants/paths";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@components/header";

describe("Header component", () => {
  it("renders the header with logo and navigation links", () => {
    render(
      <MemoryRouter initialEntries={[UrlPaths.HOME]}>
        <Header />
        <Routes>
          <Route path={UrlPaths.HOME} element={<div>Home Page</div>} />
          <Route
            path={UrlPaths.FAVORITES}
            element={<div>Favorites Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("img", { name: /museum of art/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Favorites/i)).toBeInTheDocument();
  });

  it("toggles the burger menu when clicked", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const burgerButton = screen.getByRole("button", {
      name: /switch menu state/i,
    });

    expect(burgerButton).not.toHaveClass("burger_open");
    expect(screen.getByRole("navigation")).not.toHaveClass("nav_open");

    fireEvent.click(burgerButton);

    expect(burgerButton).toHaveClass("burger_open");
    expect(screen.getByRole("navigation")).toHaveClass("nav_open");

    fireEvent.click(burgerButton);

    expect(burgerButton).not.toHaveClass("burger_open");
    expect(screen.getByRole("navigation")).not.toHaveClass("nav_open");
  });

  it("does not display the Home link when on the home page", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.queryByText(/Home/i)).toBeNull();
  });
});
