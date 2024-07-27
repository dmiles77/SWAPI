import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { TextField, Typography, Container, CircularProgress, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { searchResults, fetchSearchResults, resetSearchResults } = useAppContext();
    const navigate = useNavigate();

    const debouncedFetchSearchResults = useCallback(
        debounce(async (query: string) => {
            setLoading(true);
            try {
                await fetchSearchResults(query);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        }, 300),
        [fetchSearchResults]
    );

    useEffect(() => {
        if (query) {
            debouncedFetchSearchResults(query);
        } else {
            resetSearchResults();
        }

        return () => debouncedFetchSearchResults.cancel();
    }, [query, debouncedFetchSearchResults]);

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
