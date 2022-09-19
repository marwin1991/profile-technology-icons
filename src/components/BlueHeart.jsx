import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


export const BlueHeart = (props) => <Checkbox
    {...props}
    icon={<FavoriteBorder />} 
    checkedIcon={<Favorite />}
    sx={{
        color: "#1976ff",
        '&.Mui-checked': {
            color: "#1976ff",
        },
    }} 
/>;