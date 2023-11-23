/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
*/
//components/AboutButton.tsx
import React, { useState, useEffect } from 'react';

// Define types for TeamMember and TeamInfo
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

// Use functional state and destructuring
const AboutButton: React.FC = () => {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);

  // Fetch team information
  const fetchAboutInfo = async () => {
    try {
      const response = await fetch('api/about');

      response.ok
      ?(async()=>{
        const data = await response.json();
        setTeamInfo(data);
        setShowAbout(true);
      })()
      :console.error("Error fetching information");
    } catch (error) {
      console.error("Error fetching information", error);
    }
  };

  // Handle About button click
  const handleAboutClick = async () => {
    await fetchAboutInfo();
  };

  // Close the modal
  const closeModal = () => setShowAbout(false);

  // Render the About modal
  const renderAboutModal = () => (
    showAbout && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Información del equipo</h2>
          <h3>Miembros:</h3>
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

  // Add event listener for the Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.key === 'Escape' && closeModal();
    };

    showAbout && window.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component is unmounted or modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAbout]);

  return (
    <>
      <button className="btn-about"  onClick={handleAboutClick}>About</button>
      {renderAboutModal()}
    </>
  );
};

export default AboutButton;
