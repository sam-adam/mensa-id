import {useEffect, useState} from 'react';
import {getMedia, Media} from '../api/media';
import {Post} from '../api/posts';

const useBlogMedia = (post: Post) => {
  const [media, setMedia] = useState<Media|null>(null);
  const [isGettingMedia, setIsGettingMedia] = useState(true);
  const [getMediaError, setGetMediaError] = useState(null);

  useEffect(() => {
    if (post?._links?.['wp:featuredmedia']?.[0]?.href) {
      const mediaHref = post?._links?.['wp:featuredmedia']?.[0]?.href;
      const mediaHrefParts = mediaHref.split('/');
      const mediaId = mediaHrefParts[mediaHrefParts.length - 1];

      const fetchMedia = async () => {
        try {
          const media = await getMedia(mediaId);
          setMedia(media);
        } catch (error) {
          setGetMediaError(error.message);
        } finally {
          setIsGettingMedia(false);
        }
      };

      fetchMedia();
    }
  }, [post]);

  return {media, isGettingMedia, getMediaError};
};

export default useBlogMedia;