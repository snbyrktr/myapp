import "./styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

// tablo basliklari, json dosyasındaki veri adlandirmalarina gore
const columns = [
  {
    dataField: "name",
    text: "Name",
    sort: true
  },
  {
    dataField: "capital",
    text: "Capital",
    filter: textFilter(),
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: "60%" };
    },
    style: (column, colIndex) => {
      return { fontSize: "110%" };
    }
  },
  {
    dataField: "region",
    text: "Region",
    filter: textFilter()
  },
  {
    dataField: "flag",
    text: "Flag"
  }
];

// json dosyasinin okunup, countries ve setcountries e atanmasi
export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((Response) => setCountries(Response.data))
      .catch((error) => console.log({ error }));
  }, []);

  // countries e atanan verinin tabloya aktarimi
  return (
    <div className="App">
      {countries.map((country) => {
        return (
          <div key={country.id}>
            <BootstrapTable
              keyField="id"
              data={countries}
              columns={columns}
              filter={filterFactory()}
            />
          </div>
        );
      })}
    </div>
  );
}
