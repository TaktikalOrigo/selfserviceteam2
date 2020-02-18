import React from "react";
import Select from "react-select";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { Title } from "~/client/elements/Title";
import { Textfield } from "~/client/elements/Textfield";
import { digits } from "~/common/util/form/digits";
import { Button } from "~/client/elements/Button";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "~/client/maternityLeave/steps/Info.styles";
import { Text } from "~/client/elements/Text";

const s = compileStaticStylesheet(styles);

const selectStyles = {
  control: () => ({
    height: "58px",
    display: "flex",
    border: "1px solid #d9d9dc",
    borderRadius: 4,
  }),
  indicatorSeparator: () => ({}),
};

type Option = { value: number; label: string };

const unionOptions = [
  { value: 2, label: "Stéttarfélag A (2%)" },
  { value: 2.55, label: "Stéttarfélag B (2,55%)" },
  { value: 3.25, label: "Stéttarfélag C (3,25%)" },
];

const valueToUnionOption = unionOptions.reduce<{ [key: number]: Option }>((obj, item) => {
  obj[item.value] = item;
  return obj;
}, {});

const pensionFundOptions = [
  { value: 0, label: "Lífeyrissjóður A (0%)" },
  { value: 4, label: "Lífeyrissjóður B (4%)" },
];

const valueToPensionOption = pensionFundOptions.reduce<{ [key: number]: Option }>((obj, item) => {
  obj[item.value] = item;
  return obj;
}, {});

const personalPensionFundPercentOptions = [
  { value: 0, label: "Lífeyrissjóður A (0%)" },
  { value: 1, label: "Lífeyrissjóður B (1%)" },
  { value: 2, label: "Lífeyrissjóður C (2%)" },
  { value: 3, label: "Lífeyrissjóður D (3%)" },
  { value: 4, label: "Lífeyrissjóður E (4%)" },
];

const valueToPersonalPensionFundOption = personalPensionFundPercentOptions.reduce<{
  [key: number]: Option;
}>((obj, item) => {
  obj[item.value] = item;
  return obj;
}, {});

export const MaternityLeaveInfo: React.FC<MaternityLeaveProps> = props => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    props.nextStep();
  };

  return (
    <CenteredWrapper>
      <div>
        <form onSubmit={onSubmit}>
          <Title marginBottom={16}>Nokkur atriði sem við þurfum að fá á hreint...</Title>
          <Text maxWidth={680} marginBottom={40}>
            Til að útreikningar séu sem nákvæmastir þurfa eftirfarandi upplúsingar að vera fyrir
            hendi.
          </Text>

          <div className={s("row")}>
            <div>
              <div className={s("label")}>Stéttarfélag</div>
              <Select
                placeholder="Veldu það sem við á"
                options={unionOptions}
                value={valueToUnionOption[props.fields.unionPercentage]}
                onChange={
                  (({ value }: { value: number }) =>
                    props.setFields({ unionPercentage: value })) as any
                }
                styles={selectStyles}
              />
            </div>

            <Textfield
              label="Hlutfall persónuafsláttar (%)"
              value={props.fields.personalTaxBreakRate.toString()}
              onChange={e => {
                props.setFields({
                  personalTaxBreakRate: Math.max(
                    0,
                    Math.min(100, parseInt(digits(e.target.value) || "0")),
                  ),
                });
              }}
            />
          </div>

          <div className={s("row")}>
            <Textfield
              label="Starfshlutfall (%)"
              value={props.fields.jobPercentage.toString()}
              onChange={e => {
                props.setFields({
                  jobPercentage: Math.max(
                    0,
                    Math.min(100, parseInt(digits(e.target.value) || "0")),
                  ),
                });
              }}
            />
            <Textfield
              label="Tekjur (kr)"
              value={props.fields.salary.toString()}
              onChange={e => {
                props.setFields({ salary: Math.max(0, parseInt(digits(e.target.value) || "0")) });
              }}
            />
          </div>

          <div className={s("row")} style={{ marginBottom: 64 }}>
            <div>
              <div className={s("label")}>Lífeyrissjóður</div>
              <div>
                <Select
                  placeholder="Veldu það sem við á"
                  options={pensionFundOptions}
                  value={valueToPensionOption[props.fields.pensionPercentage]}
                  onChange={
                    (({ value }: { value: number }) =>
                      props.setFields({ pensionPercentage: value })) as any
                  }
                  styles={selectStyles}
                />
              </div>
            </div>

            <div>
              <div className={s("label")}>Séreignarsparnaður</div>
              <div>
                <Select
                  placeholder="Veldu það sem við á"
                  options={personalPensionFundPercentOptions}
                  value={valueToPersonalPensionFundOption[props.fields.personalFundContribution]}
                  onChange={
                    (({ value }: { value: number }) =>
                      props.setFields({ personalFundContribution: value })) as any
                  }
                  styles={selectStyles}
                />
              </div>
            </div>
          </div>

          <Button primary type="submit" marginBottom={32} marginTop={32}>
            Áfram
          </Button>
        </form>
      </div>
    </CenteredWrapper>
  );
};
