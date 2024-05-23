import { Button } from '@nextui-org/react';
import React from 'react';

const AddPage = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-zinc-900 text-green-600 h-full  sm:h-[calc(100vh-6rem)] pb-6 sm:pb-0">
            <h1 className="font-bold text-2xl text-white md:pb-10">Add New Product</h1>
            <form className="grid md:grid-cols-2  gap-4 ">
                <div className="flex flex-col">
                    <label>Title</label>
                    <input type="text" name="title" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none "/>
                </div>
                <div className="flex flex-col">
                    <label>Description</label>
                    <textarea name="description" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none"/>
                </div>
                <div className="flex flex-col">
                    <label>Price</label>
                    <input type="number" name="price" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none"/>
                </div>
                <div className="flex flex-col">
                    <label>Category</label>
                    <input type="text" name="category" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none"/>
                </div>
                <div className="flex flex-col gap-4">
                    <label>Options</label>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <input type="text" placeholder="Title" name="title" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                        <input type="number" placeholder="Additional Price" name="additionalPrice" className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-300 outline-none"/>
                    </div>
                    <Button>Add Option</Button>
                </div>
                <div className="flex gap-6 flex-col text-white">
                    <span className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none">Small</span>
                    <span className="ring-1 ring-green-200 p-2 rounded-lg placeholder:text-green-200 outline-none">2$</span>
                </div>
                <Button type="submit" color="success" className="sm:col-span-2">Submit</Button>
            </form>
        </div>
      );
}

export default AddPage