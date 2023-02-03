import { redirect } from "@remix-run/node";
import type {ActionFunction} from "@remix-run/node";
import { Form, useCatch, useTransition } from "@remix-run/react";
import { AddButton } from "~/components/AddButton";

export default function NewBook() {
    const transition = useTransition();
    return (
        <div className="border-solid border-2 border-green-600">
            new.tsx from /books/new
            <Form method="post" className="relative w-screen max-w-lg mx-auto overflow-auto bg-white divide-y divide-gray-100 rounded-lg shadow-2xl" role="dialog" aria-label="Add Book">
                <header className="p-6 text-center">
                    <p className="text-lg font-medium">Add book</p>
                </header>
                <input type="text" name="title" placeholder="Title" />	
                <input type="text" name="author" placeholder="Author" />
                <input type="text" name="isbn" placeholder="ISBN" />
                <input type="number" name="page count" placeholder="Page Count" />
                <input type="boolean" name="in progress" placeholder="In Progress?"/>
                <button type="submit">
                    {transition.state === "submitting" ? "Creating book..." : "Create Book"}
                </button>
            </Form>
        </div>
    );
}
DATABASE_URL='mysql://6wt21mlmuq03q3znhbjm:pscale_pw_3Mc0L6mxC5IPs3Mf0geT5MuJj2U8RDNQnSaEVI5FLoL@us-west.connect.psdb.cloud/remix-habit?sslaccept=strict'

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
        <div className="bg-red-200 text-red-500">
            That wasn't supposed to happen!
        </div>
    );
}
  