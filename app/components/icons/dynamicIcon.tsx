import React, { useState, useEffect } from 'react';

interface DynamicIconProps {
  fileName: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ fileName }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC<any> | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      const component = await loadSvg(fileName);
      setSvgComponent(() => component);
    };

    fetchSvg();
  }, [fileName]);

  return (
    <div>
      {SvgComponent ? <SvgComponent /> : <div>Loading...</div>}
    </div>
  );
};

async function loadSvg(fileName: string): Promise<React.FC<any> | null> {
  // Replace with actual SVG loading logic
  return null;
}

export default DynamicIcon;
