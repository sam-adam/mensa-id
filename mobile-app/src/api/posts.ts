export interface GetPostsPayload {
  page?: number;
  per_page?: number;
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _links: any
}

export type GetPostsResponse = Post[];

export async function getPost(postId: number): Promise<Post|null> {
  const response = await fetch(`https://mensa.id/wp-json/wp/v2/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${postId}`);
  }

  return await response.json();

}

export async function getPosts (payload?: GetPostsPayload): Promise<GetPostsResponse> {
  const response = await fetch(`https://mensa.id/wp-json/wp/v2/posts?page=${payload.page}&per_page=${payload.per_page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return await response.json();
}
