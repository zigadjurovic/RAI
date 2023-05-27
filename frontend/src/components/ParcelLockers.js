import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import ParcelLocker from './ParcelLocker';
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer, Box, Heading } from '@chakra-ui/react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';

function ParcelLockers() {
  const userContext = useContext(UserContext);
  const [parcelLockers, setParcelLockers] = useState([]);
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);

  useEffect(() => {
    const getParcelLockers = async () => {
      const res = await fetch('http://localhost:3001/parcellockers', { credentials: 'include' });
      const data = await res.json();
      console.log(data);
      setParcelLockers(data);
    };
    getParcelLockers();
  }, []);

  if (parcelLockers.length > 0) {
    return (
      <>
        {!userContext.user ? <Navigate replace to="/login" /> : ''}
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
        <Box p={8}>
          <Heading mb={6}>Nimate paketnikov!</Heading>
        </Box>
      </>
    );
  } else {
    return (
      <>
        {!userContext.user ? <Navigate replace to="/login" /> : ''}
        <Box p={12}>
          <Heading mb={6}>Nimate paketnikov!</Heading>
        </Box>
      </>
    );
  }
}

export default ParcelLockers;
