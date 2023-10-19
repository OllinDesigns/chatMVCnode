import React from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        border="6px solid #42357b"
        background="#0d1521"
        color="#42357b"
      >
        <Text
          fontSize="4xl"
          fontFamily="Montserrat, 
        sans-serif"
          fontWeight="600"
          textAlign="center"
          color="#6b5ab8"
        >
          Chat with the cat!
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        border="6px solid #42357b"
      >
        <Box padding="10px" textAlign="center" marginBottom="15px">
        <Text margin="10px" textAlign="center" fontFamily="Work Sans" fontSize="1.3em" fontWeight="bold">
        Welcome to the chat. You need a Google account to access. have your
            login!
                </Text>
          
        </Box>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">
              <Text
                fontFamily="Montserrat, 
              sans-serif"
                fontSize="2em"
              >
                Log in
              </Text>
            </Tab>
            <Tab width="50%">
              <Text
                fontFamily="Montserrat, 
              sans-serif"
                fontSize="2em"
              >
                Log out
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                background="#0d1521"
                borderRadius="lg"
                p={3}
                border="4px solid #6b5ab8"
              >
                <Text
                  color="white"
                  fontFamily="Roboto"
                  fontWeight="600"
                  textAlign="center"
                  fontSize="1.4em"
                >
                  <a href="http://localhost:8080/auth/google">
                    Click HERE to sign in with Google
                  </a>
                </Text>
                
              </Box>
              <Text margin="10px" textAlign="center" fontFamily="Work Sans" fontSize="1.3em">
                with some Google accounts you have to give your password 2 times, it's not my fault, it's Google stuff...
                </Text>
            </TabPanel>
            <TabPanel>
            <Box
                background="#6b5ab8"
                borderRadius="lg"
                p={3}
                border="4px solid #0d1521"
              >
                <Text
                  color="white"
                  fontFamily="Roboto"
                  fontWeight="600"
                  textAlign="center"
                  fontSize="1.4em"
                >
                 <a href="https://myaccount.google.com/">Click HERE to sign out Google</a>
                </Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
