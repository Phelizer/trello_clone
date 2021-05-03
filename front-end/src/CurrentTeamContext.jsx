/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { createContext, useState } from "react";

export const CurrentTeamContext = createContext();

export const CurrentTeamProvider = (props) => {
  const [currTeamID, setCurrTeamID] = useState(null);

  return (
    <CurrentTeamContext.Provider value={[currTeamID, setCurrTeamID]}>
      {props.children}
    </CurrentTeamContext.Provider>
  );
};
