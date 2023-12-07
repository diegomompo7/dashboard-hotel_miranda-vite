
import { Modal } from "@mui/material";
import { StyledBoxModal, StyledTextModal, StyledIconModal } from "./StyledModalComponent";


export const ModalComponent = ({open, handleClose, description}) => {



    return (
        <Modal
        open={open}
        handleClose={handleClose}
        >
            <StyledBoxModal>
                <StyledIconModal onClick={handleClose}></StyledIconModal>
                <StyledTextModal>{description}</StyledTextModal>
            </StyledBoxModal>

        </Modal>
    )
} 