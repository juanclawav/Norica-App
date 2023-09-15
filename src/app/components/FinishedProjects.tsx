

const projectData = [
    {
      title: 'Proyecto 1',
      description: 'Descripción del proyecto 1.',
    },
    {
      title: 'Proyecto 2',
      description: 'Descripción del proyecto 2.',
    },
    // Agrega más proyectos aquí
  ];
  
  const FinishedProjects = () => {
    return (
      <div>
        <h1>Proyectos terminados</h1>
        <ul>
          {projectData.map((project, index) => (
            <li key={index}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FinishedProjects;