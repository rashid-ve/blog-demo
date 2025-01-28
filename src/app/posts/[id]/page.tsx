import { Metadata } from "next";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Props = {
  params: Promise<{ id: string }>;
};
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post: Post = await response.json();
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`id: ${id}`);
    }, 100);
  });
  return {
    title: `Post ${title}`,
    description: post?.body,
    openGraph: {
      title: `Post ${title}`,
      description: post?.body,
      siteName: "Example Post",
      images: [
        {
          url: "https://picsum.photos/seed/picsum/200/300",
          width: 200,
          height: 400,
          alt: "Blog Post Image",
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
};

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post: Post = await response.json();

  return (
    <div className="container p-4">
      <h1 className="font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
