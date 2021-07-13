import { createMuiTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
  },
  overrides: {
    MuiPaper: {
      root: {
        border: 'none',
      },
      elevation1: {
        boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.2)',
        border: '1px solid #e5e5e5',
        borderBottom: 'none',
        borderRadius: '2px',
      },
    },
    MuiAlert: {
      message: {},
      action: {
        marginRight: 'auto',
        marginLeft: '-8px',
        paddingRight: '16px',
      },
    },
  },
});

export default theme;
