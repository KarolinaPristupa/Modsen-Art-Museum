import { useEffect, useState } from "react";
import { Loader } from "@components/loader";
import { PictureCard } from "@components/picture";
import { ApiEndpoints } from "@constants/api";
import { PictureData } from "@myTypes/picture_data";
import { useRandom } from "@hooks/use_random";
import { createFieldsString, getImageUrl } from "@utils/api_utils";

import style from "./style.module.scss";

export const OtherWorkList = () => {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const { data: pictures, isLoading } = useRandom<PictureData[]>({
    endpoint: ApiEndpoints.ARTWORKS,
    fields: createFieldsString<PictureData>([
      "id",
      "title",
      "image_id",
      "artist_title",
      "is_public_domain",
    ]),
    limit: 9,
    randomize: refreshKey,
  });

  useEffect(() => {
    setRefreshKey(Date.now());
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} size={120} />;
  }

  return (
    <div className={style.container}>
      {(pictures || []).map((picture) => (
        <PictureCard
          key={`${picture.id}-${refreshKey}`}
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
