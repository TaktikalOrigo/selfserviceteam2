import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  label: css`
    margin-bottom: 32px;
  `,

  label__title: css`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    min-height: 14px;
    color: ${cssVariables.colorBlack};
  `,
});
