import styled from 'styled-components';

const GalleryContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2rem;
`;

const ProjectImage = styled.img`
  width: 30%;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProjectGallery = () => {
  return (
    <GalleryContainer>
      <ProjectImage src="/assets/project1.jpg" alt="Project 1" />
      <ProjectImage src="/assets/project2.jpg" alt="Project 2" />
      <ProjectImage src="/assets/project3.jpg" alt="Project 3" />
    </GalleryContainer>
  );
};

export default ProjectGallery;
