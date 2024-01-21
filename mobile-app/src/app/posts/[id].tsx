import { useEffect, useState } from 'react';
import { Dimensions, Share } from 'react-native';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  Text,
  Heading,
  Box,
  Image,
  VStack,
  ShareIcon,
  ExternalLinkIcon,
  ScrollView
} from '@gluestack-ui/themed';
import useBlogPost from '../../hooks/useBlogPost';
import useBlogMedia from '../../hooks/useBlogMedia';
import Card from "../../components/Card";

const PostView = () => {
  const params = useLocalSearchParams();
  const postId = parseInt(params['id']);
  const {post} = useBlogPost(postId);
  const {media} = useBlogMedia(post);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (media) {
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = media.media_details.sizes.medium?.width / screenWidth;
      const imageHeight = media.media_details.sizes.medium?.height / scaleFactor;

      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    }
  });

  if (!post) {
    return null;
  }

  const postDate = new Date(post.date_gmt.replace(' ', 'T'));
  const handleClickShare = () => {
    Share.share({
      title: post.title.rendered,
      message: post.content.rendered
    })
  };
  const handleClickOpenBrowser = () => {
    Linking.openURL(post.link);
  };

  return (
    <VStack w='100%' minH='100%' position={'relative'}>
      {media && <Box
        borderRadius='$lg'
        overflow='hidden'
        safeArea
        py='$4'
        px='$4'
        w='100%'
        position='absolute'
      >
        <Image
          borderRadius='$lg'
          style={{width: imgWidth, aspectRatio: 1, height: imgHeight}}
          resizeMode='cover'
          source={{
            uri: media.media_details.sizes.full?.source_url,
          }}
        />
      </Box>}
      <ScrollView
        height="100vh"
        borderRadius='$lg'
        py='$5'
        px='$5'
      >
        <Box style={{height: imgHeight - imgHeight * 0.08}}/>
        <Card footer={() => (
          <Box py="$2" px="$5">
            <ButtonGroup space="md" direction="row">
              <Button
                variant="link"
                size="md"
                action="positive"
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleClickOpenBrowser}
              >
                <ButtonIcon as={ExternalLinkIcon} />
              </Button>
              <Button
                variant="link"
                size="md"
                action="positive"
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleClickShare}
              >
                <ButtonIcon as={ShareIcon} />
              </Button>
            </ButtonGroup>
          </Box>
        )}>
          <VStack>
            <Heading>
              <Text size="lg" bold>
                {post.title.rendered}
              </Text>
            </Heading>
            <Text color="$coolGray400" size="sm">
              {postDate.toDateString()} {postDate.toLocaleTimeString()}
            </Text>
            <Text>
              {post.content.rendered}
            </Text>
          </VStack>
        </Card>
        <Box style={{height: Dimensions.get('window').height - imgHeight}}/>
      </ScrollView>
    </VStack>
  );
};

export default PostView;