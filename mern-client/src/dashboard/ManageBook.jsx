import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react";

const ManageBook = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

    // Fetch all books
    useEffect(() => {
        fetch("http://localhost:5000/all-books")
            .then(res => res.json())
            .then(data => setAllBooks(data))
            .catch(err => console.error("Error fetching books:", err));
    }, []);

    // 🛡️ Delete with Confirmation and instant UI update
    const handledelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
    
    if (confirmDelete) {
        fetch(`http://localhost:5000/book/${id}`, {
            method: "DELETE",
        })
        .then(async (res) => {
            if (res.ok) {
                alert("Resource deleted successfully ✅");
                const remainingBooks = allBooks.filter(book => book._id !== id);
                setAllBooks(remainingBooks);
            } else {
                const errorData = await res.json();
                alert(`Failed to delete: ${errorData.message}`);
            }
        })
        .catch(err => {
            console.error("Network Error:", err);
            alert("Server connection failed. Is the backend running?");
        });
    }
}

    // 🔎 Filter books based on search query
    const filteredBooks = allBooks.filter(book => 
        book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='px-4 my-12'>
            <div className="flex justify-between items-center mb-8 lg:w-[1180px]">
                <h2 className='text-3xl font-bold'>Manage Your Resources</h2>
                
                {/* Search Bar Input */}
                <div className="w-72">
                    <TextInput 
                        id="search" 
                        type="text" 
                        placeholder="Search by title, author, or category..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className='lg:w-[1180px] shadow-md'>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>No.</TableHeadCell>
                            <TableHeadCell>Resource name</TableHeadCell>
                            <TableHeadCell>Provider Name</TableHeadCell>
                            <TableHeadCell>Category</TableHeadCell>
                            <TableHeadCell>Manage</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody className="divide-y">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <TableRow key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="font-bold">{index + 1}</TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {book.bookTitle}
                                    </TableCell>
                                    <TableCell>{book.authorName}</TableCell>
                                    <TableCell>{book.category}</TableCell>
                                    <TableCell className="flex gap-4 items-center">
                                        <Link
                                            to={`/admin/dashboard/EditBook/${book._id}`}
                                            className="font-medium text-blue-700 hover:underline dark:text-cyan-500"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handledelete(book._id)} 
                                            className="bg-red-600 px-4 py-1 font-semibold text-white rounded hover:bg-red-800 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                    No resources found matching "{searchQuery}"
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ManageBook;