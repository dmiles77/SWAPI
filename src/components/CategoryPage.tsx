import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { useAppContext } from '../context/AppContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Button, Container, Typography, Box } from '@mui/material';
import FormModal from './FormModal';
import { FieldTypes } from '../interfaces/consts';
import { formatDate } from '../utils/date-utils';

interface Props {
    category: string;
};

const CategoryPage: React.FC<Props> = ({ category }) => {
    const { fetchCategoryData, categoriesData } = useAppContext();
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        fetchCategoryData(category);
        setCategoryData(categoriesData[category] || []);
    }, [categoriesData, category, fetchCategoryData]);

    const handleAdd = () => {
        setModalMode('add');
        setModalOpen(true);
    };

    const handleEdit = (index: number) => {
        setModalMode('edit');
        setCurrentRowIndex(index);
        setModalOpen(true);
    };

    const handleModalSubmit = (data: Record<string, any>) => {
        if (modalMode === 'add') {
            setCategoryData([...categoryData, { ...data, created: new Date().toISOString(), edited: new Date().toISOString() }]);
        } else if (modalMode === 'edit' && currentRowIndex !== null) {
            const updatedData = [...categoryData];
            updatedData[currentRowIndex] = { ...data, edited: new Date().toISOString() };
            setCategoryData(updatedData);
        }
        
        if (tableRef.current && modalMode === 'add') {
            // make sure the table is rendered and then scroll to the bottom
            setTimeout(() => {
                if (tableRef.current) {
                    tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };

    const handleDelete = (index: number) => {
        setCategoryData(categoryData.filter((_, i) => i !== index));
    };

    const fields = [
        { fieldName: 'name', label: 'Name', isMandatory: true, fieldType: FieldTypes.TEXT },
        { fieldName: 'height', label: 'Height', isMandatory: false, fieldType: FieldTypes.TEXT },
        { fieldName: 'mass', label: 'Mass', isMandatory: false, fieldType: FieldTypes.TEXT },
        { fieldName: 'hair_color', label: 'Hair Color', isMandatory: false, fieldType: FieldTypes.TEXT },
        { fieldName: 'skin_color', label: 'Skin Color', isMandatory: false, fieldType: FieldTypes.TEXT },
        { fieldName: 'eye_color', label: 'Eye Color', isMandatory: false, fieldType: FieldTypes.TEXT },
        { fieldName: 'birth_year', label: 'Birth Year', isMandatory: false, fieldType: FieldTypes.TEXT },
        { fieldName: 'gender', label: 'Gender', isMandatory: false, fieldType: FieldTypes.TEXT },
    ]; // it's better to get it as a prop this component needs to be generic

    return (
        <Container>
            <Grid sx={{ padding: '8px' }} container justifyContent='space-between'>
                <Grid item>
                    <Typography variant="h4">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleAdd}>Create</Button>
                </Grid>
            </Grid>
            <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
                <TableContainer>
                    <Table ref={tableRef} sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                {category === 'people' && (
                                    <>
                                        <TableCell>Height</TableCell>
                                        <TableCell>Mass</TableCell>
                                        <TableCell>Hair Color</TableCell>
                                        <TableCell>Skin Color</TableCell>
                                        <TableCell>Eye Color</TableCell>
                                        <TableCell>Birth Year</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell>Edited</TableCell>
                                    </>
                                )}
                                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 10 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData.map((rowData, index) => (
                                <TableRow key={index}>
                                    <TableCell>{rowData.name}</TableCell>
                                    {category === 'people' && (
                                        <>
                                            <TableCell>{rowData.height}</TableCell>
                                            <TableCell>{rowData.mass}</TableCell>
                                            <TableCell>{rowData.hair_color}</TableCell>
                                            <TableCell>{rowData.skin_color}</TableCell>
                                            <TableCell>{rowData.eye_color}</TableCell>
                                            <TableCell>{rowData.birth_year}</TableCell>
                                            <TableCell>{rowData.gender}</TableCell>
                                            <TableCell>{formatDate(rowData.created)}</TableCell>
                                            <TableCell>{formatDate(rowData.edited)}</TableCell>
                                        </>
                                    )}
                                    <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 10 }}>
                                        <Button onClick={() => handleEdit(index)}>Edit</Button>
                                        <Button onClick={() => handleDelete(index)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <FormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                fields={fields}
                isEditMode={modalMode === 'edit'}
                initialData={modalMode === 'edit' && currentRowIndex !== null ? categoryData[currentRowIndex] : {}}
            />
        </Container>
    );
};

export default CategoryPage;
