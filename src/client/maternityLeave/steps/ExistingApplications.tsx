import React from "react";

import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import icelandicLocale from "date-fns/locale/is";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { Button } from "~/client/elements/Button";
import { cssVariables } from "~/cssVariables";
import { format } from "date-fns";

const s = compileStaticStylesheet(({ css }) => ({
  itemContainer: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `,

  item: css`
    position: relative;
    z-index: 1;
    width: calc(50% - 16px);
    display: block;
    background: white;
    border-radius: 4px;
    margin-bottom: 16px;
    padding: 16px;
    text-align: left;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 800px) {
      width: 100%;
    }
  `,

  item__title: css`
    font-size: 20px;
    font-weight: 600;
    font-family: ${cssVariables.bodyFont};
    margin-bottom: 8px;
  `,

  item__createdAt: css`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
    font-family: ${cssVariables.bodyFont};
  `,
}));

export const MaternityLeaveExistingApplications: React.FC<MaternityLeaveProps> = props => {
  return (
    <CenteredWrapper>
      <Title marginBottom={16}>Umsóknir</Title>
      <Text marginBottom={40}>
        Hér eru umsóknirnar þínar. Smelltu á umsókn til að sjá stöðu hennar.
      </Text>
      <div className={s("itemContainer")}>
        {props.fields.applications.map((application, i) => {
          const date = new Date(application.createdAt);
          return (
            <button
              key={application.id}
              className={s("item")}
              onClick={() => {
                props.setFields({ applicationIndex: i });
                props.goToStep("applicationOverview", { transitionDirection: "forward" });
              }}
            >
              <div className={s("item__title")}>Umsókn um fæðingarorlof eða styrk</div>
              <div className={s("item__createdAt")}>
                Sótt um {format(date, "d. MMMM, yyyy,", { locale: icelandicLocale })} kl.{" "}
                {format(date, "HH:mm", { locale: icelandicLocale })}
              </div>
            </button>
          );
        })}
      </div>
      <Button primary onClick={() => props.nextStep()} marginTop={40}>
        Stofna nýja umsókn
      </Button>
    </CenteredWrapper>
  );
};
