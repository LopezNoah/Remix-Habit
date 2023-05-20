import { Form, Link, Outlet, isRouteErrorResponse, useActionData, useCatch, useLoaderData, useNavigation, useOutletContext, useRouteError, useTransition } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { createReadingSession, getBookByBookId, getSessionsByBookId } from "~/models/book.server";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ReadingSession } from "@prisma/client";
import Timer from "~/components/timer";
import ReadingLogForm from "~/components/ReadingLogForm";
import * as z from "zod";
import { DataTable, columns, payments } from "~/components/ReadingLogs";


type ContextType = { readingSessions: ReadingSession[] | null};
export type ReadingSessionType = {
    Id: number,
    StartTime: Date,
    EndTime: Date,
    Duration: number,
    PageStart: number,
    PageEnd: number
};


const CreateSessionInputSchema = z.object({
    //startTime: z.date(),
    //endTime: z.date(),
    duration: z.number(),
    bookId: z.number(),
    pageStart: z.number(),
    pageEnd: z.number(),
    userId: z.number()
  });

export function useBook() {
    return useOutletContext<ContextType>();
}

export async function loader({ request, params }: LoaderArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);
    //const book = await getBookByUserId(bookId);
    const sessions = await getSessionsByBookId(bookId, userId);
    const book = await getBookByBookId(bookId);
    
    if (!sessions) {
        throw new Error("Error fetching the sessions for this book")
    }
    
    return { sessions, pageCount: book?.PageCount };
}

export async function action({ request, params}: ActionArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);

    console.log("bookId", bookId);
    // if (!bookId) {
    //     throw new Error("This book doesn't exist!");
    // }

    const form = await request.formData();
    const formData = Object.fromEntries(form.entries());
    console.log("form", form);
    const duration = Number(form.get("duration"));
    console.log("duration", duration);
    // const startTime = String(form.get("startTime"));
    // const endTime = String(form.get("endTime"));
    const pageStart = Number(form.get("pageStart"));
    const pageEnd = Number(form.get("pageEnd"));
    console.log("page start", form.get("pageStart"));
    console.log("pageEnd", pageEnd);

    if (pageEnd < pageStart) {
        throw new Error("Starting page must be smaller than ending page");
    }

    const createSessionInput = CreateSessionInputSchema.parse(
            {
                bookId: bookId,
                duration: duration, /*startTime, endTime,*/
                pageStart: pageStart,
                pageEnd: pageEnd,
                userId: userId
            });
    const readingSession = await createReadingSession(createSessionInput);
    if (!readingSession){
        throw new Error("The reading session wasn't created!");
    }
    // if (!startTime || !endTime || !duration) {
    //     throw new Error("Missing data for reading session.");
    // }

    return readingSession;
}

export default function SessionsPage() {
    const errors = useActionData<typeof action>();
    const navigation = useNavigation();
    const isUpdating = navigation?.formData?.get("intent") == "update";

    const  { sessions, pageCount } = useTypedLoaderData<typeof loader>();
    const sessionLength = sessions?.length ?? 0;
    const lastPage = sessionLength > 0 ? 1 : 0;
    const mostRecentSession = sessionLength > 0 ? sessions[sessionLength - 1] : null;

    //Need to update this so that it uses the action data for most recent session.
    // Shouldn't stay on the JUST NOW posted data. Needs to be optimistic/fresh.

    return (
        <div className="flex flex-col gap-2">
            {sessionLength > 0 ?
                (
                    <div>
                <SessionsList sessions={sessions} /> 
                <DataTable data={payments} columns={columns}/>
                </div>
                )
                :
                <p>No reading session logged!</p>
            }
            {mostRecentSession?.PageEnd !== pageCount ?
            (<Form method="post" className="border-2 border-slate-900 p-2 rounded-md">
                    <ReadingLogForm session={mostRecentSession}/>
            </Form>) : null}
            <Outlet />
        </div>
    );
}

//{ sessions: {Id: number, StartTime: Date, EndTime: Date, PageStart: number, PageEnd: number}[] }) {
function SessionsList({ sessions }: { sessions: ReadingSessionType[] }) {
    return (
        <div>
            <ul>
                {sessions.map((session: ReadingSessionType) => (
                    <li key={session.Id} className="flex flex-col bg-slate-50 rounded-md p-2 border-2 border-slate-900 mb-2">
                        <span>Date: { new Date(session.StartTime).toLocaleDateString() }</span>
                        <span>Read Time: { session.Duration } minute(s)
                            {/* { (session.EndTime.getTime() - session.StartTime
                            .getTime()) / (60 * 60 * 1000) } minute(s) */}
                        </span>
                        <span>Pages Read: { session.PageEnd - session.PageStart }</span>
                        <span>Pages: { session.PageStart } - { session.PageEnd }</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ErrorBoundary () {
    const error = useRouteError();
    console.log(error);

    if (isRouteErrorResponse(error)) {
        return (
          <div>
            <h1>Oops</h1>
            <p>Status: {error.status}</p>
            <p>{error.data.message}</p>
          </div>
        );
      }
    
      // Don't forget to typecheck with your own logic.
      // Any value can be thrown, not just errors!
      let errorMessage = "Unknown error";
    //   if (isDefinitelyAnError(error)) {
    //     errorMessage = error.message;
    //   }
    
      return (
        <div>
          <h1>Uh oh ...</h1>
          <p>Something went wrong.</p>
          <pre>{errorMessage}</pre>
        </div>
      );
}
  