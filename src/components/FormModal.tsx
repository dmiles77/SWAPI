import React, { useState } from 'react';
import { Modal, Button, TextField, Grid, Typography } from '@mui/material';
import { IFormField } from '../interfaces/interfaces';

interface FormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    fields: IFormField[];
    isEditMode: boolean;
    initialData?: Record<string, any>;
}

const FormModal: React.FC<FormModalProps> = ({ open, onClose, onSubmit, fields, initialData = {}, isEditMode }) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        fields.forEach((field) => {
            if (field.isMandatory && !formData[field.fieldName]) {
                newErrors[field.fieldName] = `${field.label} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Grid sx={{ padding: '20px', background: '#fff', margin: 'auto', width: '50%' }}>
                <Grid container spacing={2}>
                    <Typography variant="h6" m={2}>{isEditMode ? 'Edit' : 'Create'}</Typography>
                    {fields.map((field) => (
                        <Grid item xs={12} key={field.fieldName}>
                            <TextField
                                label={field.label}
                                type={field.fieldType}
                                fullWidth
                                value={formData[field.fieldName] || ''}
                                onChange={handleChange(field.fieldName)}
                                error={!!errors[field.fieldName]}
                                helperText={errors[field.fieldName]}
                            />
                        </Grid>
                    ))}
                    <Grid container spacing={2} mt={2}>
                        <Grid item>
                            <Button variant="contained" onClick={handleSubmit}>Confirm</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default FormModal;
