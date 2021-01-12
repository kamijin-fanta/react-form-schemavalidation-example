import React from "react";
import { SimpleForm } from "./simple-form/simple-form";
import { SchemaValidationForm } from "./schema-validation-form/schema-validation-form";
import "./App.css";

function App(): React.ReactElement {
  return (
    <div className="App">
      <div className="content">
        <h3>simple form</h3>
        <SimpleForm />
      </div>
      <div className="content">
        <h3>schema validation form</h3>
        <SchemaValidationForm />
      </div>
    </div>
  );
}

export default App;
