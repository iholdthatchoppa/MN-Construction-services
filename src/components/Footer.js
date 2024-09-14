import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #222;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 MN Construction Services. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
