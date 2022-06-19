import { Outlet, useCatch } from "@remix-run/react";


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
  