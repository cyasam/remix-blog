import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';

import { getPosts } from '~/models/post.server';
import { getUsers } from '~/models/user.server';
import type { Post } from '~/models/post.server';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import Card from '~/components/Blog/Card';
import styles from 'app/styles/posts/style.css';
import PageTransition from '~/components/PageTransition';
import { useState } from 'react';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  const { items, includes } = await getPosts();
  if (!items) {
    return json({ posts: items, includes });
  }

  return json({ posts: items, includes });
};

export default function Posts() {
  const { posts, includes } = useLoaderData<typeof loader>();
  const [hover, setHover] = useState(false);

  return (
    <PageTransition>
      <Heading as="h1" mb={10}>
        Stories by Chakra Templates
      </Heading>
      {posts ? (
        <motion.div
          onHoverStart={() => {
            setHover(true);
          }}
          onHoverEnd={() => {
            setHover(false);
          }}
        >
          <SimpleGrid as="ul" columns={3} spacing={10}>
            {posts.map((post: any, index: number) => (
              <motion.div
                key={post.sys.id}
                animate={{
                  opacity: hover ? 0.3 : 1,
                }}
                whileHover={{ opacity: 1 }}
              >
                <Box as="li">
                  <Link to={`/posts/${post.sys.id}`}>
                    <Card
                      id={post.sys.id}
                      image={includes.find(
                        (asset: any) =>
                          asset.sys.id === post.fields.shareImages[0].sys.id
                      )}
                      newBadge={index === 0}
                      title={post.fields.pageTitle}
                      user={`${post.user?.firstName} ${post.user?.lastName}`}
                    />
                  </Link>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      ) : (
        <p>No Posts</p>
      )}
    </PageTransition>
  );
}
