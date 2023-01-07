export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export async function getUsers(): Promise<User[] | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=1000`);
    const data = await response.json();

    if (data.message) {
      return null;
    }

    return data.users;
  } catch (err) {
    return null;
  }
}

export async function getUser(id?: number): Promise<User | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await response.json();

    if (data.message) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
}
