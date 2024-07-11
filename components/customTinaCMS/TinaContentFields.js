// ../components/customTinaCMS/TinaContentFields.js

import React, { useEffect, useState } from 'react';
import { useCMS } from 'tinacms';

const TinaContentFields = ({ input }) => {
  const cms = useCMS();
  const [mdxFiles, setMdxFiles] = useState([]);

  useEffect(() => {
    fetchMDXFiles().then(files => {
      setMdxFiles(files);
    });
  }, []);

  const fetchMDXFiles = async () => {
    try {
      // Fetch MDX files from your API or content folders
      const response = await fetch('../../content/page'); // Adjust endpoint
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Error fetching MDX files:', error);
      return [];
    }
  };

  const handleInputChange = (event) => {
    // Handle selection of MDX file
    const { value } = event.target;
    input.onChange(value);
  };

  return (
    <div>
      {/* Render select input for MDX files */}
      <select value={input.value} onChange={handleInputChange}>
        <option value="">Select MDX File</option>
        {mdxFiles.map(file => (
          <option key={file.path} value={file.path}>{file.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TinaContentFields;
