import React, { useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import { Navigate } from "react-router-dom";

const Wrapper = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //Only allows autheticated users access components
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  // If an autheticated user allow access to the page else redirect to login
  if(loading) {return <div>Loading...</div>;} 
  else {if(authenticated) {return <>{children}</>;}}
  return <Navigate to="/login" />;
};

export default Wrapper;
