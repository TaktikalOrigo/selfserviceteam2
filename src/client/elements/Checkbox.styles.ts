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
  `,

  box: css`
    background: ${cssVariables.colorBlack};
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    position: relative;
  `,

  fillWrapper: css`
    width: 20px;
    height: 20px;
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
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 2px;
  `,

  text: css`
    color: ${cssVariables.colorBlack};
    vertical-align: top;
    color: black;
    font-size: 18px;
    line-height: 23px;
    display: inline-block;
    width: calc(100% - 30px);
    padding-left: 16px;
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
