import React from "react";

import { Title } from "~/client/elements/Title";
import { StyleParams } from "@taktikal/stylesheets";
import { cssVariables, maxXs, cssBreakpoints } from "~/cssVariables";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { useBreakpoint } from "~/client/hooks/useBreakpoint";
import { Text } from "~/client/elements/Text";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";

const styles = ({ css }: StyleParams) => ({
  container: css`
    padding: 25px 0;
    margin-bottom: 40px;
  `,

  progressContainer: css`
    display: flex;
    align-items: center;
  `,

  circle: css`
    min-width: 50px;
    width: 50px;
    height: 50px;
    flex-basis: 50px;
    background: white;
    border: 2px solid ${cssVariables.colorOffWhite};
    border-radius: 50%;
    position: relative;
    transition: border 0.3s;
    transition-delay: 0.15s;

    &--active {
      border: 2px solid ${cssVariables.colorPrimary};
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
      color: ${cssVariables.colorPrimary};
    }
  `,

  circle__label: css`
    position: absolute;
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;

    @media (max-width: ${cssBreakpoints.maxXs}) {
      &--0 {
        left: 0;
        transform: none;
      }

      &--1 {
        left: auto;
        right: 0;
        transform: none;
      }
    }
  `,

  bar: css`
    flex-basis: 32px;
    flex-grow: 1;
    height: 2px;
    border-radius: 4px;
    background: ${cssVariables.colorOffWhite};
    overflow: hidden;
    position: relative;
    margin: 0 24px;
    min-width: 32px;
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

  textSmall: css`
    p {
      font-size: 24px !important;
    }
  `,
});

const s = compileStaticStylesheet(styles);

export const Progress: React.FC = () => {
  const isMobile = useBreakpoint(maxXs);

  const progressSteps: Array<{ t: number; index: number; label: string }> = [
    { index: 0, label: "Í vinnslu", t: 0.1 },
    { index: 1, label: "Samþykki atvinnurekanda", t: -1 },
    { index: 2, label: "Samþykki vinnumálastofnunar", t: -1 },
    { index: 3, label: "Lokið", t: -1 },
  ].filter((_, i) => (isMobile ? i < 2 : true));

  const stepElements: React.ReactNode[] = [];

  progressSteps.forEach((step, i) => {
    const active = step.t !== -1;

    stepElements.push(
      <div key={i} className={s("circle", { active })}>
        <div className={s("circle__number", { active })}>{i + 1}</div>
        <div className={s("circle__label", { [step.index]: true })}>{step.label}</div>
      </div>,
    );

    if (i !== progressSteps.length - 1) {
      stepElements.push(
        <div key={i + "bar"} className={s("bar")}>
          <div
            className={s("barActive")}
            // 1.01 to compensate for subpixel values in the element's width
            style={{ transform: `translateX(-${(1.01 - Math.max(0, step.t * 1.01)) * 101}%)` }}
          />
        </div>,
      );
    }
  });

  return (
    <div className={s("container")}>
      <div className={s("progressContainer")}>{stepElements}</div>
    </div>
  );
};

export const MaternityLeaveOverview: React.FC<MaternityLeaveProps> = props => {
  return (
    <>
      <Title marginBottom={32}>Takk fyrir umsóknina, {props.fields.name.split(" ")[0]}</Title>
      <Progress />

      <Title heading={2} maxWidth={640}>
        Umsóknin þín hefur verið send til atvinnurekanda og Vinnumálastofnunar til staðfestingar.
      </Title>

      <div className={s("textSmall")}>
        <Text marginBottom={40} maxWidth={640}>
          Ef þú hefur athugasemdir fram að færa eða óskir eftir nánari upplýsingum hafðu þá samband
          í síma 582 4840, eða sendu okkur tölvupóst á faedingarorlof@vmst.is.
        </Text>
      </div>
    </>
  );
};
