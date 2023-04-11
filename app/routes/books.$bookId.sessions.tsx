import { Form, Link, Outlet, isRouteErrorResponse, useActionData, useCatch, useLoaderData, useNavigation, useOutletContext, useRouteError, useTransition } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { createReadingSession, getBookByUserId } from "~/models/book.server";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ReadingSession } from "@prisma/client";
import Timer from "~/components/timer";
import ReadingLogForm from "~/components/ReadingLogForm";
import * as z from "zod";


type ContextType = { readingSessions: ReadingSession[] | null};

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
    const book = await getBookByUserId(bookId);
    return 1;//typedjson({ sessions });
}

export async function action({ request, params}: ActionArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);

    console.log(bookId);
    // if (!bookId) {
    //     throw new Error("This book doesn't exist!");
    // }

    const form = await request.formData();
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    const duration = Number(form.get("duration"));
    const startTime = form.get("startTime");
    const endTime = form.get("endTime");
    const pageStart = Number(form.get("pageStart"));
    const pageEnd = Number(form.get("pageEnd"));

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

export default function BookDetailPage() {
    const errors = useActionData<typeof action>();
    const navigation = useNavigation();
    const isUpdating = navigation?.formData?.get("intent") == "update";

    const data = useTypedLoaderData<typeof loader>();
    const sessions = useOutletContext<ContextType>();
    const sessionLength = sessions?.readingSessions?.length ?? 0;

    return (
        <div className="flex flex-col gap-2">
            {sessionLength == 0 ?
                <SessionsList sessions={sessions} /> :
                <p>No reading session logged!</p>
            }
            <Form method="post" className="border-2 border-slate-900 p-2 rounded-md">
                <ReadingLogForm />
            </Form>
            <Outlet />
        </div>
    );
}


function SessionsList({ sessions }: any) {
    return (
        <div>
            <ul>
                {sessions.map((session: any) => (
                    <li key={session.Id} className="flex bg-slate-50 rounded-md p-2 border-2 border-slate-900">
                        <span>Date: { new Date(session.StartTime).toLocaleDateString() }</span>
                        <span>Read Time: { (new Date(session.EndTime).getTime() - new Date(session.StartTime)
                            .getTime()) / (60 * 60 * 1000) } minute(s)
                        </span>
                        <span>Pages Read: { session.PageEnd - session.PageStart }</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ErrorBoundary () {
    const error = useRouteError();

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
  