import { StyleParams } from "@taktikal/stylesheets";
import { cssBreakpoints } from "~/cssVariables";

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
      flex-direction: column;

      & > *:first-of-type {
        margin-right: 0;
      }

      & > * {
        margin-bottom: 32px;
      }
    }
  `,
});
