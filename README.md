# Reading Tracker

This is a personal project I'm using to replace a paid service for tracking my reading history.
It currently uses SQLite for its database with Prisma as the ORM; however, I would like to
switch to using Drizzle or Kyseley in the near future.

I'd like to reach parity with the paid service so I can fully move away from it.
It should host books and my reading sessions. Using those sessions, a user should see their progress.
I would like to integrate charts for users to view their reading history over periods of time (likely a moving window).

Built with Remix, React, Tailwind, SQLite, Prisma, and Radix UI (Shadcn).