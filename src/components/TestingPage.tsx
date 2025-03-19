import React from 'react';
import { Container, Typography } from '@mui/material';
import { TreeMap, TreeNode } from "miles-tree-map";
import { worldMap } from '../consts/consts';

const TestingPage: React.FC = () => {
    console.log('World Map:', worldMap); // Log the worldMap object to the console
    const data: TreeNode = worldMap;
    return (
        <Container sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h4">Welcome to the Testing Page</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Use the navigation to explore the application.
            </Typography>
            <div style={{ width: '100vw', height: '100vh' }}>
            {/* <div style={{ width: '700px', height: '700px' }}> */}
                <TreeMap data={data} />
            </div>
        </Container>
    );
};

export default TestingPage;
