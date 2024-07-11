import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../testHelpers";

test("Blog template renders", async () => {
  await getEleventyDoc("/");
  expect(screen.getByText("Archive")).toBeTruthy();
  expect(screen.getByText("Time to start blogging again")).toBeTruthy;
});
