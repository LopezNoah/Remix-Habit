import { Form, Link, Outlet, isRouteErrorResponse, useActionData, useLoaderData, useRouteError, useNavigation } from "@remix-run/react";
import { ActionArgs, json, LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { getBookByBookId } from "~/models/book.server";
import { requireUserId } from "~/session.server";

// Dialog imports
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//Progress imports
import * as React from "react";
import { Progress } from "@/components/ui/progress"


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
    if (sessions.length > 0) {
        const firstSession = sessions[0];
        const lastSession = sessions[sessions.length - 1];
        totalPagesRead = lastSession.PageEnd - firstSession.PageStart;
    }

    const totalSessions = sessions.length - 1;
    const minutesPerPage = totalMinutesRead / totalPagesRead;
    const pagesRemaining = book.PageCount - totalPagesRead;
    const timeRemaining = Math.round(pagesRemaining * minutesPerPage);
    const progress = (totalPagesRead * 100 / book?.PageCount);

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
                    <BookProgress value={progress} />
                    <span>Total Read Time: { totalMinutesRead } minutes</span>
                    { totalPagesRead > 0 ? 
                    (<span>You will finish this book in { timeRemaining } minutes</span>) : null
                    }
                </div>
                {/* <div>
                    <img className="object-scale-down h-48 w-96" src="https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/1/red-mars-cover-painting-don-dixon.jpg"/>
                </div> */}
            </div>
            <div className="flex flex-col gap-2">
                <Button>
                    <Link to="sessions">View Reading Sessions ({ totalSessions })</Link>
                </Button>
                <EditBookDialog book={book}/>
                <Outlet context={sessions}/>
            </div>
        </div>
    );
}

type BookDialog = {
    Id: number, Title: string,
    Author: string,
    PageCount: number,
    CurrentPage: number,
    StartDate: Date | null,
    EndDateGoal: Date | null
};

export function EditBookDialog({ book }: {book: BookDialog}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {book.Title}</DialogTitle>
          <DialogDescription>
            Make changes to your book here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={book.Title} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input id="author" value={book.Author} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pageCount" className="text-right">
              Page Count
            </Label>
            <Input id="pageCount" value={book.PageCount} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

 
export function BookProgress({value }: {value: number}) {
  const [progress, setProgress] = React.useState(0)
 
  React.useEffect(() => {
    console.log("hey this got fired!")
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [])
 
  return <Progress value={progress} /> // className="w-[60%]" />
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
  