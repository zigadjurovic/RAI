import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import ParcelLocker from './ParcelLocker';
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer, Box, Heading } from '@chakra-ui/react';

function ParcelLockers() {
  const userContext = useContext(UserContext);
  const [parcelLockers, setParcelLockers] = useState([]);

  useEffect(() => {
    const getParcelLockers = async () => {
      try {
        const res = await fetch('http://localhost:3001/parcel-lockers', { credentials: 'include' });
        const data = await res.json();
        setParcelLockers(data);
      } catch (error) {
        console.error('Error fetching parcel lockers:', error);
      }
    };
    getParcelLockers();
  }, []);

  return (
    <>
      {!userContext.user ? <Navigate replace to="/login" /> : ''}
      {parcelLockers.length > 0 ? (
        <TableContainer>
          <Table variant="simple" size="md">
            <TableCaption>Vsi paketniki</TableCaption>
            <Thead>
              <Tr>
                <Th>Paketnik</Th>
                <Th>Pravice dostopa</Th>
                <Th>Odklepi</Th>
                <Th>Uredi</Th>
                <Th>Briši</Th>
              </Tr>
            </Thead>
            <Tbody>
              {parcelLockers.map((parcelLocker) => (
                <ParcelLocker parcelLocker={parcelLocker} key={parcelLocker._id} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box p={8}>
          <Heading mb={6}>Nimate paketnikov!</Heading>
        </Box>
      )}
    </>
  );
}

export default ParcelLockers;
