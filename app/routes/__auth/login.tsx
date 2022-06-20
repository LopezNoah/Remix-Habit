import { Link, useCatch } from "@remix-run/react";
import { EmailTextBox } from "~/components/EmailTextBox";
import { PasswordTextBox } from "~/components/PasswordTextBox";

export default function Login() {
    return (
        <div className="border-solid border-2 border-indigo-600">
            login.tsx from /__auth/login
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                    <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                    </p>
                </div>

                <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
                    <EmailTextBox Placeholder="Enter email" AccessLabel="Email"/>
                    <PasswordTextBox Placeholder="Enter password" AccessLabel="Password"/>

                    <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        No account?
                        <Link className="underline" to="../signup">Sign up</Link>
                    </p>

                    <button
                        type="submit"
                        className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                    >
                        Sign in
                    </button>
                    </div>
                </form>
            </div>
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