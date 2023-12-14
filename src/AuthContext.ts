import React, { createContext } from "react";
import { AuthContextProps } from "./interfaces/props/PropsInterface";

// Create the context with an initial dummy value of type AuthContextProps
const AuthContext = createContext<AuthContextProps>({ userLogin: null });

export default AuthContext;
