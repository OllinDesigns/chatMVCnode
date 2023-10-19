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
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
          Chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Box padding="10px" textAlign="center">
          <Text textAling="center">Welcome to the chat. You need a Google account to access. have your login!</Text>
        </Box>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">Log in</Tab>
            <Tab width="50%">Log out</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Text>
                  <a href="http://localhost:8080/auth/google">
                    click to sign in with Google
                  </a>
                </Text>
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <a href="https://myaccount.google.com/">Sign out Google</a>
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
