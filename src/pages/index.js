import * as React from "react";
import ElevateAppBar from "./header"
import Generator from "./generator"

const titleContainerStyle = {
  paddingTop: 130,
}

const titleStyle = {
  margin: "auto",  
  width: "75%",
  textAlign: "center"
}

const subTitleContainerStyle = {
  paddingTop: 20,
  paddingBottom: 30
}

const startButton = {
  width: 200,
  margin: "auto"
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
    <main>
      <ElevateAppBar></ElevateAppBar>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Make your GitHub Profile awesome!</h1>
        <h1 style={titleStyle}>Show what technology you know.</h1>
      </div>
      <div style={subTitleContainerStyle}>
        <h2 class={'h2-as-paragraph'} style={titleStyle}>Add to README.md at your GitHub profile sections with </h2>
        <h2 class={'h2-as-paragraph'} style={titleStyle}>icons preseting technologies that you work with.</h2>
        <h2 class={'h2-as-paragraph'} style={titleStyle}>It will beatify and make more noticeable to recruiters and the community.</h2>
      </div>

      <Generator style={generatorStyle}></Generator>
    </main>
  )
}

export default IndexPage
