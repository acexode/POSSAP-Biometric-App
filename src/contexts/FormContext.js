/* eslint-disable prettier/prettier */
import { createContext, useEffect, useRef, useState } from 'react';

const ServiceFormContext = createContext(null);

const ServiceFormProvider = ({ children }) => {
  const [serviceFormvalues, setserviceFormvalues] = useState({});

  const handleFormChange = (obj) => {
    setserviceFormvalues({...serviceFormvalues, ...obj});
  };

  return <ServiceFormContext.Provider value={{ handleFormChange, serviceFormvalues }}>{children}</ServiceFormContext.Provider>;
};

export { ServiceFormContext, ServiceFormProvider };
