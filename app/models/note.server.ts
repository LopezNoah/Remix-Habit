import type { User, Note } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";

export function getNote({
  Id,
  userId,
}: Pick<Note, "Id"> & {
  userId: User["Id"];
}) {
  return prisma.note.findFirst({
    select: { Id: true, Body: true, Title: true },
    where: { Id: Id, UserId: userId },
  });
}

export function getNoteListItems({ userId }: { userId: User["Id"] }) {
  return prisma.note.findMany({
    where: { UserId: userId },
    select: { Id: true, Title: true },
    orderBy: { UpdatedAt: "desc" },
  });
}

export function createNote({
  Body,
  Title,
  userId,
}: Pick<Note, "Body" | "Title"> & {
  userId: User["Id"];
}) {
  return prisma.note.create({
    data: {
      Title,
      Body,
      User: {
        connect: {
          Id: userId,
        },
      },
    },
  });
}

export function deleteNote({
  Id,
  userId,
}: Pick<Note, "Id"> & { userId: User["Id"] }) {
  return prisma.note.deleteMany({
    where: { Id: Id, UserId: userId },
  });
}
