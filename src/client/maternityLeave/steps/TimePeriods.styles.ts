import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  timePeriod: css`
    position: relative;
    z-index: 10;
    margin-bottom: 16px;

    &--last {
      margin-bottom: 48px;
    }
  `,

  timePeriod__upper: css`
    display: flex;
    align-items: flex-end;
  `,

  timePeriod__section: css`
    margin-right: 24px;
    flex-grow: 1;
  `,

  timePeriod__label: css`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    min-height: 14px;
    color: ${cssVariables.colorBlack};
  `,

  addTimePeriod: css`
    cursor: pointer;
    margin-bottom: 80px;
    width: 100%;
    height: 56px;
    line-height: 56px;
    font-family: ${cssVariables.bodyFont};
    font-weight: 600;
    color: ${cssVariables.colorPrimary};
    background: transparent;
    border: 1px dashed #ccccd8;
    font-size: 16px;
    line-height: 32px;
    border-radius: 4px;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }
  `,

  removeTimePeriod: css`
    cursor: pointer;
    margin-bottom: 0;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    font-size: 16px;
    padding: 0 24px;
    line-height: 58px;
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

  barContainer: css`
    display: flex;
    position: relative;
    margin-bottom: 64px;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 6px;
      background: ${cssVariables.colorOffWhite};
      border-radius: 4px;
    }
  `,

  bar__wrapper: css`
    flex-basis: 0;
    position: relative;
    z-index: 10;

    &--2 {
      flex-grow: 2;
    }

    &--4 {
      flex-grow: 4;
    }
  `,

  bar__separator: css`
    position: absolute;
    top: -5px;
    right: -1px;
    height: 16px;
    width: 2px;
    background: ${cssVariables.colorBlack};
  `,

  bar__label: css`
    text-align: center;
    margin-top: 32px;
    margin-bottom: 8px;
  `,

  bar__months: css`
    text-align: center;
    font-weight: 600;
  `,

  bar__filled: css`
    background: ${cssVariables.colorPrimary};
    height: 5px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    transition: width 0.3s, background 0.3s;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    &--error {
      background: ${cssVariables.colorError};
    }
  `,
});
