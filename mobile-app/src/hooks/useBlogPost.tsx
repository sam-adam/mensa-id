import {useEffect, useState} from 'react';
import {getPost, Post} from '../api/posts';

const useBlogPost = (postId) => {
  const [post, setPost] = useState<Post|null>(null);
  const [isGettingPost, setIsGettingPost] = useState(true);
  const [getPostError, setGetPostError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(postId);
        setPost(post);
      } catch (error) {
        setGetPostError(error.message);
      } finally {
        setIsGettingPost(false);
      }
    };

    fetchPost();
  }, [postId]);

  return {post, isGettingPost, getPostError};
};

export default useBlogPost;