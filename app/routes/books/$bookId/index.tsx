import { Book } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useCatch, useSearchParams, useParams } from "@remix-run/react";
import { db } from "~/utils/db.server";


type LoaderData = { book: Book | undefined };

export const loader: LoaderFunction = async({params}) => {
    const bookId = parseInt(params.bookId || "0");

    const book = await db.book.findUnique(
        { where: { Id: bookId } }
    );
    console.log(book);
    if(!book) throw new Error("Books not found");
    const data: LoaderData = { book };
    return data;
}

export default function BookDetailPage() {
    return (
      <div className="border-solid border-2 border-red-600">
        $bookId.tsx from /books/$bookId
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
  