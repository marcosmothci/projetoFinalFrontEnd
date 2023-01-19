import { createGlobalStyle } from 'styled-components';
import imagebg from '../assets/image-bg.svg';


const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: 'Roboto', sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-image: url(${imagebg});
        background-size: cover;
        background-position: center;
        color: #ecebfd;
    }

h1 {
    margin-top: 1vh;
    margin-left: 2vw;
}
`

export { GlobalStyle }