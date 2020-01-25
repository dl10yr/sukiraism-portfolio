import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({  // #1
  palette: {
    type: 'dark',
    secondary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#000000',
    },

  },
})