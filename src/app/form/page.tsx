"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { db, storage } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ItemFormData {
  amount: string;
  name: string;
  picture: File | null;
  price: string;
}

interface ItemData {
  id: string;
  amount: string;
  name: string;
  picture: string;
  price: string;
}

const Form: React.FC = () => {
  const [form, setForm] = useState<ItemFormData>({ amount: '', name: '', picture: null, price: '' });
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const itemsData: ItemData[] = [];
    querySnapshot.forEach((doc) => {
      itemsData.push({ id: doc.id, ...doc.data() } as ItemData);
    });
    setItems(itemsData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'picture' && files) {
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

        await addDoc(collection(db, 'items'), {
          amount: form.amount,
          name: form.name,
          picture: pictureURL,
          price: form.price,
        });

        console.log("Document successfully written!");
        setForm({ amount: '', name: '', picture: null, price: '' });
        fetchItems(); 
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">Picture</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Item
        </button>
      </form>

      <div className="max-w-full mx-auto p-4 bg-white shadow-md rounded-lg mt-4 ">
        <h2 className="text-lg font-bold mb-4">Items</h2>
        {items.map((item) => ( 
          <div key={item.id} className="mb-4 p-4 border rounded-lg ">
            <p><strong>Amount:</strong> {item.amount}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Price:</strong> {item.price}</p>
            {item.picture && <img src={item.picture} alt={item.name} className="mt-2" />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Form;
