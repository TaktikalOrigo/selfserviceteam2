import { StyleParams } from "@taktikal/stylesheets";
import { cssBreakpoints, cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  row: css`
    display: flex;
    width: 640px;

    & > *:first-of-type {
      margin-right: 32px;
    }

    & > * {
      flex-basis: 0;
      flex-grow: 1;
    }

    @media (max-width: ${cssBreakpoints.maxXs}) {
      width: auto;
      flex-direction: column;

      & > *:first-of-type {
        margin-right: 0;
      }
    }
  `,

  label: css`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    min-height: 14px;
    color: ${cssVariables.colorBlack};
  `,
});
