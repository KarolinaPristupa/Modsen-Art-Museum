import { Routes, Route } from "react-router-dom";
import { UrlPaths } from "@constants/paths";
import { Header } from "@components/header";
import { Footer } from "@components/footer";
import { Home } from "@pages/home";
import { Details } from "@pages/details";
import { Favorites } from "@pages/favorites";
import { FavoritesProvider } from "@context/favorite_provider";

export const App = () => (
  <div>
    <Header />
    <FavoritesProvider>
      <Routes>
        <Route path={UrlPaths.HOME} element={<Home />} />
        <Route path={UrlPaths.FAVORITES} element={<Favorites />} />
        <Route path={UrlPaths.DETAIL_INFO} element={<Details />} />
      </Routes>
    </FavoritesProvider>
    <Footer />
  </div>
);
