import { navigation } from "@11ty/eleventy-navigation";

import { PostItem } from "./PostList";

export type HeaderContext = {
  context: {
    collections: {
      all: PostItem[];
    };
  };
};

export type NavEntry = {
  title: string;
  url: string;
};

export type HeaderProps = {
  metadataTitle: string;
  pageURL: string;
};

export function Header(
  this: HeaderContext,
  { metadataTitle, pageURL }: HeaderProps,
) {
  const navEntries: NavEntry[] = navigation.find(this.context.collections.all);
  return (
    <header>
      <a href="/" class="home-link">
        {metadataTitle}
      </a>

      <nav>
        <h2 class="visually-hidden">Top level navigation menu</h2>
        <ul class="nav">
          {navEntries.map((navEntry) => (
            <li class="nav-item">
              <a
                href={navEntry.url}
                aria-current={navEntry.url == pageURL ? "page" : false}
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
