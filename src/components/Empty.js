import React from 'react';
import { Box, Typography } from '@material-ui/core';
import EmptyData from '../assets/static/home/empty-data.svg'

export default function Empty() {
  return (
    <Box sx={{ width: 100, height: 100, margin: '10px auto' }}>
      <img alt="screen" src={EmptyData} />
    </Box>
  )
}