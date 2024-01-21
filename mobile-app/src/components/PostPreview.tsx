import { Link } from 'expo-router';
import { View, VStack, Text, Box, Image } from '@gluestack-ui/themed';
import Card from './Card';
import useBlogMedia from '../hooks/useBlogMedia';

const PostThumbnail = ({ post }) => {
  const {media} = useBlogMedia(post);

  if (media) {
    return (
      <Box>
        <Image
          h="$64"
          w="$64"
          resizeMode="cover"
          source={{
            uri: media.media_details.sizes.medium?.source_url,
          }}
        />
      </Box>
    )
  }

  return null;
};

const PostPreview = ({ post }) => {
  if (!post) {
    return null;
  }

  const postDate = new Date(post.date_gmt.replace(' ', 'T'));

  return (
    <Link push href={{pathname: 'posts/[id]', params: {id: post.id}}}>
      <Card header={() => (<PostThumbnail post={post}/>)}>
        <VStack>
          <Text bold>
            {post.title.rendered}
          </Text>
          <Text color="$coolGray400" size="sm">
            {postDate.toDateString()} {postDate.toLocaleTimeString()}
          </Text>
        </VStack>
      </Card>
    </Link>
  )
};

export default PostPreview;