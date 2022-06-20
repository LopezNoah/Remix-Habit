import { Link } from "@remix-run/react";

export default function Navbar() {
    return (
      <header>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="sm:justify-between sm:items-center sm:flex">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, Username!
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Let's write a new blog post! 🎉
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
              <Link to="/"
                className="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition border border-gray-200 rounded-lg hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> View Website </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>

              <Link to="/books/new"
                className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </header>
    )
};
