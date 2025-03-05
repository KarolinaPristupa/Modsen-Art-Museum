import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import SearchIcon from "@assets/search.svg";
import { useDebounce } from "@hooks/use_debounce";

import styles from "./style.module.scss";

type SearchProps = {
  onChange?: (value: string) => void;
  placeholder?: string;
};

type SearchFormValues = {
  query: string;
};

export const Search = ({ onChange, placeholder = "Search" }: SearchProps) => {
  const { control, watch, trigger, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: {
      query: "",
    },
  });

  const query = watch("query");
  const debounceQuery = useDebounce(query, 500);

  const handleSearch = useCallback(
    async (data: SearchFormValues) => {
      if (onChange) {
        onChange(data.query);
      }
    },
    [onChange],
  );

  useEffect(() => {
    const validateQuery = async () => {
      const isValid = await trigger("query");

      if (isValid) {
        handleSearch({ query: debounceQuery });
      }
    };

    validateQuery();
  }, [debounceQuery, trigger, handleSearch]);

  return (
    <div className={styles.search_block}>
      <form
        className={styles.search_form}
        onSubmit={handleSubmit(handleSearch)}
      >
        <Controller
          name="query"
          control={control}
          rules={{
            maxLength: 40,
          }}
          render={({ field }) => (
            <input
              type="text"
              placeholder={placeholder}
              maxLength={40}
              {...field}
              className={styles.search}
            />
          )}
        />

        <div className={styles.search_icon}>
          <SearchIcon />
        </div>
      </form>
    </div>
  );
};
