import React from 'react';
import { fetchData } from '../fetchData';

function SearchBar({
  pageNumber,
  setPageNumber,
  setIsNextButtonDisabled,
  setIsPrevButtonDisabled,
  setArt,
  setQuery,
  query
}) {
  // handlechange function for input
  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  // submit function for search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query < 3) {
      return;
    }
    fetchData(query, pageNumber).then((results) => {
      if (results) {
        // If last page is reached disable next button
        if (
          results.pagination.current_page === results.pagination.total_pages
        ) {
          setPageNumber(results.pagination.current_page);
          setIsNextButtonDisabled(true);
        } else {
          setIsNextButtonDisabled(false);
        }
        setArt(results.data);
        setPageNumber(1);
        setIsPrevButtonDisabled(true);
      }
    });
  };
  return (
    <form className="py-4" onSubmit={handleSubmit}>
      <div className="relative">
        {/* Search Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        {/* Input Field */}
        <input
          type="search"
          name="default-search"
          id="default-search"
          className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search for art..."
          value={query}
          onChange={handleChange}
          required
        />

        {/* Search Button */}
        <button
          disabled={query.length < 3}
          type="submit"
          onClick={handleSubmit}
          className="absolute right-2.5 bottom-2.5 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:dark:bg-slate-500"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
