import { Title } from "~/client/elements/Title";

/**
 * This is the generic "something went wrong" component. It should only
 * be shown on irrecoverable errors.
 *
 * @TODO Make this more interesting than just a title when we have a
 * design for what this should look like.
 */
export const GeneralError = () => {
  return <Title align="center">Eitthvað fór úrskeiðis</Title>;
};
