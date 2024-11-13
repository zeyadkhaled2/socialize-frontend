'use client';
import axios from 'axios';
import { useGlobalContext } from '@/store';
import React, { useEffect } from 'react';


// Posts
const Feed = () => {
  const { posts, token, user, setPosts } = useGlobalContext();
  

  const globalPostURL = "http://localhost:3001/assets/";


  const onLikeHandler = async (postId) => {
    try {
      const response = await axios.patch(`http://localhost:3001/posts/${postId}/like`, { userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
        const newPosts = posts.map((post) => {
          if (post._id === postId) {
            return response.data;
          }
          return post;
        })
        setPosts(newPosts);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    };


    // Adding wait for the posts to load here before rendering the posts
    if (typeof posts === 'undefined') {
      return <div>Loading...</div>
    }

    return (
      <div>
        {posts.map((post) => (
          <div key={post._id} className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-md w-full m-4 h-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Display user picture */}

                <div className="ml-3">
                  <h1 className="text-lg font-semibold text-gray-200">{post.firstName} {post.lastName}</h1>
                  <p className="text-sm text-gray-400">{post.location || 'Location not available'}</p>
                </div>
              </div>
              <div>
                <button className="text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-200 mt-4">{post.description}</p>

            {/* Image */}
            {post.picturePath && <img src={globalPostURL + post.picturePath} alt="post" className="mt-4 rounded-lg " />}

            {/* Likes and comments */}
            <div className="flex items-center space-x-4 mt-4 text-gray-400">
              <div className="flex items-center">
                <span>{Object.keys(post.likes || {}).length} Likes</span>
              </div>
              <div className="flex items-center">
                <span>{post.comments.length} Comments</span>
                <button
                  className="w-6 h-6 ml-5"
                  onClick={() => onLikeHandler(post._id)}
                >
                  <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M192 938.7H87.9c-48.4 0-87.9-39.5-87.9-88V386.6c0-48.5 39.5-87.9 87.9-87.9h125.4c11.6 0 22.7 4.7 30.8 13.1 8 8.4 12.3 19.6 11.9 31.2l-21.3 554.7c-0.9 22.8-19.8 41-42.7 41zM87.9 384c-1.4 0-2.6 1.2-2.6 2.6v464.1c0 1.4 1.2 2.6 2.6 2.6h63L169 384H87.9z" fill="#5F6379"></path><path d="M810.4 938.7H275.7l24.6-640H418l72-201.8C510.7 38.9 566 0 627.5 0c42.4 0 82.6 18.4 110.3 50.4S778 124.8 772 166.7l-18.9 132h142.6c70.7 0 128.2 57.5 128.2 128.2l-1 9.3-84.4 379.4c-2.6 68.3-59.1 123.1-128.1 123.1z m-446.1-85.4h446.1c23.6 0 42.9-19.2 42.9-42.9l1-9.3L938.5 423c-2-21.8-20.4-39-42.7-39h-241l32.8-229.4c2.5-17.7-2.5-34.8-14.2-48.3s-28-20.9-45.9-20.9c-25.6 0-48.5 16.2-57.1 40.3L478.1 384h-95.7l-18.1 469.3z" fill="#3688FF"></path></g></svg>
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    );
  };

  export default Feed;
