import type { User, Book } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Book } from "@prisma/client";

export function getBooksByUserId({ userId }: { userId: User["Id"] }) {
    return prisma.book.findMany({
        where: {
            UserId: userId
        },
        select: {
            Id: true,
            Title: true,
            Author: true,
            PageCount: true,
            CurrentPage: true,
            StartDate: true,
            EndDateGoal: true,
            Tags: {
                select: {
                    Name: true
                }
            },
        },
        orderBy: {
            UpdatedAt: "desc"
        },
    });
}

export function getBookByUserId({ Id }: {Id: Book["Id"] }) {
    return prisma.book.findUnique({
        where: {
            // UserId: userId,
            Id: Id
        },
        select: {
            Id: true,
            Title: true,
            Author: true,
            PageCount: true,
            CurrentPage: true,
            StartDate: true,
            EndDateGoal: true,
            Tags: {
                select: {
                    Name: true
                }
            },
            ReadingSessions: {
                select: {
                    Id: true,
                    StartTime: true,
                    EndTime: true,
                    Duration: true,
                    PageStart: true,
                    PageEnd: true
                }
            }
        }
    });
}


export function createBook({Title, Author, PageCount, UserId, CurrentPage}:
    {Title: string, Author: string, PageCount: number, UserId: number, CurrentPage?: number | null}) {
    return prisma.book.create({
        data: {
        Title: Title,
        Author: Author,
        PageCount: PageCount,
        User: {
            connect: {
            Id: UserId,
            },
        },
        },
    });
}
  
export function deleteBook({ Id }: Pick<Book, "Id">) {
    return prisma.book.delete({
        where: {
            Id: Id,
        },
    });
}
  