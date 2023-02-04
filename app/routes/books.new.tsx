import { ActionArgs, json, redirect } from "@remix-run/node";
import type {ActionFunction} from "@remix-run/node";
import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { createBook } from "~/models/book.server";
import * as React from "react";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";

const schema = z.object({
    Title: z.string().min(1),
    Author: z.string().min(1),
    PageCount: z.number({
        required_error: "Page count is required",
        invalid_type_error: "Page count must be a number"
    }).positive(),
    CurrentPage: z.number().optional()
})

export async function action({ request }: ActionArgs) {
    const userId = await requireUserId(request);
  
    const formData = await request.formData();
    //const { Title, Author, PageCount } = schema.parse( formData );
    const title = formData.get("title");
    const author = formData.get("author");
    const pageCount = Number(formData.get("pageCount"));
  
    if (typeof title !== "string" || title.length === 0) {
      return json(
        { errors: { title: "Title is required", author: null, pageCount: null } },
        { status: 400 }
      );
    }

    if (typeof pageCount !== "number" || pageCount === 0) {
        return json(
            { errors: { title: null, author: null, pageCount: "Page Count is required" } },
            { status: 400 }
        )
    }
  
    if (typeof author !== "string" || author.length === 0) {
      return json(
        { errors: { title: null, author: "Author is required", pageCount: null } },
        { status: 400 }
      );
    }
  
    const book = await createBook({Title: title, Author: author, PageCount: pageCount, UserId: userId });
  
    return redirect(`/books/${book.Id}`);
  }


export default function NewBook() {
    const actionData = useActionData<typeof action>();
    const transition = useTransition();
    const titleRef = React.useRef<HTMLInputElement>(null);
    const authorRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (actionData?.errors?.title) {
            titleRef.current?.focus();
        } else if (actionData?.errors?.author) {
            authorRef.current?.focus();
        }
    }, [actionData]);

    return (
        <div className="border-solid border-2 border-green-600">
            new.tsx from /books/new
            {/*
            <Form method="post"
                className="relative w-screen max-w-lg mx-auto overflow-auto bg-white
                 divide-y divide-gray-100 rounded-lg shadow-2xl"
                 role="dialog" aria-label="Add Book">
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
    </Form>*/}
            <Form method="post"
                className="flex flex-col gap-2 w-full">
            <div>
                <label className="flex w-full flex-col gap-1">
                <span>Title: </span>
                <input
                    ref={titleRef}
                    name="title"
                    className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                    aria-invalid={actionData?.errors?.title ? true : undefined}
                    aria-errormessage={ actionData?.errors?.title ? "title-error" : undefined }
                />
                </label>
                {actionData?.errors?.title && (
                <div className="pt-1 text-red-700" id="title-error">
                    {actionData.errors.title}
                </div>
                )}
            </div>

            <div>
                <label className="flex w-full flex-col gap-1">
                <span>Author: </span>
                <input
                    ref={authorRef}
                    name="author"
                    className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-loose"
                    aria-invalid={actionData?.errors?.author ? true : undefined}
                    aria-errormessage={
                    actionData?.errors?.author ? "author-error" : undefined
                    }
                />
                </label>
                {actionData?.errors?.author && (
                <div className="pt-1 text-red-700" id="author-error">
                    {actionData.errors.author}
                </div>
                )}
            </div>

            <div>
                <label className="flex w-full flex-col gap-1">
                <span>Page Count: </span>
                <input
                    ref={authorRef}
                    type="number"
                    name="pageCount"
                    className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-loose"
                    /*aria-invalid={actionData?.errors?.author ? true : undefined}
                    aria-errormessage={
                    actionData?.errors?.author ? "author-error" : undefined
                    }*/
                />
                </label>
            </div>

            <div className="text-right">
                <button
                type="submit"
                className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">
                {transition.state === "submitting" ? "Creating book..." : "Create Book"}
                </button>
            </div>
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
  