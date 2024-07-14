function filterTagList(tags: string[]) {
  return (tags || []).filter(
    (tag: string) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
  );
}

export type TagListThis = {
  slugify: (slug: string) => string;
};

export type TagListProps = {
  tags: string[];
};

export function TagList(this: TagListThis, { tags }: TagListProps) {
  const filteredTags = filterTagList(tags);
  const numberOfTags = filteredTags.length - 1;
  return (
    <>
      {filteredTags.map((tag, index) => {
        const tagUrl = this.slugify(`/tags/${tag}/`);
        return (
          <li>
            <a href={tagUrl} class="post-tag">
              {tag}
            </a>
            {index < numberOfTags && <span>, </span>}
          </li>
        );
      })}
    </>
  );
}
