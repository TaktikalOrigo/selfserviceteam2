import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables, cssBreakpoints } from "~/cssVariables";

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
    padding-right: 24px;

    @media (max-width: ${cssBreakpoints.maxXs}) {
      flex-direction: column;
      align-items: stretch;
      padding-right: 40px;
    }
  `,

  timePeriod__section: css`
    margin-right: 24px;
    flex-grow: 1;
    position: relative;

    @media (max-width: ${cssBreakpoints.maxXs}) {
      padding-left: 40px;
      margin-right: 0;
      margin-bottom: 16px;
    }
  `,

  timePeriod__label: css`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    min-height: 14px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
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
    border: none;
    background: transparent;
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 4px;
    transition: background 0.3s;

    @media (min-width: ${cssBreakpoints.minXs}) {
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    svg {
      width: 18px;
      height: 18px;
      fill: ${cssVariables.colorPrimary};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @media (max-width: ${cssBreakpoints.maxXs}) {
      width: 32px;
      height: 32px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
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

    @media (max-width: ${cssBreakpoints.maxXs}) {
      display: none;
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

    @media (max-width: ${cssBreakpoints.maxXs}) {
      margin-top: 112px;
    }
  `,

  bar__wrapper: css`
    display: inline-block;
    position: relative;
    z-index: 10;
    width: 33.33333%;
  `,

  bar__separator: css`
    position: absolute;
    top: -5px;
    right: -1px;
    height: 16px;
    width: 2px;
    background: ${cssVariables.colorBlack};
  `,

  bar__text: css`
    &--left {
      @media (max-width: ${cssBreakpoints.maxXs}) {
        margin-left: -16px;
        margin-right: -24px;
      }
    }
    &--right {
      @media (max-width: ${cssBreakpoints.maxXs}) {
        margin-left: -24px;
        margin-right: -16px;
      }
    }

    &--center {
      @media (max-width: ${cssBreakpoints.maxXs}) {
        margin-left: -64px;
        margin-right: -64px;
        transform: translateY(-96px);
      }
    }
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
