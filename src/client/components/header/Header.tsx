import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "~/client/components/header/Header.styles";
import { IslandWebsiteLogo } from "~/client/icon/IslandWebsiteLogo";
import { useBreakpoint } from "~/client/hooks/useBreakpoint";
import { maxXs } from "~/cssVariables";
import { MobileHeader } from "~/client/components/header/MobileHeader";

export interface HeaderProps {
  isLoggedIn: boolean;
  name: string;
  ssn: string;
}

const s = compileStaticStylesheet(styles);

export const Header: React.FC<HeaderProps> = props => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true));
  }, []);

  const isMobile = useBreakpoint(maxXs);

  if (!mounted) {
    return null;
  }

  if (isMobile) {
    return <MobileHeader {...props} />;
  }

  return (
    <header className={s("header")}>
      <div className={s("header__content")}>
        <a href="https://island.is" className={s("logo")}>
          <IslandWebsiteLogo />
        </a>
        {props.isLoggedIn && (
          <div className={s("header__right")}>
            <div className={s("nameAndSsnContainer")}>
              <div className={s("name")}>{props.name}</div>
              <div className={s("ssn")}>{props.ssn}</div>
            </div>
            <div className={s("logoutButton__separator")} />
            <button
              className={s("logoutButton")}
              onClick={() => {
                Cookie.remove("ssn");
                (window.location as any) = "/umsokn";
              }}
            >
              Útskráning
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
