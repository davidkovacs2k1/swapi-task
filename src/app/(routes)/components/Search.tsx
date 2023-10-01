"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import useUpdateUrlQuery from "@/hooks/useUrl";

interface SearchProps {
    search?: string;
}

const Search: React.FC<SearchProps> = ({ search }) => {
    const updateUrlQuery = useUpdateUrlQuery();

    const [searchText, setSearchText] = useState(search);
    const [searchString] = useDebounce(searchText, 1000);

    useEffect(() => {
        if (!searchString) {
            updateUrlQuery("search", "");
            return;
        }

        updateUrlQuery("search", searchString);
    }, [searchString]);

    return (
        <div className="relative rounded-md shadow-sm">
            <input
                value={searchText}
                placeholder="search..."
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-[#212121] rounded-xl p-3 placeholder:text-[#999] w-full text-[#fff]"
            />
        </div>
    );
};

export default Search;
