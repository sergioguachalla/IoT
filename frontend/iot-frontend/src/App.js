import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from 'react';

import { Knob } from 'primereact/knob';


function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      hola
      <Knob value={value} onChange={(e) => setValue(e.value)} />

    </div>
  );
}

export default App;
