import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { TextField, Typography, Container, CircularProgress, styled, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { searchResults, fetchSearchResults } = useSearch();
    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetchSearchResults(query)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }
    }, [query, fetchSearchResults]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleViewAll = (category: string) => {
        navigate(`/category/${category}`);
    };

    return (
        <Container sx={{ width: '600px', marginTop: 4 }}>
            <TextField
                onChange={handleSearchChange}
                label="Search"
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: loading && <CircularProgress color="inherit" size={20} />,
                }}
            />
            {searchResults && Object.keys(searchResults).length > 0 && (
                <Grid pl={1} wrap='nowrap' direction="column" container sx={{ border: '1px solid gray', maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.keys(searchResults).map((category) => (
                        <Grid my={1} width='100%' item key={category}>
                            <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
                            <Grid pl={1} direction="column" container>
                                {searchResults[category].map((item: any) => (
                                    <Grid item key={item.url}>{item.name}</Grid>
                                ))}
                                <Link sx={{ cursor: 'pointer' }} onClick={() => handleViewAll(category)}>
                                    View All
                                </Link>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default SearchPage;
