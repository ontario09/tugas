"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Api from "./Api";
import toast, { Toaster } from "react-hot-toast";

type mahasiswa = {
  id: number;
  nama: string;
  no_hp?: string;
  alamat?: string;
  email?: string;
  jurusan: string;
};

export default function UpdateMahasiswa(mahasiswa: mahasiswa) {
  const [nama, setNama] = useState(mahasiswa.nama);
  const [no_hp, setNo_hp] = useState(mahasiswa.no_hp);
  const [alamat, setAlamat] = useState(mahasiswa.alamat);
  const [email, setEmail] = useState(mahasiswa.email);
  const [jurusan, setJurusan] = useState(mahasiswa.jurusan);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const Payload = {
      nama,
      jurusan,
      no_hp,
      email,
      alamat,
    };

    try {
      const response = await Api.put("/api/mahasiswa/" + mahasiswa.id, Payload);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
      });
      setIsMutating(false);

      setModal(false);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <Toaster />
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {mahasiswa.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input w-full input-bordered"
                placeholder="masukan nama"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Nomer HP</label>
              <input
                type="text"
                value={no_hp}
                onChange={(e) => setNo_hp(e.target.value)}
                className="input w-full input-bordered"
                placeholder="masukan nomer hp"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full input-bordered"
                placeholder="masukan nomer hp"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Alamat</label>
              <textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="input w-full input-bordered"
                placeholder="masukan nomer hp"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label font-bold">jurusan</label>
              <input
                type="text"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
