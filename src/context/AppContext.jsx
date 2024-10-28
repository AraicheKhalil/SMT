import React, { createContext, useState } from 'react';
const AppContext = createContext();

const AppProvider = ({ children }) => { 
  const [open, setOpen] = useState(true);
  const [documentType , setDocumentType]  = useState("process-document")
  const [fileContext , setfileContext]  = useState(null)
  const [auth, setAuth] = useState({
    token: localStorage.getItem('jwt') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  });
  
  const login = (token,user) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = !!auth.token;

  console.log(isAuthenticated)
  console.log(auth)

  
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        login,
        isAuthenticated,
        logout,
        auth,
        documentType,
        setDocumentType,
        fileContext,
        setfileContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppProvider;
