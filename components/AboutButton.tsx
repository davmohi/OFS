import React, { useState, useEffect } from 'react';

interface TeamMember {
  id: number;
  name: string;
  cedula: string;
}

interface TeamInfo {
  members: TeamMember[];
  course: string;
  project: string;
  semester: string;
  year: string;
  school: string;
  university: string;
}

const AboutButton: React.FC = () => {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);

  const fetchAboutInfo = async () => {
    try {
      const response = await fetch('api/about');
      response.ok && setTeamInfo(await response.json());
      response.ok && setShowAbout(true);
    } catch (error) {
      console.error("Error al obtener la información", error);
    }
  };

  const handleAboutClick = async () => {
    await fetchAboutInfo();
  };

  const closeModal = () => setShowAbout(false);

  const renderAboutModal = () => (
    showAbout && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Información del Equipo</h2>
          <h3>Integrantes:</h3>
          <ul>
            {teamInfo?.members.map((member: TeamMember) => (
              <li key={member.id}>{member.name} - {member.cedula}</li>
            ))}
          </ul>
          <p>Curso: {teamInfo?.course}</p>
          <p>Proyecto: {teamInfo?.project}</p>
          <p>Semestre: {teamInfo?.semester}</p>
          <p>Año: {teamInfo?.year}</p>
          <p>Escuela: {teamInfo?.school}</p>
          <p>Universidad: {teamInfo?.university}</p>
        </div>
      </div>
    )
  );

  useEffect(() => {
    showAbout && window.addEventListener('keydown', (event: KeyboardEvent) => {
      event.key === 'Escape' && closeModal();
    });

    return () => {
      window.removeEventListener('keydown', (event: KeyboardEvent) => {
        event.key === 'Escape' && closeModal();
      });
    };
  }, [showAbout]);

  return (
    <>
      <button className="btn-about" onClick={handleAboutClick}>About</button>
      {renderAboutModal()}
    </>
  );
};

export default AboutButton;
