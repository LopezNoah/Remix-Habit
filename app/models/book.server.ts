import type { User, Book, Prisma } from "@prisma/client";
import { z } from "zod";

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

export function getBookByBookId(BookId: number) {
    return prisma.book.findUnique({
        where: {
            // UserId: userId,
            Id: BookId,
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

export function getSessionsByBookId(BookId: number, UserId: number) {
    return prisma.readingSession.findMany({
        where: {
            BookId: BookId,
            UserId: UserId
        },
        select: {
            Id: true,
            StartTime: true,
            EndTime: true,
            Duration: true,
            PageStart: true,
            PageEnd: true
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

const CreateSessionInputSchema = z.object({
    //startTime: z.date(),
    //endTime: z.date(),
    duration: z.number(),
    bookId: z.number(),
    pageStart: z.number(),
    pageEnd: z.number(),
    userId: z.number()
});

type createReadingSessionInput = z.infer<typeof CreateSessionInputSchema>;

export function createReadingSession(data: createReadingSessionInput) {
    const readingSession = prisma.readingSession.create({
        data: {
            BookId: data.bookId,
            Duration: data.duration,
            PageStart: data.pageStart,
            PageEnd: data.pageEnd,
            StartTime: new Date(),
            EndTime: new Date(),
            UserId: data.userId
        },
    });
    return readingSession;
}