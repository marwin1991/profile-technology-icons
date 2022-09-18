import * as React from "react";
import ElevateAppBar from "./header"
import Generator from "./generator"
import GradientButton from "../components/GradientButton"
import {Box, createTheme, ThemeProvider, responsiveFontSizes, Typography} from "@mui/material";
import scrollTo from 'gatsby-plugin-smoothscroll';
import Examples from "../components/Examples";
import NormalButton from "../components/NormalButton";
import {Link} from "gatsby";


let theme = createTheme({
    palette: {
        background: {
            default: "#ffffff"
        }
    }
});

theme = responsiveFontSizes(theme);

const titleContainerStyle = {
    paddingTop: 130,
}

const startButtonStyle = {
    paddingTop: 30,
    margin: "auto",
    width: 400
}

const generatorStyle = {
    margin: "auto",
    width: "75%",
    minWidth: 350,
    paddingTop: 70
}

// markup
const IndexPage = () => {
    return (
        <main className={"App"}>
            <ThemeProvider theme={theme}>
                <ElevateAppBar/>
                <div style={titleContainerStyle}>
                    <Typography variant="h3" fontWeight={600} gutterBottom style={{maxWidth: 850, margin: "auto"}}>
                        <Box fontWeight={600}>
                            Make your GitHub Profile awesome!
                            Show what technologies you know.
                        </Box>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom
                                style={{maxWidth: 600, margin: "auto", paddingTop: 25}}>
                        <Box>
                            Add to README.md at your GitHub profile section with
                            icons presenting technologies that you work with.
                            It will beautify your profile and will make it more
                            noticeable to recruiters and the community.
                        </Box>
                    </Typography>

                </div>
                <div style={startButtonStyle}>
                    <Link style={{display: "inline-block"}} to={'/learn_more'}>
                        <NormalButton
                            style={{width: 190, marginRight: 10}}
                            text={"Learn more"}
                            fontFamily={"sans-serif"}
                            gradientColor={{left: 200, mid: 250, right: 300}}
                        />
                    </Link>
                    <div style={{display: "inline-block"}} onClick={() => scrollTo('#generator')}>
                        <GradientButton
                            style={{width: 190, marginLeft: 10}}
                            text={"Start"}
                            fontFamily={"sans-serif"}
                            gradientColor={{left: 200, mid: 250, right: 300}}
                        />
                    </div>
                </div>
                <Examples/>
                <Generator style={generatorStyle}/>
            </ThemeProvider>
        </main>
    )
}

export default IndexPage

export function Head() {
    return (
      <title>😄 Profile Technology Icons</title>
    )
  }
