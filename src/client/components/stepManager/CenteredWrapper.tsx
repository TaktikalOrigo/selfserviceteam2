import React from "react";
import { useStylesheet, StyleParams } from "@taktikal/stylesheets";
import { cssBreakpoints, HEADER_HEIGHT } from "~/cssVariables";

const styles = ({ css }: StyleParams) => ({
  container: css`
    min-height: calc(100vh - ${HEADER_HEIGHT + 42}px);
    margin: 0 auto;
    width: 960px;
    max-width: 100%;

    &--wide {
      width: 1280px;
    }

    @media (min-width: ${cssBreakpoints.minXs}) {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    /* @media (max-width: ${cssBreakpoints.maxXs}) {
      min-height: calc(100vh - 82px);
    } */

    /**
     * Hack to fix the following bug:
     *
     *    > In IE10 and IE11, containers with display: flex and flex-direction: column
     *    > will not properly calculate their flexed childrens' sizes if the container
     *    > has min-height but no explicit height property.
     *
     * The '-ms-high-contrast' media query will only target IE10 and IE11, it will not
     * target edge.
     */
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      height: calc(100vh - 100%);
    }

    /* @media screen and (max-width: ${cssBreakpoints.maxXs}) and (-ms-high-contrast: active),
      (-ms-high-contrast: none) {
      height: calc(100vh - 82px);
    } */
  `,

  grow: css`
    flex-grow: 1;
    flex-basis: 0;
    padding: 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding-top: 32px;
    padding-bottom: 128px;

    /**
     * Make scrollable on IE because of bug described above.
     *
     * The height being set explicitly does not allow for the content making the
     * container bigger, so the container has to become scrollable when that happens.
     */
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      overflow-y: auto;
    }
  `,
});

export const CenteredWrapper: React.FC<{ wide?: boolean }> = props => {
  const s = useStylesheet(styles);

  return (
    <div className={s("container", { wide: !!props.wide })}>
      <div className={s("grow")}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
