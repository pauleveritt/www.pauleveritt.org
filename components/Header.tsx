export type HeaderEntry = {
  title: string;
  url: string;
};

export type HeaderProps = {
  metadataTitle: string;
  pageURL: string;
  entries: HeaderEntry[];
};

export function Header({
  metadataTitle,
  pageURL,
  entries,
}: HeaderProps): JSX.Element {
  return (
    <header>
      <a href="/" class="home-link">
        {metadataTitle}
      </a>

      <nav>
        <h2 class="visually-hidden">Top level navigation menu</h2>
        <ul class="nav">
          {entries.map((entry) => (
            <li class="nav-item">
              <a
                href={entry.url}
                aria-current={entry.url == pageURL ? "page" : false}
              >
                {entry.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
