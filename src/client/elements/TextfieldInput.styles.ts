import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css, keyframes }: StyleParams) => {
  const enterKeyframes = keyframes`
    from { transform: translateY(-48px); }
    to { transform: translateY(0); }
  `;

  const exitKeyframes = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(48px); }
  `;

  return {
    input: css`
      font-size: 18px;
      font-weight: 500;
      padding: 10px 20px 11px;
      border-radius: 4px;
      font-family: ${cssVariables.bodyFont};
      background-color: ${cssVariables.colorOffWhite};
      border: 2px solid ${cssVariables.colorOffWhite};
      color: ${cssVariables.colorBlack};
      border: none;
      display: block;
      width: 100%;
      outline: none;
      box-shadow: none;
      transition: background-color 0.3s, border-color 0.3s;
      -webkit-appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 4px;
      border: 2px solid ${cssVariables.colorOffWhite};

      &--readonly,
      &--disabled {
        background-color: #e1e9ff;
      }

      &:focus {
        border-color: ${cssVariables.colorBlack};
      }

      &:-webkit-autofill {
        box-shadow: ${cssVariables.boxShadowBorderFocus};
      }
    `,

    inputEnterActive: css`
      border-radius: 0;
      animation: ${enterKeyframes} 0.4s cubic-bezier(${cssVariables.bezierSmooth});
    `,

    inputExitActive: css`
      border-radius: 0;
      animation: ${exitKeyframes} 0.4s cubic-bezier(${cssVariables.bezierSmooth});
    `,
  };
};
