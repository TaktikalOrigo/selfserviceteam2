import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  container: css`
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

  wrapper: css`
    display: inline-block;
  `,

  errorMessage: css`
    display: inline-block;
    padding: 0;
    margin: 0 auto 0;
    text-align: center;
    border-radius: 4px;
    display: flex;
    justify-content: center;
  `,

  errorMessage__icon: css`
    margin-top: 17px;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    vertical-align: top;
    transform: translate(0, -1px);

    svg {
      width: 18px;
      height: 18px;
      fill: ${cssVariables.colorError};
    }
  `,

  errorMessage__label: css`
    margin: 13px 0;
    display: inline-block;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.4;
    color: ${cssVariables.colorError};
  `,
});
