import React from "react";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { HEADER_HEIGHT, cssBreakpoints } from "~/cssVariables";

const s = compileStaticStylesheet(({ css }) => ({
  container: css`
    padding: 0 32px;
    min-height: calc(100vh - ${HEADER_HEIGHT + 42}px);
    overflow: hidden;

    @media (max-width: ${cssBreakpoints.maxXs}) {
      padding-left: 24px;
      padding-right: 24px;
    }
  `,
}));

export const MaternityLeaveLayout: React.FC = props => {
  return (
    <>
      <div className={s("container")}>{props.children}</div>
    </>
  );
};
