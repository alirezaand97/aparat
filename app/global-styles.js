import { createGlobalStyle } from 'styled-components';
import BgImage from './images/bg.jpg';
const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
  font-size: 14px;
  color:#484b62;
 font-weight: 300;

}

body{
    font-family: IRANSans, "Roboto", "Helvetica", "Arial", sans-serif !important;
}

body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
}

#app {
  background-color: #FBFBFC;
  background-size:cover;
  min-height: 100%;
  min-width: 100%;
  color:#484b62;
}

p,
label
 {
    font-family: IRANSans, "Roboto", "Helvetica", "Arial", sans-serif !important;
  line-height: 1.5em;
  color:#484b62;
}
`;

export default GlobalStyle;
