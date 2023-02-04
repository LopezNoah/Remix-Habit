import { Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { getBookByUserId } from "~/models/book.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);
    const book = await getBookByUserId({ Id: bookId, userId });
    return json({ book });
  }

export default function BookDetailPage() {
    const data = useLoaderData<typeof loader>();
    const book = data.book[0];

    return (
      <div className="border-solid border-[3px] bg-gray-200 border-slate-900 w-96 p-2 rounded-xl text-black">
        <span>$bookId.tsx from /books/$bookId</span>
        <div className="flex flex-col">
            <div>
                <span className="italic font-medium">{ book?.Title }</span>
                <span> by </span>
                <span className="font-medium">{ book?.Author }</span>
            </div>
            <span>Progress: { book?.CurrentPage ?? 0 } / { book?.PageCount } pages</span>
            <span>Started Reading: { book?.StartDate ?? "N/A"}</span>
        </div>
        <div className="flex flex-col">
            <p>Reading Sessions</p>
            {book.ReadingSessions.map((session) => (
                <li key={session.Id}>
                    <span>Start Time: { session.StartTime }</span>
                    <span>End Time: { session.EndTime }</span>
                    <span>Page Start: { session.PageStart }</span>
                    <span>Page End: { session.PageEnd }</span>
                </li>
            ))}
        </div>
        <Outlet/>
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
  