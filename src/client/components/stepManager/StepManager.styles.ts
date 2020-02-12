import { StyleParams } from "@taktikal/stylesheets";

const transform = (px: string) =>
  `transform: translateX(${px}); -webkit-transform: translateX(${px});`;

export default ({ css, keyframes }: StyleParams) => {
  const enterActive = keyframes`
    0% { opacity: 0; ${transform("80px")} }
    100% { opacity: 1; ${transform("0")} }
  `;

  const enterActiveBack = keyframes`
    0% { opacity: 0; ${transform("-80px")} }
    100% { opacity: 1; ${transform("0")} }
  `;

  const exitActive = keyframes`
    0% { opacity: 1; ${transform("0")} }
    100% { opacity: 0; ${transform("-60px")} }
  `;

  const exitActiveBack = keyframes`
    0% { opacity: 1; ${transform("0")} }
    100% { opacity: 0; ${transform("60px")} }
  `;

  return {
    container: css`
      max-width: 100%;
      overflow: hidden;
      position: relative;
    `,

    step: css`
      display: block;
      position: relative;
      z-index: 2;
    `,

    enterActive: css`
      animation: ${enterActive} 0.55s cubic-bezier(0.48, 0.01, 0.02, 0.99);
    `,

    enterActiveBack: css`
      animation: ${enterActiveBack} 0.55s cubic-bezier(0.48, 0.01, 0.02, 0.99);
    `,

    exitActive: css`
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      animation: ${exitActive} 0.1s cubic-bezier(0.31, 0.73, 0.45, 0.98);
    `,

    exitActiveBack: css`
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      animation: ${exitActiveBack} 0.1s cubic-bezier(0.31, 0.73, 0.45, 0.98);
    `,
  };
};
