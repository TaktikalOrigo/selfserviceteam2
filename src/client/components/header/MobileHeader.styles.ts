import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css, keyframes }: StyleParams) => {
  const bgFadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  const bgFadeOut = keyframes`
    from { opacity: 1; transform: none; }
    to { opacity: 0; transform: none; }
  `;

  return {
    header: css`
      height: ${cssVariables.headerHeight};
    `,

    header__content: css`
      height: ${cssVariables.headerHeight};
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,

    modal: css`
      padding: 80px 24px 0;
      max-width: 80vw;
      width: 320px;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      background: white;
      box-shadow: 0 0 32px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s;
      z-index: 150;

      &--open {
        transform: translateX(0);
      }
    `,

    background: css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 100;
      transform: translateX(100%);

      &--animate {
        animation: ${bgFadeOut} 0.3s;
      }

      &--open {
        animation: ${bgFadeIn} 0.3s;
        transform: none;
      }
    `,

    logo: css`
      svg {
        height: 24px;
        width: 148px;
      }
    `,

    burger: css`
      position: absolute;
      width: 32px;
      height: 32px;
      outline: none;
      border: none;
      background: transparent;
      z-index: 200;
      top: 24px;
      right: 24px;
      cursor: pointer;
    `,

    burger__line: css`
      height: 2px;
      position: absolute;
      left: 4px;
      right: 4px;
      background: ${cssVariables.colorBlack};
      transition: transform 0.3s;

      &--0 {
        top: 6px;
      }
      &--1 {
        top: 50%;
        transform: translateY(-50%);
      }
      &--2 {
        bottom: 6px;
      }

      &--0.open {
        transform: translateY(9px) rotate(45deg);
      }
      &--1.open {
        transform: translateY(-50%) scaleX(0);
      }
      &--2.open {
        transform: translateY(-9px) rotate(-45deg);
      }
    `,

    container: css`
      text-align: right;
    `,

    name: css`
      font-family: ${cssVariables.bodyFont};
      font-size: 18px;
      font-weight: 600;
      color: ${cssVariables.colorBlack};
      line-height: 1;
      margin-bottom: 8px;
    `,

    ssn: css`
      font-family: ${cssVariables.bodyFont};
      font-size: 12px;
      color: ${cssVariables.colorBlack};
      line-height: 1;
    `,

    logoutButton: css`
      color: ${cssVariables.colorPrimary};
      font-family: ${cssVariables.bodyFont};
      font-weight: 600;
      display: inline-block;
      margin-top: 24px;
      padding: 0 24px;
      line-height: 32px;
      font-size: 16px;
      background: ${cssVariables.colorOffWhite};
      border: none;
      border-radius: 4px;
    `,
  };
};
