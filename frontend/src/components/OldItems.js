import React, { useState } from "react";

function OldItems() {
  // Modal বা ফর্ম টগল করার জন্য স্টেট
  const [showAddItem, setShowAddItem] = useState(false);

  // ছবির প্রিভিউ স্টেট
  const [imagePreview, setImagePreview] = useState(null);

  // Add Item বাটনে ক্লিক করলে সেটি টগল হবে
  const handleAddItemClick = () => {
    setShowAddItem(!showAddItem);
  };

  // ছবি সিলেক্ট করার ফাংশন
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // প্রিভিউ হিসেবে ছবির ডাটা সেট করা
      };
      reader.readAsDataURL(file); // ফাইলের ডাটা URL এ রূপান্তর করা
    }
  };

  return (
    <div>
      <h1>Old Items Selling Page</h1>
      <button onClick={handleAddItemClick}>Add Item</button>

      {/* যদি showAddItem স্টেট true হয়, তাহলে Add Item ফর্ম শো হবে */}
      {showAddItem && (
        <div>
          <h2>Add New Item</h2>
          {/* আইটেম যোগ করার ফর্ম */}
          <form>
            <input type="text" placeholder="Item Name" required />
            <input type="text" placeholder="Item Description" required />
            <input type="number" placeholder="Price" required />
            
            {/* ছবির আপলোড */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {/* ছবির প্রিভিউ */}
            {imagePreview && <img src={imagePreview} alt="Item Preview" width="200" />}
            
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default OldItems;
