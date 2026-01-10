import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

const Upload = () => {
  const bookCategory = [
    "Presentation",
    "Textbook",
    "Digital Notes",
    "HandWritten Notes",
    "Books",
    "Report",
    "Project",
    "Previous Year Paper",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategory[0]);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!pdfFile) {
      return alert("Please select a PDF or PPT file");
    }

    // 🔐 Client-side validation (Optional but recommended)
    if (pdfFile.size > 10 * 1024 * 1024) {
      return alert("File size must be less than 10MB");
    }

    setLoading(true);

    try {
      // 📦 Prepare FormData for Multer
      const formData = new FormData();
      formData.append("bookFile", pdfFile); // Key matches backend 'upload.single("bookFile")'
      formData.append("bookTitle", form.bookTitle.value);
      formData.append("authorName", form.authorName.value);
      formData.append("imageURL", form.imageURL.value);
      formData.append("category", selectedBookCategory);
      formData.append("bookDescription", form.bookDescription.value);

      // 🚀 Send to your Express Backend
      const res = await fetch("http://localhost:5000/upload-books", {
        method: "POST",
        // IMPORTANT: No 'Content-Type' header here. The browser sets it for FormData.
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Resource uploaded successfully ✅");
        form.reset();
        setPdfFile(null);
        setSelectedBookCategory(bookCategory[0]);
      } else {
        alert(`Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Server error ❌. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Upload Your Resource (to Local Server)</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col gap-4">
        {/* Title + Author */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Resource Title" />
            </div>
            <TextInput id="bookTitle" type="text" placeholder="Enter title" required />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Provider Name" />
            </div>
            <TextInput id="authorName" type="text" placeholder="Your name" required />
          </div>
        </div>

        {/* Image + Category */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Image URL" />
            </div>
            <TextInput id="imageURL" type="text" placeholder="Thumbnail image URL" required />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Category" />
            </div>
            <select
              id="inputState"
              name="categoryName"
              className="w-full h-10 rounded-lg border-gray-300 border"
              value={selectedBookCategory}
              onChange={(e) => setSelectedBookCategory(e.target.value)}
            >
              {bookCategory.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Description" />
          </div>
          <Textarea id="bookDescription" placeholder="Write resource description..." rows={4} required />
        </div>

        {/* File Upload */}
        <div className="bg-gray-50 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Label className="mb-2 block font-semibold">Upload File (PDF / PPT)</Label>
          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            required
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">Max file size: 10MB</p>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading} className="mt-5 bg-blue-700">
          {loading ? "Uploading to Server..." : "Upload Resource"}
        </Button>
      </form>
    </div>
  );
};

export default Upload;