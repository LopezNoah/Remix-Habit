export function BookTableHeader() {
    return (
        <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Id</th>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Name</th>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Author</th>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Published Date</th>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Page Count</th>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Created At</th>
                <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Updated At</th>
            </tr>
        </thead>
    );
}