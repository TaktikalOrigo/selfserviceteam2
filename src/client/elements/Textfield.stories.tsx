import React, { useState } from "react";
import { Textfield } from "~/client/elements/Textfield";
import { PhoneIcon } from "~/client/icon/PhoneIcon";
import { Button } from "~/client/elements/Button";

export default { title: "Textfield" };

export const text = () => <Textfield type="text" maxWidth={320} autoComplete="off" />;
export const ssn = () => (
  <Textfield
    label="Kennitala"
    type="ssn"
    placeholder="000000 0000"
    maxWidth={320}
    autoComplete="off"
  />
);
export const phone = () => (
  <Textfield label="Sími" type="phone" placeholder="000 0000" maxWidth={320} autoComplete="off" />
);
export const email = () => (
  <Textfield label="Netfang" type="email" maxWidth={320} autoComplete="off" />
);
export const bankNumber = () => (
  <Textfield
    label="Bankanúmer"
    type="bankNumber"
    placeholder="0000-00-000000"
    maxWidth={320}
    autoComplete="off"
  />
);

export const withIcon = () => (
  <Textfield
    label="Sími"
    type="phone"
    placeholder="000 0000"
    maxWidth={320}
    iconLeft={<PhoneIcon />}
    autoComplete="off"
  />
);

export const loading = () => {
  const [pending, setPending] = useState(false);

  return (
    <>
      <Textfield
        label="Sími"
        type="phone"
        placeholder="000 0000"
        maxWidth={320}
        iconLeft={<PhoneIcon />}
        loading={pending}
        autoComplete="off"
      />
      <Button onClick={() => setPending(!pending)}>Toggle loading</Button>
    </>
  );
};
