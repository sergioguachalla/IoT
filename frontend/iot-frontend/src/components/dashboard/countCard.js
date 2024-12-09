import React from "react";

import { Card } from "primereact/card";
import { Knob } from "primereact/knob";

const CountCard = ({ value , maxValue, title}) => {
   
  return (
    <div
      className="p-d-flex p-jc-center p-mt-4"
      style={{ padding: '1rem', backgroundColor: '#f9f9f9' }}
    >
      <Card
        title={title}
        className="p-shadow-3"
        style={{
          width: '300px',
          textAlign: 'center',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          className="p-d-flex p-jc-center p-ai-center"
          style={{ margin: '1rem 0', padding: '1rem' }}
        >
          <Knob
            value={value}
            readOnly
            size={100}
            max={maxValue}
            style={{
              color: '#007ad9',
            }}
          />
        </div>
      </Card>
    </div>
  );
  
};

export default CountCard;