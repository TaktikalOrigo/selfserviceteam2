import React from "react";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { Table } from "~/client/components/table/Table";
import { Button } from "~/client/elements/Button";
import formatCurrency from "~/client/util/formatCurrency";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";

const monthLabels = [
  "Janúar",
  "Febrúar",
  "Mars",
  "Apríl",
  "Maí",
  "Júní",
  "Júlí",
  "Ágúst",
  "September",
  "Október",
  "Nóvember",
  "Desember",
];

export const MaternityLeavePaymentPlan: React.FC<MaternityLeaveProps> = props => {
  const plan = props.fields.paymentPlan.map(x => ({
    ...x.result,
    label: monthLabels[x.monthIndex],
  }));

  return (
    <CenteredWrapper wide>
      <Title marginBottom={16}>Greiðsluáætlun</Title>
      <Text marginBottom={40}>Þessi greiðsluáætlun er birt með fyrirvara um breytingar.</Text>
      <Table
        items={plan}
        getKey={() => Math.floor(Math.random() * 100000000).toString()}
        definitions={[
          {
            render: () => <></>,
            width: 24,
          },
          {
            name: "Tímabil",
            render: item => item.label,
            minWidth: 80,
          },
          {
            name: "Tekjur",
            render: item => formatCurrency(item.total, { showCurrency: false }),
            minWidth: 64,
            align: "right",
          },
          {
            name: "Í lífeyrissjóð",
            render: item => formatCurrency(item.pension, { showCurrency: false }),
            minWidth: 100,
            align: "right",
          },
          {
            name: "Í séreignarsparnað",
            render: item => formatCurrency(item.pentionOptional, { showCurrency: false }),
            minWidth: 140,
            align: "right",
          },
          {
            name: "Stéttarfélagsgjöld",
            render: item => formatCurrency(item.union, { showCurrency: false }),
            minWidth: 132,
            align: "right",
          },
          {
            name: "Staðgreiðsla",
            render: item => formatCurrency(item.totalTax, { showCurrency: false }),
            minWidth: 104,
            align: "right",
          },
          {
            name: "Persónuafsláttur",
            render: item => formatCurrency(item.userPersonalTaxBreaks, { showCurrency: false }),
            minWidth: 132,
            align: "right",
          },
          {
            name: "Útborgað",
            render: item =>
              formatCurrency(
                item.total - item.taxToPay - item.union - item.pension - item.pentionOptional,
                { showCurrency: false },
              ),
            minWidth: 96,
            align: "right",
          },
          {
            render: () => <></>,
            width: 24,
          },
        ]}
      />
      <Button
        inline
        onClick={() => props.prevStep()}
        marginRight={16}
        marginBottom={16}
        marginTop={40}
      >
        Til baka
      </Button>
      <Button inline onClick={() => props.nextStep()} primary data-testid="paymentPlan__button">
        Áfram
      </Button>
    </CenteredWrapper>
  );
};
