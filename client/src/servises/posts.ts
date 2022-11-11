import { useQuery } from "@tanstack/react-query";

const URL = "https://jsonplaceholder.typicode.com/posts";
export const BASE_URL = "http://127.0.0.1:3001";

type Post = {
  id: string;
  userId: string;
  body: string;
  title: string;
}

const getPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`${URL}/${id}`);
  if (response.status !== 200) {
    throw Error(response.statusText);
  }
  return await response.json();
};

export const usePost = (id: string) => useQuery(
  ["post", id],
  () => getPostById(id),
  {
    enabled: !!id,
    staleTime: 10000
  }
);