import { useLoaderData, useParams } from 'react-router'
import React, { useState } from 'react'
import { Button, Label, TextInput, Textarea } from "flowbite-react";

const EditBook = () => {
    const { id } = useParams();
    const { bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL } = useLoaderData();

    const bookCategory = ["Presentation", "textbook", "Digital Notes", "HandWritten Notes", "Books", "Report", "Project", "Previous year Paper"];
    
    const [selectedBookCategory, setSelectedBookCategory] = useState(category || bookCategory[0]);
    const [pdfFile, setPdfFile] = useState(null); // State for new file
    const [loading, setLoading] = useState(false);

    const handlechangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    }

    const handleupdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        const form = event.target;
        
        // 📦 Prepare FormData (matches Upload logic)
        const formData = new FormData();
        formData.append("bookTitle", form.bookTitle.value);
        formData.append("authorName", form.authorName.value);
        formData.append("imageURL", form.imageURL.value);
        formData.append("category", selectedBookCategory);
        formData.append("bookDescription", form.bookDescription.value);
        
        // Only append the file if a new one is selected
        if (pdfFile) {
            formData.append("bookFile", pdfFile);
        }

        try {
            const res = await fetch(`http://localhost:5000/book/${id}`, {
                method: "PATCH",
                // Note: Do NOT set Content-Type header when sending FormData
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                alert("Resource Updated Successfully ✅");
            } else {
                alert(`Update failed: ${data.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Server error ❌");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Update Resource: <span className="text-blue-600">{bookTitle}</span></h2>
            
            <form onSubmit={handleupdate} className="flex lg:w-[1180px] flex-col gap-4">
                
                {/* Title + Author */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="bookTitle" value='Resource Title' />
                        </div>
                        <TextInput id="bookTitle" name="bookTitle" type="text" defaultValue={bookTitle} required />
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="authorName" value="Provider's Name" />
                        </div>
                        <TextInput id="authorName" name="authorName" type="text" defaultValue={authorName} required />
                    </div>
                </div>

                {/* Image + Category */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="imageURL" value='Image URL' />
                        </div>
                        <TextInput id="imageURL" name="imageURL" type="text" defaultValue={imageURL} required />
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="inputState" value='Resource Category' />
                        </div>
                        <select id="inputState" name="category" className='w-full h-10 rounded-lg border-gray-300 border' 
                            value={selectedBookCategory} onChange={handlechangeSelectedValue}>
                            {bookCategory.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="bookDescription" value='Resource Description' />
                    </div>
                    <Textarea id="bookDescription" name="bookDescription" defaultValue={bookDescription} required rows={4} />
                </div>

                {/* New File Upload (Optional) */}
                <div className="bg-blue-50 p-4 border-2 border-dashed border-blue-200 rounded-lg">
                    <Label className="mb-2 block font-semibold text-blue-700">Update Resource File (Optional)</Label>
                    <input
                        type="file"
                        accept=".pdf,.ppt,.pptx"
                        onChange={(e) => setPdfFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
                    />
                    <p className="mt-1 text-xs text-gray-500">Current File: {bookPDFURL.split('/').pop()}</p>
                </div>

                <div>
                    <Button type='submit' disabled={loading} className='mt-5 w-full bg-blue-700'>
                        {loading ? "Updating..." : "Update Resource"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;