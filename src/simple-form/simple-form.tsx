import * as React from "react";
import { useForm } from "react-hook-form";

export function SimpleForm(): React.ReactElement {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="group">
        <label>
          name
          <input
            name="name"
            ref={register({ required: true, minLength: 1, maxLength: 20 })}
          />
          {errors.name && "name is required"}
        </label>
      </div>
      <div className="group">
        <label>
          age
          <input
            name="age"
            type="number"
            ref={register({ required: true, valueAsNumber: true, min: 20 })}
          />
          {errors.age && "age must be upper 20"}
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}
