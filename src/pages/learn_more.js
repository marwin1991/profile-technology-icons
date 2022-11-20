import React from 'react';
import {Link} from "gatsby";

// styles
const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
    marginTop: 0,
    marginBottom: 32,
    maxWidth: 320,
}

const paragraphStyles = {
    marginBottom: 48,
}

const goBackStyles = {
    fontWeight: "bold",

}
// const codeStyles = {
//     color: "#8A6534",
//     padding: 4,
//     backgroundColor: "#FFF4DB",
//     fontSize: "1.25rem",
//     borderRadius: 4,
// }

const LearnMore = () => {
    return (
        <main style={pageStyles}>
            <title>Learn More</title>
            <h2 style={headingStyles}>Learn more</h2>
            
            <p style={paragraphStyles}>
                <span role="img" aria-label="Television">📺</span> See this simple GIF to learn how to use it.
                <br/>
                <br/>
                <div align="center">
                    <img alt="demo" src="https://github.com/marwin1991/profile-technology-icons/raw/main/static/demo.gif" />
                </div>
                <Link to="/" style={goBackStyles}>⬅️{" "} Go back</Link>
            </p>
        </main>
    )
}

export default LearnMore
