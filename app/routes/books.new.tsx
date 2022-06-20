import { redirect } from "@remix-run/node";
import type {ActionFunction} from "@remix-run/node";
import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";
import { AddButton } from "~/components/AddButton";
import { AddNewBook } from "~/components/Books/AddNewBook";
import { TextBox } from "~/components/TextBox";
import { NumberBox } from "~/components/NumberBox";

export const action: ActionFunction = async ({
    request,
}) => {
    const form = await request.formData();
    const title = form.get("title");
    const author = form.get("author");
    const pageCount = form.get("pageCount");
    console.log(title);
    console.log(form);

    console.log(title, author, pageCount);
    if (typeof title !== "string" || typeof author !== "string" || typeof pageCount !== "number") {
        //throw new Error("Invalid form data");
    }

    const fields = { title, author, pageCount: parseInt(pageCount) };
    console.log(fields);
}

export default function NewBook() {
    const transition = useTransition();
    const data = useActionData();
    return (
        <div className="border-solid border-2 border-green-600">
            books.new.tsx from /routes
            <Form method="post" aria-label="Add Book">
                <header className="p-6 text-center">
                    <p className="text-lg font-medium">Add book</p>
                </header>
                {/*<div className="mb-4">
                    <TextBox Id="title" Placeholder="Title"/>
                </div>
                <div className="my-4">
                    <TextBox Id="author" Placeholder="Author"/>
                </div>
                <div className="my-4">
                    <NumberBox Id="pageCount" Placeholder="Page Count"/>
                </div>
                <input type="boolean" name="in progress" placeholder="In Progress?"/>
                <input type="boolean" name="finished" placeholder="Finished?"/>
                <label className="relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="name">
            <input
                className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer"
                id="title"
                type="text"
                placeholder="Title"
            />

            <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3
             peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
               Title
            </span>
    </label>*/}
            <input
                className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer"
                id="title"
                type="text"
                placeholder="Title"
            />

                <button type="submit">
                    {transition.state === "submitting" ? "Creating book..." : "Create Book"}
                </button>
            </Form>
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
        <div className="bg-red-200 text-red-500">
            That wasn't supposed to happen!
        </div>
    );
}
  