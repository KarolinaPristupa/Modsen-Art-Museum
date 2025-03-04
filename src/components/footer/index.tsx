import ModsenLogo from "@assets/logos/modsen_logo.svg";
import { Logo } from "@components/logo";

import style from "./style.module.scss";

export const Footer = () => (
  <footer className={style.footer}>
    <div className={style.content_container}>
      <Logo isInFooter={true} />
      <div className={style.company_logo}>
        <ModsenLogo />
      </div>
    </div>
  </footer>
);
