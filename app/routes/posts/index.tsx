import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/post.server';
import { getUsers } from '~/models/user.server';
import type { Post } from '~/models/post.server';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import Card from '~/components/Blog/Card';
import styles from 'app/styles/posts/style.css';
import PageTransition from '~/components/PageTransition';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  const posts = await getPosts();
  if (!posts) {
    return json({ posts });
  }

  const users = await getUsers();
  if (!users) {
    return json({ posts });
  }

  const newPosts = posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);

    return {
      ...post,
      user,
    };
  });

  return json({ posts: newPosts });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <PageTransition>
      <Heading as="h1" mb={10}>
        Stories by Chakra Templates
      </Heading>
      {posts ? (
        <SimpleGrid as="ul" columns={3} spacing={10}>
          {posts.map((post: Post, index) => (
            <Box as="li" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <Card
                  id={post.id}
                  newBadge={index === 0}
                  title={post.title}
                  user={`${post.user?.firstName} ${post.user?.lastName}`}
                />
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <p>No Posts</p>
      )}
    </PageTransition>
  );
}
