import { validateNotEmpty, validateEmail, validateLength } from "./contact";

test("test if string is empty", function () {
  expect(validateNotEmpty(" ")).toBe(false);
});

test("test if valid email", function () {
  expect(validateEmail("daniel@daniel.no")).toBe(true);
});

test("validate Length", function () {
  expect(validateLength("Hallo World")).toBe(false);
});
