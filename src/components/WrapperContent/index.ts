import styled from 'styled-components';
import imagebg from '../../assets/image-bg.svg';


const WrapperContent = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${imagebg});
    background-size: cover;
    background-position: center;
`

export { WrapperContent };