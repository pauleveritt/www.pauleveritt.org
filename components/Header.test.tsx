import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import { Header, HeaderProps } from "./Header";
import { renderToStringAsync } from "preact-render-to-string";

test("render heading with default name", async () => {
  const props: HeaderProps = {
    metadataTitle: "Some Site",
    pageURL: "http://localhost:3000/two",
    navEntries: [
      { title: "Title 1", url: "http://localhost:3000/one" },
      { title: "Title 2", url: "http://localhost:3000/two" },
    ],
  };
  const result = <Header {...props} />;
  document.body.innerHTML = await renderToStringAsync(result);
  expect(screen.getByText(props.metadataTitle)).to.exist;
  const entries = screen.getAllByRole("link") as HTMLAnchorElement[];
  expect(entries[1].href).toBe(props.navEntries[0].url);
  expect(entries[2].ariaCurrent).toBeUndefined;
  expect(entries[2].href).toBe(props.navEntries[1].url);
  expect(entries[2].getAttribute("aria-current")).toBe("page");
});
