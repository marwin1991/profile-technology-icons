import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  

export default function Generator(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
      
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return (
      <div style={props.style}>
     <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        style={{width: "55%", margin: "auto"}}
        options={this.props.data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />

        <List dense style={{width: "55%", margin: "auto"}}>
      {this.props.data.map((tech) => {
          console.log(tech)
        const labelId = `checkbox-list-secondary-label-${tech.name}`;
        return (
          <ListItem key={tech.name} button>
            <div style={{width: 200, textAlign: 'center' }} >
              <img
                style={{height: 50}}
                alt={tech.name}
                src={tech.link}
              />
            </div>
            <ListItemText id={labelId} primary={tech.name} />
              <GreenCheckbox
                edge="end"
                onChange={handleToggle(1)}
              />
          </ListItem>
        );
      })}
    </List>
      </div>
    );
  }
