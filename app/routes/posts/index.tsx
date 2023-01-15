import { useState } from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import Card from '~/components/Blog/Card';
import styles from 'app/styles/posts/style.css';
import PageTransition from '~/components/PageTransition';
import { getPosts } from '~/models/post.server';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  const { items, assets, entries } = await getPosts();

  return json({ posts: items, assets, entries });
};

export default function Posts() {
  const { posts, assets, entries } = useLoaderData<typeof loader>();
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
            {posts.map((post: any) => {
              const user = entries.find(
                (entry: any) => entry.sys.id === post.fields.author.sys.id
              );

              const avatar = assets.find(
                (asset: any) => asset.sys.id === user.fields.avatar.sys.id
              );

              return (
                <motion.div
                  key={post.sys.id}
                  animate={{
                    opacity: hover ? 0.3 : 1,
                  }}
                  whileHover={{ opacity: 1 }}
                >
                  <Box as="li">
                    <Link to={`/posts/${post.fields.slug}`}>
                      <Card
                        id={post.sys.id}
                        image={assets.find(
                          (asset: any) =>
                            asset.sys.id === post.fields.featuredImage.sys.id
                        )}
                        title={post.fields.title}
                        user={user}
                        avatar={avatar.fields.file.url}
                        publishedDate={post.fields.publishedDate}
                      />
                    </Link>
                  </Box>
                </motion.div>
              );
            })}
          </SimpleGrid>
        </motion.div>
      ) : (
        <p>No Posts</p>
      )}
    </PageTransition>
  );
}
