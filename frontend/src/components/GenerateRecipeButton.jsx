import React from 'react'
import EggAltIcon from '@mui/icons-material/EggAlt';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
        light: purple[200],
        background: '#F7F5FF',
        text: '#3A00E5'
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',

      },
    },
  });

export function GenerateRecipeButton() {
    return (
        <ThemeProvider theme={theme}>
        <Button
         size="medium"
         variant="text"
         startIcon={<EggAltIcon />}
         href='/generate'     
         style={{ 
            backgroundColor: theme.palette.primary.background,
            color: theme.palette.primary.text,
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500 }}            
         >
            Generate Recipe
        </Button>
       </ThemeProvider>

    )
  }