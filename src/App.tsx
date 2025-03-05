import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { FavoritesProvider } from "./context/favorite_provider";

export const App = () => (
  <div>
    <Header />
    <FavoritesProvider>
      <Home />
    </FavoritesProvider>

    <Footer />
  </div>
);
