import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Heading, Text, Button, Input } from '@chakra-ui/react';

function EditParcelLocker() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [numberParcelLocker, setNumberParcelLocker] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/parcel-lockers/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setNumberParcelLocker(data.numberParcelLocker);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/parcel-lockers/edit-parcel-locker/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          numberParcelLocker,
        }),
        credentials: 'include',
      });
      if (response.ok) {
        alert('Parcel Locker updated!');
      } else {
        console.error('Failed to update parcel locker');
      }
    } catch (error) {
      console.error('Error updating parcel locker:', error);
    }
  };

  return (
    <Container maxW="md" centerContent mt={10}>
      <Box p={6} borderWidth={1} borderRadius="md" shadow="md">
        <Heading mb={4}>Edit Parcel Locker</Heading>
        <Input
          mb={3}
          placeholder="Name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          mb={6}
          placeholder="Number"
          value={numberParcelLocker}
          onChange={event => setNumberParcelLocker(event.target.value)}
        />
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </Container>
  );
}

export default EditParcelLocker;