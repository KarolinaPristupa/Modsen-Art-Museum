import FavoriteIcon from "@assets/bookmark.svg";
import { useFavorites } from "@hooks/use_favorite";

import { FavoriteList } from "@components/favorite_list";

import style from "./style.module.scss";

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>
          Here Are Your <br />
          <span className={style.highlight}>
            <FavoriteIcon /> Favorites
          </span>
        </h1>
        <div className={style.favorites_block}>
          <div className={style.text_block}>
            <h3 className={style.subtitle}>Saved by you</h3>
            <h2 className={style.title}>Your favorites list</h2>
          </div>
          <FavoriteList favorites={favorites} />
        </div>
      </div>
    </div>
  );
};
