import React, { useState, useEffect } from "react";

const Logs = () => {
  const [providerData, setProviderData] = useState([]);
  const [payerData, setPayerData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const providerResponse = await fetch(
          "http://localhost:3000/getProviderData"
        );
        const payerResponse = await fetch("http://localhost:3000/getPayerData");
        if (!providerResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        if (!payerResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const data1 = await providerResponse.json();
        const data2 = await payerResponse.json();
        setProviderData(data1);
        setPayerData(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <p className="text-xl font-semibold mb-4 mx-auto w-max">
          Provider Registrations
        </p>
        {providerData !== null &&
          providerData.map((item, index) => (
            <li key={index} className="list-none mb-4">
              {item.entity != null && (
                <div className="bg-white rounded-lg shadow-md p-4 w-2/3 mx-auto w-max">
                  {item.entity} - {item.physical_address} -{" "}
                  {item.firstname + " " + item.lastname}
                </div>
              )}
            </li>
          ))}

        <hr className="border-b-2 mb-4 mt-4" />

        <p className="text-xl font-semibold mb-4 mx-auto w-max">
          Payer Registrations
        </p>
        {payerData !== null &&
          payerData.map((item, index) => (
            <li key={index} className="list-none mb-4">
              {item.entity != null && (
                <div className="bg-white rounded-lg shadow-md p-4 w-2/3 mx-auto w-max">
                  {item.entity} - {item.physical_address} -{" "}
                  {item.firstname + " " + item.lastname}
                </div>
              )}
            </li>
          ))}
      </div>
    </>
  );
};

export default Logs;
