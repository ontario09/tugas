"use client";
import { useEffect, useState } from "react";
import api from "@/app/Components/Api";
import DetailData from "../Components/DetailData";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    // Fetch detailed data using Axios
    const fetchData = async () => {
      try {
        const response = await api.get("/api/mahasiswa/" + id); // Adjust the API endpoint
        setDetailData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {detailData ? <DetailData data={detailData} /> : <p>Loading...</p>}
    </div>
  );
};

export default page;
