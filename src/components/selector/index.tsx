import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SORT_OPTIONS } from "@constants/sort_options";
import { SortOption } from "@myTypes/sort_options";

import style from "./style.module.scss";

type SortFormValues = {
  sortOption: SortOption;
};

type SelectorProps = {
  onChange: (sortOption: SortOption) => void;
};

export const Selector = ({ onChange }: SelectorProps) => {
  const { control, watch } = useForm<SortFormValues>({
    defaultValues: {
      sortOption: "default",
    },
  });

  const selectedOption = watch("sortOption");

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption, onChange]);

  return (
    <Controller
      name="sortOption"
      control={control}
      render={({ field }) => (
        <div className={style.sort_container}>
          <label htmlFor="sortOption" className={style.label}>
            Sort by:
          </label>
          <select {...field} className={style.select} id="sortOption">
            <option value={SORT_OPTIONS.DEFAULT} className={style.option}>
              Default
            </option>
            <option value={SORT_OPTIONS.TITLE_ASC} className={style.option}>
              Title (A-Z)
            </option>
            <option value={SORT_OPTIONS.TITLE_DESC} className={style.option}>
              Title (Z-A)
            </option>
            <option
              value={SORT_OPTIONS.ARTIST_TITLE_ASC}
              className={style.option}
            >
              Artist (A-Z)
            </option>
            <option
              value={SORT_OPTIONS.ARTIST_TITLE_DESC}
              className={style.option}
            >
              Artist (Z-A)
            </option>
          </select>
        </div>
      )}
    />
  );
};
