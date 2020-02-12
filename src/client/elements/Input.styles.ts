import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";
import { darkenColor } from "~/client/util/color";

const colorBorder = darkenColor(cssVariables.colorOffWhite, 10);

export default ({ css }: StyleParams) => ({
  input: css`
    font-size: 18px;
    padding: 18px 20px 18px;
    line-height: 20px;
    border-radius: ${cssVariables.borderRadiusNormal};
    color: ${cssVariables.colorBlack};
    font-family: ${cssVariables.bodyFont};
    background-color: ${cssVariables.colorOffWhite};
    border: none;
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid ${colorBorder};
    box-shadow: none;
    transition: background-color 0.3s, border-color 0.3s;
    -webkit-appearance: none;

    &:focus {
      border-color: ${cssVariables.colorBlack};
    }

    @keyframes autofill {
      to {
        background: transparent;
      }
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${cssVariables.colorBlack};
      box-shadow: 0 0 0 30px ${colorBorder} inset;
      animation-name: autofill;
      animation-fill-mode: both;
    }

    &:read-only {
      background-color: ${colorBorder} !important;
      border-color: ${colorBorder} !important;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  `,
});
