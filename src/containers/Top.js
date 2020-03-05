import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PersonIcon from '@material-ui/icons/Person';
import MainIcon from '../images/MainIcon.png';

import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './term-style.css'


const styles = theme => ({
  // root: {
  //   ...theme.mixins.gutters(),
  //   paddingTop: theme.spacing.unit * 2,
  //   paddingBottom: theme.spacing.unit * 2,
  //   margin: 10,
  // },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  h3: {
    marginBottom: 5,
    color: theme.palette.text.primary,
    margin: '20px'

  },
  h4: {
    color: theme.palette.text.primary,
    margin: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  p: {
    color: theme.palette.text.secondary,
    textAlign: 'left',
    fontWeight: 'bold',
    margin: '10px',

  },
  container: {
    margin: '20px',
    height: '100%'
  },
  topsen: {
    margin: 30,
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  root: {
    width: '100px',
    height: '100px',
    color: '#2dd57a',
  },
  loginbtn: {
    margin: '10px',
    padding: '10px',
    width: '250px',
    height: '50px',
    borderRadius: '5px',
    textAlign: 'center',
    textDecoration: 'none',
    borderWidth: '0',
    fontWeight: 'bold',
    fontSize: 'large',
    color: 'rgb(255, 255, 255)',
    background: '#00acee',
  },
  tabs: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: theme.palette.text.primary
  },

  tab: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    '&$selected': {
      color: '#2dd57a;',
    },
    '&:hover': {
      color: '#2dd57a;',
      opacity: 1,
    }
  },
  selected: {},
});


