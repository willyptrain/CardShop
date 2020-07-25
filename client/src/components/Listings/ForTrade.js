import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Redirect from '../redirect.js';
import axios from 'axios';
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Login from '../login/login.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './all_listings.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from '@material-ui/core/CardHeader';


class ForTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport, 'favorite_trades':[]};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/all_listings/trades/${this.state['sport']}/${token}`)
        .then(res => {
            console.log(res.data.trades);
            this.setState({...this.state, 'trades':res.data.trades})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })

    }

    addToFavorites = (event) => {
        let id = event.currentTarget.value;
        console.log(id in this.state['favorite_trades'])
        let token = localStorage.access_token;
        axios.post(`/api/post_wanted/trades/${id}/${token}`)
        .then(res => {
            console.log(res.data);
            
            var curr_favs = this.state['favorite_trades']
            curr_favs.push(res.data[0]['item_id'])
            this.setState({...this.state, 'favorite_trades':curr_favs})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }


    render() {
        console.log(this.loggedIn)
        if('trades' in this.state) {
            return (<div className="home-container">
                              <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={0}>
                
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={6} sm={3} md={3} lg={3}>

                    <Card className="track-card">
                                <CardHeader 
                                    title={trade['player_name']}
                                    subheader={trade['username']}
                                  />
                                <CardMedia className="track-img" image="https://via.placeholder.com/150"></CardMedia>
                                <CardContent>
                                  <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton value={trade['id']} color={trade['id'] in this.state['favorite_trades'] ? "primary" : "default"} onClick={this.addToFavorites} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>   
                                </CardActions>
                            </Card>
                    </Grid>
                    
                    
                    )}
                    </Grid>
            </div>);
        }
        else {
            return (<div className="home-container">
                        <CircularProgress style={{position: 'absolute', top: '40vh'}} />

                

            </div>);
        }
       
    }

}
export default ForTrade;

