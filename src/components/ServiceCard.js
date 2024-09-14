import styled from 'styled-components';

const Card = styled.div`
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  text-align: center;
`;

const ServiceCard = ({ title, description }) => (
  <Card>
    <h3>{title}</h3>
    <p>{description}</p>
  </Card>
);

export default ServiceCard;
