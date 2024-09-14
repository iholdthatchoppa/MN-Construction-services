import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ProjectGallery from '../components/ProjectGallery';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Our Services</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ServiceCard title="Luxury Interior Design" description="Premium interior designs for high-end properties." />
          <ServiceCard title="Custom Home Builds" description="Tailored construction solutions for your dream home." />
          <ServiceCard title="Renovations" description="Revamping spaces with elegance and sophistication." />
        </div>
      </section>
      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Featured Projects</h2>
        <ProjectGallery />
      </section>
    </div>
  );
};

export default Home;
