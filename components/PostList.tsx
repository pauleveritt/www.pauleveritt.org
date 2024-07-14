import { PostListItem } from "./PostListItem";

export type PostItem = {
  data: {
    date: string;
    title: string;
  };
  page: {
    url: string;
  };
};

export type PostListThis = {
  useBundle: (content: string) => [string, (content: string) => void];
};

export type PostListProps = {
  counter?: number;
  postItems: PostItem[];
};

export function PostList(
  this: PostListThis,
  { counter, postItems }: PostListProps,
) {
  const thisCounter = counter ? counter : postItems.length + 1;
  const setCss = this.useBundle("css")[1];
  setCss(`.postlist { counter-reset: start-from ${thisCounter} }`);
  return (
    <ol reversed class="postlist">
      {postItems.toReversed().map(({ data, page }) => (
        <PostListItem date={data.date} url={page.url} title={data.title} />
      ))}
    </ol>
  );
}
