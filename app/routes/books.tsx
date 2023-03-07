import { Link, NavLink, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { getBooksByUserId } from "~/models/book.server";
import { requireUserId } from "~/session.server";

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
    console.log("hello world");
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
    const books = props.books;
    return (
        <div className="border-solid border-4 border-yellow-500 flex flex-col items-center bg-[#f5f4f0] h-screen">
            <div>
                <span>books.tsx from /routes
                </span>
                <Outlet/>
                <div>
                    <Link to="/books/new">Add Book</Link>
                </div>
                <div>
                    <h1 className="font-bold">Books list</h1>
                    {books.length === 0 ? (
                        <p className="p-4">No Books yet</p>
                    ) : (
                        <ol>
                        {books.map((book) => (
                            <li key={book.Id}>
                            <NavLink
                                className="block border-b p-4 text-xl"
                                to={book.Id.toString()}
                            >
                                📝 {book.Title}
                            </NavLink>
                            </li>
                        ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}

export function CatchBoundary () {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div>
                <h1>404</h1>
                <p>Not found</p>
            </div>
        );
    }
    throw new Error ("Unexpected caught response with status: " + caught.status);
}  

export function ErrorBoundary () {
    return (
        <div className="bg-red-300 text-red-500">
            That wasn't supposed to happen!
        </div>
    );
}