import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        background: '#272727',
        color: theme.palette.text.primary,
        textAlign: 'center',
        padding: theme.spacing(2),
      }}
    >
      <Typography variant='body2'>
        © {new Date().getFullYear()} GeekyGains. All rights reserved.
      </Typography>
    </Box>
  );
}
