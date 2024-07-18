// ../app/components/icons/DynamicIcon.tsx

import React, { useEffect, useState } from 'react';
import { loadSvg } from '../../../utils/loadSvg';

const DynamicIcon = ({ fileName, width, height, color }) => {
  const [SvgComponent, setSvgComponent] = useState(null);

  useEffect(() => {
    const fetchSvg = async () => {
      const component = await loadSvg(fileName);
      setSvgComponent(() => component);
    };

    fetchSvg();
  }, [fileName]);

  if (!SvgComponent) return <div>Loading...</div>;

  return <SvgComponent width={width} height={height} fill={color} />;
};

export default DynamicIcon;
