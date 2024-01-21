import {useEffect, useState} from 'react';
import {getPosts, Post} from '../api/posts';

const useBlogPosts = ({page = 1, perPage = 3}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isGettingPosts, setIsGettingPosts] = useState(true);
  const [getPostError, setGetPostError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts({ page: page, per_page: perPage });
        setPosts(posts);
      } catch (error) {
        setGetPostError(error.message);
      } finally {
        setIsGettingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return {posts, isGettingPosts, getPostError};
};

export default useBlogPosts;