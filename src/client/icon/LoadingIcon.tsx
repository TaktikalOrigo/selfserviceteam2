import React from "react";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";

const s = compileStaticStylesheet(({ css, keyframes }) => {
  const animation = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(358deg); }
  `;

  return {
    rotateInfinitely: css`
      animation: ${animation} linear infinite 1.5s;
    `,
  };
});

export const LoadingIcon: React.FC = () => (
  <svg
    className={s("rotateInfinitely")}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.97105 2.85873C6.0431 2.85873 2.85873 6.04501 2.85873 9.9855C2.85873 11.1557 3.14116 12.2595 3.64055 13.2353C4.00019 13.9381 3.72205 14.7993 3.01931 15.1589C2.31657 15.5186 1.45535 15.2404 1.09571 14.5377C0.395878 13.1702 0 11.6213 0 9.9855C0 4.47074 4.45971 0 9.97105 0C15.4698 0 20 4.45819 20 9.9855C20 15.4132 15.4534 20 9.97105 20C8.86135 20 7.79016 19.815 6.78836 19.4737C6.04111 19.2192 5.64172 18.407 5.89628 17.6598C6.15085 16.9126 6.96298 16.5132 7.71022 16.7677C8.42067 17.0098 9.18067 17.1413 9.97105 17.1413C13.87 17.1413 17.1413 13.839 17.1413 9.9855C17.1413 6.05756 13.9116 2.85873 9.97105 2.85873Z"
    />
  </svg>
);
