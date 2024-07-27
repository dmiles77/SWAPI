import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Grid, Typography, Box } from '@mui/material';
import { IFormField } from '../interfaces/interfaces';
import { styled } from '@mui/material/styles';

interface FormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    fields: IFormField[];
    isEditMode: boolean;
    initialData?: Record<string, any>;
}

const ModalBackdrop = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
}));

const ModalContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
        height: '70%',
    },
}));

const ContentWrapper = styled(Box)({
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
});

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '16px',
    borderTop: '1px solid #ddd',
});

const FormModal: React.FC<FormModalProps> = ({ open, onClose, onSubmit, fields, initialData = {}, isEditMode }) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

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
            <ModalBackdrop>
                <ModalContainer>
                    <Typography variant="h6" m={2} textAlign="center">
                        {isEditMode ? 'Edit' : 'Create'}
                    </Typography>
                    <ContentWrapper>
                        <Grid container spacing={2}>
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
                                        required={field.isMandatory}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </ContentWrapper>
                    <Footer>
                        <Button variant="contained" onClick={handleSubmit} sx={{ marginRight: '10px' }}>
                            Confirm
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                    </Footer>
                </ModalContainer>
            </ModalBackdrop>
        </Modal>
    );
};

export default FormModal;
