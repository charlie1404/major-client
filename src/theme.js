import { createMuiTheme } from '@material-ui/core/styles';


export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    secondary: {
      main: '#e89eef',
      // light: palette.primary[300],
      // dark: palette.primary[700],
      // contrastText: getContrastText(palette.primary[500]),
    },
    primary: {
      main: '#336b87',
      // light: palette.secondary.A200,
      // dark: palette.secondary.A700,
      // contrastText: getContrastText(palette.secondary.A400),
    },
    error: {
      main: '#ff0000',
      // light: palette.error[300],
      // dark: palette.error[700],
      // contrastText: getContrastText(palette.error[500]),
    },
  },
});
