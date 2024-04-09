import React, { useEffect, useState } from "react";

const Home = () => {
  const baseUrl = import.meta.env.VITE_REACT_API_URL;

  const [payer, setPayer] = useState(0);
  const [provider, setProvider] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payerResponse, providerResponse] = await Promise.all([
          fetch(`${baseUrl}/getPayerData`),
          fetch(`${baseUrl}/getProviderData`),
        ]);

        if (!payerResponse.ok || !providerResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [payerData, providerData] = await Promise.all([
          payerResponse.json(),
          providerResponse.json(),
        ]);

        const payerCount = payerData.length;
        const providerCount = providerData.length;

        setPayer(payerCount);
        setProvider(providerCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
