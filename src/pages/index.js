import * as React from "react";
import ElevateAppBar from "./header"
import Generator from "./generator"
import GradientButton from "../components/GradientButton"
import {
    createMuiTheme,
    responsiveFontSizes,
    MuiThemeProvider,
    Typography,
    Box
} from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const titleContainerStyle = {
    paddingTop: 130,
}

const startButtonStyle = {
    paddingTop: 30,
    margin: "auto",
    width: 200
}

const generatorStyle = {
    margin: "auto",
    width: "75%",
    textAlign: "center",
    paddingTop: 75
}


// markup
const IndexPage = () => {
    return (
        <main className={"App"}>
            <ElevateAppBar/>
            <div style={titleContainerStyle}>
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h3" fontWeight={600} gutterBottom>
                        <Box fontWeight={600}>
                            Make your GitHub Profile awesome!<br/>
                            Show what technology you know.
                        </Box>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Add to README.md at your GitHub profile sections with <br/>
                        icons presenting technologies that you work with. <br/>
                        It will beatify and make more noticeable to recruiters
                        and the community.
                    </Typography>
                </MuiThemeProvider>
            </div>
            <div style={startButtonStyle}>
                <GradientButton
                    style={{width: 200}}
                    text={"Start"}
                    fontFamily={"sans-serif"}
                    gradientColor={{left: 200, mid: 250, right: 300}}/>
            </div>
            <Generator style={generatorStyle}/>
        </main>
    )
}

export default IndexPage
