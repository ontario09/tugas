"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/app/Components/Api";

const page = () => {
  const router = useRouter();
  const dynamicId = router.query.id; // Access the id query parameter
  console.log(dynamicId);
  //   const { id } = params;
  //   const [detailData, setDetailData] = useState(null);

  //   useEffect(() => {
  //     // Fetch detailed data using Axios
  //     const fetchData = async () => {
  //       try {
  //         const response = await api.get("/api/mahasiswa/" + id); // Adjust the API endpoint
  //         setDetailData(response.data.data);
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <div>
      {/* {detailData ? <DetailData data={detailData} /> : <p>Loading...</p>} */}
      <p>Loading...</p>
    </div>
  );
};

export default page;
