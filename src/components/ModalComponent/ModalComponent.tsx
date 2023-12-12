
import { Modal } from "@mui/material";
import { StyledBoxModal, StyledTextModal, StyledIconModal } from "./StyledModalComponent";
import React from "react";

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
    description: string; // Asegúrate de ajustar el tipo según la estructura real de tu aplicación
}


export const ModalComponent: React.FC<ModalComponentProps> = ({open, handleClose, description}) => {



    return (
        <Modal open={open} onClose={handleClose}>
            <StyledBoxModal>
                <StyledIconModal onClick={handleClose}></StyledIconModal>
                <StyledTextModal>{description}</StyledTextModal>
            </StyledBoxModal>

        </Modal>
    )
} 