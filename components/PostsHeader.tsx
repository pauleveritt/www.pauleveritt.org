/* Header above list of postings with count, pluralization */

import { PostItem } from "./PostList";

export type PostsHeaderProps = {
  numberToShow?: number;
  collection: PostItem[];
  inSection?: string;
};

export function PostsHeader(props: PostsHeaderProps) {
  const { collection, inSection, numberToShow = 10 } = props;
  const collectionCount = collection.length;
  const latestCount = Math.min(collectionCount, numberToShow);
  const latest = latestCount > 1 ? latestCount : "";
  const singularPlural = latestCount > 1 ? " Posts" : "Post";
  return (
    <h1>
      Latest {latest}
      {singularPlural} {inSection ? `in ${inSection}` : ""}
    </h1>
  );
}
