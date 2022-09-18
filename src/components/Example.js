import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";
import {navigate} from 'gatsby';

const PREFIX = 'Example';

const classes = {
    root: `${PREFIX}-root`,
    media: `${PREFIX}-media`
};

const StyledCard = styled(Card)({
    [`&.${classes.root}`]: {
        maxWidth: 345,
    },
    [`& .${classes.media}`]: {
        height: 140,
    },
});

export default function Example(props) {


    function editPage() {
        navigate(props.url);
    }


    return (
        <StyledCard className={classes.root}
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
        </StyledCard>
    );
}