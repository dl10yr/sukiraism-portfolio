import React from 'react'
import CreateForm from '../components/CreateForm'
import axios from 'axios'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

class Create extends React.Component {
  constructor(props) {
    super()
    this.state = {
      postSuccess: false,
    }
  }
  submit = values => {
    const data = {
      content: values.notes,
      user_id: 1
    }
    axios.post(process.env.REACT_APP_API_URL + '/api/v1/posts', data)
  }

  submitPost = values => {
    const { CurrentUserReducer } = this.props;
    var value_content = values.notes
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
      .then(() => {
      })
      .catch(() => {
        values.notes = value_content
      })
    values.notes = ""

  }

  render() {
    const { actions } = this.props;
    const { CurrentUserReducer } = this.props;

    const { classes } = this.props;
    return (
      <div>
        <h3>テーマを投稿する</h3>
        <CreateForm onSubmit={this.submitPost} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(Create);