import React, { useState, useEffect, useContext } from "react";
import { CardContact } from "../contact/CardContact";
import { CardKpi } from "./CardKpi";
import { useDispatch } from "react-redux";
import {
  getContactData,
  getContactError,
  getContactStatus,
} from "../../features/contact/contactSlice";
import { getContactFromApiTrunk } from "../../features/contact/contactTrunk";
import AuthContext from "../../AuthContext";
import { Navigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../app/store";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";

export const DashboardPage = () => {

  const {userLogin} = useContext(AuthContext)

  const dispatch : AppDispatch = useDispatch();
  const contactListData = useAppSelector<ContactInterface[]>(getContactData);
  const contactListError = useAppSelector<string | undefined>(getContactError);
  const contactListStatus = useAppSelector<string>(getContactStatus);
  const [spinner, setSpinner] = useState<boolean>(true);

  useEffect(
    () => {

      if (contactListStatus === "idle") {
        dispatch(getContactFromApiTrunk());
      } else if (contactListStatus === "pending") {
        setSpinner(true);
      } else if (contactListStatus === "fulfilled") {
        setSpinner(false)
      }
    },
    [dispatch,
    contactListData,
    contactListStatus]
  );
  


  return (
    <> 
          {(userLogin === "") && <Navigate to="/login"/>}
        <CardKpi></CardKpi>
      {spinner ? <StyledSpinner>Loading...</StyledSpinner>:  <CardContact contact={contactListData}></CardContact>}
    </>
  );
};