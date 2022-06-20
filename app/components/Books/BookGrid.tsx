import { Book } from "@prisma/client"
import { cloneElement, ReactChild, ReactFragment, ReactPortal } from "react"

export function BookGrid(props: {books: Array<Book> | undefined}) {
    return (
        <table className="table-auto border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Id</th>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Name</th>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Author</th>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Published Date</th>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Page Count</th>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Created At</th>
                    <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Updated At</th>
                </tr>
            </thead>
            <tbody>
                {props?.books === undefined ? ( <tr><td colSpan={7}>No data</td></tr> ) : (
                {props.books.map((book) => (
                    <tr key={book.Id}>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.Id}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.Name}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.Author}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.PublishedDate}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.PageCount}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.CreatedAt}</td>
                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.UpdatedAt}</td>
                    </tr>
                ))})}
            </tbody>
        </table>
    )
}