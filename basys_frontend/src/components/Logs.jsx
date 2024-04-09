import React, { useState, useEffect } from "react";

const Logs = () => {
  const baseUrl = import.meta.env.VITE_REACT_API_URL;
  const [activeButton, setActiveButton] = useState("Providers");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const [providerData, setProviderData] = useState([]);
  const [payerData, setPayerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [providerResponse, payerResponse] = await Promise.all([
          fetch(`${baseUrl}/getProviderData`),
          fetch(`${baseUrl}/getPayerData`),
        ]);

        if (!providerResponse.ok || !payerResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [providerData, payerData] = await Promise.all([
          providerResponse.json(),
          payerResponse.json(),
        ]);

        setProviderData(providerData);
        setPayerData(payerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-4 mb-4 gap-2 bg-gray-400 max-w-max mx-auto rounded-sm">
        <button
          className={` py-2 m-2 px-4 rounded ${
            activeButton === "Providers" ? "bg-white" : ""
          }`}
          onClick={() => handleButtonClick("Providers")}
        >
          Provider Registrations
        </button>
        <button
          className={` py-2 px-4 rounded m-2 ${
            activeButton === "Payers" ? "bg-white" : ""
          }`}
          onClick={() => handleButtonClick("Payers")}
        >
          Payer Registrations
        </button>
      </div>

      <div>
        {providerData !== null &&
          activeButton === "Providers" &&
          providerData.map((item, index) => (
            <li key={index} className="list-none mb-4">
              {item.entity != null && (
                <div className="bg-white rounded-lg shadow-md p-4 mx-auto w-3/5 flex flex-col overflow-y-auto">
                  <p>Entity Name: {item.entity}</p>
                  <p>Physical Address:{item.physical_address}</p>
                  <p>
                    Point of Contact: {item.firstname + " " + item.lastname}
                  </p>
                </div>
              )}
            </li>
          ))}

        {payerData !== null &&
          activeButton === "Payers" &&
          payerData.map((item, index) => (
            <li key={index} className="list-none mb-4">
              {item.entity != null && (
                <div className="bg-white rounded-lg shadow-md p-4 mx-auto w-3/5 flex flex-col overflow-y-auto">
                  <p>Entity Name: {item.entity}</p>
                  <p>Physical Address: {item.physical_address}</p>
                  <p>
                    Point of Contact: {item.firstname + " " + item.lastname}
                  </p>
                  <p>Status:</p>
                </div>
              )}
            </li>
          ))}
      </div>
    </div>
  );
};

export default Logs;
