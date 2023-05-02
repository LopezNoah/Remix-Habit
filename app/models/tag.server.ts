import type { User, Tag, Prisma } from "@prisma/client";
import { z } from "zod";

import { prisma } from "~/db.server";

// Create a new tag
async function createTag(name: string, userId: number) {
  const tag = await prisma.tag.create({
    data: {
      Name: name,
      User: { connect: { Id: userId } },
    },
  })
  return tag
}

// Get all tags
export async function getTags(userId: number) {
  const tags = await prisma.tag.findMany({
    where: {
        UserId: userId
    }
  });

  return tags
}

// Get a single tag by ID
export async function getTagById(id: number) {
  const tag = await prisma.tag.findUnique({ where: { Id: id } })
  return tag
}

export async function getTagByName(userId: number, name: string) {
    const tag = await prisma.tag.findFirst({
        where: {
            UserId: userId,
            Name: name
        }
    });

    return tag;
}

// Update a tag by ID
async function updateTag(id: number, name: string) {
  const tag = await prisma.tag.update({
    where: { Id: id },
    data: {
        Name: name
    }
  })
  return tag
}

// Delete a tag by ID
async function deleteTag(id: number) {
  const tag = await prisma.tag.delete({ where: { Id: id } })
  return tag
}
