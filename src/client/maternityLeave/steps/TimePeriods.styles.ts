import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  timePeriod: css`
    position: relative;
    margin-bottom: 16px;
  `,

  timePeriod__upper: css`
    display: flex;
    align-items: center;
  `,

  timePeriod__section: css`
    margin-right: 32px;
  `,

  addTimePeriod: css`
    cursor: pointer;
    margin-bottom: 32px;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    font-size: 16px;
    padding: 0 24px;
    line-height: 32px;
    border-radius: 4px;
  `,

  removeTimePeriod: css`
    cursor: pointer;
    margin-bottom: 0;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    font-size: 16px;
    padding: 0 24px;
    line-height: 32px;
    border-radius: 4px;
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
