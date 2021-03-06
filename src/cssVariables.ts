export const maxXs = 768;
export const maxSm = 992;
export const maxMd = 1200;
export const HEADER_HEIGHT = 80;

const colorBorderFocus = "rgba(35, 156, 255, 0.35)";

export const cssVariables = {
  borderRadiusNormal: "4px",
  colorPrimary: "#0061FF",
  colorOffWhite: "#F2F2F5",
  colorBlack: "#121212",
  colorSuccess: "green",
  colorError: "#ff5468",
  bodyFont: "'IBM Plex Sans', sans-serif",
  bezierSmooth: "0.46, 0.19, 0.13, 0.98",
  headerHeight: `${HEADER_HEIGHT}px`,

  colorBorderFocus,
  boxShadowBorderFocus: `0 0 0 8px ${colorBorderFocus}`,
};

export const cssBreakpoints = {
  maxXs: `${maxXs}px`,
  maxSm: `${maxSm}px`,
  maxMd: `${maxMd}px`,
  minXs: `${maxXs + 1}px`,
  minSm: `${maxSm + 1}px`,
  minMd: `${maxMd + 1}px`,
};

export const cssMixins = {
  focusableInner: () => `
    transition: box-shadow .2s;
    box-shadow: 0;

    &:focus {
      outline: none;
    }
  `,

  focusableOuter: () => `
    &:focus {
      outline: none;

      & > *[tabindex="-1"] {
        box-shadow: ${cssVariables.boxShadowBorderFocus};
      }
    }
  `,
};
