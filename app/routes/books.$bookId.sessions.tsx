import { Form, Link, Outlet, useActionData, useCatch, useLoaderData, useOutletContext, useTransition } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { getBookByUserId } from "~/models/book.server";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ReadingSession } from "@prisma/client";


type ContextType = { readingSessions: ReadingSession[] | null};

export function useBook() {
    return useOutletContext<ContextType>();
}

export async function loader({ request, params }: LoaderArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);
    const book = await getBookByUserId({ Id: bookId });
    return 1;//typedjson({ sessions });
}

export async function action({ request, params}: ActionArgs) {
    return "hello world";
}

export default function BookDetailPage() {
    const errors = useActionData<typeof action>();
    const transition = useTransition();
    const isUpdating = transition.submission?.formData.get("intent") == "update";

    const data = useTypedLoaderData<typeof loader>();
    const sessions = useOutletContext<ContextType>();
    const sessionLength = sessions?.readingSessions?.length ?? 0;

    return (
        <div>
            {sessionLength > 0 ?
                <SessionsList sessions={sessions} /> :
                <p>No reading session logged!</p>
            }
            <Form method="post">
                <div>Log reading session</div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-around">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" />
                    </div>
                    <div className="flex justify-around">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="time" name="startTime" id="startTime" />
                    </div>
                    <div className="flex justify-around">
                        <label htmlFor="endTime">End Time</label>
                        <input type="time" name="endTime" id="endTime" />
                    </div>
                    <button name="intent" value={"update"} disabled={isUpdating}>{isUpdating ? "Submitting..." : "Submit"}</button>
                </div>
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
                    <li key={session.Id} className="flex">
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

export function CatchBoundary () {
    const caught = useCatch();

    return (
        <div>
            <h1>Caught</h1>
            <p>Status: {caught.status}</p>
            <pre>
                <code>{JSON.stringify(caught.data, null, 2)}</code>
            </pre>
        </div>
    );
}

export function ErrorBoundary () {
    return (
        <div className="bg-red-200 text-red-500">
            That wasn't supposed to happen!
        </div>
    );
}
  