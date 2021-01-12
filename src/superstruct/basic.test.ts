/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  assert,
  defaulted,
  Describe,
  Infer,
  is,
  number,
  object,
  size,
  string,
  trimmed,
  validate,
} from "superstruct";

it("string & assert", () => {
  const strSchema = string();

  {
    const input: any = "1234";
    assert(input, strSchema);
    // ここまで到達すればstringであることが保証される
    expect(typeof input).toEqual("string");
  }

  expect(() => {
    const input: any = 1234;
    assert(input, strSchema);
  }).toThrow("Expected a string, but received: 1234");
});

it("number & validation", () => {
  const numSchema = number();

  {
    const input: any = 1234;
    const [error, result] = validate(input, numSchema); // numSchema.validate(input)とも書ける
    expect(error).toBeUndefined();
    expect(result).toEqual(1234);
  }

  {
    const input: any = "1234";
    const [error, result] = validate(input, numSchema);
    expect(error?.message).toEqual('Expected a number, but received: "1234"');
    expect(result).toBeUndefined();
  }
});

it("object & is", () => {
  const userSchema = object({
    id: number(),
    name: string(),
  });

  {
    const input: any = { id: 123, name: "mike" };
    expect(is(input, userSchema)).toEqual(true);
    if (is(input, userSchema)) {
      // input.id, input.name...
    }
  }

  {
    const input: any = { name: "mike" };
    expect(is(input, userSchema)).toEqual(false);
  }
});

it("refinements", () => {
  const userSchema = object({
    id: number(),
    name: size(string(), 1, 20),
  });
  type userType = Infer<typeof userSchema>;

  {
    const input: userType = { id: 123, name: "" };
    const [error] = validate(input, userSchema);
    expect(error?.message).toEqual(
      "At path: name -- Expected a string with a length between `1` and `20` but received one with a length of `0`"
    );
  }
});

it("coercions", () => {
  let index = 0;
  const userSchema = object({
    id: defaulted(number(), () => index++),
    name: trimmed(size(string(), 1, 20)),
  });

  {
    const input: any = { name: " mike " };
    const [, res1] = validate(input, userSchema, { coerce: true });
    expect(res1).toEqual({
      id: 0,
      name: "mike",
    });

    const [, res2] = validate(input, userSchema, { coerce: true });
    expect(res2).toEqual({
      id: 1,
      name: "mike",
    });
  }
});

it("use exist type", () => {
  type User = {
    id: number;
    name: string;
  };

  const userSchema: Describe<User> = object({
    id: number(),
    name: string(),
  });

  const input: any = { id: 123, name: "mike" };
  const [, res] = validate(input, userSchema);
  expect(res).toEqual({
    id: 123,
    name: "mike",
  });
});
