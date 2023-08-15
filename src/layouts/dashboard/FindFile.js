import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Stack, Link, Container, Typography, Button } from '@material-ui/core';

// components
import Page from '../../components/Page';
import FindFileComponent from '../../components/main/FindFileComponent';


// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    marginTop: '5rem'
  }
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  display: 'flex',
  minHeight: '30vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4, 0)
}));

// ----------------------------------------------------------------------

export default function FindFile() {
  console.log('Find File');
  return (
    <RootStyle title="Find File | POSSAP">
     

     
      <Container >
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
             
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>
          </Stack>

          <FindFileComponent />

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
