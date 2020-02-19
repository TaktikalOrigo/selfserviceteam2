import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  label: css`
    display: block;
  `,

  container: css`
    margin-top: 1px;
    position: relative;
    display: inline-block;
    margin-bottom: 40px;
  `,

  box: css`
    background: #ccccd8;
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    position: relative;
    transition: background 0.1s;

    &--checked {
      background: ${cssVariables.colorPrimary};
    }
  `,

  fillWrapper: css`
    width: 24px;
    height: 24px;
    transition: transform 0.2s;
    transform: scale(1);
    border: none;

    &--checked {
      transform: scale(0.375);
    }
  `,

  fill: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 22px;
    height: 22px;
    background: white;
    border-radius: 2px;
  `,

  text: css`
    color: ${cssVariables.colorBlack};
    font-family: ${cssVariables.bodyFont};
    font-size: 16px;
    line-height: 1.5;
    vertical-align: top;
    color: black;
    display: inline-block;
    width: calc(100% - 30px);
    padding-left: 24px;
    cursor: pointer;
  `,

  inputContainer: css`
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    z-index: 10;
    cursor: pointer;
  `,

  hiddenInput: css`
    transform: scale(2.75) translate(0, -1px) !important;
    transform-origin: 0 0 !important;
    opacity: 0;
    visibility: hidden;
    display: none;
  `,

  visibleInput: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
    border: none;
    -webkit-appearance: none;
    z-index: -1;
    border-radius: 4px;
    outline: none;
    transition: box-shadow 0.2s;

    &:focus {
      box-shadow: ${cssVariables.boxShadowBorderFocus};
    }
  `,
});
