import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  label: css`
    margin-bottom: 64px;
    max-width: 256px;
  `,

  label__title: css`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    min-height: 14px;
    color: ${cssVariables.colorBlack};
  `,

  datePicker__container: css`
    position: relative;
  `,

  datePicker__icon: css`
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 24px;
    z-index: 1;
    pointer-events: none;

    svg {
      height: 20px;
      width: 20px;
      fill: ${cssVariables.colorBlack};
    }
  `,
});
