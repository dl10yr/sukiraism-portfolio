import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #2dd57a 30%, #2dd57a 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px #209e5b ',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function ClassesShorthand() {
  return <StyledButton>classes shorthand</StyledButton>;
}
