import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, Grid, TableRow, Button, Container, Typography } from '@mui/material';

interface Props {
    category: string;
};

const CategoryPage: React.FC<Props> = ({ category }) => {
    const { fetchCategoryData, categoriesData } = useSearch();
    const [categoryData, setCategoryData] = useState<any[]>([]);

    useEffect(() => {
        fetchCategoryData(category);
        setCategoryData(categoriesData[category] || []);
    }, [categoriesData, category, fetchCategoryData]);

    const handleAdd = () => {
        const newRow = { name: 'New', url: '' };
        setCategoryData([...categoryData, newRow]);
    };

    const handleDelete = (index: number) => {
        setCategoryData(categoryData.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        const updated = prompt('Enter new name:', categoryData[index].name);
        if (updated !== null) {
            const updatedRow = [...categoryData];
            updatedRow[index].name = updated;
            setCategoryData(updatedRow);
        }
    };

    return (
        <Container>
            <Grid sx={{ padding: '8px' }} justifyContent='space-between' container>
                <Grid item>
                    <Typography variant="h4">{category}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleAdd}>Create</Button>
                </Grid>
            </Grid>
            <Grid container sx={{ maxHeight: '500px', overflow: 'auto' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData.map((rowData, index) => (
                                <TableRow key={index}>
                                    <TableCell>{rowData.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(index)}>Edit</Button>
                                        <Button onClick={() => handleDelete(index)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    );
};

export default CategoryPage;
