"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ItemFormData } from "@/interface/ItemFormData";

const Form: React.FC = () => {
  const [form, setForm] = useState<ItemFormData>({
    amount: "",
    name: "",
    picture: null,
    price: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files) {
      setForm((prevForm) => ({
        ...prevForm,
        picture: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (form.amount && form.name && form.picture && form.price) {
        const pictureRef = ref(storage, `images/${form.picture.name}`);
        await uploadBytes(pictureRef, form.picture);
        const pictureURL = await getDownloadURL(pictureRef);

        await addDoc(collection(db, "items"), {
          amount: form.amount,
          name: form.name,
          picture: pictureURL,
          price: form.price,
        });

        console.log("Document successfully written!");
        setForm({ amount: "", name: "", picture: null, price: "" });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="my-16 px-8 xl:px-0">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto px-6 py-12 xl:px-0 bg-white"
        >

          <div className="mb-4">
            <h1 className="text-xl font-bold text left">Add Shop Item</h1>
          </div>
         
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="picture"
            >
              Picture
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleChange}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
