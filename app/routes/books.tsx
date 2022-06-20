import { Book } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { BookGrid } from "~/components/Books/BookGrid";
import { BookTableBody } from "~/components/Books/BookTableBody";
import { BookTableHeader } from "~/components/Books/BookTableHeader";
import { db } from "~/utils/db.server";

type LoaderData = { books: Book[] | undefined };

export const loader: LoaderFunction = async() => {
    const books = await db.book.findMany();
    console.log(books);
    if(!books) throw new Error("Books not found");
    const data: LoaderData = { books };
    return data;
}

export default function BookListPage() {
    const data = useLoaderData<LoaderData>()?.books;
    const count = data?.length;
    console.log(count);
    return (
      <div className="border-solid border-4 border-yellow-200 flex flex-col items-center">
        books.tsx from /routes
        <Outlet/>
        <Link to="/books/new">Add Book</Link>
        <div>
            <h1 className="font-bold">Books list</h1>
        </div>
        <table className="table-auto border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <BookTableHeader/>
            {count !== undefined && count > 0 ? (
                <BookTableBody books={data}/>
            ) : (
                <tbody>
                    <tr>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400" colSpan={7}>No data</td>
                    </tr>
                </tbody>
            )}
        </table>
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