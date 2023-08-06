import React from "react";
import placehosderimg from "@/public/placeholder (1).jpg";
import Image from "next/image";
import Api from "./Api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UpdateMahasiswa from "./updateMahasiswa";

const DetailData = ({ data }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const response = await Api.delete(`/api/mahasiswa/${id}`); // Adjust the API endpoint
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
      });
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const linkImg = "http://localhost/storage/image/";
  return (
    <div className="relative container mx-auto items-center justify-center">
      <Toaster />
      <div className="flex flex-row pt-32 items-center justify-center p-4 w-[80%]">
        <div className="w-1/2 h-56 relative overflow-hidden rounded-lg">
          {data.image ? (
            <Image
              src={linkImg + data.image}
              alt=""
              width={200}
              height={200}
              className="rounded-xl object-cover"
            />
          ) : (
            <Image
              src={placehosderimg}
              alt=""
              width={270}
              height={270}
              className="rounded-xl object-cover"
            />
          )}
        </div>

        <div className="w-full pl-14">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{data.nama}</h1>
            <span className="block font-semibold">{data.jurusan}</span>
          </div>
          <p className="leading-loose mb-5">{data.alamat}</p>
          <p className="leading-loose mb-5">{data.no_hp}</p>
          <p className="leading-loose mb-5">{data.email}</p>
          <button
            type="button"
            onClick={() => {
              handleDelete(data.id);
            }}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Delete
          </button>
          <UpdateMahasiswa {...data} />
        </div>
      </div>
    </div>
  );
};

export default DetailData;
