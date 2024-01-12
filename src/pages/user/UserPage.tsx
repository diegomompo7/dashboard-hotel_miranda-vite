import { DataTableUsers } from "./DataTableUsers";
import { TableBody } from "@mui/material";
import {
  StyledTable,
  StyledTableCellRow,
} from "../../components/common/StyledTable";
import React, { ChangeEvent, useEffect, useState } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav";
import { StyledTextField } from "../../components/common/StyledTextField";
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
  getUsersData,
  getUsersError,
  getUsersStatus,
  getEmployee,
  getSelect,
  getUsersDataActive,
  getUsersDataInactive,
} from "../../features/users/usersSlice";
import { fetchUsers } from "../../features/users/usersTrunk";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../app/store";
import { UserInterface } from "../../../user/UserInterface";
import { ToastContainer } from "react-toastify";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";

export const UserPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const usersListData = useAppSelector<UserInterface[]>(getUsersData);
  const usersListError = useAppSelector<string | undefined>(getUsersError);
  const usersListStatus = useAppSelector<string>(getUsersStatus);
  const usersListActive = useAppSelector<UserInterface[]>(getUsersDataActive);
  const usersListInactive =
    useAppSelector<UserInterface[]>(getUsersDataInactive);

  const [spinner, setSpinner] = useState<boolean>(true);

  const [currentView, setCurrentView] = useState<string>("all");

  const [numberPage, setNumberPage] = useState<number[]>([0, 10]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers()).unwrap().then(() => setError(null)).catch(() => setError(usersListError!))
  }, [dispatch]);

  const handleTag = (click: React.SetStateAction<string>): void => {
    setCurrentView(click);

    setNumberPage([0,10])
    setCurrentPage(1);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch(getEmployee(e.target.value));
  };

  const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    let orderSelect: UserInterface[] = [];

    switch (e.target.value) {
      case "orderDate":
        orderSelect = [...currentUsersListData].sort(
          (a, b) =>
            new Date(`${b.startDate}`).getTime() -
            new Date(`${a.startDate}`).getTime()
        );
        break;
      case "name":
        orderSelect = [...currentUsersListData].sort((a, b) => {
          const nameA = a.fullName.toUpperCase();
          const nameB = b.fullName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        break;
    }
    dispatch(getSelect(orderSelect));
    setNumberPage([0,10])
    setCurrentPage(1);
  };

  const currentUsersListData: UserInterface[] =
    currentView === "active"
      ? usersListActive
      : currentView === "inactive"
      ? usersListInactive
      : usersListData;

      if (usersListStatus === "rejected") {

        <StyledSpinner>{error}</StyledSpinner>
    
      } else {

  return (
    <>
    <ToastContainer></ToastContainer>
      {currentUsersListData !== undefined && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <StyledNav>
              <StyledNavText
                onClick={() => handleTag("all")}
                isActive={currentView === "all"}
              >
                All Employee
              </StyledNavText>
              <StyledNavText
                onClick={() => handleTag("active")}
                isActive={currentView === "active"}
              >
                Active Employee
              </StyledNavText>
              <StyledNavText
                onClick={() => handleTag("inactive")}
                isActive={currentView === "inactive"}
              >
                Inactive Employee
              </StyledNavText>
            </StyledNav>
            <StyledTextField
              label="Employee"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleOnChange(e)}
            />
            <StyledButton name="create" onClick={() => navigate("/createUser")}>
              + New Employee
            </StyledButton>
            <StyledSelect
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleOnSelect(e)
              }
            >
              <option value="" disabled selected hidden>
                Choose a Order
              </option>
              <option value="orderDate">Order Date</option>
              <option value="name">Name</option>
            </StyledSelect>
          </div>
          <StyledTable>
            <thead>
              <StyledTableCellRow>Photo</StyledTableCellRow>
              <StyledTableCellRow>Name</StyledTableCellRow>
              <StyledTableCellRow>ID</StyledTableCellRow>
              <StyledTableCellRow>Email</StyledTableCellRow>
              <StyledTableCellRow>Start Date</StyledTableCellRow>
              <StyledTableCellRow>Description</StyledTableCellRow>
              <StyledTableCellRow>Users</StyledTableCellRow>
              <StyledTableCellRow>Status</StyledTableCellRow>
            </thead>
            <TableBody>
              { usersListStatus === "pending" ? (
                    <StyledSpinner>Loading...</StyledSpinner>
                  ) : (
                <DataTableUsers
                  data={currentUsersListData}
                  numberPage={numberPage}
                ></DataTableUsers>
              )}
            </TableBody>
          </StyledTable>
          <StyledPagination>
            <StyledPaginationText>
              {" "}
              Showing{" "}
              {currentUsersListData.length !== 0
                ? numberPage[0] + 1
                : numberPage[0]}{" "}
              of{" "}
              {currentUsersListData.length >= numberPage[1]
                ? numberPage[1]
                : currentUsersListData.length}{" "}
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
                { length: Math.ceil(currentUsersListData.length / 10) },
                (_, i) => (
                  <StyledTextPage key={i} isCurrentPage={i + 1 === currentPage}>
                    {i + 1}
                  </StyledTextPage>
                )
              )}
              <StyledButton
                name="Next"
                disabled={numberPage[1] >= currentUsersListData.length}
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
