// ../tina/schemas/components/opacity.js

import React from 'react';
import { defineConfig, wrapFieldsWithMeta } from 'tinacms'

const opacity = { 
  label: "Overlay Opacity",
  name: "opacity",
  type: "number",
  ui: {
    parse: (val) => Number(val),

    // wrapping our component in wrapFieldsWithMeta renders our label & description.
    component: wrapFieldsWithMeta(({ field, input, meta }) => {
      return (
        <div>
          <input
            name="saturation"
            id="saturation"
            type="range"
            min="0.01"
            max="1"
            step=".01"
            // This will pass along props.input.onChange to set our form values as this input changes.
            {...input}
          />
          <br />
          Value: {input.value}
        </div>
      )
    })
  }
};

export default opacity;