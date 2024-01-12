import { DataTableRooms } from "./DataTableRooms";
import { TableBody } from "@mui/material";
import {
  StyledTable,
  StyledTableCellRow,
} from "../../components/common/StyledTable";
import React, { useState, useEffect, ChangeEvent } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav";
import { StyledSelect } from "../../components/common/StyledSelect";
import {
  StyledPagination,
  StyledPaginationText,
  StyledButtonPage,
  StyledTextPage,
} from "../../components/common/StyledPagination";
import { StyledButton } from "../../components/common/StyledButton";
import { useDispatch } from "react-redux";
import {
  getRoomsData,
  getRoomsError,
  getRoomsStatus,
  getSelect,
} from "../../features/rooms/roomsSlice";
import { fetchRooms } from "../../features/rooms/roomsTrunk";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  getBookingsData,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { AppDispatch, useAppSelector } from "../../app/store";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { ToastContainer } from "react-toastify";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";

export const RoomsListPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const roomsListData = useAppSelector<RoomInterface[]>(getRoomsData);
  const roomsListError = useAppSelector<string | undefined>(getRoomsError);
  const roomsListStatus = useAppSelector<string>(getRoomsStatus);
  const [spinner, setSpinner] = useState(true);

  const [currentView, setCurrentView] = useState<string>("all");

  const [numberPage, setNumberPage] = useState<number[]>([0, 10]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    dispatch(fetchRooms()).unwrap().then(() => setError(null)).catch((err) => setError(err.message))
  }, [dispatch]);


  const handleTag = (click: React.SetStateAction<string>): void => {
    setCurrentView(click);

    setNumberPage([0,10])
    setCurrentPage(1);
  };

  const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    let orderSelect: RoomInterface[] = [];

    switch (e.target.value) {
      case "priceLess":
        orderSelect = [...currentRoomsListData].sort(
          (a, b) => a.priceNight - b.priceNight
        );
        break;
      case "priceHigher":
        orderSelect = [...currentRoomsListData].sort(
          (a, b) => b.priceNight - a.priceNight
        );
        break;
    }
    dispatch(getSelect(orderSelect));
    setNumberPage([0,10])
    setCurrentPage(1);
  };

  const currentRoomsListData: RoomInterface[] =
    currentView === "available"
      ? roomsListData.filter((available) => available.status === "Available")
      : currentView === "booked"
      ? roomsListData.filter((booked) => booked.status === "Booked")
      : roomsListData;

      if (roomsListStatus === "rejected") {

        <StyledSpinner>{error}</StyledSpinner>

      } else{

  return (
    <>
      <ToastContainer></ToastContainer>
      {roomsListData !== undefined && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <StyledNav>
              <StyledNavText
                onClick={() => handleTag("all")}
                isActive={currentView === "all"}
              >
                All Bookings
              </StyledNavText>
              <StyledNavText
                onClick={() => handleTag("available")}
                isActive={currentView === "available"}
              >
                Available
              </StyledNavText>
              <StyledNavText
                onClick={() => handleTag("booked")}
                isActive={currentView === "booked"}
              >
                Booked
              </StyledNavText>
            </StyledNav>
            <StyledButton name="create" onClick={() => navigate("/createRoom")}>
              + New Room
            </StyledButton>
            <StyledSelect
              nameSelect="selectRoom"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleOnSelect(e)
              }
            >
              <option value="" disabled selected hidden>
                Choose a Order
              </option>
              <option value="priceLess">Price less</option>
              <option value="priceHigher">Price High</option>
            </StyledSelect>
          </div>

          <StyledTable>
            <thead>
              <StyledTableCellRow>Room Name</StyledTableCellRow>
              <StyledTableCellRow>Bed Type</StyledTableCellRow>
              <StyledTableCellRow>Facilities</StyledTableCellRow>
              <StyledTableCellRow>Price</StyledTableCellRow>
              <StyledTableCellRow>Offer Price</StyledTableCellRow>
              <StyledTableCellRow>Status</StyledTableCellRow>
              <StyledTableCellRow></StyledTableCellRow>
            </thead>
            <TableBody>

              { roomsListStatus === "pending" ? (
                    <StyledSpinner>Loading...</StyledSpinner>
                  ) : (
                <DataTableRooms
                  data={currentRoomsListData}
                  numberPage={numberPage}
                ></DataTableRooms>
              )}
            </TableBody>
          </StyledTable>
          <StyledPagination>
            <StyledPaginationText>
              {" "}
              Showing{" "}
              {currentRoomsListData.length !== 0
                ? numberPage[0] + 1
                : numberPage[0]}{" "}
              of{" "}
              {currentRoomsListData.length >= numberPage[1]
                ? numberPage[1]
                : currentRoomsListData.length}{" "}
              data
            </StyledPaginationText>
            <StyledButtonPage>
              <StyledButton
                name="Prev"
                disabled={numberPage[0] <= 1}
                onClick={() => {
                  numberPage[0] -= 10;
                  numberPage[1] -= 10;
                  setCurrentPage((next) => next - 1);
                }}
              >
                Prev
              </StyledButton>
              {Array.from(
                { length: Math.ceil(currentRoomsListData.length / 10) },
                (_, i) => (
                  <StyledTextPage
                    key={i + 1}
                    isCurrentPage={i + 1 === currentPage}
                  >
                    {i + 1}
                  </StyledTextPage>
                )
              )}
              <StyledButton
                name="Next"
                disabled={numberPage[1] >= currentRoomsListData.length}
                onClick={() => {
                  numberPage[0] += 10;
                  numberPage[1] += 10;
                  setCurrentPage((next) => next + 1);
                }}
              >
                Next
              </StyledButton>
            </StyledButtonPage>
          </StyledPagination>
        </>
      )}
    </>
  );
  }
};
