import React, { useState } from "react";
import Cookie from "js-cookie";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { HeaderProps } from "~/client/components/header/Header";
import styles from "~/client/components/header/MobileHeader.styles";
import { IslandWebsiteLogo } from "~/client/icon/IslandWebsiteLogo";
import { useDidUpdate } from "~/client/hooks/useDidUpdate";

const s = compileStaticStylesheet(styles);

export const MobileHeader: React.FC<HeaderProps> = props => {
  const [open, setOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useDidUpdate(() => {
    if (!open && !fadeOut) {
      setFadeOut(true);
    }
  }, [open]);

  return (
    <>
      <header className={s("header")}>
        <div className={s("header__content")}>
          <a href="https://island.is" className={s("logo")}>
            <IslandWebsiteLogo />
          </a>
        </div>
      </header>
      {props.isLoggedIn && (
        <>
          <div className={s("modal", { open })}>
            {props.isLoggedIn && (
              <>
                <div className={s("container")}>
                  <div className={s("name")}>{props.name}</div>
                  <div className={s("ssn")}>{props.ssn}</div>
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
              </>
            )}
          </div>
          <button className={s("burger")} onClick={() => setOpen(!open)}>
            {[0, 1, 2].map(i => (
              <div
                className={s("burger__line", { [i]: true }) + ` ${open ? "open" : ""}`}
                key={i}
              />
            ))}
          </button>
          <div
            className={s("background", { open, animate: fadeOut })}
            onClick={() => setOpen(false)}
          />
        </>
      )}
    </>
  );
};
