"use client"; // This marks the component as a client component

import { SessionProvider } from "next-auth/react";

const ClientSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
