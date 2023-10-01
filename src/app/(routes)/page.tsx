import React, { Suspense } from "react";
import Loading from "@/app/(routes)/loading";
import { SwapiResponseType } from "@/types/swapi.type";
import swapiInstance from "@/utils/swapi";
import { CharacterType } from "@/types/character.type";
import Await from "@/components/Await";
import CharacterList from "./components/CharacterList";
import Link from "next/link";
import { notFound } from "next/navigation";
import Search from "@/app/(routes)/components/Search";
import CharacterSkeleton from "./skeletons/CharacterSkeleton";

interface SearchParamProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const getCharacters = async (page: number = 1, search: string | undefined): Promise<SwapiResponseType<CharacterType>> => {
    try {
        let queryString = "";
        search && search.length > 0 && (queryString += `&search=${search}`);

        const response = await swapiInstance.get(`/people?page=${page}` + `${queryString}`);
        return response.data;
    } catch (error) {
        console.error(error);
        notFound();
    }
};

const RootPage: React.FC<SearchParamProps> = async ({ searchParams }) => {
    const page: number = Number(searchParams.page) || 1;
    const search: string | undefined = searchParams.search ? String(searchParams.search) : undefined;

    console.log(search);

    const promise = getCharacters(page, search);

    return (
        <div key={Math.random()}>
            <h1 className="text-center my-4 text-2xl">Star Wars Character</h1>

            <Search search={search} />

            <Suspense fallback={<CharacterSkeleton />}>
                <Await promise={promise}>{({ results }) => <CharacterList characters={results} />}</Await>
            </Suspense>

            <div className="flex justify-center space-x-5 mt-4">
                <Link
                    className="bg-[#212121] rounded-xl p-4 text-center w-[150px] hover:bg-[#2c2c2c]"
                    href={{
                        pathname: "/",
                        query: {
                            ...(search ? { search } : {}),
                            page: page > 1 ? page - 1 : 1,
                        },
                    }}
                >
                    Previous
                </Link>
                <Link
                    className="bg-[#212121] rounded-xl p-4 text-center w-[150px] hover:bg-[#2c2c2c]"
                    href={{
                        pathname: "/",
                        query: {
                            ...(search ? { search } : {}),
                            page: page + 1,
                        },
                    }}
                >
                    Next
                </Link>
            </div>
        </div>
    );
};

export default RootPage;
