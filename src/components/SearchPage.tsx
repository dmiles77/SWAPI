import React, { useState, useEffect } from 'react';
import { SearchResult, useSearch } from '../context/SearchContext';
import { TextField, Button, Typography, Container, Autocomplete, CircularProgress, styled, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiAutocomplete-popover': {
        zIndex: theme.zIndex.modal,
    },
    '& .MuiAutocomplete-listbox': {
        overflowY: 'auto',
    },
}));

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

    const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
        setQuery(value);
    };

    const handleViewAll = (category: string) => {
        navigate(`/category/${category}`);
    };

    // Flatten search results for Autocomplete options
    const autocompleteOptions: SearchResult[] = Object.entries(searchResults).flatMap(([category, results]) =>
        results.map((item: any) => ({ ...item, category }))
    );

    // Group by category function
    const groupByCategory = (option: SearchResult) => option.category;
    console.log(searchResults);
    return (
        <Container sx={{ width: '600px', marginTop: 4 }}>
            <CustomAutocomplete
                freeSolo
                options={autocompleteOptions}
                // groupBy={groupByCategory}
                // getOptionLabel={(option)=>(option.name ? option.name : '')}
                onInputChange={(event: React.ChangeEvent<{}>, value: string) => handleSearchChange(event, value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            {searchResults && Object.keys(searchResults).length > 0 && (
                <Grid pl={1} wrap='nowrap' direction="column" container sx={{ border: '1px solid gray', maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.keys(searchResults).map((category) => (
                        <Grid my={1} wrap='nowrap' width='100%' direction="column" item key={category}>
                            <Typography mb={1} variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
                            <Grid direction="column" container>
                                {searchResults[category].map((item: any) => (
                                    <Grid item key={item.url}>{item.name}</Grid>
                                ))}
                            </Grid>
                            <Link sx={{ cursor: 'pointer' }} onClick={() => handleViewAll(category)}>View All</Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default SearchPage;
