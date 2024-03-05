import { useState, React } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show)
  };

  const submitHandler = () => {

  };

  const guestClick = () =>{
    setEmail("guest@example.com");
    setPassword("12345");
  }


  return <VStack spacing='5px' color='black'>

    <FormControl id='log_email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        type='email'
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
      >
      </Input>
    </FormControl>


    <FormControl id='log_password' isRequired>
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

    <Button
      colorScheme='blue'
      width='100%'
      style={{ marginTop: 15 }}
      onClick={submitHandler}
    >
      Login

    </Button>

    <Button
      colorScheme='red'
      width='100%'
      variant="solid"
      style={{ marginTop: 15 }}
      onClick={guestClick}
    >
      Get guest user credentials

    </Button>
  </VStack>
}


export default Login
