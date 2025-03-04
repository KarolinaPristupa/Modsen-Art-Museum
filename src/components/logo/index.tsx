import { Link } from 'react-router-dom';
import LogoFooter from '@assets/logos/logo_footer.svg?url';
import LogoHeader from '@assets/logos/logo_header.svg?url';
import { UrlPaths } from '@constants/paths';

import style from './style.module.scss';

type LogoProps = {
    isInFooter?: boolean;
}

export const Logo = ({isInFooter}: LogoProps) => (
    <Link to = {UrlPaths.HOME}>
        <div className = {style.logo}>
            <img src = {isInFooter ? LogoFooter : LogoHeader} alt='Museum of Art' />
        </div>
    </Link>
);