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
  import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Form, Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import { X } from "lucide-react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button } from "~/components/ui/button";
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

type BookDialog = {
    Id: number, Title: string,
    Author: string,
    PageCount: number,
    CurrentPage: number,
    StartDate: Date | null,
    EndDateGoal: Date | null
};

export default function BookEdit() {
    const data = useTypedLoaderData<typeof loader>();
    const book = data.book;

    return (
      <EditBookDialog book={book} />
    );
}


export function EditBookDialog({ book }: {book: BookDialog }) {

    return (
      <Dialog open={true}>
        <Form method="post">
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
                <Button variant="link">
                    <Link to="/books">Cancel</Link>
                </Button>
              <Button type="submit" name="intent" value="saveEdit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Form>
      </Dialog>
    )
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
  