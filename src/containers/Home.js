import React from 'react';
import PropTypes from 'prop-types';
import './HomeStyles.css'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import queryString from 'query-string';
import _ from 'lodash';
import axios from 'axios';

import Cards, { Card } from 'react-swipe-card-chsstm';

import "normalize.css";
//import "./styles.css";

const styles = theme => ({

  // ヘッダーロゴ
  homeimg: {
    height: '20%',
    width: '60%',
    display: 'block',
    margin: 'auto',
  },
  conceptimg: {
    display: 'flex',
    width: '80%',
    display: 'block',
    margin: '10px auto',
  },
  button: {
    margin: '0px 5px',
  },
  sukibutton: {
    margin: '0px 15px',
    backgroudColor: '#000000',
  },
  kiraibutton: {
    margin: '0px 15px',
    backgroudColor: '#ffffff'
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      not_answered_posts: []
    }
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    //新着順
    axios.get(process.env.REACT_APP_API_URL + `/api/v1/not_answered_posts`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        const data = response.data.data;
        this.setState({
          not_answered_posts: data.posts,
        });
      })
      .catch(() => {

      });
    this.reload = this.reload.bind(this);
  }

  reset = () => {
    this.setState(state => ({
      id: state.id + 1
    }));
  };


  componentDidMount() {
  }


  submitSuki(post) {
    const { CurrentUserReducer } = this.props
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid

    const data = {
      user_id: CurrentUserReducer.items.id,
      post_id: post.id,
      suki: 1,
    }
    axios.post(process.env.REACT_APP_API_URL + '/api/v1/likes', data, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then(response => { })
      .catch(error => { })
  }

  submitKirai(post) {
    const { CurrentUserReducer } = this.props
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid

    const data = {
      user_id: CurrentUserReducer.items.id,
      post_id: post.id,
      suki: 0,
    }
    axios.post(process.env.REACT_APP_API_URL + '/api/v1/likes', data, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then(response => { })
      .catch(error => { })
  }

  reload() {
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    //新着順
    axios.get(process.env.REACT_APP_API_URL + `/api/v1/not_answered_posts`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        const data = response.data.data;
        var not_answered_posts = this.state.not_answered_posts
        data.posts.forEach(post => {
          not_answered_posts.push(post);
        });
        this.setState({
          not_answered_posts: not_answered_posts,
        });


      })
      .catch(() => {

      });
  }

  render() {
    const { CurrentUserReducer } = this.props;
    const { classes } = this.props;
    let cards;

    return (
      <div className="home">
        <div className="background">
          <Button size="large" variant="contained" color="blue" onClick={this.reload} className={classes.sukibutton}>
            再読み込み
            </Button>
        </div>
        <Cards
          onEnd={this.endSwipe}
          className="master-root"
          likeOverlay={<h1>スキ</h1>}
          dislikeOverlay={<h1>キライ</h1>}

          ref={(ref) => cards = ref}
        >
          {this.state.not_answered_posts.map(item =>
            <Card
              onSwipeLeft={() => this.submitKirai(item)}
              onSwipeRight={() => this.submitSuki(item)}>

              <h2>{item.content}</h2>
            </Card>
          )}

        </Cards>
        <div className="buttonArea">
          <Button size="large" variant="contained" color="blue" onClick={() => { cards.dislike(); }} className={classes.sukibutton}>
            キライ
          </Button>
          <Button size="large" variant="contained" color="red" onClick={() => { cards.like(); }} className={classes.kiraibutton}>
            スキ
        </Button>
        </div>

      </div >
    )
  }
}

// Material-ui関連
Home.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

// Redux関連
const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Home)
);
