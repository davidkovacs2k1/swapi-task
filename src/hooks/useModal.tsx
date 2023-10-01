"use client";

import React, { useState, ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const ModalContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
        if (!isOpen) return null;

        return (
            <div
                style={{
                    position: "fixed",
                    zIndex: 999,
                    left: 0,
                    top: 0,
                    backgroundColor: "#00000074",
                    backdropFilter: "blur(10px)"
                }}
                className=" h-full w-full flex justify-center items-center"
            >
                {children}
            </div>
        );
    };

    return {
        openModal,
        closeModal,
        ModalContainer,
    };
};

export default useModal;
