import { useState } from "react";
import { generatePath, Link } from "react-router-dom";
import DefaultImage from "@assets/logos/logo.svg";
import { FavoriteButton } from "@components/favorite_button";
import { UrlPaths } from "@constants/paths";
import { useFavorites } from "@hooks/use_favorite";
import style from "./style.module.scss";

type PictureCardProps = {
  id: string;
  title: string;
  isPublic: boolean;
  artist?: string;
  image?: string;
  variant?: "small" | "big";
};

export const PictureCard = ({
  id,
  title,
  isPublic,
  artist,
  image,
  variant = "big",
}: PictureCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isLoaded, setIsLoaded] = useState(false);

  const path = generatePath(UrlPaths.DETAIL_INFO, { id: String(id) });
  const imageWithCacheBust = image ? `${image}?rand=${Date.now()}` : "";

  const handleImageError = () => {
    setIsLoaded(false); 
  };

  const handleFavoriteClick = () => {
    return isFavorite(id) ? removeFavorite(id) : addFavorite(id);
  };

  return (
    <div className={variant === "small" ? style.small_card : style.large_card}>
      {variant !== "small" && (
        <Link to={path} className={style.link}>
          <div className={style.large_card_image}>
            {imageWithCacheBust && (
              <img
                src={imageWithCacheBust}
                alt={title}
                className={style.large_image}
                onLoad={() => setIsLoaded(true)}
                onError={handleImageError}
                style={{ display: isLoaded ? "block" : "none" }}
              />
            )}
            {!isLoaded && <DefaultImage />}
          </div>
        </Link>
      )}

      <div className={style.card_content}>
        {variant === "small" && (
          <div className={style.small_card_image}>
            <Link to={path}>
              {imageWithCacheBust && (
                <img
                  src={imageWithCacheBust}
                  alt={title}
                  className={style.small_image}
                  onLoad={() => setIsLoaded(true)}
                  onError={handleImageError}
                  style={{ display: isLoaded ? "block" : "none" }}
                />
              )}
              {!isLoaded && <DefaultImage />}
            </Link>
          </div>
        )}
        <div className={style.card_info}>
          <div className={style.picture_credentials}>
            <Link to={path} className={style.link}>
              <h4 className={style.card_title}>{title}</h4>
            </Link>
            {artist && <h5 className={style.card_artist}>{artist}</h5>}
          </div>
          <p className={style.card_public}>{isPublic ? "Public" : "Private"}</p>
        </div>
        <div className={style.card_actions}>
          <FavoriteButton
            onClick={handleFavoriteClick}
            isFavorite={isFavorite(id)}
          />
        </div>
      </div>
    </div>
  );
};
