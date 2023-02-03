import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["Id"]) {
  return prisma.user.findUnique({ where: { Id: id } });
}

export async function getUserByEmail(email: User["Email"]) {
  return prisma.user.findUnique({ where: { Email: email } });
}

export async function createUser(email: User["Email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      Email: email,
      Passwords: {
        create: {
          Hash: hashedPassword,
          IsActive: true
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["Email"]) {
  return prisma.user.delete({ where: { Email: email } });
}

export async function verifyLogin(
  email: User["Email"],
  password: Password["Hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { Email: email },
    include: {
      Passwords: {
        where: {
          IsActive: true
        }
      },
    },
  });

  if (!userWithPassword || !userWithPassword.Passwords) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.Passwords[0].Hash
  );

  if (!isValid) {
    return null;
  }

  const { Passwords: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
