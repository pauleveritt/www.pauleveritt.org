import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../testHelpers";

test("Blog template renders", async () => {
  await getEleventyDoc("/blog/");
  expect(screen.getAllByText("Archive").length).toEqual(2);
  expect(screen.getByText("Time to start blogging again")).toBeTruthy;
});
