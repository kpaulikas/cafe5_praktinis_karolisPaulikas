import PageLayout from './components/pages/PageLayout';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
      <Box
        component='div'
        sx={{
          backgroundImage: 'url("src/assets/images/bg.png")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <PageLayout />
      </Box>
    </>
  );
}

export default App;
