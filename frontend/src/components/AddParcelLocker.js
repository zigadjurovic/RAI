import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddParcelLocker() {
  const [numberParcelLocker, setNumberParcelLocker] = useState("");
  const [nameParcelLocker, setNameParcelLocker] = useState("");
  const navigate = useNavigate();

  const handleAddParcelLocker = (e) => {
    console.log("handle function called"); // Add this console log statement
    e.preventDefault();
    console.log("Number:", numberParcelLocker);
    console.log("Name:", nameParcelLocker);
    navigate("/", { replace: true });
  };

  return (
    <Flex p={8} justifyContent="center" alignItems="center" minH="100vh">
      <Box borderWidth="2px" p={8} borderRadius="lg" w="md">
        <Stack spacing={4}>
          <Heading fontSize="2xl">Add Parcel Locker</Heading>
          <form onSubmit={handleAddParcelLocker}>
            <FormControl id="numberParcelLocker">
              <FormLabel>Parcel Number/ID:</FormLabel>
              <Input
                value={numberParcelLocker}
                onChange={(e) => setNumberParcelLocker(e.target.value)}
                type="text"
                required
              />
            </FormControl>
            <FormControl id="nameParcelLocker">
              <FormLabel>Parcel Name:</FormLabel>
              <Input
                value={nameParcelLocker}
                onChange={(e) => setNameParcelLocker(e.target.value)}
                type="text"
                required
              />
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Add Parcel Locker
            </Button>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}

export default AddParcelLocker;
