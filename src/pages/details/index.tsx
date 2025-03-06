import { useParams } from "react-router-dom";
import defaultImage from "@assets/logos/logo.svg?url";
import { FavoriteButton } from "@components/favorite_button";
import { ApiEndpoints } from "@constants/api";
import { DetailData } from "@myTypes/detail_data";
import { Loader } from "@components/loader";
import { useFavorites } from "@hooks/use_favorite";
import { useFetch } from "@hooks/use_fetch";
import { createFieldsString, getImageUrl } from "@utils/api_utils";

import style from "./style.module.scss";

export const Details = () => {
  const { id = "" } = useParams();
  const { data: picture, isLoading } = useFetch<DetailData>({
    endpoint: `${ApiEndpoints.ARTWORKS}/${id}`,
    fields: createFieldsString<DetailData>([
      "id",
      "title",
      "image_id",
      "artist_title",
      "is_public_domain",
      "credit_line",
      "date_display",
      "dimensions",
      "artwork_type_title",
      "place_of_origin",
    ]),
  });

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  if (!picture) {
    return <Loader isLoading={isLoading} size={120} />;
  }

  const imageUrl = picture?.image_id
    ? getImageUrl(picture.image_id)
    : defaultImage;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.image_container}>
          <img
            className={style.image}
            src={imageUrl}
            alt={picture.title}
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
          />
          <div className={style.button}>
            <FavoriteButton
              onClick={handleFavoriteClick}
              isFavorite={isFavorite(id)}
            />
          </div>
        </div>
        <div className={style.info}>
          <h1 className={style.title}>{picture.title}</h1>
          <div className={style.artist_info}>
            <h2 className={style.subtitle}>{picture.artist_title}</h2>
            <p className={style.year}>{picture.date_display}</p>
          </div>
        </div>
        <div className={style.overview}>
          <h3 className={style.title}>Overview</h3>
          <div className={style.overview_info}>
            <p className={style.overview_item}>
              <span className={style.label}>Artist nacionality:</span>
              {picture.place_of_origin}
            </p>
            <p className={style.overview_item}>
              <span className={style.label}>Dimensions: Sheet:</span>
              {picture.dimensions}
            </p>
            <p className={style.overview_item}>
              <span className={style.label}>Type:</span>
              {picture.artwork_type_title}
            </p>
            <p className={style.overview_item}>
              <span className={style.label}>Credit Line:</span>
              {picture.credit_line}
            </p>
            <p className={style.overview_item}>
              {picture.is_public_domain ? "Public" : "Private"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
