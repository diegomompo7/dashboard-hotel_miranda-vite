import { BookingInterface } from "../booking/BookingInterface";
import { ContactInterface } from "../contact/ContactInterface";

export interface CardContactProps {
    contact: ContactInterface[]
  }
export interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
    description: string; // Asegúrate de ajustar el tipo según la estructura real de tu aplicación
}
export interface DataTableBookingProps {
    data: BookingInterface[];
    numberPage: number[];
    handleOpen: () => void;
    setSpecialRequest: (value: string | undefined) => void;
  }
  export interface DataTableContactProps {
    data:ContactInterface[];
    numberPage: number[];
    setCurrentView: (value: string | undefined) => void;
    setCurrentPage: (value: number | undefined) => void
  }