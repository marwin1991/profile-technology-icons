import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function ElevateAppBar(props) {
    return (
        <React.Fragment>
            <AppBar style={{background: "#ffffff"}}>
                <Toolbar>
                    <Typography variant="h6" style={{color: "#26292d"}}>
                        <span role="img" aria-label="Clipboard">📋 </span>
                        <span role="img" aria-label="Grinning Face with Smiling Eyes">😄 </span>
                        Profile Technology Icons</Typography>
                    <div style={{marginLeft: 15, marginRight: 15}}>
                        <iframe
                            src="https://ghbtns.com/github-btn.html?user=marwin1991&repo=profile-technology-icons&type=star&count=true&size=large"
                            frameBorder="0" scrolling="0" width="170" height="30" title="GitHub"/>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}