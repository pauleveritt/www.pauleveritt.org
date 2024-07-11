import { navigation } from "@11ty/eleventy-navigation";
import { NavigationItem } from "./commonTypes";

type AllItem = {
  data: {
    eleventyNavigation: NavigationItem;
  };
};

export type HeaderThis = {
  collections: {
    all: AllItem[];
  };
  metadata: {
    title: string;
  };
  page: {
    url: string;
  };
};

export type NavEntry = {
  title: string;
  url: string;
};

export function Header(this: HeaderThis) {
  const { collections, metadata, page } = this;
  const navEntries: NavEntry[] = navigation.find(collections.all);
  return (
    <header>
      <a href="/" class="home-link">
        {metadata.title}
      </a>

      <nav>
        <h2 class="visually-hidden">Top level navigation menu</h2>
        <ul class="nav">
          {navEntries.map((navEntry) => (
            <li class="nav-item">
              <a
                href={navEntry.url}
                aria-current={navEntry.url == page.url ? "page" : false}
              >
                {navEntry.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
