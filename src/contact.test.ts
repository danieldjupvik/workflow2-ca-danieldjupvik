import { validateNotEmpty, validateEmail } from "./contact";

test("test if string is empty", function () {
  expect(validateNotEmpty(" ")).toBe(false);
});

test("test if valid email", function () {
  expect(validateEmail("daniel@daniel.no")).toBe(true);
});
