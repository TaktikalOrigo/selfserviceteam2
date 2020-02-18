import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables, maxXs } from "~/cssVariables";

export default ({ css }: StyleParams) => ({
  header: css`
    height: ${cssVariables.headerHeight};

    @media (max-width: ${maxXs}) {
      display: none;
    }
  `,

  header__content: css`
    height: ${cssVariables.headerHeight};
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  logo: css`
    svg {
      height: 24px;
      width: 148px;
    }
  `,

  nameAndSsnContainer: css`
    text-align: right;
  `,

  name: css`
    font-family: ${cssVariables.bodyFont};
    font-size: 18px;
    font-weight: 600;
    color: ${cssVariables.colorBlack};
    line-height: 1;
    margin-bottom: 8px;
  `,

  ssn: css`
    font-family: ${cssVariables.bodyFont};
    font-size: 12px;
    color: ${cssVariables.colorBlack};
    line-height: 1;
  `,

  header__right: css`
    display: flex;
    align-items: center;
  `,

  logoutButton__separator: css`
    height: 32px;
    width: 1px;
    margin: 0 16px;
    background: rgba(0, 0, 0, 0.2);
  `,

  logoutButton: css`
    color: ${cssVariables.colorPrimary};
    font-family: ${cssVariables.bodyFont};
    font-weight: 600;
    display: inline-block;
    margin: 0;
    padding: 0;
    line-height: 32px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  `,
});
