
import prisma from "../../../libs/client"


export const readAbout = async () => {
  const existingAbout = await prisma.about.findUnique({
    where: { id:'655921b6ad1bff406128ee51'},
  });

  if (existingAbout) {
    return existingAbout;
  } else {
    throw new Error("El documento no se encontró en la base de datos.");
  }
}
