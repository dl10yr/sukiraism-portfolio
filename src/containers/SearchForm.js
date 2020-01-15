import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
// import asyncValidate from './asyncValidate'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
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

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}


const SearchForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="notes"
          component={renderTextField}
          label=""
          // multiline
          // rowsMax="1"
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
          検索する
      </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SearchForm', // a unique identifier for this form
  validate,
  // asyncValidate,
  destroyOnUnmount: false,
})(SearchForm)