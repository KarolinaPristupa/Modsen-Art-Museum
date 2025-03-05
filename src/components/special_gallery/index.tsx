import { useCallback, useEffect, useMemo, useState } from "react";
import { Pagination } from "@components/pagination";
import { PictureCard } from "@components/picture";
import { Selector } from "@components/selector";
import { ApiEndpoints } from "@constants/api";
import { SORT_OPTIONS } from "@constants/sort_options";
import { PictureData } from "@myTypes/picture_data";
import { SortOption } from "@myTypes/sort_options";
import { useFetch } from "@hooks/use_fetch";
import { createFieldsString, getImageUrl } from "@utils/api_utils";
import { sortPictures } from "@utils/sort_utils";

import style from "./style.module.scss";

type SpecialGalleryProps = {
  searchQuery?: string;
};

export const SpecialGallery = ({ searchQuery }: SpecialGalleryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>(
    SORT_OPTIONS.DEFAULT,
  );

  const { data: pictures } = useFetch<PictureData[]>({
    endpoint: searchQuery
      ? `${ApiEndpoints.ARTWORKS}/search`
      : ApiEndpoints.ARTWORKS,
    fields: createFieldsString<PictureData>([
      "id",
      "title",
      "artist_title",
      "image_id",
      "is_public_domain",
    ]),
    q: searchQuery || undefined,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const picturePerPage = 3;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
  }, []);

  const sortedPictures = useMemo(() => {
    const validPictures = pictures || [];

    return sortPictures(validPictures, sortOption);
  }, [pictures, sortOption]);

  const totalPages = useMemo(
    () => Math.ceil(sortedPictures.length / picturePerPage),
    [sortedPictures.length, picturePerPage],
  );

  const displayedPictures = useMemo(
    () =>
      sortedPictures.slice(
        (currentPage - 1) * picturePerPage,
        currentPage * picturePerPage,
      ),
    [sortedPictures, currentPage, picturePerPage],
  );

  // if (isLoading) {
  //     return <Loader isLoading={isLoading} />;
  // }

  // if (error) {
  //     return <GeneralError message='An error occurred. Please try again.' />;
  // }

  // if (!sortedPictures.length) {
  //     return <GeneralError message='No data available.' />;
  // }

  return (
    <div className={style.container}>
      <Selector onChange={handleSortChange} />
      <div className={style.picture_list}>
        {displayedPictures.map((picture) => (
          <PictureCard
            key={picture.id}
            id={picture.id.toString()}
            title={picture.title}
            artist={picture.artist_title}
            image={getImageUrl(picture.image_id)}
            isPublic={picture.is_public_domain}
          />
        ))}
      </div>
      <div className={style.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
