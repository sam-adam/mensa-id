import React, { useRef, useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Box,
  Text,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Button,
  ButtonText,
  ButtonSpinner,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Icon,
  CloseIcon,
  EyeIcon,
  EyeOffIcon
} from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import LatestPostsFold from '../components/LatestPostsFold';
import useBlogPosts from '../hooks/useBlogPosts';
import { useSession } from '../ctx';
import Toast from 'react-native-root-toast';

const IndexScreen = () => {
  const {posts, isGettingPosts, getPostError} = useBlogPosts({page: 1, perPage: 5});
  const {session, user, isLoading, signIn} = useSession();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleClickLogin = async () => {
    const emailInvalid = email === '';
    const passwordInvalid = password === '';

    setIsEmailInvalid(emailInvalid);
    setIsPasswordInvalid(passwordInvalid);

    if (emailInvalid || passwordInvalid) {
      return;
    }

    try {
      setIsLoggingIn(true);

      await signIn(email, password);

      Toast.show('Request failed to send.', {duration: Toast.durations.SHORT});

      setIsLoginModalVisible(false);
      setEmail('');
      setIsEmailInvalid(false);
      setPassword('');
      setIsPasswordInvalid(false);
    } catch (error) {
      Toast.show('Login failed', {duration: Toast.durations.SHORT});
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <VStack w='100%' minH='100%' position={'relative'}>
      {!session && (
        <>
          <Modal isOpen={isLoginModalVisible} onClose={() => setIsLoginModalVisible(false)}>
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Login using your email</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <VStack w='100%' h='100%' justifyContent='center' space='md' position={'relative'}>
                  <VStack space={'sm'}>
                    <Text color="$text500" lineHeight="$xs">
                      Email
                    </Text>
                    <Input isInvalid={isEmailInvalid}>
                      <InputField type="email" onChangeText={e => setEmail(e)} />
                    </Input>
                  </VStack>
                  <VStack space="xs">
                    <Text color="$text500" lineHeight="$xs">
                      Password
                    </Text>
                    <Input isInvalid={isPasswordInvalid}>
                      <InputField type={isPasswordVisible ? "text" : "password"} onChangeText={e => setPassword(e)} />
                      <InputSlot pr="$3" onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <InputIcon
                          as={isPasswordVisible ? EyeIcon : EyeOffIcon}
                          color="$darkBlue500"
                        />
                      </InputSlot>
                    </Input>
                  </VStack>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  size={"sm"}
                  onPress={handleClickLogin}
                  w={'100%'}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn && <ButtonSpinner/>}
                  {!isLoggingIn && <ButtonText>Login</ButtonText>}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HStack>
            <Box safeArea py='$4' pl='$4'>
              <Text _dark={{ color: '$white' }}>Welcome, Guest!</Text>
            </Box>
            <Box safeArea py='$4' pl='$2'>
              <TouchableOpacity onPress={() => setIsLoginModalVisible(true)}>
                <Text _dark={{ color: '$primary500' }}>Click to login</Text>
              </TouchableOpacity>
            </Box>
          </HStack>
        </>
      )}
      {session && <Box safeArea py='$4' px='$4' w='100%'>
        <Text _dark={{color: '$white'}}>Halo, <Text _dark={{color: '$white'}} bold>{user.name}</Text></Text>
      </Box>}
      {session && <Box safeArea py='$4' px='$4' w='100%'>
        <Heading size='lg'>
          Certificates
        </Heading>
      </Box>}
      <Box safeArea py='$4' px='$4' w='100%'>
        <Heading size='lg'>
          Latest Posts
        </Heading>
        <LatestPostsFold posts={posts}/>
      </Box>
    </VStack>
  );
};

export default IndexScreen;