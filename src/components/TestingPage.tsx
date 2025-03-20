import React from 'react';
// import { Container, Typography } from '@mui/material';
import { TreeMap, TreeNode } from "miles-tree-map";
import { worldMap } from '../consts/consts';

const TestingPage: React.FC = () => {
    console.log('World Map:', worldMap); // Log the worldMap object to the console
    const data: TreeNode = worldMap;
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
        {/* <div style={{ width: '700px', height: '700px' }}> */}
            <TreeMap data={data} />
        </div>
    );
};

export default TestingPage;
