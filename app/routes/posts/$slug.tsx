import { Box } from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageTransition from '~/components/PageTransition';
import { getPost } from '~/models/post.server';

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.slug) {
    return json({ post: null, entries: null });
  }

  const { item, assets, entries } = await getPost(params.slug);

  return json({ post: item, assets, entries });
};

export default function Post() {
  const { post, entries } = useLoaderData<typeof loader>();

  const user = entries.find(
    (entry: any) => entry.sys.id === post.fields.author.sys.id
  );

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl">
        <Box as="h2">{post.fields.title}</Box>
        {user && <p>{user.fields.name}</p>}

        {post.fields.content.content.map((item: any) => {
          if (item.nodeType === 'paragraph') {
            return item.content?.map((p: any, index: number) => (
              <p key={index}>{p.value}</p>
            ));
          }
          return null;
        })}
      </div>
    </PageTransition>
  );
}
