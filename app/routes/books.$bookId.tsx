import { Form, Link, Outlet, isRouteErrorResponse, useActionData, useCatch, useLoaderData, useRouteError, useNavigation } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Timer from "~/components/timer";
import { getBookByBookId } from "~/models/book.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
    const userId = await requireUserId(request);
    const bookId = Number(params.bookId);
    const book = await getBookByBookId(bookId);

    if (!book) {
        throw new Error("Book not found");
    }
    console.log(JSON.stringify(book.ReadingSessions));
    return typedjson({ book });
}

export async function action({ request, params}: ActionArgs) {
    return "hello world";
}

export default function BookDetailPage() {
    const errors = useActionData<typeof action>();
    const navigation = useNavigation();
    const isUpdating = navigation?.formData?.get("intent") == "update";

    const data = useTypedLoaderData<typeof loader>();
    const book = data.book;
    const sessions = book?.ReadingSessions;
    let totalMinutesRead = 0;
    sessions.forEach(session => {
        const durationMinutes = session.Duration;
        totalMinutesRead += durationMinutes;
    });

    let totalPagesRead = 0;
    sessions.forEach(session => {
        totalPagesRead += session.PageEnd - session.PageStart + 1;
    });


    return (
        <div className="border-solid border-[3px] bg-gray-200 border-slate-900 w-96 p-2 rounded-xl text-black">
            <div className="grid grid-cols-2 p-2">
                <div className="flex flex-col">
                    <div>
                        <span className="italic font-medium">{ book?.Title }</span>
                        <span> by </span>
                        <span className="font-medium">{ book?.Author }</span>
                    </div>
                    <span>{"Started Reading: " + (book?.StartDate ?? "N/A")}</span>
                    <span>Progress: { totalPagesRead } / { book?.PageCount } pages</span>
                    <span>Total Read Time: { totalMinutesRead } minutes</span>
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
  