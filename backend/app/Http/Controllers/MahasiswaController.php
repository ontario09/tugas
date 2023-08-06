<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use App\Http\Resources\MasiswaResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MahasiswaController extends Controller
{
    //menampilkan semua data dari resource dengan mengembalikan secara json
    public function index()
    {
        $mahasiswas = Mahasiswa::all();
        return new MasiswaResource(true, 'List Data Mahasiswa', $mahasiswas);
    }


    //menambah data mahasiswa
    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'image'     => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'nama'     => 'required|string',
            'email'   => 'email',
            'jurusan'   => 'required|string',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        if ($image){
            $image->storeAs('public/image', $image->hashName());
            $image = $image->hashName();
        }
        

        //membuat data mahasiswa
        $mahasiswa = Mahasiswa::create([
            'image'     => $image,
            'nama'     => $request->nama,
            'no_hp'     => $request->no_hp,
            'email'   => $request->email,
            'jurusan'   => $request->jurusan,
            'alamat'   => $request->alamat,
        ]);

        //return response
        return new MasiswaResource(true, 'Data Mahasiswa Berhasil Ditambahkan!', $mahasiswa);
    }

    public function show($id)
    {
        //cari data berdasarkan ID
        $mahasiswa = Mahasiswa::find($id);

        //return satu data mahasiswa
        return new MasiswaResource(true, 'Detail Data Mahasiswa!', $mahasiswa);
    }

    public function update(Request $request, $id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'nama'     => 'required|string',
            'email'   => 'email',
            'jurusan'   => 'required|string',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //cari data berdasarkan ID
        $mahasiswa = Mahasiswa::find($id);

        //check if image is not empty
        if ($request->hasFile('image')) {

            //upload image
            $image = $request->file('image');
            $image->storeAs('public/image', $image->hashName());

            //delete old image
            Storage::delete('public/image/'.basename($mahasiswa->image));

            //update data mahasiswa dengan image baru
            $mahasiswa->update([
                'image'     => $image,
                'nama'     => $request->nama,
                'no_hp'     => $request->no_hp,
                'email'   => $request->email,
                'jurusan'   => $request->jurusan,
                'alamat'   => $request->alamat,
            ]);

        } else {

            //update data mahasiswa dengan tanpa
            $mahasiswa->update([
                'nama'     => $request->nama,
                'no_hp'     => $request->no_hp,
                'email'   => $request->email,
                'jurusan'   => $request->jurusan,
                'alamat'   => $request->alamat,
            ]);
        }

        //return response
        return new MasiswaResource(true, 'Data Mahasiswa Berhasil Diubah!', $mahasiswa);
    }

    public function destroy($id)
    {

         //cari data berdasarkan ID
        $mahasiswa = Mahasiswa::find($id);

        //delete image
        Storage::delete('public/image/'.basename($mahasiswa->image));

        //delete data mahasiswa
        $mahasiswa->delete();

        //return response
        return new masiswaResource(true, 'Data Mahasiswa Berhasil Dihapus!', null);
    }
}
