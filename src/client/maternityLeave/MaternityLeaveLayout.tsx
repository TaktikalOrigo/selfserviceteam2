import React from "react";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";

const s = compileStaticStylesheet(({ css }) => ({
  container: css`
    padding: 32px;
    min-height: calc(100vh - 100px);
  `,
}));

export const MaternityLeaveLayout: React.FC = props => {
  return <div className={s("container")}>{props.children}</div>;
};
