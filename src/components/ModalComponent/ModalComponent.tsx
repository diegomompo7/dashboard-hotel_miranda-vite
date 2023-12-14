import { Modal } from "@mui/material";
import {
  StyledBoxModal,
  StyledTextModal,
  StyledIconModal,
} from "./StyledModalComponent";
import React from "react";
import { ModalComponentProps } from "../../interfaces/props/PropsInterface";

export const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  handleClose,
  description,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledBoxModal>
        <StyledIconModal onClick={handleClose}></StyledIconModal>
        <StyledTextModal>{description}</StyledTextModal>
      </StyledBoxModal>
    </Modal>
  );
};
