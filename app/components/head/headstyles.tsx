// ../components/head/headstyles.tsx

/* eslint-disable no-unused-vars */

import React from 'react';
import RGB_CSS from '../../components/utilities/rgb_css';

// import '../../../styles/base/_typography.scss';
import '../../../styles/global.scss';

const HeadStyles = () => {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/akz3yrt.css" {...({ precedence: "default" } as any)} />
      <style jsx global>{`
        :root {
          ${RGB_CSS({ convert: "mineshaft-black: #212121;" })}
          ${RGB_CSS({ convert: "white: #ffffff;" })}

          ${RGB_CSS({ convert: "mandy-pink: #EE5C6C;" })}
          ${RGB_CSS({ convert: "windsor-purple: #6a0d83;" })}

        }
      `}</style>
    </>
  );
}

export default HeadStyles;