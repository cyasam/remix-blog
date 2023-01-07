import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageTransition from '~/components/PageTransition';
import { getPost } from '~/models/post.server';
import { getUser } from '~/models/user.server';

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.id) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const post = await getPost(params.id);
  if (!post) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const user = await getUser(post.userId);
  if (!user) {
    return json({
      post,
    });
  }

  return json({
    post: {
      ...post,
      user,
    },
  });
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl">
        <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
        {post.user && (
          <p>
            {post.user.firstName} {post.user.lastName}
          </p>
        )}
        <p>{post.body}</p>
      </div>
    </PageTransition>
  );
}
