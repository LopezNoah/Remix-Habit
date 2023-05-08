import { Form, Link, NavLink, Outlet, isRouteErrorResponse, useCatch, useLoaderData, useRouteError } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { getBooksByUserId } from "~/models/book.server";
import { User } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

import { ScrollArea } from "@/components/ui/scroll-area"


type book = {
        Id: number;
        Title: string;
        Author: string;
        PageCount: number;
        CurrentPage: number;
        StartDate: Date | null;
        EndDateGoal: Date | null;
        Tags: {
            Name: string;
        }[];
    };

export async function loader({ request }: LoaderArgs) {
    const isMobile = request.headers.get("user-agent")?.includes("Mobile") ?? false;
    const userId = await requireUserId(request);
    const books = await getBooksByUserId({ userId });
    return typedjson({ books, isMobile });
  }

export default function BookListPage() {
    //Probably change this later to use Zod or Effect.Schema
    const { books, isMobile } = useTypedLoaderData<typeof loader>();

    return (
        <MobileBooksContainer books={books} />

        // isMobile ? (<MobileBooksContainer books={books} />
        // ) : null //Fix this later
    );
}

function MobileBooksContainer(props: { books: book[]}) {
    const user = useUser();
    const books = props.books;
    return (
    <>
        <BooksNavBar user={user}/>
        <div className="border-solid border-4 border-yellow-500 flex flex-col items-center bg-[#f5f4f0] h-screen">
            <div>
                <Outlet/>
                <div className="border-2 rounded-md border-green-400 p-2 text-center mb-2 mt-2">
                  <Link to="/books/new">Add Book</Link>
                </div>
                <div>
                    <h1 className="font-bold">Books list</h1>
                    {books.length === 0 ? (
                        <p className="p-4">No Books yet</p>
                    ) : (
                      <ScrollArea>
                        <ol>
                        {books.map((book) => (
                          <li key={book.Id}>
                            <Link
                                className="block border-b p-4 text-xl"
                                to={book.Id.toString()}
                                >
                                📝 {book.Title}
                            </Link>
                            </li>
                        ))}
                        </ol>
                        </ScrollArea>
                    )}
                </div>
            </div>
        </div>
    </>);
}

function BooksNavBar(props: {user: User} ) {
    return (
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Books</Link>
        </h1>
        <p>{props.user.Email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>
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