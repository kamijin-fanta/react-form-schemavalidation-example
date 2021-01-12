import * as React from "react";
import { useForm } from "react-hook-form";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { coerce, Infer, min, number, object, size, string } from "superstruct";

const parsableInt = coerce(number(), string(), (value) => parseInt(value));

const userSchema = object({
  name: size(string(), 1, 20),
  age: min(parsableInt, 20),
});
type userType = Infer<typeof userSchema>;

export function SchemaValidationForm(): React.ReactElement {
  const { register, handleSubmit, errors } = useForm({
    resolver: superstructResolver(userSchema, { coerce: true }),
  });
  const onSubmit = (data: userType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="group">
        <label>
          name
          <input
            name="name"
            ref={register({ required: true, minLength: 1, maxLength: 20 })}
          />
          {errors.name?.message}
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
          {errors.age?.message}
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}
