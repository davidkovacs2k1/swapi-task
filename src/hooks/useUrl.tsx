"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const useUpdateUrlQuery = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateUrlQuery = (key: string, value: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (value === undefined || value === "" || value.length <= 0) current.delete(key);
        else current.set(key, value.toString());

        const search = current.toString();
        const query = search ? `?${search}` : "";

        const nextPageUrl = `${pathname}${query}`;
        router.push(nextPageUrl);

    };

    return updateUrlQuery;
};

export default useUpdateUrlQuery;
