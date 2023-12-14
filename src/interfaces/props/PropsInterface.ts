import { BookingInterface } from "../booking/BookingInterface";
import { ContactInterface } from "../contact/ContactInterface";
import { RoomInterface } from "../room/RoomInterface";
import { UserInterface } from "../user/UserInterface";

export interface CardContactProps {
  contact: ContactInterface[];
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
  data: ContactInterface[];
  numberPage: number[];
  setCurrentView: (request: string) => void;
  setCurrentPage: (request: number) => void;
}

export interface DataTableUserProps {
  data: UserInterface[];
  numberPage: number[];
}

export interface DataTableRoomsProps {
  data: RoomInterface[];
  numberPage: number[];
}

export interface AuthContextProps {
  userLogin: string | null;
}

export interface HeaderProps {
  isActive?: boolean;
  activeClassName?: string;
  title: string;
  setIsOpen: (request: boolean) => void;
}

export interface LoginProps {
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  checkLogin: boolean;
  userLogin: string;
}
