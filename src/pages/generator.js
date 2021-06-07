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
import {Box, Typography, Propper, InputAdornment, FormControlLabel, FormGroup} from "@material-ui/core";

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';


const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const defaultProps = {
    bgcolor: '#f1f3f6',
    style: {width: '60%', minHeight: 80},
    margin: "auto",
    boxShadow: "6px 6px 8px 0 rgba(0, 0, 0, 0.25), -4px -4px 6px 0 rgba(255, 255, 255, 0.3)"
};

const SortableItem = SortableElement(({tech}) => <img
    draggable={true}
    style={{
        height: 50,
        boxShadow: "6px 6px 8px 0 rgba(0, 0, 0, 0.25), -4px -4px 6px 0 rgba(255, 255, 255, 0.3)",
        borderRadius: 4,
        margin: 15
    }}
    alt={tech.name}
    src={tech.link}
/>);

const SortableList = SortableContainer(({data}) => {
    return (
        <div>
            {data && data.map((tech, index) => {
                if (data[data.indexOf(tech)].checked) {
                    return (
                        <SortableItem key={`item-${tech.name}`} index={index} tech={tech}/>
                    );
                } else {
                    return undefined;
                }
            })}
        </div>
    );
});


class Generator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            checked: [],
        };
    }

    handleToggle = (tech) => () => {
        console.log(tech);
        const currentIndex = this.state.data.indexOf(tech);
        let newData = [...this.state.data]
        newData[currentIndex].checked = !newData[currentIndex].checked;
        this.setState({data: newData})
    };

    handleChose = (techs) => {
        let newData = [...this.state.data]
        for (let i = 0; i < newData.length; i++) {
            newData[i].checked = false;
        }
        techs.map((tech) => {
            const currentIndex = this.state.data.indexOf(tech);
            newData[currentIndex].checked = !newData[currentIndex].checked;
        })
        this.setState({data: newData})
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({data}) => ({
            data: arrayMove(data, oldIndex, newIndex),
        }));
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
                <Typography variant="h4" gutterBottom>
                    <Box fontWeight={200}>
                        Your technologies
                    </Box>
                </Typography>
                <Box borderRadius={16} {...defaultProps} >
                    <SortableList data={data} onSortEnd={this.onSortEnd} axis={"xy"}/>
                </Box>
                {this.state.data.some(x => x.checked) &&
                <Box fontSize={12} fontStyle="italic" style={{marginTop: 10}}>
                    Drag to change the order
                </Box>
                }
                <div style={{width: "55%", minWidth: 250, margin: "auto", marginTop: 30, marginBottom: 30}}>
                    <Autocomplete
                        multiple
                        openOnFocus={true}
                        disablePortal={true}
                        disableCloseOnSelect={true}
                        options={this.state.data}
                        getOptionLabel={(tech) => tech.name}
                        onChange={(event, techs) => this.handleChose(techs)}
                        renderOption={(tech) => (
                            <React.Fragment>
                                <GreenCheckbox
                                    onChange={this.handleToggle(tech)}
                                    checked={this.state.data[this.state.data.indexOf(tech)].checked}
                                />
                                <div style={{width: 50, textAlign: 'center'}}>
                                    <img
                                        style={{height: 25}}
                                        alt={tech.name}
                                        src={tech.link}
                                    />
                                </div>
                                <span>{tech.name}</span>
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Your technologies"
                                       placeholder="Your technologies"/>
                        )}
                    />
                </div>

                <FormGroup style={{width: "15%", minWidth: 50, margin: "auto"}} >
                    <Typography variant="h6" gutterBottom>Options</Typography>

                    <TextField
                        label="Icon size"
                        type={'number'}
                        style={{marginTop: 5}}
                        defaultValue={50}
                        InputProps={{
                            inputProps: {
                                max: 1000, min: 1
                            },
                            endAdornment: <InputAdornment position="end">px</InputAdornment>,
                        }}
                    />

                    <FormControlLabel
                        style={{marginTop: 15}}
                        control={
                            <GreenCheckbox
                                checked={true}
                                name="includeCodeCheckBox"/>}
                        label="Include <code>"
                    />
                </FormGroup>
            </div>
        );
    }
}

export default Generator;