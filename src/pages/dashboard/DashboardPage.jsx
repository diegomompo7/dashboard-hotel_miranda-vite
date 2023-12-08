import { useState, useEffect } from "react";
import { CardContact } from "../contact/CardContact";
import { CardKpi } from "./CardKpi";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactData,
  getContactError,
  getContactStatus,
} from "../../features/contact/contactSlice";
import { getContactFromApiTrunk } from "../../features/contact/contactTrunk";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { Navigate } from "react-router-dom";

export const DashboardPage = () => {


  const {userLogin} = useContext(AuthContext)

  const dispatch = useDispatch();
  const contactListData = useSelector(getContactData);
  const contactListError = useSelector(getContactError);
  const contactListStatus = useSelector(getContactStatus);
  const [spinner, setSpinner] = useState(true);
  const [contactList, setContactList] = useState([]);

  useEffect(
    () => {

      if (contactListStatus === "idle") {
        dispatch(getContactFromApiTrunk());
      } else if (contactListStatus === "pending") {
        setSpinner(true);
      } else if (contactListStatus === "fulfilled") {
        setSpinner(false)
        setContactList(contactListData)
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
      {spinner ? <p>Loading</p>:  <CardContact contact={contactList}></CardContact>}
    </>
  );
};