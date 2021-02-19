import { timeConverter } from "./launches";

test("timeConverter", function () {
  expect(timeConverter(1603553460)).toBe(`24 Oct 2020`);
});
