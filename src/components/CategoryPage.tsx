import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Container, Typography } from '@mui/material';

const CategoryPage: React.FC = () => {
  const { searchResults } = useSearch();
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    if (searchResults['people']) {
      setPeople(searchResults['people']);
    }
  }, [searchResults]);

  const handleAdd = () => {
    const newPerson = { name: 'New Character', url: '' };
    setPeople([...people, newPerson]);
  };

  const handleDelete = (index: number) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const updatedName = prompt('Enter new name:', people[index].name);
    if (updatedName !== null) {
      const updatedPeople = [...people];
      updatedPeople[index].name = updatedName;
      setPeople(updatedPeople);
    }
  };

  return (
    <Container>
      <Typography variant="h4">People</Typography>
      <Button variant="contained" onClick={handleAdd}>Create</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person, index) => (
              <TableRow key={index}>
                <TableCell>{person.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CategoryPage;
