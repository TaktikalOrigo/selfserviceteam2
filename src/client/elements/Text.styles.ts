import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables, cssBreakpoints } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  wrapper: css`
    display: block;

    &--align-left {
      text-align: left;
    }
    &--align-center {
      text-align: center;
    }
    &--align-right {
      text-align: right;
    }
  `,

  text: css`
    font-family: ${cssVariables.bodyFont};

    display: block;
    font-size: 24px;
    line-height: 1.4;
    font-weight: 400;

    &--alignCenter {
      margin-left: auto;
      margin-right: auto;
    }

    &--body {
      color: ${cssVariables.colorBlack};
      font-size: 24px;
      font-weight: 400;
      line-height: 1.76;

      @media (max-width: ${cssBreakpoints.maxXs}) {
        font-size: 20px;
      }
    }
  `,
});
