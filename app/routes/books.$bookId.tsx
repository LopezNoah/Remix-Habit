import { Form, Link, Outlet, useActionData, useCatch, useLoaderData, useTransition } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Timer from "~/components/timer";
import { getBookByUserId } from "~/models/book.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);
    const book = await getBookByUserId({ Id: bookId });

    if (!book) {
        throw new Error("Book not found");
    }

    return typedjson({ book });
}

export async function action({ request, params}: ActionArgs) {
    return "hello world";
}

export default function BookDetailPage() {
    const errors = useActionData<typeof action>();
    const transition = useTransition();
    const isUpdating = transition.submission?.formData.get("intent") == "update";

    const data = useTypedLoaderData<typeof loader>();
    const book = data.book;
    const sessions = book?.ReadingSessions;
    const totalReadTime = sessions.reduce((acc, session) => {
        return acc + ((new Date(session.EndTime).getTime() - new Date(session.StartTime).getTime()) / (60 * 60 * 1000));
    }, 0);


    return (
        <Form method="post" key={book.Id ?? "new"}>
            <div className="border-solid border-[3px] bg-gray-200 border-slate-900 w-96 p-2 rounded-xl text-black">
                <div className="grid grid-cols-2 p-2">
                    <div className="flex flex-col">
                        <div>
                            <span className="italic font-medium">{ book?.Title }</span>
                            <span> by </span>
                            <span className="font-medium">{ book?.Author }</span>
                        </div>
                        <span>{"Started Reading: " + (book?.StartDate ?? "N/A")}</span>
                        <span>Progress: { book?.CurrentPage ?? 0 } / { book?.PageCount } pages</span>
                        <span>Total Read Time: { totalReadTime } minutes</span>
                    </div>
                    {/* <div>
                        <img className="object-scale-down h-48 w-96" src="https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/1/red-mars-cover-painting-don-dixon.jpg"/>
                    </div> */}
                </div>
                <div className="flex flex-col rounded-md bg-gray-300 border-slate-900 border-2 p-2">
                    <Link to="sessions">View Reading Sessions</Link>
                    <Outlet context={sessions}/>
                </div>
                {/* Make this button actually update the text fields */}
                <button name="intent" value={"update"} disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</button>
            </div>
            <Timer />
        </Form>
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
  