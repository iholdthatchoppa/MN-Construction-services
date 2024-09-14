import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Merriweather', serif;  /* Example: A luxurious font choice */
    background-color: #f0f0f0;
    color: #333;
  }

  h1, h2, h3 {
    color: #222;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
