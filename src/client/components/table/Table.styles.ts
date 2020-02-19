import { cssVariables } from "~/cssVariables";
import { StyleParams } from "@taktikal/stylesheets";

export default ({ css }: StyleParams) => ({
  head: css`
    display: flex;
    margin-bottom: 8px;
    height: 24px;
    align-items: stretch;
  `,

  head__item: css`
    color: ${cssVariables.colorBlack};
    font-family: ${cssVariables.bodyFont};
    font-weight: 600;
    line-height: 24px;
    font-size: 13px;
    cursor: default;

    &--sortable {
      cursor: pointer;
    }

    &--right {
      text-align: right;
    }
  `,

  sort__arrow: css`
    margin-left: 8px;
    width: 10px;

    svg {
      vertical-align: top;
      opacity: 0;
      transition: opacity 0.3s;
      width: 10px;
      height: 10px;
      margin-top: 8px;
      fill: #cbd1e2;
      transform: rotate(0deg);
    }

    &--up {
      svg {
        transform: rotate(180deg);
        transition: opacity 0.3s, transform 0.3s cubic-bezier(${cssVariables.bezierSmooth});
      }
    }

    &--active {
      svg {
        opacity: 1;
      }
    }
  `,

  body: css`
    display: block;
    overflow-x: auto;
    width: 100%;
  `,

  item: css`
    position: relative;
    padding: 0;
    display: flex;
    align-items: stretch;
    z-index: 5;
    height: 64px;

    &--clickable {
      cursor: pointer;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  `,

  cell: css`
    background: transparent;
    transition: background 0.25s;
    height: 64px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-family: ${cssVariables.bodyFont};

    &--even {
      background: #f7f9fb;
    }

    &--right {
      justify-content: flex-end;
    }

    &:first-of-type {
      border-left-width: 1px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-of-type {
      border-right-width: 1px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `,
});
