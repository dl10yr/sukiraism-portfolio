import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  field: {
    width: '80%',
    height: '200px',
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
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="notes"
          component={renderTextField}
          className={classes.field}
          label=""
          multiline
          rowsMax="7"
          margin="normal"
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        //endIcon={<Icon>send</Icon>}
        >
          Send
      </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'CreateForm', // a unique identifier for this form
  validate,
})(CreateForm)