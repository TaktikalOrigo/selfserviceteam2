import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css, keyframes }: StyleParams) => {
  const iconFadeIn = keyframes`
    from { transform: translateY(-34px); }
    to   { transform: translateY(0); }
  `;
  const iconFadeOut = keyframes`
    from { transform: translateY(0); }
    to   { transform: translateY(34px); }
  `;

  return {
    icon: css`
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;

      svg {
        cursor: text;
        width: 18px;
        height: 18px;
        fill: black;
      }

      &--left {
        left: 20px;
      }

      &--right {
        right: 20px;
      }
    `,

    iconContainer: css`
      position: relative;
      width: 18px;
      height: 18px;
      fill: white;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: inherit;
        height: inherit;
      }
    `,

    iconWrapper: css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: inherit;
      height: inherit;

      svg {
        fill: ${cssVariables.colorPrimary};
      }
    `,

    enterActive: css`
      animation: ${iconFadeIn} 0.4s cubic-bezier(${cssVariables.bezierSmooth});
    `,

    exitActive: css`
      animation: ${iconFadeOut} 0.4s cubic-bezier(${cssVariables.bezierSmooth});
    `,
  };
};
