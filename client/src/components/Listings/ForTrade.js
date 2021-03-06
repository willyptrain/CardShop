import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import TradingCard from './../Card/TradingCard.js';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));



  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);



export function SelectSport(data) {

    

    const classes = useStyles();
    const [sport, setSport] = React.useState(data.selectedSport);
    const [checked, setChecked] = React.useState(false);

    

    const handleChange = (event) => {
        console.log(event.target.value)
        setSport(event.target.value);
        data.changeSport(event.target.value)
      };

    const toggleCollapse = (event) => {
        setChecked(!checked);
    }


    return (<div>



        <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "all"} />}
            // disabled={sport != "all"}
            label="View All"
            value="all"
          />
        <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "baseball"} />}
            // disabled={sport != "baseball"}
            label="Baseball"
            value="baseball"
          />
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "basketball"} />}
            // disabled={sport != "basketball"}
            label="Basketball"
            value="basketball"
          />
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "football"} />}
            // disabled={sport != "football"}
            label="Football"
            value="football"
          />
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "hockey"} />}
            // disabled={sport != "hockey"}
            label="Hockey"
            value="hockey"
          />
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "wrestling"} />}
            // disabled={sport != "wrestling"}
            label="Wrestling"
            value="wrestling"
          />
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "soccer"} />}
            // disabled={sport != "soccer"}
            label="Soccer"
            value="soccer"
          />
                    <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "racing"} />}
            // disabled={sport != "racing"}
            label="Racing"
            value="racing"
          />
                    <FormControlLabel
            aria-label="Acknowledge"
            onClick={handleChange}
            onFocus={handleChange}
            control={<Radio checked={sport == "gaming"} />}
            // disabled={sport != "gaming"}
            label="Other/Gaming"
            value="gaming"
          />

        {/* </Collapse> */}




    </div>)
}











class ForTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {"sport": props.sport.sport, 'favorite_trades':[]};

    }

    async componentDidMount() {
        let token = localStorage.access_token;
        axios.get(`/api/all_listings/trades/${this.state['sport']}/${token}`)
        .then(res => {
            console.log(res.data);
            let trade_ids = [];
            for (let i=0; i< res.data.wantedCards.length; i++) {
                trade_ids.push(res.data.wantedCards[i]['id'])
            }
            this.setState({...this.state, 'trades':res.data.trades,
                                'favorite_trades': res.data.wantedCards, 'favorite_trade_ids':trade_ids})
                                
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })

    }



    changeSport = (sport) => {
        let token = localStorage.access_token;
        axios.get(`/api/all_listings/trades/${sport}/${token}`)
        .then(res => {
            console.log(res.data);
            // this.setState({...this.state, 'trades':res.data.trades,
            //                     'favorite_trades': res.data.wantedCards,
            //                 'selectedSport':sport})
            let trade_ids = [];
            for (let i=0; i< res.data.wantedCards.length; i++) {
                trade_ids.push(res.data.wantedCards[i]['id'])
            }
            this.setState({...this.state, 'selectedSport':sport, 'trades':res.data.trades, "favorite_trades":res.data.wantedCards, 'favorite_trade_ids':trade_ids})

        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }












    addToFavorites = (event) => {
        let id = event.currentTarget.value;
        let token = localStorage.access_token;
        axios.post(`/api/post_wanted/trades/${id}/${token}`)
        .then(res => {
            // this.setState({...this.state, 'favorite_trades':res.data[0]})
            // console.log(res.data[0]);
            // let trade_ids = [];
            // for (let i=0; i< res.data[0].length; i++) {
            //     trade_ids.push(res.data[0][i]['id'])
            // }
            this.setState({...this.state, "favorite_trade_ids":res.data[0]})
        })
        .catch(err =>  {
            console.log("error :(")
            console.log(err);
        })
    }

   searchChange = (event) => {
        if(event.currentTarget.value == "") {
            let token = localStorage.access_token;
            axios.get(`/api/all_listings/trades/${this.state['sport']}/${token}`)
            .then(res => {
                console.log(res.data);
                this.setState({...this.state, 'trades':res.data.trades,
                                    'favorite_trades': res.data.wantedCards})
            })
            .catch(err =>  {
                console.log("error :(")
                console.log(err);
            }) 
        } 
        else {
          let token = localStorage.access_token;
          axios.get(`/api/search/${event.currentTarget.value}/${token}`)
          .then(res => {
              this.setState({...this.state, 'trades':res.data.trades});
          })
          .catch(err =>  {
              console.log(err)
          })

        }
    }


    render() {
        
            return (<div className="home-container flex-container">


                <div className="filter-container">
                <Paper component="form" className="search-bar">
                    <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                          
                            <InputBase
                            placeholder="Search…"
                            classes="search-input"
                            onChange={this.searchChange}
                            inputProps={{ 'aria-label': 'search' }}
                          />

                </Paper>
                    <SelectSport selectedSport={this.state['sport']} changeSport={this.changeSport} />

                </div>
                {('trades' in this.state && this.state['trades']) &&
                <div className="right-side-listing">

                              <Grid container className="grid-container"
                  alignItems="center"
                  justify="center" spacing={5}>
                {
                    this.state['trades'].map((trade, index) => 
                    <Grid item xs={12} sm={4} md={4} lg={4}>

                    {/* <Card className="listing-card">
                                <CardActionArea href={`/for_trade/item/${trade['id']}`}>
                                    <CardHeader 
                                        title={trade['player_name']}
                                        subheader={trade['username']}
                                    />
                                    <CardMedia className="track-img" image={trade['img_paths'][0]}></CardMedia>
                                    <CardContent>
                                    
                                    <Typography variant="h6" color="textSecondary" component="p">
                                        {trade['year']+ " " + trade['manufacturer'] + " " + trade['cardSeries'] + " " + trade['player_name']}
                                    </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions disableSpacing>
                                    <IconButton value={trade['id']} color={this.state['favorite_trades'].includes(trade['id']) ? "primary" : "default"} onClick={this.addToFavorites} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>   
                                    
                                </CardActions>
                            </Card> */}
                        {/* <TradingCard url="for_trade/item" trade={trade} /> */}
                        <TradingCard  favorite={true} url="for_trade/item" favorite_trades={this.state['favorite_trade_ids']} favorite_func={this.addToFavorites} trade={trade} />

                    </Grid>
                    
                    
                    )}
                    </Grid>
                    </div>
            } {!('trades' in this.state && this.state['trades']) && 
            <div className="right-side-listing">
                <CircularProgress style={{position: 'absolute', top: '40vh'}} />
            </div>
            }
            </div>);

       
    }

}
export default ForTrade;

