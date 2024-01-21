import { Box, VStack } from '@gluestack-ui/themed';

const Card = ({ header, footer, children }) => {
  return (
    <Box
      borderColor="$borderLight200"
      borderRadius="$xl"
      borderWidth="$1"
      my="$4"
      overflow="hidden"
      $light-bg="$white"
      $dark-bg="$backgroundDark900"
      $dark-borderColor="$borderDark800"
    >
      {header && header()}
      <VStack px="$4" pt="$4" pb="$4">
        {children}
      </VStack>
      {footer && footer()}
    </Box>
  );
};

export default Card;