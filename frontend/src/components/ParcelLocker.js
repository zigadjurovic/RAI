import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Heading, Text, Button, Input } from '@chakra-ui/react';

function ParcelLocker() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState(''); // Changed variable name
  const [numberParcelLocker, setNumberParcelLocker] = useState('');

  useEffect(() => {
    const fetchParcelLocker = async () => {
      try {
        const response = await fetch(`http://localhost:3001/parcel-lockers/${id}`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setName(data.name); // Updated
          setNumberParcelLocker(data.numberParcelLocker); // Kept same
        } else {
          console.error('Failed to fetch parcel locker');
        }
      } catch (error) {
        console.error('Error fetching parcel locker:', error);
      }
    };
    fetchParcelLocker();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/parcel-lockers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, // Updated
          numberParcelLocker,
        }),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setName(data.name); // Updated
        setNumberParcelLocker(data.numberParcelLocker); // Kept same
        navigate(`/parcel/${id}`);
      } else {
        console.error('Failed to update parcel locker');
      }
    } catch (error) {
      console.error('Error updating parcel locker:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this parcel locker?')) {
      try {
        const response = await fetch(`http://localhost:3001/parcel-lockers/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          navigate('/ParcelLockers');
        } else {
          console.error('Failed to delete parcel locker');
        }
      } catch (error) {
        console.error('Error deleting parcel locker:', error);
      }
    }
  };

  if (!name) { // Updated
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="md" centerContent mt={10}>
      <Box p={6} borderWidth={1} borderRadius="md" shadow="md" backgroundColor="#F2F2F2" mt={5} mb={5}>
        <Heading mb={4} fontFamily="'Comfortaa', cursive">Edit Parcel Locker</Heading>
        <Input
            mb={3}
            placeholder="Name"
            value={name} // Updated
            onChange={event => setName(event.target.value)} // Updated
            backgroundColor="#e0e0e0"
        />
        <Input
            mb={6}
            placeholder="Number"
            value={numberParcelLocker}
            onChange={event => setNumberParcelLocker(event.target.value)}
            backgroundColor="#e0e0e0"
        />
        <Button colorScheme="blue" onClick={handleEdit} mr={2}>
            Save
        </Button>
        <Button backgroundColor="#CC0000" color="white" onClick={handleDelete}>
            Delete
        </Button>
        </Box>
    </Container>
  );
};

export default ParcelLocker;
