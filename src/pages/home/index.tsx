import { useState } from "react";
import { Search } from "@components/search";
import { SpecialGallery } from "@components/special_gallery";
import { OtherWorkList } from "@components/other_work_list";

import style from "./style.module.scss";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={style.home}>
      <section className={style.search_block}>
        <h1 className={style.title}>
          Let&apos;s Find Some <span className={style.highlight}>Art</span>{" "}
          Here!
        </h1>
        <Search onChange={handleSearchChange} />
      </section>
      <section className={style.home_section}>
        <div className={style.text_block}>
          <h3 className={style.subtitle}>Topics for you</h3>
          <h2 className={style.title}>Our special gallery</h2>
          <SpecialGallery searchQuery={searchQuery} />
        </div>
      </section>
      <section className={style.home_section}>
        <div className={style.text_block}>
          <h3 className={style.subtitle}>Here some more</h3>
          <h2 className={style.title}>Other works for you</h2>
          <OtherWorkList />
        </div>
      </section>
    </div>
  );
};
