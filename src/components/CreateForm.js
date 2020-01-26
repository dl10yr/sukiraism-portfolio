import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { SubmissionError } from 'redux-form';


const useStyles = makeStyles(theme => ({
  button: {
    padding: '0px',
    margin: '10px',
    padding: '10px',
    width: '50%',
    height: '20%',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 'x-large',
    color: 'whitesmoke',
    background: '#2dd57a',
    borderRadius: '5px',
    borderWidth: '0',

  },
  field: {
    width: '80%',
    height: '200px',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#2dd57a;',
      },
      '&.Mui-error fieldset': {
        borderColor: 'red',
      },
    },
  }
}));

const validate = values => {
  const errors = {}
  const requiredFields = [
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.notes &&
    values.notes.length > 51
  ) {
    errors.notes = '50字以内にしてください'
  }
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  rows = 3,
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      rows={rows}
      {...custom}
      variant="outlined"
    />
  )

const CreateForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} >
      <div>
        <Field
          name="notes"
          component={renderTextField}
          classes={{ root: classes.field, focused: classes.focused }}
          label=""
          multiline
          rowsMax="7"
          margin="normal"
        />
      </div>
      <div>
        <button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        //endIcon={<Icon>send</Icon>}
        >
          Send
      </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'CreateForm', // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
})(CreateForm)