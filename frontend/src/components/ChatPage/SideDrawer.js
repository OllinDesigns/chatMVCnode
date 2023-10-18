import React from "react";
import { Box, Text } from "@chakra-ui/layout";

function SideDrawer() {
  return (
    <div>
      <Box
        margin="22px"
        marginLeft="150px"
        marginRight="150px"
        padding="10px"
        border="3px solid #42357b"
        background="#0d1521"
        color="#42357b"
        textAlign="center"
        borderRadius="20px"
      >
        <Text fontFamily="Montserrat" fontSize="3em">
          {" "}
          Let's Chat!{" "}
        </Text>
      </Box>
    </div>
  );
}

export default SideDrawer;
