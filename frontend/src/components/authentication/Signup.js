import { useState, React } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {

  };

  const submitHandler = () =>{

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
    style={{marginTop:15}}
    onClick={submitHandler}
    >
      Sign Up

    </Button>
  </VStack>
}

export default Signup
