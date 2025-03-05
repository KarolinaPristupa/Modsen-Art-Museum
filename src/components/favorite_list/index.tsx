import { PictureCard } from "@components/picture";
import { ApiEndpoints } from "@constants/api";
import { PictureData } from "@myTypes/picture_data";
import { useFetch } from "@hooks/use_fetch";
import { getImageUrl } from "@utils/api_utils";

import style from "./style.module.scss";

type FavoriteListProps = {
  favorites: string[];
};

export const FavoriteList = ({ favorites }: FavoriteListProps) => {
  const { data: pictures } = useFetch<PictureData[]>({
    endpoint: ApiEndpoints.ARTWORKS,
    ids: favorites,
  });

  return (
    <div className={style.container}>
      {pictures &&
        pictures.map((picture) => (
          <PictureCard
            key={picture.id}
            id={picture.id.toString()}
            title={picture.title}
            image={getImageUrl(picture.image_id)}
            artist={picture.artist_title}
            isPublic={picture.is_public_domain}
            variant="small"
          />
        ))}
    </div>
  );
};
