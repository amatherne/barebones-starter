// SvgDataContext.js

import React, { createContext, useContext, useState } from 'react';

// Define your context interface
const SvgDataContext = createContext({
  svgPath: '',
  setSvgPath: () => {},
});

export const SvgDataProvider = ({ children }) => {
  const [svgPath, setSvgPath] = useState('');

  return (
    <SvgDataContext.Provider value={{ svgPath, setSvgPath }}>
      {children}
    </SvgDataContext.Provider>
  );
};

export const useSvgDataContext = () => useContext(SvgDataContext);
