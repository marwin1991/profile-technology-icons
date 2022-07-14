import React from "react"
import styled from "styled-components"

const Wrapper = styled.button`
  /* Remove standard style */
  padding: 0;
  border: none;
  background: none;
  // margin: 20px;
  /* fixed properties */
  text-transform: uppercase;
  cursor: pointer;
  border-radius: ${props => `${props.borderRadius}px`};
  font-weight: 600;
  font-size: ${props => `${props.fontSize}px`};
  padding: ${props => {
    const paddingSize = props.fontSize * 1
    return `${props.fontSize}px ${paddingSize}px`
  }};
  font-family: ${props => props.fontFamily};
  background-size: 200% 100%;
  background: ${props => {
    if (props.gradientColor.left && props.gradientColor.mid && props.gradientColor.right) {
      const {left, mid, right} = props.gradientColor
      return `linear-gradient(to right,hsla(${left},100%,45%,1) 0%,hsla(${mid},100%,45%,1) 52%,hsla(${right},100%,45%,1) 100%)`
    } else {
      const {left} = props.gradientColor
      return `linear-gradient(to right,hsla(${left},100%,45%,1) 0%,hsla(${left + 40},100%,45%,1) 52%,hsla(${left + 80},100%,45%,1) 100%)`
    }
  }};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  transition: all 0.4s ease 0s, box-shadow 0.1s ease 0s;
  box-shadow: ${props => `0px 5px 10px hsla(${props.gradientColor.left}, 100%, 50%, 0.5)`};

  &:hover {
    background-position: 100% 0%;
    box-shadow: ${props => `0px 5px 10px hsla(${props.gradientColor.right ? props.gradientColor.right : props.gradientColor.left + 60}, 100%, 50%, 0.5)`};
  }

  &:focus {
    outline: none;
  }
`

const NormalButton = (props) => {
    return (
        <Wrapper
            style={props.style}
            fontSize={props.fontSize}
            fontFamily={props.fontFamily}
            borderRadius={props.borderRadius}
            gradientColor={props.gradientColor}
        >
            {props.text}
        </Wrapper>
    )
}

NormalButton.defaultProps = {
    fontSize: 20,
    fontFamily: "Arial",
    borderRadius: 50,
    gradientColor: {
        left: 0
    },
    text: "Dummy"
}

export default NormalButton