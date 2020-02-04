import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  button: {
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
    'email', 'password'
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
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

const LoginForm = props => {
  const { handleSubmit } = props
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} >
      <div>
        <Field
          name="email"
          component={renderTextField}
          classes={{ root: classes.field, focused: classes.focused }}
          label="email"
          margin="normal"
        />
      </div>
      <div>
        <Field
          name="password"
          component={renderTextField}
          classes={{ root: classes.field, focused: classes.focused }}
          label="password"
          type="password"
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
          Sign In
      </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
  initialValues: { email: 'test@test.com', password: '123456' }
})(LoginForm)