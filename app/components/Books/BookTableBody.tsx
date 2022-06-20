import { Book } from "@prisma/client";

export function BookTableBody(props: {books: Book[] | undefined}) {
    return (
        <tbody>
            {props?.books?.map((book) => (
                <tr key={book.Id}>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.Id}</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.Name}</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.Author}</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.PublishedDate}</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.PageCount}</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.CreatedAt}</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{book.UpdatedAt}</td>
                </tr>
            ))}
        </tbody>
    );
}