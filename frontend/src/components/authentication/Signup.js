import { useState, React } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please select a valid image!.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if(pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/webp"){
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","chat_sphere");
      data.append("cloud_name","chatsphere");
      fetch("https://api.cloudinary.com/v1_1/chatsphere/image/upload",{
        method : "post",
        body : data,
        }).then(res=>res.json()).then((data)=>{
          setPic(data.url.toString());
          setLoading(false);
          console.log(`Image uploaded successfully : ${data.url.toString()}`);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        });
      }else{
        setLoading(false);
        toast({
          title: 'Please select a valid image!.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
        return;
      };
  };

  const submitHandler = () => {

  };

  return <VStack spacing='5px' color='black'>

    <FormControl id='name' isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder='Enter your name'
        onChange={(e) => setName(e.target.value)}
      >
      </Input>
    </FormControl>


    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        type='email'
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
      >
      </Input>
    </FormControl>


    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        >
        </Input>
        <InputRightElement width='4.5rem'>
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>


    <FormControl id='confirmPassword' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          placeholder='Re-enter your password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
        </Input>
        <InputRightElement width='4.5rem'>
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>


    <FormControl id='pic'>
      <FormLabel>Upload your picture</FormLabel>
      <Input
        type='file'
        p={1.5}
        accept='image/*'
        onChange={(e) => postDetails(e.target.files[0])}
      >
      </Input>
    </FormControl>

    <Button
      colorScheme='blue'
      width='100%'
      style={{ marginTop: 15 }}
      onClick={submitHandler}
      isLoading={loading}
    >
      Sign Up

    </Button>
  </VStack>
}

export default Signup
