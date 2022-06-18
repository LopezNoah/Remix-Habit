import { redirect } from "@remix-run/node";
import type {ActionFunction} from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";

export default function NewBook() {
    const transition = useTransition();
    return (
        <Form method="post">
            <input type="text" name="title" placeholder="Title" />	
            <input type="text" name="author" placeholder="Author" />
            <input type="text" name="isbn" placeholder="ISBN" />
            <button type="submit">
                {transition.state === "submitting" ? "Creating book..." : "Create Book"}
            </button>
        </Form>
    );
}
/*
export const action: ActionFunction = async ({ request )} => {
    const body = await request.formData();
    const book = await createBook(body);
    return redirect(`/books/$book.id`);
}*/