export type PostsFooterProps = {
  collectionCount: number;
  numberToShow?: number;
};

export function PostsFooter({
  collectionCount,
  numberToShow = 10,
}: PostsFooterProps) {
  const moreCount = collectionCount - numberToShow;
  const moreLabel = `post${moreCount > 1 ? "s" : ""}`;

  return (
    moreCount > 0 && (
      <p title="More Posts">
        {moreCount} more {moreLabel} can be found in{" "}
        <a href="/blog/">the archive</a>.
      </p>
    )
  );
}
