import React, { useState, useEffect, useContext } from "react";
import { CardContact } from "../contact/CardContact";
import { CardKpi } from "../dashboard/CardKpi";
import { useDispatch } from "react-redux";
import {
  getContactData,
  getContactStatus,
} from "../../features/contact/contactSlice";
import { fetchContacts} from "../../features/contact/contactTrunk";
import AuthContext from "../../AuthContext";
import { Navigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../app/store";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";
import { ErrorPage } from "../error/ErrorPage";

export const DashboardPage = () => {
  const { userLogin } = useContext(AuthContext);

  const dispatch: AppDispatch = useDispatch();
  const contactListData = useAppSelector<ContactInterface[]>(getContactData);
  const contactListStatus = useAppSelector<string>(getContactStatus);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchContacts()).unwrap().then(() => setError(null)).catch((err) => setError(err.message))
  }, [dispatch]);

  if (contactListStatus === "rejected") {

    <ErrorPage error={error}></ErrorPage>

  } else {

  return (
    <>
      {userLogin === "" && <Navigate to="/login" />}
      <CardKpi></CardKpi>
      {contactListStatus === "pending" ? (
              <StyledSpinner>Loading...</StyledSpinner>
            ):(
        <CardContact contact={contactListData}></CardContact>
      )}
    </>
  );
  }
};
