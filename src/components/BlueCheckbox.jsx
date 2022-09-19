import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';


export const BlueCheckbox = (props) => <Checkbox
    {...props}
    sx={{
        color: "#1976ff",
        '&.Mui-checked': {
            color: "#1976ff",
        },
    }} 
/>;