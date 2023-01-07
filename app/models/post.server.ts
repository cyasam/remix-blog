import type { User } from './user.server';

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
};

export async function getPosts(): Promise<Post[] | null> {
  try {
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();

    if (data.message) {
      return null;
    }

    return data.posts;
  } catch (err) {
    return null;
  }
}

export async function getPost(id?: string): Promise<Post | null> {
  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`);
    const data = await response.json();

    if (data.message) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
}
