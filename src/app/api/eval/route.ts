// eval/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try{
        const dummyData = {
            members: [
                { id: 1, name: "Alberto Aguero Herdocia", cedula: "118450651" },
                { id: 2, name: "Anderson Mora Aguero", cedula: "115600170" },
                { id: 3, name: "David Morales Hidalgo", cedula: "116300616" },
                { id: 4, name: "Luis Lopez Castro", cedula: "402420889" }
            ],
            course: "Paradigmas de Programación",
            project: "OneFlowStream (OFS)",
            semester: "2",
            year: "2023",
            school: "Escuela de Ingeniería",
            university: "Universidad Nacional"
        }
        return NextResponse.json(dummyData, {status: 200})
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error }.error, {status: 500})
    }
}