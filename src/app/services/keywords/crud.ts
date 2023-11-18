
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