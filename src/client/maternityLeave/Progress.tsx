import React from "react";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { MaternityLeaveFields } from "~/client/maternityLeave/maternityLeaveSteps";
import { Step } from "~/client/components/stepManager/StepManager";
import { cssVariables, cssBreakpoints } from "~/cssVariables";
import { darkenColor } from "~/client/util/color";

const s = compileStaticStylesheet(({ css }) => ({
  container: css`
    width: calc(960px + 64px);
    max-width: 100%;
    margin: 16px auto 0;
    padding: 0 32px;

    @media (max-width: ${cssBreakpoints.maxXs}) {
      padding-left: 24px;
      padding-right: 24px;
    }
  `,

  progressContainer: css`
    display: flex;
    align-items: center;
  `,

  item: css`
    width: 160px;
    height: 26px;
    background: white;
    position: relative;
    margin-right: 8px;

    @media (max-width: ${cssBreakpoints.maxXs}) {
      display: none;
      width: 100%;

      &--current {
        display: block;
      }
    }
  `,

  item__icon: css`
    position: absolute;
    top: 0;
    left: 0;

    svg {
      width: 16px;
      height: 16px;
      fill: ${darkenColor(cssVariables.colorOffWhite, 20)};
    }

    &--active {
      svg {
        fill: ${cssVariables.colorPrimary};
      }
    }
  `,

  item__label: css`
    padding-left: 26px;
    font-size: 14px;
    line-height: 16px;
    font-family: ${cssVariables.bodyFont};

    white-space: nowrap;
    color: ${darkenColor(cssVariables.colorOffWhite, 20)};

    &--active {
      color: ${cssVariables.colorPrimary};
    }
  `,

  bar: css`
    position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 4px;
    background: ${darkenColor(cssVariables.colorOffWhite, 6)};
    overflow: hidden;
  `,

  bar__active: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform-origin: 0 0;
    border-radius: 4px;
    background: ${cssVariables.colorPrimary};
    transition: transform 0.3s;
  `,
}));

interface Props {
  stepIndex: number;
  steps: Array<Step<MaternityLeaveFields>>;
}

export const MaternityLeaveProgressNew: React.FC<Props> = props => {
  let hide = false;

  {
    const activeStep = props.steps[props.stepIndex];

    if (activeStep.name === "existingApplications" || activeStep.name === "applicationOverview") {
      hide = true;
    }
  }

  const filteredSteps = props.steps.filter(step => !step.hidden);

  const progressSteps: Array<{
    t: number;
    index: number;
    label: string;
    icon: React.ReactNode;
  }> = [];

  for (let i = 0; i < filteredSteps.length; i += 1) {
    const step = filteredSteps[i];
    if (step.sectionName) {
      progressSteps.push({
        index: i,
        t: -1, // -1 means that this step has not been reached
        label: step.sectionName,
        icon: (step as any).icon,
      });
    }
  }

  for (let i = 0; i < progressSteps.length; i += 1) {
    const step = progressSteps[i];

    if (props.stepIndex < step.index) {
      continue;
    }

    const nextStepIndex =
      i === progressSteps.length - 1 ? filteredSteps.length - 1 : progressSteps[i + 1].index;

    step.t = Math.max(
      0.05,
      Math.min(1, (props.stepIndex - step.index) / (nextStepIndex - step.index)),
    );
  }

  const stepElements: React.ReactNode[] = [];

  progressSteps.forEach((step, i) => {
    const active = step.t !== -1;

    stepElements.push(
      <div key={i} className={s("item", { active, current: active && step.t !== 1 })}>
        <i className={s("item__icon", { active })}>{step.icon}</i>
        <div className={s("item__label", { active })}>{step.label}</div>
        <div className={s("bar")}>
          <div
            className={s("bar__active")}
            // 1.01 to compensate for subpixel values in the element's width
            style={{ transform: `translateX(-${(1.01 - Math.max(0, step.t * 1.01)) * 101}%)` }}
          />
        </div>
      </div>,
    );
  });

  return (
    <div className={s("container")} style={{ opacity: hide ? 0 : 1 }}>
      <div className={s("progressContainer")}>{stepElements}</div>
    </div>
  );
};
