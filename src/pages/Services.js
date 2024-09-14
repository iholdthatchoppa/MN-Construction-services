import ServiceCard from '../components/ServiceCard';

const Services = () => {
  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Our Services</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ServiceCard title="Luxury Interior Design" description="Transform your living space with timeless elegance." />
        <ServiceCard title="Custom Home Builds" description="Bespoke home construction tailored to your needs." />
        <ServiceCard title="Renovations" description="Upgrade your property with luxury craftsmanship." />
        <ServiceCard title="Commercial Projects" description="Expert solutions for large-scale commercial developments." />
      </div>
    </section>
  );
};

export default Services;
