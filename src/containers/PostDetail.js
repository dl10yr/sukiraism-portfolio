import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import { TwitterShareButton, TwitterIcon } from 'react-share'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import PieChart from '../components/SimplePieChart';
import axios from 'axios';

// スタイル
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    margin: theme.spacing(1),
    fontweight: "fontWeightBold",
  },
  row: {
    margin: 10,
  },
  content: {
    wordWrap: 'break-word'
  },
  twitterbutton: {
    margin: '20px'
  },
  deletebutton: {
    float: 'right',
    margin: '20px',
    marginTop: '30px'
  }
});

class PostsDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_answer_suki: []
    };
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    axios.get(process.env.REACT_APP_API_URL + `/api/v1/posts/${this.props.match.params.id}`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        const postdata = response.data.data;
        this.setState({
          suki_percent: postdata.post.suki_percent,
          kirai_percent: 100 - postdata.post.suki_percent,
          suki_count: postdata.post.suki_count,
          kirai_count: postdata.post.kirai_count,
          content: postdata.post.content,
          created_at: postdata.post.created_at,
          all_count: postdata.post.all_count,
          username: postdata.user.name,
        });
      })
      .catch(() => {
        this.props.history.push('/home')
      });

    axios.get(process.env.REACT_APP_API_URL + `/api/v1/likes/post/${this.props.match.params.id}/user/${uid}`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        const answereddata = response.data.data;
        this.setState({
          user_answer_suki: answereddata.suki,
          user_answer_updatedat: answereddata.updated_at,
        })
      })

    this.ChangeLike = this.ChangeLike.bind(this);
    this.DeletePost = this.DeletePost.bind(this);
    this.submitLike = this.submitLike.bind(this);

  }

  renderGraphWithCondition(all_count) {
    const { classes } = this.props;
    if (all_count !== 0) {
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h1" className={classes.content}>
            {this.state.content}
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold' }}>
            posted by {this.state.username}
          </Typography>
          <PieChart suki_percent={this.state.suki_percent} kirai_percent={this.state.kirai_percent} />
          <Typography component="p" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            スキ: {this.state.suki_percent}% ({this.state.suki_count}票)
            </Typography>
          <Typography component="p" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            キライ: {this.state.kirai_percent}% ({this.state.kirai_count}票)
            </Typography>
          <Typography component="p" style={{ fontWeight: 'bold' }}>
            投票数: {this.state.all_count}票
            </Typography>
        </Paper>
      )
    } else {
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h1" className={classes.content}>
            {this.state.content}
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold' }}>
            created by {this.state.username}
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold' }}>
            まだ誰も投票してません。
          </Typography>
          <Typography component="p" style={{ fontWeight: 'bold' }}>
            投票数: {this.state.all_count}票
            </Typography>
        </Paper>
      )
    }
  }

  renderButtonWithCondition(user_answer_suki) {
    const { classes } = this.props;
    if (user_answer_suki === 3) {
      return (
        <Paper className={classes.root}>
          <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={() => this.submitLike(1)}>
            スキ
          </Button>
          <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => this.submitLike(0)}>
            キライ
          </Button>
        </Paper>
      )
    } else if (user_answer_suki === 2) {
      return (
        <Paper className={classes.root}>
          <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={() => this.ChangeLike(1)}>
            スキ
          </Button>
          <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => this.ChangeLike(0)}>
            キライ
          </Button>
        </Paper >
      )
    } else if (user_answer_suki === 1) {
      return (
        <Paper className={classes.root}>
          スキで回答済み。
            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => this.ChangeLike(0)}>
            キライに変更する
            </Button>
        </Paper>
      )
    } else if (user_answer_suki === 0) {
      return (
        <Paper className={classes.root}>
          キライで回答済み。
            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => this.ChangeLike(1)}>
            スキに変更する
            </Button>
        </Paper>

      )
    }
  }

  renderDeleteButton() {
    const { CurrentUserReducer } = this.props;
    const { classes } = this.props;
    if (CurrentUserReducer.items.name === this.state.username) {
      return (
        <Button variant="contained" size="large" color="primary" className={classes.deletebutton} onClick={this.DeletePost}>
          このテーマを削除する
        </Button>
      )
    } else {
    }
  }

  ChangeLike(suki) {
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    axios.put(process.env.REACT_APP_API_URL + `/api/v1/likes/post/${this.props.match.params.id}`,
      {
        'suki': suki
      },
      {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
      .then((response) => {
        const postdata = response.data.data;
        this.setState({
          suki_percent: postdata.post.suki_percent,
          kirai_percent: 100 - postdata.post.suki_percent,
          suki_count: postdata.post.suki_count,
          kirai_count: postdata.post.kirai_count,
          content: postdata.post.content,
          created_at: postdata.post.created_at,
          all_count: postdata.post.all_count,
          username: postdata.user.name
        });
        const answereddata = response.data.data.like;
        this.setState({
          user_answer_suki: answereddata.suki,
          user_answer_updatedat: answereddata.updated_at,
        })
      })
  }

  DeletePost() {
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    axios.delete(process.env.REACT_APP_API_URL + `/api/v1/posts/${this.props.match.params.id}`,
      {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
    window.history.back(-2)
  }

  submitLike(suki) {
    const { CurrentUserReducer } = this.props;
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    const data = {
      user_id: CurrentUserReducer.items.id,
      post_id: this.props.match.params.id,
      suki: suki,
    }
    axios.post(process.env.REACT_APP_API_URL + '/api/v1/likes', data, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        const postdata = response.data.data;
        this.setState({
          suki_percent: postdata.post.suki_percent,
          kirai_percent: 100 - postdata.post.suki_percent,
          suki_count: postdata.post.suki_count,
          kirai_count: postdata.post.kirai_count,
          content: postdata.post.content,
          created_at: postdata.post.created_at,
          all_count: postdata.post.all_count,
          username: postdata.user.name
        });
        const answereddata = response.data.data.like;
        this.setState({
          user_answer_suki: answereddata.suki,
          user_answer_updatedat: answereddata.updated_at,
        })
      })
  }

  render() {

    const { classes } = this.props;
    return (
      <Scrollbars>
        <div className={classes.textLeft}>

          {this.renderGraphWithCondition(this.state.all_count)}
          {this.renderButtonWithCondition(this.state.user_answer_suki)}

          <TwitterShareButton title={this.state.content} url="http://www.sukiraism.com" via="sukiraism_O" target="_blank" className={classes.twitterbutton}>
            <TwitterIcon size="50" round />
          </TwitterShareButton>
          {this.renderDeleteButton()}
        </div>
      </Scrollbars >

    );

  }
}

PostsDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapState = (state, ownprops) => ({
  CurrentUserReducer: state.CurrentUserReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(PostsDetail)
);