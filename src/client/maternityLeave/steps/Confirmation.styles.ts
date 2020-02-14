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
      width: auto;
      flex-direction: column;

      & > *:first-of-type {
        margin-right: 0;
      }
    }
  `,
});
