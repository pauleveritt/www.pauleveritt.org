import { Post } from "./Post";

export type PostItem = {
  date: string;
  url: string;
  data: {
    title: string;
  };
};
export type ThisPostList = {
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
  this: ThisPostList,
  { counter, postItems }: PostListProps,
) {
  const thisCounter = counter ? counter : postItems.length + 1;
  const [css, setCss] = this.context.useBundle("css");
  setCss(`.postlist { counter-reset: start-from ${thisCounter} }`);
  return (
    <ol reversed class="postlist">
      {postItems.reverse().map((post) => (
        <Post
          postDate={post.date}
          postUrl={post.url}
          title={post.data.title}
          url={post.url}
        />
      ))}
    </ol>
  );
}
