//header.tsx
import React, { useState } from 'react';

const Header: React.FC = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [teamInfo, setTeamInfo] = useState<any>(null);

    const fetchAboutInfo = async () => {
        try {
            const response = await fetch('api/about');
            if (response.ok) {
                const data = await response.json();
                setTeamInfo(data);
                setShowAbout(true);
            } else {
                console.error("Error al obtener la información");
            }
        } catch (error) {
            console.error("Error al obtener la información", error);
        }
    };

    const handleAboutClick = async () => {
        await fetchAboutInfo();
    };

    return (
        <div className="header-container">
            <h1 className="header-title">OFS Playground</h1>
            <button className="btn-about" onClick={handleAboutClick}>About</button>
            {showAbout && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAbout(false)}>&times;</span>
                        <h2>Información del Equipo</h2>
                        <h3>Integrantes:</h3>
                        <ul>
                            {teamInfo?.members.map((member: any) => (
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
            )}
        </div>
    );
};

export default Header;