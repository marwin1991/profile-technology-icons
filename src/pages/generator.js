import React, { Component } from "react";

import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { html } from "@codemirror/lang-html";

import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";

import { SortableList } from "../components/SortableList";

import { BlueCheckbox } from "../components/BlueCheckbox";
import { BlueHeart } from "../components/BlueHeart";

class Generator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checked: [],
      inputText: "",
      generatedText: "",
      copyButtonDisabled: true,
      includeCode: true,
      includeDiv: true,
      includeCenter: true,
      includeTable: false,
      iconSize: 50,
      copied: false,
    };
  }

  handleToggle = (tech) => () => {
    const currentIndex = this.state.data.indexOf(tech);
    let newData = [...this.state.data];
    newData[currentIndex].checked = !newData[currentIndex].checked;
    this.setState({ data: newData });
  };

  handleChose = (techs) => {
    let newData = [...this.state.data];

    for (let i = 0; i < newData.length; i++) {
      newData[i].checked = false;
    }

    for (let i = 0; i < techs.length; i++) {
      let tech = techs[i];
      const currentIndex = this.state.data.indexOf(tech);
      newData[currentIndex].checked = !newData[currentIndex].checked;
    }

    this.setState({ data: newData });
  };

  updateTechs = (updatedTechs) => {
    this.setState({ data: updatedTechs });
  };

  generate = () => {
    this.setState({ copyButtonDisabled: false });
    const { includeCenter, includeCode, includeDiv, includeTable, iconSize } =
      this.state;
    let selectedTech = this.state.data.filter((tech) => tech.checked);
    let text = "";

    //1. Generate Tech blocks
    selectedTech = selectedTech.map((tech) => {
      const techBlock = `<img width="${iconSize}" src="${tech.link}" alt="${tech.name}" title="${tech.name}"/>`;
      if (includeCode) return `<code>${techBlock}</code>`;
      return techBlock;
    });

    //2. if table create table
    if (includeTable) {
      //2.1 Create Rows
      const columns = selectedTech.length < 8 ? selectedTech.length : 8;
      let rows = "";

      selectedTech.forEach((tech, index) => {
        if (index % columns === 0) {
          rows += "<tr>\r\n";
        }

        rows += `\t<td>${tech}</td>\r\n`;

        if (index + 1 === selectedTech.length) {
          rows += "</tr>";
        } else if ((index + 1) % columns === 0) {
          rows += "</tr>\r\n";
        }
      });

      //2.2 prepend <table>\r\n, replace all \n with \n\t and append \r\n</table>
      text = `<table>\r\n${rows}`.replaceAll("\n", "\n\t");
      text += "\r\n</table>";
    } else {
      text = selectedTech.join("\r\n");
    }

    //3. if div preppend <div>\r\n, replace all \n with \n\t , append \r\n</div>
    if (includeDiv) {
      const div = `<div ${includeCenter ? 'align="center"' : ""}>`;
      text = `${div}\r\n${text}`.replaceAll("\n", "\n\t");
      text += "\r\n</div>";
    }

    this.setState({ generatedText: text });
  };

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/README.md"
    )
      .then((response) => response.text())
      .then((text) =>
        text
          .split("\n")
          .filter((t) => t.includes("<img"))
          .map((t) => {
            let tech = t.split("|");
            if (Array.isArray(tech) && tech.length >= 3) {
              return {
                name: tech[2].trim(),
                link: tech[3].replaceAll(" ", "").replaceAll("`", ""),
                checked: false,
              };
            } else {
              return undefined;
            }
          })
          .filter((t) => t !== undefined)
      )
      .then((techs) => {
        this.setState({ data: techs });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div style={this.props.style} id={"generator"}>
        <Typography
          ref={this.scrollToRef}
          variant="h6"
          gutterBottom
          style={{
            width: "60%",
            minWidth: 250,
            margin: "auto",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Box fontWeight={600}>
            <span role="img" aria-label="Magnifying Glass Tilted Right">
              🔎
            </span>{" "}
            Search your technologies and then generate markdown code snippet to
            your GitHub profile. Choose from {this.state.data.length} icons!{" "}
            <span role="img" aria-label="Input Numbers">
              🔢
            </span>
          </Box>
        </Typography>
        <div
          style={{
            width: "60%",
            minWidth: 350,
            margin: "auto",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Autocomplete
            multiple
            openOnFocus
            disablePortal
            disableCloseOnSelect
            options={data}
            getOptionLabel={(tech) => tech.name}
            onChange={(event, techs) => this.handleChose(techs)}
            inputValue={this.state.inputText}
            onInputChange={(event, value, reason) => {
              if (event && event.type === "blur") {
                this.setState({ inputText: "" });
              } else if (reason !== "reset") {
                this.setState({ inputText: value });
              }
            }}
            renderOption={(props, tech) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <BlueHeart
                  checked={data[data.indexOf(tech)].checked}
                  color="default"
                />
                <div style={{ width: 50, textAlign: "center" }}>
                  <img style={{ height: 25 }} alt={tech.name} src={tech.link} />
                </div>
                <span>{tech.name}</span>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Your technologies"
                placeholder="Search your technologies here"
              />
            )}
          />
        </div>

        <SortableList techs={data} update={this.updateTechs} />

        {this.state.data.some((x) => x.checked) && (
          <Box fontSize={12} fontStyle="italic" style={{ marginTop: 10 }}>
            Drag to change the order
          </Box>
        )}
        <FormGroup row style={{ width: 350, margin: "auto", marginTop: 30 }}>
          <TextField
            label="Icon size"
            type={"number"}
            style={{ marginRight: 10, width: 165 }}
            value={this.state.iconSize}
            onChange={(event) =>
              this.setState({ iconSize: event.target.value })
            }
            InputProps={{
              inputProps: {
                max: this.state.includeTable ? 50 : 1000,
                min: 10,
                // Max size set to 50px incase table is selected. Images tend to squish beyond that when used inside table.
              },
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />

          <FormGroup>
            <FormControlLabel
              style={{ marginLeft: 10, width: 149 }}
              control={
                <BlueCheckbox
                  checked={this.state.includeCode}
                  name="includeCodeCheckBox"
                  color="default"
                />
              }
              onChange={() =>
                this.setState({ includeCode: !this.state.includeCode })
              }
              label="Add <code>"
            />
            <FormControlLabel
              style={{ marginLeft: 10, width: 149 }}
              control={
                <BlueCheckbox
                  checked={this.state.includeDiv}
                  name="includeDivCheckBox"
                  color="default"
                />
              }
              onChange={() => {
                this.setState({ includeDiv: !this.state.includeDiv });
                if (this.state.includeDiv) {
                  this.setState({ includeCenter: false });
                }
              }}
              label="Add <div>"
            />
            <FormControlLabel
              style={{ marginLeft: 10, width: 149 }}
              control={
                <BlueCheckbox
                  checked={this.state.includeCenter}
                  name="includeCenterCheckBox"
                  color="default"
                />
              }
              onChange={() => {
                this.setState({ includeCenter: !this.state.includeCenter });
                if (!this.state.includeCenter) {
                  this.setState({ includeDiv: true });
                } // set includeDiv to true
              }}
              label="Center"
            />
            <FormControlLabel
              style={{ marginLeft: 10, width: 149 }}
              control={
                <BlueCheckbox
                  checked={this.state.includeTable}
                  name="includeTableCheckBox"
                  color="default"
                />
              }
              onChange={() => {
                this.setState({ includeTable: !this.state.includeTable });
                if (!this.state.includeTable && this.state.iconSize > 50) {
                  this.setState({ iconSize: 50 });
                  //Reset icon size to 50 incase it was more than 50px.
                }
              }}
              label="Table"
            />
          </FormGroup>
        </FormGroup>
        <FormGroup
          row
          style={{
            width: 320,
            margin: "auto",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <CopyToClipboard
            text={this.state.generatedText}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button
              disabled={this.state.copyButtonDisabled}
              style={{
                width: 150,
                marginRight: 10,
                boxShadow:
                  "6px 6px 12px 0 rgba(0, 0, 0, 0.2), -6px -6px 12px 0 rgba(255, 255, 255, 0.5)",
              }}
              onClick={this.copyToClipboard}
            >
              <Box fontWeight={600}>Copy</Box>
            </Button>
          </CopyToClipboard>
          <Button
            style={{
              width: 150,
              marginLeft: 10,
              boxShadow:
                "6px 6px 12px 0 rgba(0, 0, 0, 0.2), -6px -6px 12px 0 rgba(255, 255, 255, 0.5)",
            }}
            onClick={this.generate}
          >
            <Box fontWeight={600}>Generate</Box>
          </Button>
        </FormGroup>

        <div
          style={{
            textAlign: "left",
          }}
        >
          <CodeMirror
            value={this.state.generatedText}
            theme={darcula}
            extensions={[html()]}
            minHeight={"150px"}
          />
        </div>
      </div>
    );
  }
}

export default Generator;
