import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
        <AppBar style={{background: "#ffffff"}}>
          <Toolbar>
            <Typography variant="h6" style={{color:"#26292d"}}>Profile Technology Icons</Typography>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  );
}