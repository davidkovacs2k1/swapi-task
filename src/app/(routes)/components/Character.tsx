"use client";

import useModal from "@/hooks/useModal";
import { CharacterType, PlanetType } from "@/types";
import swapiInstance from "@/utils/swapi";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CharacterProps {
    character: CharacterType;
}

const Character: React.FC<CharacterProps> = ({ character }) => {
    const { ModalContainer, openModal, closeModal } = useModal();

    const [characterWorld, setCharacterWorld] = useState<PlanetType | null>(null);

    const fetchCharacterWorld = async () => {
        const response = await axios.get<PlanetType>(character.homeworld);
        setCharacterWorld(response.data);
    };

    useEffect(() => {
        return () => {
            setCharacterWorld(null);
        };
    }, []);

    return (
        <>
            <ModalContainer>
                <div className="relative w-[600px] h-[500px] bg-[#212121] rounded-xl p-4">
                    {characterWorld != null ? (
                        <>
                            <div
                                className="absolute right-4 top-4 h-[40px] aspect-square bg-[#161616] rounded-lg flex justify-center items-center"
                                onClick={() => closeModal()}
                            >
                                <FontAwesomeIcon icon={faClose} className="text-2xl" />
                            </div>
                            <h1 className="text-3xl">{character.name}</h1>

                            <div className="flex flex-col mt-4 p-4 bg-[#161616] rounded-lg">
                                <span className="text-bold text-xl mb-2">Character details</span>
                                <span>Height: {character.height}</span>
                                <span>Weight: {character.mass}</span>
                                <span>Birth Date: {character.birth_year}</span>
                                <span>Films: {character.films.length}</span>
                            </div>

                            <div className="flex flex-col mt-4 p-4 bg-[#161616] rounded-lg">
                                <span className="text-bold text-xl mb-2">Planet details</span>
                                <span>Name: {characterWorld.name}</span>
                                <span>Terrain: {characterWorld.terrain}</span>
                                <span>Climate: {characterWorld.climate}</span>
                            </div>
                        </>
                    ) : (
                        <div className="h-full w-full flex justify-center items-center">
                            <h1 className="text-2xl">Loading...</h1>
                        </div>
                    )}
                </div>
            </ModalContainer>
            <div
                className="float-up relative col-span-1 w-full aspect-square bg-[#212121] rounded-xl overflow-hidden"
                onClick={() => {
                    fetchCharacterWorld();
                    openModal();
                }}
            >
                <Image
                    src={`https://picsum.photos/300?random=${character.name}`}
                    width={300}
                    height={300}
                    alt="image"
                    className="absolute w-full h-full"
                />

                <div
                    className="relative flex w-full h-full justify-center"
                    style={{
                        background: "linear-gradient(to bottom, #00000000 0%, #000000 100%)",
                    }}
                >
                    <span className="self-end mb-2 font-bold">{character.name}</span>
                </div>
            </div>
        </>
    );
};

export default Character;
