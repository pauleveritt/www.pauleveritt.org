import { Post } from "./Post";

export type PostItem = {
  data: {
    date: string;
    title: string;
  };
  page: {
    url: string;
  };
};

export type PostListContext = {
  context: {
    filters: {
      htmlDateString: (content: string) => string;
    };
    useBundle: (content: string) => [string, (content: string) => void];
  };
};

export type PostListProps = {
  counter?: number;
  postItems: PostItem[];
};

export function PostList(
  this: PostListContext,
  { counter, postItems }: PostListProps,
) {
  const thisCounter = counter ? counter : postItems.length + 1;
  const setCss = this.context.useBundle("css")[1];
  setCss(`.postlist { counter-reset: start-from ${thisCounter} }`);
  return (
    <ol reversed class="postlist">
      {postItems.reverse().map(({ data, page }) => (
        <Post date={data.date} url={page.url} title={data.title} />
      ))}
    </ol>
  );
}
