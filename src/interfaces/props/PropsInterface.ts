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
    setSpecialRequest: (request: string) => void;
  }
  export interface DataTableContactProps {
    data:ContactInterface[];
    numberPage: number[];
    setCurrentView: (request: string) => void;
    setCurrentPage: (request: number) => void
  }

  export interface AuthContextProps {
    userLogin: string | null;
  }