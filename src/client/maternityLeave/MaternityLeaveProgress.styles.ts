import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  container: css`
    padding: 25px 100px;
  `,

  progressContainer: css`
    display: flex;
    align-items: center;
  `,

  circle: css`
    width: 50px;
    height: 50px;
    flex-basis: 50px;
    background: ${cssVariables.colorOffWhite};
    border-radius: 50%;
    position: relative;
    transition: background 0.3s;
    transition-delay: 0.15s;

    &--active {
      background: ${cssVariables.colorPrimary};
    }
  `,

  circle__number: css`
    font-family: ${cssVariables.bodyFont};
    font-weight: 600;
    color: #80809d;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: color 0.2s;
    transition-delay: 0.15s;

    &--active {
      color: white;
    }
  `,

  circle__label: css`
    position: absolute;
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  `,

  bar: css`
    flex-basis: 32px;
    flex-grow: 1;
    height: 8px;
    border-radius: 4px;
    background: ${cssVariables.colorOffWhite};
    overflow: hidden;
    position: relative;
    margin: 0 24px;
  `,

  barActive: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform-origin: 0 0;
    border-radius: 8px;
    background: ${cssVariables.colorPrimary};
    transition: transform 0.3s;
  `,
});
