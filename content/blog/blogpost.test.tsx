import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../../testHelpers";

test("Blog template renders", async () => {
  await getEleventyDoc("/blog/firstpost/");
  expect(screen.getAllByText("Time to start blogging again")).toBeTruthy;
  expect(screen.getAllByText("July 2024")).toBeTruthy;
  expect(screen.getAllByText("first")).toBeTruthy;
  expect(screen.getAllByText("Manage Numbering with CSS Counters")).toBeTruthy;
});
