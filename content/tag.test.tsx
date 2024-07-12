import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../testHelpers";

test("Tag template renders", async () => {
  await getEleventyDoc("/tags/first/");
  expect(screen.getByText(`Tagged "first"`)).toBeTruthy();
  expect(screen.getByText(`Time to start blogging again`)).toBeTruthy();
  expect(screen.getByText(`all tags`)).toBeTruthy();
});
