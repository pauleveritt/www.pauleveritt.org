import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { getEleventyDoc } from "../testHelpers";

test.skip("Tag template renders", async () => {
  await getEleventyDoc("/tags/posts/");
  expect(screen.getByText("Tagged")).toBeTruthy();
});
