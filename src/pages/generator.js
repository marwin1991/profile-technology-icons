import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';


const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


class Generator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            checked: [],
        };
    }

    handleToggle = (tech) => () => {
        const currentIndex = this.state.data.indexOf(tech);
        let newData = [...this.state.data]
        newData[currentIndex].checked = !newData[currentIndex].checked;
        this.setState({data: newData})
    };

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/README.md')
            .then(response => response.text())
            .then(text => text.split("\n")
                .filter(t => t.startsWith("<img"))
                .map(t => {
                    let tech = t.split("|")
                        .map(a => a.replaceAll(" ", "").replaceAll("`", ""))
                    if (Array.isArray(tech) && tech.length === 3) {
                        return (
                            {"name": tech[1], "link": tech[2], "checked": false}
                        )
                    } else {
                        return undefined;
                    }
                })
                .filter(t => t !== undefined))
            .then(techs => {
                this.setState({data: techs});
            })
    }

    render() {
        const {data} = this.state;
        return (
            <div style={this.props.style}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    style={{width: "55%", minWidth: 250, margin: "auto"}}
                    options={data.map(tech => tech.name)}
                    renderOption={(tech) => (
                        <React.Fragment>
                            <span>{tech}</span>
                            <GreenCheckbox
                                edge="end"
                            />
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            margin="normal"
                            variant="outlined"
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />

                <List dense style={{width: "55%", minWidth: 250, margin: "auto"}}>
                    {data.map((tech) => {
                        const labelId = `checkbox-list-secondary-label-${tech.name}`;
                        return (
                            <ListItem key={tech.name} onClick={this.handleToggle(tech)} button>
                                <div style={{width: 100, textAlign: 'center'}}>
                                    <img
                                        style={{height: 50}}
                                        alt={tech.name}
                                        src={tech.link}
                                    />
                                </div>
                                <ListItemText id={labelId} primary={tech.name}/>
                                <ListItemSecondaryAction>
                                    <GreenCheckbox
                                        edge="end"
                                        onChange={this.handleToggle(tech)}
                                        checked={this.state.data[this.state.data.indexOf(tech)].checked}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default Generator;