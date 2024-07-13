// ../app/components/icons/menuicon.tsx

import React from 'react';

const MenuIcon = ({ width = 30, height = 23, color = 'currentColor' }) => (
  <svg id="MenuIcon" width={width} height={height} viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill={color}>
        <rect id="Rectangle-1" x="0" y="0" width="30" height="3"></rect>
        <rect id="Rectangle-2" x="0" y="10" width="30" height="3"></rect>
        <rect id="Rectangle-3" x="0" y="20" width="30" height="3"></rect>
      </g>
    </g>
  </svg>
);


export default MenuIcon;
