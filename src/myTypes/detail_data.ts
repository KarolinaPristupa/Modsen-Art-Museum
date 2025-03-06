import { PictureData } from "./picture_data";

export type DetailData = PictureData & {
  date_display?: string;
  place_of_origin?: string;
  dimensions?: string;
  credit_line?: string;
  artwork_type_title?: string;
};
