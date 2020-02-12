import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables, cssMixins } from "~/cssVariables";

export default ({ css, keyframes }: StyleParams) => {
  const iconFadeIn = keyframes`
    from { transform: translateY(-34px); }
    to   { transform: translateY(0); }
  `;

  const iconFadeOut = keyframes`
    from { transform: translateY(-34px); }
    to   { transform: translateY(0); }
  `;

  return {
    wrapper: css`
      display: block;

      &--inline {
        display: inline-block;
      }
      &--left {
        text-align: left;
      }
      &--center {
        text-align: center;
      }
      &--right {
        text-align: right;
      }
    `,

    button: css`
      font-family: ${cssVariables.bodyFont};
      color: ${cssVariables.colorBlack};
      padding: 0;
      position: relative;
      background-color: transparent;
      border: none;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 18px;
      line-height: 1;
      border-radius: 4px;
      max-width: 100%;
      cursor: pointer;
      transition: box-shadow 0.3s, background-color 0.3s, border-color 0.3s, opacity 0.3s;

      &__container {
        position: relative;
      }

      ${cssMixins.focusableOuter()};

      &:hover {
        background-color: ${cssVariables.colorOffWhite};
      }

      svg {
        fill: ${cssVariables.colorBlack};
      }

      &--full-width {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
      }

      &--primary {
        background-color: ${cssVariables.colorBlack};
        color: white;
        transition: box-shadow 0.3s, background-color 0.3s, border-color 0.3s, opacity 0.3s;

        &:hover {
          background-color: ${cssVariables.colorBlack};
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
        }

        &:active {
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
        }

        svg {
          fill: white;
        }
      }

      &[disabled] {
        cursor: default !important;
        box-shadow: none !important;
        opacity: 0.2;
      }
    `,

    button__focus: css`
      padding: 14px 30px;
      position: relative;
      transition: box-shadow 0.2s;
      border-radius: 4px;

      ${cssMixins.focusableInner()}
    `,

    content: css`
      position: relative;

      &__loader,
      &__text {
        transition: opacity 0.3s, transform 0.3s ease-in-out;
      }
    `,

    content__loader: css`
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transform: translate(-50%, calc(-50% + 4px));
      transition: opacity 0.3s, transform 0.3s;

      &--active {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    `,

    content__text: css`
      display: flex;
      align-items: center;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 0.3s, transform 0.3s;

      &--active {
        opacity: 1;
        transform: translateY(0px);
      }
    `,

    iconWrapper: css`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    `,

    icon: css`
      position: absolute;
      width: 18px;
      height: 18px;
      opacity: 0;
      transition: opacity 0.3s;

      svg {
        cursor: text;
        width: 18px;
        height: 18px;
        fill: white;
      }

      &--left {
        left: -10px;
        transform: translate(-100%, 0);
      }

      &--active {
        opacity: 1;
      }
    `,

    label: css`
      display: inline-block;
      transition: transform 0.4s;

      &--icon-left {
        transform: translateX(10px);
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
