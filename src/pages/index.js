import * as React from "react";
import ElevateAppBar from "./header"
import GradientButton from 'react-linear-gradient-button';
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

const data = [
  { name: 'CSS', link: 'https://user-images.githubusercontent.com/25181517/117447663-0fa16280-af3e-11eb-8677-bcf8e4f8e298.png' },
  { name: 'Java Script', link: 'https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png' },
  { name: 'Angular', link: 'https://user-images.githubusercontent.com/25181517/117447798-3c557a00-af3e-11eb-9097-15de64b078de.png' },
  { name: 'React', link: 'https://user-images.githubusercontent.com/25181517/117448085-96eed600-af3e-11eb-9492-83a3a0fcbfb1.png' }
];


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
      <GradientButton
       gradient={['#c31432','#240b36']} 
       style={startButton} 
       borderRadius={10} 
       borderWidth={3} 
       fontSize={24} 
       color={"#c31534"} >Start</GradientButton>
      <Generator style={generatorStyle} data={data}></Generator>
    </main>
  )
}

export default IndexPage
