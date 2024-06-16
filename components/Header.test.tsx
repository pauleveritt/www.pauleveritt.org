import { expect, test } from "vitest";
import { renderToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";
import { Header, HeaderProps } from "./Header";

test("render heading with default name", async () => {
  // aria-current needs the window to have a URL
  const props: HeaderProps = {
    metadataTitle: "Some Site",
    pageURL: "http://localhost:3000/two",
    entries: [
      { title: "Title 1", url: "http://localhost:3000/one" },
      { title: "Title 2", url: "http://localhost:3000/two" },
    ],
  };
  const result = <Header {...props} />;
  document.body.innerHTML = await renderToString(result);
  expect(screen.getByText("Some Site")).to.exist;
  const entries = screen.getAllByRole("link") as HTMLAnchorElement[];
  expect(entries[1].href).toContain("/one");
  expect(entries[2].ariaCurrent).toBeUndefined;
  expect(entries[2].href).toContain("/two");
  expect(entries[2].getAttribute("aria-current")).toBe("page");
});
