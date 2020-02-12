import { StyleParams } from "@taktikal/stylesheets";
import { cssBreakpoints, cssVariables } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  wrapper: css`
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

  title: css`
    display: block;
    line-height: 1.33334;
    color: ${cssVariables.colorBlack};

    &--uppercase {
      text-transform: uppercase;
      letter-spacing: 0.07em;
    }

    &--1 {
      font-size: 36px;
    }
    &--2 {
      font-size: 28px;
    }
    &--3 {
      font-size: 21px;
    }
    &--4 {
      font-size: 18px;
    }
    &--5 {
      font-size: 16px;
    }
    &--6 {
      font-size: 14px;
    }

    @media (max-width: ${cssBreakpoints.maxXs}) {
      &--1 {
        font-size: 32px;
      }
      &--2 {
        font-size: 24px;
      }
    }
  `,
});