class Top extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "signIn"
    };


    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.loginMail = this.loginMail.bind(this);
    this.signUpMail = this.signUpMail.bind(this);


  }


  componentDidMount() {
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    axios.get(process.env.REACT_APP_API_URL + '/api/v1/user/currentuser', {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        this.props.actions.setCurrentUserSuccess(response.data.data)
        window.location.href = process.env.REACT_APP_BASE_URL + "/home"
        // this.props.router.push('/home')
      })
      .catch(() => {
      });
  }
  loginTwitter() {
    window.location.href = process.env.REACT_APP_API127_URL + '/api/v1/auth/twitter?auth_origin_url=' + process.env.REACT_APP_BASE_URL + '/home';
  }



  handleChange(e, newvalue) {
    if (newvalue === "signIn") {
      this.setState({
        selected: 'signIn'
      })
    } else if (newvalue === "signUp") {
      this.setState({
        selected: 'signUp'
      })
    }
  }

  loginMail() {
    const { form } = this.props;

    var email = form.LoginForm.values.email
    var password = form.LoginForm.values.password

    const data = {
      email: email,
      password: password,
    }

    axios.post(process.env.REACT_APP_API_URL + '/api/v1/auth/sign_in', data, {
    })
      .then((response) => {

        this.props.actions.setNotification('success', 'ログインに成功しました');
        localStorage.setItem('auth_token', response.headers['access-token'])
        localStorage.setItem('client_id', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])
        this.props.actions.setCurrentUserSuccess(response.data.data)
        window.location.href = process.env.REACT_APP_BASE_URL + "/home"



      })
      .catch((error) => {
        this.props.actions.setNotification('error', 'ログインに失敗しました。');

      })

  }

  signUpMail() {
    const { form } = this.props;

    var email = form.SignUpForm.values.email
    var nickname = form.SignUpForm.values.nickname

    var password = form.SignUpForm.values.password
    var passwordConfirmation = form.SignUpForm.values.passwordConfirmation

    const data = {
      nickname: nickname,
      name: nickname,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }

    axios.post(process.env.REACT_APP_API_URL + '/api/v1/auth', data, {
    })
      .then((response) => {
        this.props.actions.setNotification('success', 'ログインに成功しました');
        localStorage.setItem('auth_token', response.headers['access-token'])
        localStorage.setItem('client_id', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])
        this.props.actions.setCurrentUserSuccess(response.data.data)
        window.location.href = process.env.REACT_APP_BASE_URL + "/home"


      })
      .catch((error) => {
        this.props.actions.setNotification('error', 'ログインに失敗しました。');

      })

  }

  renderForm() {
    const { classes } = this.props;

    if (this.state.selected === "signIn") {
      return (
        <LoginForm onSubmit={this.loginMail} />

      )
    } else if (this.state.selected === "signUp") {
      return (
        <SignUpForm onSubmit={this.signUpMail} />
      )
    }
  }

  render() {

    const { classes } = this.props;


    return (
      <Scrollbars>
        <div className={classes.container}>
          {/* <button size="large" variant="contained" color="blue" onClick={this.loginTwitter} className={classes.loginbtn}>
            Twitterでログインする
          </button> */}
          <Typography component="p" className={classes.p}>
            このページは「スキライズム」のポートフォリオ版です。本番環境(https://sukiraism.com)ではTwitterログインを採用しています。テストログイン用に以下のアカウントお使いください。
          </Typography>
          <Typography component="p" className={classes.p}>
            email: test@test.com
          </Typography>
          <Typography component="p" className={classes.p}>
            password: 123456
          </Typography>
          <div>

            <Tabs
              classes={{
                root: classes.tabs,
                indicator: classes.indicator,
              }}
              value={this.state.selected} variant="fullWidth" onChange={this.handleChange} aria-label="simple tabs example">
              <Tab
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                }} selected
                label="sign in" value="signIn" />
              <Tab
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                }} selected
                label="sign up" value="signUp" />
            </Tabs>
          </div>

          {this.renderForm()}

          <Typography variant="h4" className={classes.h4}>
            好き嫌いの情報<br />を可視化する
          </Typography>

          <img src={MainIcon} width="100px" alt="main_icon" className={classes.root} />

          <Typography component="p" className={classes.p}>
            いきなり個人的な話ですが、日本社会に対するネガティブなイメージが年々大きくなっています。
          </Typography>
          <Typography component="p" className={classes.p}>
            「〜するべきだ」「〜しなくてはいけない」のような同調圧力が大きく、また、その理由を論理的に明確に説明できる人が少ないからです。
          </Typography>
          <Typography component="p" className={classes.p}>
            「みんながやっているから」「それが世間だ」...そんな曖昧な理由で、他人の意思・時間を奪っていく人がたくさんいます。
          </Typography>
          <Typography component="p" className={classes.p}>
            その「〜するべきだ」といった「正しさ」も、その人の「好き嫌い」にしか過ぎず、「好き嫌い」を「正しい正しくない」にすり替えて押し付けているようにも感じます。
          </Typography>
          <Typography component="p" className={classes.p}>
            つまり、「好き嫌い」の情報こそが、人間の行動を決定する上で一番重要な情報であり、その情報を可視化できるサービスが求められていると確信しています。
          </Typography>
          <Typography variant="h4" className={classes.h4}>
            嫌なことを<br />しない
          </Typography>
          <DirectionsRunIcon className={classes.root} />

          <Typography component="p" className={classes.p}>
            終身雇用、年功序列の崩壊が始まった今、嫌なことをやって一つの会社に居続ける意味が薄れています。
          </Typography>
          <Typography component="p" className={classes.p}>
            生きている時間は有限です。自分の好き嫌いに正直になり、好きなことに没頭しませんか？
            個人が何かに没頭することは、社会全体に対しても新しい価値をもたらし、ポジティブに作用すると確信しています。
          </Typography>

          <Typography variant="h4" className={classes.h4}>
            自分の<br />好き嫌いを知る
          </Typography>
          <PersonIcon className={classes.root} />


          <Typography component="p" className={classes.p}>
            嫌なことをしないで生きることは、自分の好き嫌いを明確に意識していくことから始まります。

          </Typography>

          <Typography component="p" className={classes.p}>
            スキライズムでは、投稿されたテーマに対して、簡単に「スキ」「キライ」を投票でき、そのすべての履歴を確認することができます。
            また、その情報を非公開にすることもできます。
          </Typography>


          <Typography variant="h4" className={classes.h4}>
            みんなの<br />好き嫌いを知る
          </Typography>

          <PeopleIcon className={classes.root} />

          <Typography component="p" className={classes.p}>
            嫌なことをしないで生きることは、他人に対して「自分の嫌い」を押し付けることではありません。「他人の嫌い」も尊重していく必要があります。
          </Typography>

          <Typography component="p" className={classes.p}>
            自分が「好き」と思っていても、他人は「大嫌い」かもしれません。スキライズムは、みんなの好き嫌いを知る機会を提供します。
          </Typography>


          <Typography variant="h4" className={classes.h4}>

            さあ、<br />始めよう。
          </Typography>
          {/* <button size="large" variant="contained" color="blue" onClick={this.loginTwitter} className={classes.loginbtn}>
            Twitterでログインする
          </button> */}

        </div>

      </Scrollbars >



    )
  }
}

Top.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
  form: state.form,

});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Top)
);