import React from "react";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { MaternityLeaveFields } from "~/client/maternityLeave/maternityLeaveSteps";
import { Step } from "~/client/components/stepManager/StepManager";
import styles from "~/client/maternityLeave/MaternityLeaveProgress.styles";

const s = compileStaticStylesheet(styles);

interface Props {
  stepIndex: number;
  steps: Array<Step<MaternityLeaveFields>>;
}

export const MaternityLeaveProgress: React.FC<Props> = props => {
  const progressSteps: Array<{ t: number; index: number; label: string }> = [];

  for (let i = 0; i < props.steps.length; i += 1) {
    const step = props.steps[i];
    if (step.sectionName) {
      progressSteps.push({
        index: i,
        t: -1, // -1 means that this step has not been reached
        label: step.sectionName,
      });
    }
  }

  for (let i = 0; i < progressSteps.length; i += 1) {
    const step = progressSteps[i];

    if (props.stepIndex < step.index) {
      continue;
    }

    if (i === progressSteps.length - 1) {
      progressSteps[i].t = 1;
      continue;
    }

    const nextStep = progressSteps[i + 1];

    step.t = Math.min(1, (props.stepIndex - step.index) / (nextStep.index - step.index));
  }

  const stepElements: React.ReactNode[] = [];

  progressSteps.forEach((step, i) => {
    const active = step.t !== -1;

    stepElements.push(
      <div key={i} className={s("circle", { active })}>
        <div className={s("circle__number", { active })}>{i + 1}</div>
        <div className={s("circle__label")}>{step.label}</div>
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
