import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
function VerifyPage() {
  return (
    <Box>
      <FormControl variant="standard">
        <InputLabel htmlFor="email">Enter your email to start using FUniverse</InputLabel>
        <Input id="email" />
      </FormControl>
    </Box>
  );
}

export default VerifyPage;
