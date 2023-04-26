import { Outlet, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import Table from "./components/tables/table";
import { NavBar } from "./components/nav/navBar";
import DetailsView from "./components/tables/details";
import DataDictionary from "./components/DataDictionaries/dataDictionary";
import DataDictionaryReferences from "./components/DataDictionaries/dataDictionaryReferences";

export const myContext = createContext();
export const App = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(true);

  return (
    <myContext.Provider
      value={{
        selectedObject,
        setSelectedObject,
        filterText,
        setFilterText,
        loading,
        setLoading,
        details,
        setDetails,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Table />} />
          <Route path="/details/:studyId" element={<DetailsView />} />
          <Route path="/dataDictionary" element={<DataDictionary />} />
          <Route
            path="/dataDictionary/:DDReference"
            element={<DataDictionaryReferences />}
          />
        </Route>
      </Routes>
    </myContext.Provider>
  );
};
