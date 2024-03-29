import styled from 'styled-components';

const MissingPageStyled = styled.div`
  body {
    background-color: #4e73df;
  }

  .mainbox {
    background-color: #4e73df;
    margin: auto;
    height: 100vh;
    width: 100%;
    position: relative;
  }

  .err {
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position: absolute;
    left: 25%;
    top: 8%;
  }

  .far {
    color: #ffffff;
    position: absolute;
    font-size: 8.5rem;
    left: 50%;
    top: 15%;
  }

  .err2 {
    color: #ffffff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position: absolute;
    left: 75%;
    top: 8%;
  }

  .msg {
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    position: absolute;
    left: 16%;
    top: 45%;
    width: 75%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default MissingPageStyled;
