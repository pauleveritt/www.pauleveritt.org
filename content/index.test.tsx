import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../testHelpers";

test("Site renders", async () => {
  await getEleventyDoc("/");
  expect(screen.getByText("Latest 2 Posts")).toBeTruthy();
  // TODO Bring this back when there are more than a few posts
  // expect(screen.getByTitle("More Posts").textContent).toEqual(
  //   "3 more posts can be found in the archive.",
  // );
});
