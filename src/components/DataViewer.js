import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";

const DATA_URL = "https://dummyjson.com/products";
let id = 0;

export default function DataViewer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let controller = new AbortController();

    const fetchData = async () => {
      const response = await fetch(`${DATA_URL}`);
      const data = await response.json();
      setData(data);
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  // recursively display the data
  function display(arr) {
    return arr.map(([key, val], i) => {
      const type = Array.isArray(val)
        ? "(array)"
        : typeof val == "object"
        ? "(object)"
        : typeof val == "string"
        ? "(string)"
        : typeof val == "number"
        ? "(number)"
        : "";

      return (
        // an array could contain a list of objects or list of elements
        // an object contain key-value pairs. the value could be an array or an element
        // if val is an array ... else if val is an object ... else ...
        <div key={key} className="child">
          {key} {type}:{" "}
          {typeof val === "object" ? (
            <ShowData>{display(Object.entries(val))}</ShowData>
          ) : Array.isArray(val) ? (
            <ShowData>
              {val.map((item, index) => display([index, item]))}
            </ShowData>
          ) : (
            JSON.stringify(val)
          )}
        </div>
      );
    });
  }

  // the fetched data is an Object. it is converted to array using literal []
  return <div>{display(Object.entries([data]))}</div>;
}
