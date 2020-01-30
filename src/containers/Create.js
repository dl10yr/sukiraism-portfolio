import React from 'react'
import CreateForm from '../components/CreateForm'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';
import Typography from '@material-ui/core/Typography';

import * as actions from '../actions';


const styles = theme => ({
  container: {
    margin: '10px'
  }
})

class Create extends React.Component {
  constructor(props) {
    super()
    this.state = {
      postSuccess: false,
    }
    this.submitPost = this.submitPost.bind(this);
  }

  submitPost() {
    const { CurrentUserReducer } = this.props;
    const { form } = this.props;

    var value_content = form.CreateForm.values.notes
    var send_content = value_content.replace(/\r?\n/g, "");

    const data = {
      content: send_content,
      user_id: CurrentUserReducer.items.id
    }
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid

    axios.post(process.env.REACT_APP_API_URL + '/api/v1/posts', data, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {

        this.props.actions.setNotification('success', '送信に成功しました');
        this.props.formreset();
      })
      .catch((error) => {
        var str = error.response.data.exception
        if (str.indexOf("RecordNotUnique") !== -1) {
          this.props.actions.setNotification('error', '投稿内容が既に存在しています。');
        } else {
          this.props.actions.setNotification('error', '送信に失敗しました');
        }
      })

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h5" color="textPrimary" style={{ fontWeight: 'bold' }}>
          テーマの投稿
        </Typography>
        <CreateForm onSubmit={this.submitPost} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
  form: state.form,
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    formreset: () => dispatch(reset('CreateForm')),
  };
}

export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Create)
);