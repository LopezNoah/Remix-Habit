import { useCatch } from "@remix-run/react";

export default function Logout() {
    return (
        <div className="border-solid border-2 border-indigo-600">
            logout.tsx from /__auth/logout
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div>
                <h1>404</h1>
                <p>Not found</p>
            </div>
        );
    }
    throw new Error("Unexpected caught response with status: " + caught.status);
}

export function ErrorBoundary() {
    return (
        <div className="bg-red-300 text-red-500">
            That wasn't supposed to happen!
        </div>
    );
}