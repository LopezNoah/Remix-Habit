import { Link, Outlet, useCatch } from "@remix-run/react";

export default function BookListPage() {
    return (
      <div className="border-solid border-4 border-yellow-200 flex flex-col items-center">
        <div>
            books.tsx from /routes
            <Outlet/>
            <Link to="/books/new">Add Book</Link>
            <div>
                <h1 className="font-bold">Books list</h1>
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