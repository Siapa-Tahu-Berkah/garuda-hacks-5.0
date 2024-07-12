// components/UploadForm.tsx
import { useState } from 'react';
import { db, storage } from '../../app/form/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);

    try {

      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'voucher'), {
        title,
        brand,
        discount,
        description,
        image: imageUrl,
      });

      setTitle('');
      setBrand('');
      setDiscount('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error("Error uploading file and saving data:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Discount:</label>
        <input
          type="text"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700">Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default UploadForm;
