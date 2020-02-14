import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  container: css`
    display: block;
    width: 100%;

    &--align-left {
      text-align: left;
    }

    &--align-center {
      text-align: center;
    }

    &--align-right {
      text-align: right;
    }

    label {
      text-align: left;
      display: inline-block;
      width: 100%;
    }
  `,

  label: css`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    min-height: 14px;
    color: ${cssVariables.colorBlack};
  `,

  contentWrapper: css`
    position: relative;
    overflow: hidden;
  `,

  inputWrapper: css`
    min-height: 56px;
    position: relative;

    &--icon-left {
      input {
        padding-left: 56px;
      }
    }

    &--icon-right {
      input {
        padding-right: 56px;
      }
    }
  `,

  margin: css`
    transition: margin 0.3s;
  `,

  messageContainer: css`
    overflow: hidden;
    position: relative;
  `,

  messageWrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `,

  message: css`
    font-size: 14px;
    line-height: 1.3;
    padding-top: 0px;
    max-height: 0px;
    overflow: hidden;

    &--error {
      color: ${cssVariables.colorError};
    }

    &--success {
      color: ${cssVariables.colorSuccess};
    }

    &--active {
      max-height: 100px;
      padding-top: 4px;
    }
  `,
});
