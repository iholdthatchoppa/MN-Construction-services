import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 2rem;
  text-align: center;
`;

const About = () => {
  return (
    <AboutContainer>
      <h1>About MN Construction Services</h1>
      <p>
        MN Construction Services is a premier luxury construction company, dedicated to bringing elegance and sophistication to every project. 
        With over 20 years of experience, we specialize in custom home builds, interior design, and renovations.
        Our commitment to quality craftsmanship and attention to detail sets us apart as a leader in luxury construction.
      </p>
    </AboutContainer>
  );
};

export default About;
