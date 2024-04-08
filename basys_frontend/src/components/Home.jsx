import React, { useEffect, useState } from "react";

const Home = () => {
  const baseUrl = JSON.stringify(import.meta.env.VITE_REACT_API_URL);

  const [payer, setPayer] = useState(0);
  const [provider, setProvider] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payerResponse = await fetch(`${baseUrl}/getPayerData`);
        const providerResponse = await fetch(`${baseUrl}/getProviderData`);
        if (!payerResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        if (!providerResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const data1 = await payerResponse.json();
        const payerCount = data1.length;
        const data2 = await providerResponse.json();
        const providerCount = data2.length;
        setPayer(payerCount);
        setProvider(providerCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <div className="h-4/5 flex flex-row justify-center items-center gap-4">
      <div class="w-1/3 h-1/5 bg-blue-500 rounded-lg text-white p-4">
        <div className="mx-auto w-max">
          <p>Total Payers</p>
          <p className="text-3xl mx-auto w-max">{payer}</p>
        </div>
      </div>
      <div class="w-1/3 h-1/5 bg-blue-500 rounded-lg text-white p-4">
        <div className="mx-auto w-max">
          <p>Total Providers</p>
          <p className="text-3xl mx-auto w-max">{provider}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
