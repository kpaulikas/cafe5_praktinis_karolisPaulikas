import React, { useState } from 'react';
import Header from './LayoutComponents/Header/Header';
import Footer from './LayoutComponents/Footer/Footer';
import MemberTable from '../organisms/MemberTable/MemberTable';
import Box from '@mui/material/Box';

const PageLayout = () => {
  const [open, setOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refreshMembers = () => setRefreshTrigger(!refreshTrigger);

  return (
    <>
      <Header
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        refreshMembers={refreshMembers}
      />
      <div>
        <Box
          component='div'
          sx={{
            backgroundColor: 'rgba(39,39,39, 0.55)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: 2,
            paddingBottom: '68.01px',
            paddingTop: '80px',
          }}
        >
          <main>
            <MemberTable
              refreshTrigger={refreshTrigger}
              onMembersUpdated={refreshMembers}
            />
          </main>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
