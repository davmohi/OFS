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
import prisma from "../../../libs/client"


export const readKeywords = async () => {
  const existingKeywords = await prisma.keywords.findUnique({
    where: { id:'65593750ad1bff406128ee52'},
  });

  if (existingKeywords) {
    return existingKeywords;
  } else {
    throw new Error("El documento no se encontró en la base de datos.");
  }
}