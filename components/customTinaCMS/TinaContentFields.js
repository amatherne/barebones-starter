// ../components/customTinaCMS/TinaContentFields.js

import React, { useEffect, useState } from 'react';

const TinaContentFields = ({ input }) => {
  const [mdxFiles, setMdxFiles] = useState([]);

  useEffect(() => {
    fetchMDXFiles().then(files => {
      console.log('Fetched files:', files); // Check the structure of files fetched
      setMdxFiles(files);
    });
  }, []);

  const fetchMDXFiles = async () => {
    console.log('Fetching MDX files...');
    try {
      const response = await fetch('../../admin/app/api/get-mdx-files'); // Adjust endpoint as per your project setup
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data:', data); // Check the structure of files fetched
      return data.files || [];
    } catch (error) {
      console.error('Error fetching MDX files:', error);
      return [];
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    input.onChange(value);
  };

  return (
    <div className="w-full mx-auto">
      <label htmlFor="options" className="m-0 text-xs font-semibold flex-1 text-ellipsis overflow-hidden transition-all ease-out duration-100 text-left">
        Select Content
      </label>
      <select value={input.value} onChange={handleInputChange} id="options" name="options" className="mt-2 block w-full pl-4 pr-12 py-3 text-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
        <option value="">---</option>
        {mdxFiles.map(file => (
          <option key={file.path} value={file.path}>{file.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TinaContentFields;
