import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import "./tweet.css";
import Dropdown from './Menu.js'
import LikeIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

export default function Tweet({data}) {
    const classes = useStyles();
    return (
        <div id="container_tweet">
            <div id = "tweet_header">
                <img className= "tweet_header" id= "tweet_author_picture" src = {"https://cdn001.tintin.com/public/tintin/img/static/essentials/tintin-milou.png"}></img>
                <div className="text">
                    <b style={{ fontSize: "12px"}}  id="author_username"> Arnaud Mutabazi</b>
                    <div style={{fontSize: "12px"}}  id="date"> {"02-8-1992"}</div>
                </div>   

            </div>
                <div id = "menu">
                    <Dropdown/>
                </div>    
            <Divider variant="middle"/>
            <p style={{textAlign: "center"}}> {data.content}</p>
            <Divider  variant="middle"/>
            
            <div className="likes" style={{fontSize: "12px"}} id="tweets_like">10</div>
            <div className="likes">
                <IconButton aria-label="delete" className={classes.margin}>
                    <LikeIcon color = "red"/>
                </IconButton>
            </div>
                
            
            
        </div>
    );

}