import { expect, test, vi } from "vitest";
import { TagList, TagListProps, TagListThis } from "./TagList";
import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";

test("Tag list renders more than one", async () => {
  const thisThis: TagListThis = {
    slugify: vi.fn(),
  };
  const thisProps: TagListProps = {
    tags: ["one", "two", "three"],
  };
  const component = <TagList {...thisProps} />;
  document.body.innerHTML = await jsxToString.call(thisThis, component);
  expect(screen.getByText("one")).toBeTruthy;
  expect(screen.getByText("two")).toBeTruthy;
  expect(screen.getByText("three")).toBeTruthy;
  expect(screen.getAllByText(",")).toHaveLength(2);
});

test("Tag list renders just one", async () => {
  const thisThis: TagListThis = {
    slugify: vi.fn(),
  };
  const thisProps: TagListProps = {
    tags: ["one"],
  };
  const component = <TagList {...thisProps} />;
  const result = await jsxToString.call(thisThis, component);
  expect(result).not.toContain("<span>,");
});
