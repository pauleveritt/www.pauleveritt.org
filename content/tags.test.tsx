import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../testHelpers";

test("Tag template renders", async () => {
  await getEleventyDoc("/tags/");
  expect(screen.getByText("Tags")).toBeTruthy();
  expect(screen.getByText("first")).toBeTruthy;
});
