import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import api from "@/app/Components/Api";
import placehosderimg from "@/public/placeholder (1).jpg";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

interface mahasiswa {
  id: number;
  nama: string;
  image?: string;
  jurusan: string;
}

async function getMahasiswa() {
  const response = await api.get("/api/mahasiswa");
  const data = response.data.data;
  return data;
}

export default async function Home() {
  const mahasiswa: mahasiswa[] = await getMahasiswa();
  const linkImg = "http://localhost/storage/image/";

  return (
    <div className="max-h-max bg-primary/30 py-32 lg:py-20 justify-center items-center">
      <Toaster />
      <div className="container mx-auto">
        <div className="py-8 flex flex-col gap-2 justify-center items-center">
          {/* text */}
          <div className="text-center mb-4">
            <h2 className="font-poppins text-[20px] leading-tight sm:text-[25px] md:text-[35px] md:leading-[1.3] font-semibold">
              Data <span className="text-blue-500">Mahasiswa</span>
            </h2>
          </div>
          <div className="w-[70%] flex flex-row justify-between items-center py-8">
            <div>search</div>
            <Link
              href={"/create"}
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Tambah Mahasiswa
            </Link>
          </div>
          <div className="mx-auto justify-center gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center">
            {mahasiswa.map((item) => {
              return (
                <div className="bg-secondary border border-solid border-black rounded-xl flex flex-col group relative z-20 overflow-hidden items-center">
                  <div className="px-4 pt-4 group">
                    {item.image ? (
                      <Image
                        src={linkImg + item.image}
                        alt=""
                        width={200}
                        height={200}
                        className="rounded-xl"
                      />
                    ) : (
                      <Image
                        src={placehosderimg}
                        alt=""
                        width={270}
                        height={270}
                        className="rounded-xl"
                      />
                    )}
                  </div>
                  <div className="p-4 group">{item.nama}</div>
                  <p className="px-4 line-clamp-2 mb-4 group">{item.jurusan}</p>
                  {/* overlay gradient */}
                  <div className="absolute rounded-xl inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                  <div className="absolute text-center items-center justify-center bottom-0 translate-y-full group-hover:-translate-y-36 lg:group-hover:-translate-y-40 xl:group-hover:-translate-y-36 transition-all">
                    <Link
                      href={"/" + item.id}
                      className="flex items-center gap-x-2 text-[13px] tracking-[0.2rem]"
                    >
                      <div className="delay-100">MORE</div>
                      <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                        INFO
                      </div>
                      <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200">
                        <BsArrowRight />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
