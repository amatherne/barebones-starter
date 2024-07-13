// ../components/head/headstyles.tsx

/* eslint-disable no-unused-vars */

import React from 'react';

import '../../../styles/base/_typography.scss';
import '../../../styles/global.scss';

const HeadStyles = () => {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/akz3yrt.css" {...({ precedence: "default" } as any)} />

      <style jsx global>{`

        @font-face {
          font-family: 'Butler';
          src: url('/uploads/fonts/Butler_Regular.otf') format("opentype");
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          font-family: 'Butler';
          src: url('/uploads/fonts/Butler_Medium.otf') format("opentype");
          font-weight: 500;
          font-display: swap;
        }
        @font-face {
          font-family: 'Butler';
          src: url('/uploads/fonts/Butler_Bold.otf') format("opentype");
          font-weight: 600;
          font-display: swap;
        }

        @font-face {
          font-family: 'Butler';
          src: url('/uploads/fonts/Butler_Black.otf') format("opentype");
          font-weight: 900;
          font-display: swap;
        }

        @font-face {
          font-family: 'Oswald';
          src: url('/uploads/fonts/Oswald-VariableFont_wght.ttf') format("truetype");
          font-display: swap;
        }

        @font-face {
          font-family: 'Quicksand';
          src: url('/uploads/fonts/Quicksand-VariableFont_wght.ttf') format("truetype");
          font-display: swap;
        }

        :root {
          --color--foreground: #212121;
          --color--background: #ffffff;
        }

        :root {
          --global--spacing-sections        : 60px;
          --global--grid-horizontal         : 30px;
          --global--grid-vertical           : 30px;

          --global--mobile--spacing-sections: 30px;
          --global--mobile--grid-horizontal : 15px;
          --global--mobile--grid-vertical   : 15px
        }

        :root {
          /* Primary Button */
          --color--btn-primary-bg           : var(--color--background);
          --color--btn-primary-bdr          : var(--color--foreground);
          --color--btn-primary-txt          : var(--color--foreground);
          --color--btn-primary-bg-hover     : var(--color--foreground);
          --color--btn-primary-bdr-hover    : var(--color--background);
          --color--btn-primary-txt-hover    : var(--color--foreground);
        }

        :root {
          /* Secondary Button */
          --color--btn-secondary-bg         : var(--color--foreground);
          --color--btn-secondary-bdr        : var(--color--background);
          --color--btn-secondary-txt        : var(--color--foreground);
          --color--btn-secondary-bg-hover   : var(--color--background);
          --color--btn-secondary-bdr-hover  : var(--color--foreground);
          --color--btn-secondary-txt-hover  : var(--color--foreground);
        }

        :root {
          /* Set Button Defaults, Secondary is set in file */
          --color--btn-bg                   : var(--color--btn-primary-bg);
          --color--btn-bdr                  : var(--color--btn-primary-bdr);
          --color--btn-txt                  : var(--color--btn-primary-txt);
          --color--btn-bg-hover             : var(--color--btn-primary-bg-hover);
          --color--btn-bdr-hover            : var(--color--btn-primary-bdr-hover);
          --color--btn-txt-hover            : var(--color--btn-primary-txt-hover);
        }

        :root {
          --font-body--scale                : 1.0;
          --font-body--family               : Quicksand, sans-serif;
          --font-body--family               : neuzeit-grotesk, sans-serif;
          --font-body--family-condensed     : neuzeit-grotesk-condensed, sans-serif;
          --font-body--style                : normal;
          --font-body--weight               : 400;
          --font-body--weight-bold          : 700;

          --font-heading--scale             : 1.0;
          --font-heading--family            : Butler, Georgia, serif;
          --font-heading--style             : normal;
          --font-heading--weight            : 900
        }

        :root {
          --desktop--header-width           : 125px;
          --desktop--header-width--open     : 400px;
        }

        body {
          background-color: var(--color--background);
          color: var(--color--foreground);
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-size: calc(var(--font-body--scale) * 62.5%);
          height: 100%;
        }

        body {
          {/*display: grid;*/}
          {/*grid-template-rows: auto auto 1fr auto;*/}
          {/*grid-template-columns: 100%;*/}
          min-height: 100%;
          margin: 0;
          font-size: var(--font-size);
          line-height: calc(1 + 0.8 / var(--font-body--scale));
          font-family: var(--font-body--family);
          font-style: var(--font-body--style);
          font-weight: var(--font-body--weight);
        }

      `}</style>


    </>
  );
}

export default HeadStyles;