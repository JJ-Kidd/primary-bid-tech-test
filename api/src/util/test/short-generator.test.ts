import { shortGen } from "../short-gen";

test("generate 8 character string", () => {
  expect(shortGen().length).toBe(8);
})

test("generate an alphanumeric string", () => {
  expect(shortGen()).toMatch(RegExp('^[a-z0-9]*$'));
})