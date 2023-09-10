// components/Header.tsx
import React, { useState } from 'react';
const Header: React.FC = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [teamInfo, setTeamInfo] = useState<any>(null);

    const handleAboutClick = async () => {
        try {
            const response = await fetch('/api/about');
            const data = await response.json();
            setTeamInfo(data);
            setShowAbout(true);
        } catch (error) {
            console.error("Error al obtener la información", error);
            
            // Respuesta dummy
            const dummyData = {
                members: [
                    { id: 1, name: "Alberto Aguero Herdocia", role: "Desarrollador Frontend" },
                    { id: 2, name: "Anderson Mora Aguero", role: "Desarrollador Backend" },
                    { id: 3, name: "David Morales Hidalgo", role: "Diseñador UI/UX" },
                    { id: 4, name: "Luis Lopez Castro", role: "Diseñador UI/UX" }
                ],
                course: "Desarrollo Web Avanzado",
                project: "Traceur Clone",
                semester: "1",
                year: "2023",
                school: "Escuela de Ingeniería",
                university: "Universidad Nacional"
            };
            setTeamInfo(dummyData);
            setShowAbout(true);
        }
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
                            {teamInfo.members.map((member: any) => (
                                <li key={member.id}>{member.name} - {member.role}</li>
                            ))}
                        </ul>
                        <p>Curso: {teamInfo.course}</p>
                        <p>Proyecto: {teamInfo.project}</p>
                        <p>Semestre: {teamInfo.semester}</p>
                        <p>Año: {teamInfo.year}</p>
                        <p>Escuela: {teamInfo.school}</p>
                        <p>Universidad: {teamInfo.university}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
