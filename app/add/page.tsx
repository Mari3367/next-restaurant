"use client";
import { Button } from '@nextui-org/react';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid';

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
}

type Option = {
    title: string;
    additionalPrice: number;
}

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });


  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

 if (status === "loading") {
   return <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] bg-zinc-900 flex justify-center items-center">
            <p className="text-green-600 text-2xl">Loading...</p>
        </div>
    }

  if (status === "unauthenticated" || !session?.user.name && session?.user.name !== 'admin') {
    router.push("/");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev)=> {
        return {...prev, [e.target.name]: e.target.value};
    });
  }

 

  const changeOption = (e:React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
    console.log(item)
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");

    const res = await fetch("https://api.cloudinary.com/v1_1/dd5jfb1in/image/upload", {
      method: "POST",
      body: data,
    });

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <div className="flex flex-col justify-start items-center bg-zinc-900 text-green-600 p-6 h-full ">
            <h1 className="font-bold text-2xl text-white md:pb-10">Add New Product</h1>
            <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChange} className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none "/>
                </div>
                <div className="flex flex-col">
                    <label>Description</label>
                    <textarea name="desc" onChange={handleChange} className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                </div>
                <div className="flex flex-col">
                    <label>Price</label>
                    <input type="number" name="price" onChange={handleChange} className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                </div>
                <div className="flex flex-col">
                    <label>Category</label>
                    <input type="text" name="catSlug" onChange={handleChange} className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="file" className="cursor-pointer flex gap-4">Upload Image<ArrowUpOnSquareIcon className="w-[20px]"/></label>
                    <input type="file" className="cursor-pointer" id="file" onChange={handleChangeImg}/>
                </div>
                <div className="flex flex-col gap-4">
                    <label>Options</label>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <input type="text" onChange={changeOption} placeholder="Title" name="title" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                        <input type="number" onChange={changeOption} placeholder="Additional Price" name="additionalPrice" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                    </div>
                    <Button onClick={() => setOptions((prev) => [...prev, option])}>Add Option</Button>
                </div>
                <div className="flex gap-6 flex-col text-white">
                    {options.map((opt)=>(
                        <div key={opt.title} className="flex gap-2 flex-col"
                        onClick={() =>
                            setOptions((prev) =>
                              prev.filter((item) => item.title !== opt.title)
                            )
                          }
                        >
                            <span className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none">{opt.title}</span>
                            <span className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none">${opt.additionalPrice}</span>
                        </div>
                    ))}
                </div>
                <Button type="submit" color="success" className="sm:col-span-2">Submit</Button>
            </form>
        </div>
      );
}

export default AddPage