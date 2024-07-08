export type NavEntry = {
  title: string;
  url: string;
};

export type HeaderProps = {
  metadataTitle: string;
  pageURL: string;
  navEntries: NavEntry[];
};

export function Header({ metadataTitle, pageURL, navEntries }: HeaderProps) {
  return (
    <header>
      <a href="/" class="home-link">
        {metadataTitle}
      </a>

      <nav>
        <h2 class="visually-hidden">Top level navigation menu</h2>
        <ul class="nav">
          {navEntries.map((naventry) => (
            <li class="nav-item">
              <a
                href={naventry.url}
                aria-current={naventry.url == pageURL ? "page" : false}
              >
                {naventry.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
