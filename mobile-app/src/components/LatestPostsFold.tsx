import { useRef, useState } from 'react';
import { Box, HStack, ScrollView } from '@gluestack-ui/themed';
import { Post } from '../api/posts';
import PostPreview from './PostPreview';

const LatestPostsFold = ({posts}: {posts: Post[]}) => {
  const scrollViewRef = useRef(null);
  const scrollAmount = 400;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContentAtRight, setIsContentAtRight] = useState(true);
  
  const handleScrollLeft = () => {
    const newScrollPosition = scrollPosition - scrollAmount;
    
    if (scrollViewRef.current) {
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true
      });
      setScrollPosition(newScrollPosition);
    }
  };
  
  const handleScrollRight = () => {
    const newScrollPosition = scrollPosition + scrollAmount;
    
    if (scrollViewRef.current) {
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true
      });
      setScrollPosition(newScrollPosition);
    }
  };
  
  const checkContentAtLeft = () => {
    return scrollPosition > 0;
  };
  
  const isCloseToRight = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    return contentOffset.x + layoutMeasurement.width >= contentSize.width;
  };
  
  return (
    <Box w='100%'>
      <ScrollView
        horizontal
        style={{ width: '100%' }}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEventThrottle={50}
        onScroll={(event) => {
          if (isCloseToRight(event)) {
            setIsContentAtRight(false);
          } else {
            setIsContentAtRight(true);
          }
          setScrollPosition(event.nativeEvent.contentOffset.x);
        }}
      >
        <HStack space='md' width='100%' sx={{ '@md': { px: '$0' } }}>
          {posts.map((post) => (<PostPreview key={post.id} post={post}/>))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default LatestPostsFold;