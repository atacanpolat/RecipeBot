import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import avocado from '../images/Vector.png'
import EggAltIcon from '@mui/icons-material/EggAlt';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { GenerateRecipeButton } from './GenerateRecipeButton'; 

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

function Header() {
  return (
    
    <header className='header'>
        <div className='logo'>
            <Link to='/' style={{
                color:'#3A00E5', 
                fontSize:'18px',
                fontWeight: 700,
                fontStyle: 'Georgia'
                }}>RecipeBot</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Register
                </Link>
            </li>
            <li>
             <GenerateRecipeButton />
            </li>
        </ul>
    </header>
  )
}

export default Header