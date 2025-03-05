import Bookmark from "@assets/bookmark.svg";
import BookmarkFilled from "@assets/bookmark_filled.svg";
import style from "./style.module.scss";

type FavoriteButtonProps = {
  onClick?: () => void;
  isFavorite?: boolean;
  isDisabled?: boolean;
};

export const FavoriteButton = ({
  onClick,
  isDisabled,
  isFavorite = false,
}: FavoriteButtonProps) => {
  const arialText = isFavorite ? "Remove from Favorites" : "Add to Favorites";
  const className = isFavorite ? style.active_button : "";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      className={[style.favorite_button, className].join(" ")}
      aria-label={arialText}
    >
      {isFavorite ? <BookmarkFilled /> : <Bookmark />}
    </button>
  );
};
