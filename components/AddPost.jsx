'use client';
// import { Image, Clip, Attachment, Mic } from '@mui/icons-material';
import React from 'react'
import useAddPost from '@/libs/hooks/use-AddPost';
import { useGlobalContext } from '@/store';
import axios from 'axios';


const AddPost = () => {
  const {
    values,
    handleChange,
    errors,
    isSubmitting,
  } = useAddPost();


  const { user, token, setPosts, posts } = useGlobalContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const isValid = values.description && values.picturePath;
    if (isValid) {
      try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append("description", values.description);
        formData.append("userId", user._id);
        formData.append("picture", values.picturePath); // Note: Use "picture" to match your backend field name

        const response = await axios.post("http://localhost:3001/posts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error("Error uploading post:", error);
      }
    }

  }



  return (
    <div className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-md w-full m-4 ">
      {/* Profile and Input */}
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="block text-sm font-medium text-gray-200"></label>
            <input
              type="text"
              name="description"
              placeholder='What are you thinking?'
              value={values.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}

          <div className="flex items-center justify-between">
            <label htmlFor="picturePath" className="block text-sm font-medium text-gray-200">Attachment? </label>
            <input
              type="file"
              name="picturePath"
              onChange={(e) => handleChange({ target: { name: "picturePath", value: e.target.files[0] } })}
              className="w-3/4 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          {errors.picturePath && <div className="text-red-500 text-sm">{errors.picturePath}</div>}
        </div>


        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex space-x-4 text-gray-400">
            <button className="flex items-center space-x-1 hover:text-gray-200">
              <span className="material-icons">image</span>
              {/* <span>Image</span> */}
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-200">
              <span className="material-icons">clip</span>

            </button>
            <button className="flex items-center space-x-1 hover:text-gray-200">
              <span className="material-icons">attachment</span>
              {/* <span>Attachment</span> */}
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-200">
              <span className="material-icons">mic</span>
              {/* <span>Audio</span> */}
            </button>
          </div>
          <button
            type='submit'
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            POST
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
