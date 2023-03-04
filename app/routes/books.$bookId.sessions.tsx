import { Form, Link, Outlet, useActionData, useCatch, useLoaderData, useTransition } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { getBookByUserId } from "~/models/book.server";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request, params }: LoaderArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);
    const book = await getBookByUserId({ Id: bookId, userId });
    // const sessions = await prisma.readingSession.findMany({
    //     where: {
    //         BookId: bookId
    //     }
    // });
    //provide me some dummy data for reading sessions
    const sessions = [
        {
            Id: 1,
            StartTime: "2021-10-10T12:00:00",
            EndTime: "2021-10-10T13:00:00",
            PageStart: 1,
            PageEnd: 100
        },
        {
            Id: 2,
            StartTime: "2021-10-11T12:00:00",
            EndTime: "2021-10-11T13:00:00",
            PageStart: 101,
            PageEnd: 200
        },
        {
            Id: 3,
            StartTime: "2021-10-12T12:00:00",
            EndTime: "2021-10-12T13:00:00",
            PageStart: 201,
            PageEnd: 300
        }
    ];

    return json({ sessions });
}

export async function action({ request, params}: ActionArgs) {
    return "hello world";
}

export default function BookDetailPage() {
    const errors = useActionData<typeof action>();
    const transition = useTransition();
    const isUpdating = transition.submission?.formData.get("intent") == "update";

    const data = useLoaderData<typeof loader>();
    const sessions = data.sessions;

    return (
        <div>
            <ul>
                {sessions.map((session) => (
                    <li key={session.Id} className="flex">
                        {/* Format these with tailwind classes to make prettier */}
                        <span>Date: { new Date(session.StartTime).toLocaleDateString() }</span>
                        <span>Read Time: { (new Date(session.EndTime).getTime() - new Date(session.StartTime).getTime()) / (60 * 60 * 1000) } minute(s)</span>
                        <span>Pages Read: { session.PageEnd - session.PageStart }</span>
                    </li>
                ))}
            </ul>
            <Outlet />
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
  