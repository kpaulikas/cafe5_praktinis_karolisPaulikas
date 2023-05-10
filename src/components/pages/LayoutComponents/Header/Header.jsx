import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import useMediaQuery from '@mui/material/useMediaQuery';
import NewMemberDialog from '../../../organisms/NewMemberDialog/NewMemberDialog';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

export default function Header({
  open,
  handleOpen,
  handleClose,
  refreshMembers,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const typographyVariant = isSmallScreen ? 'h6' : 'h5';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Container maxWidth='xl'>
          <Toolbar>
            <VideogameAssetIcon
              fontSize='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            />
            <Typography
              variant={typographyVariant}
              component='div'
              sx={{ flexGrow: 1 }}
            >
              GeekyGains
            </Typography>
            <Button variant='outlined' color='inherit' onClick={handleOpen}>
              NEW MEMBER
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <NewMemberDialog
        open={open}
        onClose={handleClose}
        refreshMembers={refreshMembers}
      />
    </Box>
  );
}
