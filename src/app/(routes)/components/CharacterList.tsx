import React from "react";

import { CharacterType } from "@/types/character.type";
import Character from "@/app/(routes)/components/Character";

interface CharacterListProps {
    characters: CharacterType[];
}

const CharacterList: React.FC<CharacterListProps> = async ({ characters }) => {
    return (
        <div className="grid grid-cols-5 gap-4 mt-8">
            {characters.map((character: CharacterType, index: number) => (
                <Character key={index} character={character} />
            ))}
        </div>
    );
};

export default CharacterList;
