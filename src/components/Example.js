import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box} from "@material-ui/core";
import {navigate} from 'gatsby';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function Example(props) {
    const classes = useStyles();

    function editPage() {
        navigate(props.url);
    }


    return (
        <Card className={classes.root}
              style={{
                  boxShadow: "6px 6px 8px 0 rgba(0, 0, 0, 0.25), -4px -4px 6px 0 rgba(255, 255, 255, 0.3)",
                  marginLeft: 15,
                  marginRight: 15
              }}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.src}
                    style={{marginLeft: 10, marginRight: 10}}
                    title="Example image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Java Software Engineer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box justifyContent="flex-end" width={"100%"}>
                    <Button size="small" color="primary" onClick={editPage}>
                        <Box fontWeight={600}>
                            Visit
                        </Box>
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}