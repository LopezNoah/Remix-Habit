export function AddNewBook() {
    return (
        <details
        open
        className="overflow-hidden border border-gray-200 rounded"
        >
        <summary className="flex items-center justify-between px-5 py-3 bg-gray-100 lg:hidden">
            <span className="text-sm font-medium">
            Toggle Filters
            </span>

            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </summary>

        <form
            action=""
            className="border-t border-gray-200 lg:border-t-0"
        >
            <fieldset>
            <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                Type
            </legend>

            <div className="px-5 py-6 space-y-2">
                <div className="flex items-center">
                <input
                    id="toy"
                    type="checkbox"
                    name="type[toy]"
                    className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                    htmlFor="toy"
                    className="ml-3 text-sm font-medium"
                >
                    Toy
                </label>
                </div>
                <div className="pt-2">
                <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                >
                    Reset Type
                </button>
                </div>
            </div>
            </fieldset>

            <div>
            <fieldset>
                <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                Age
                </legend>

                <div className="px-5 py-6 space-y-2">
                <div className="flex items-center">
                    <input
                    id="3+"
                    type="checkbox"
                    name="age[3+]"
                    className="w-5 h-5 border-gray-300 rounded"
                    />

                    <label
                    htmlFor="3+"
                    className="ml-3 text-sm font-medium"
                    >
                    3+
                    </label>
                </div>

                <div className="pt-2">
                    <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                    >
                    Reset Age
                    </button>
                </div>
                </div>
            </fieldset>
            </div>

            <div className="flex justify-between px-5 py-3 border-t border-gray-200">
            <button
                name="reset"
                type="button"
                className="text-xs font-medium text-gray-600 underline rounded"
            >
                Reset All
            </button>

            <button
                name="commit"
                type="button"
                className="px-5 py-3 text-xs font-medium text-white bg-green-600 rounded"
            >
                Apply Filters
            </button>
            </div>
        </form>
        </details>
    );
}