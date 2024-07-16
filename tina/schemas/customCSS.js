// ../tina/schemas/customCSS.js

import { Controlled as CodeMirror } from 'react-codemirror2';
import { useState } from 'react';
// import 'codemirror/mode/css/css'; // Import CSS mode

const CustomCssField = ({ value, onChange }) => {
  // Local state to manage the CSS code
  const [code, setCode] = useState(value);

  // Options for CodeMirror instance
  const options = {
    mode: 'css',
    theme: 'material',
    lineNumbers: true
  };

  // Handle change in CSS code
  const handleCodeChange = (editor, data, value) => {
    setCode(value); // Update local state
    onChange(value); // Pass updated CSS code to parent component
  };

  return (
    <div className="css-input">
      <h2>CSS Input</h2>
      <CodeMirror
        value={code}
        options={options}
        onBeforeChange={(editor, data, value) => {
          handleCodeChange(editor, data, value);
        }}
        onChange={(editor, data, value) => {
          // Optional: handle additional onChange events
        }}
      />
    </div>
  );
};

export default CustomCssField;
