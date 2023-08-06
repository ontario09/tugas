"use client";
import { useState } from "react";
import Api from "../Components/Api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface mahasiswa {
  nama: string;
  image?: string;
  no_hp?: string;
  alamat?: string;
  email?: string;
  jurusan: string;
}
export default function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    jurusan: "",
    no_hp: "",
    email: "",
    alamat: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    setFormData((prevData) => ({ ...prevData, image: event.target.files[0] }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await Api.post("/api/mahasiswa", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
      });
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pengisian");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="pt-24 flex flex-col items-center gap-y-2">
        <h1 className="text-center text-2xl ">Tambah Data Mahasiswa</h1>
        <button
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          type="button"
          onClick={() => router.push("/")}
        >
          Back Dashbord
        </button>
      </div>

      <div className="flex items-center w-full p-12">
        <div className="mx-auto justify-between">
          <form>
            <div className="flex flex-row gap-x-16">
              <div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Silahkan Isikan Nama....."
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Nomer HP
                  </label>
                  <input
                    name="no_hp"
                    type="text"
                    value={formData.no_hp}
                    onChange={handleInputChange}
                    placeholder="Silahkan Isikan Nama....."
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Alamat
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    placeholder="Silahkan Isikan Alamat lengkap......"
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Jurusan
                  </label>
                  <div className="flex flex-row">
                    <select
                      name="jurusan"
                      value={formData.jurusan}
                      onChange={handleInputChange}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Teknologi Informasi</option>
                      <option>Sistem Informasi</option>
                      <option>Pertanian</option>
                      <option>Akutansi</option>
                      <option>Bahasa</option>
                      <option>Seni</option>
                    </select>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="hover:shadow-form w-[100%] rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
