import { BaseLayout } from "../components/BaseLayout";
import { CollectionItem } from "../components/commonTypes";

function getAllTags(collection: CollectionItem[]): string[] {
  let tagSet = new Set<string>();
  for (let item of collection) {
    (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  }
  return Array.from(tagSet);
}

function filterTagList(tags: string[]): string[] {
  // Eliminate tags that are used for main parts of site
  return (tags || []).filter(
    (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
  );
}

export type TagsPageData = {
  collections: {
    all: CollectionItem[];
  };
};

export type TagsPageThis = {
  slugify: (url: string) => string;
};

export default class Tags {
  render(this: TagsPageThis, data: TagsPageData) {
    const tags = filterTagList(getAllTags(data.collections.all));
    const { slugify } = this;
    return (
      <BaseLayout {...data}>
        <h1>Tags</h1>
        <ul>
          {tags.map((tag) => {
            const tagUrl = slugify(tag);
            return (
              <li>
                <a href={tagUrl} class="post-tag">
                  {tag}
                </a>
              </li>
            );
          })}
        </ul>
      </BaseLayout>
    );
  }
}
