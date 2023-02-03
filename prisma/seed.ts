import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "noah@lopez.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { Email: email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      Email: email,
      Passwords: {
        create: {
          Hash: hashedPassword,
          IsActive: true,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      Title: "My first note",
      Body: "Hello, world!",
      UserId: user.Id,
    },
  });

  await prisma.note.create({
    data: {
      Title: "My second note",
      Body: "Hello, world!",
      UserId: user.Id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
