// components/customTinaCMS/CustomReferenceField.js

import { useCMS } from 'tinacms';

const CustomReferenceField = ({ input }) => {
  const cms = useCMS();

  const handleChange = (event) => {
    cms.alerts.info(`Selected item: ${event.target.value}`);
    // Handle selected item logic here
  };

  return (
    <select value={input.value} onChange={handleChange}>
      <option value="">Select an item...</option>
      {input.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomReferenceField;
