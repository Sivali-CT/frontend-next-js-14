"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import moment from 'moment';

interface Comment {
  text: string;
  id: number;
  post_id: number;
  username: string;
  created_at: string;
}

export default function ShowComment() {
  const { route } = useParams();
  const [postId, setPostId] = useState(null);
  const [allComments, setAllComments] = useState([]); // Store all comments from the API
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[route][$eq]=${route}&populate=*`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const post = await response.json();
        const firstPostId = post.data[0]?.id || null;

        setPostId(firstPostId);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [route]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!postId) {
          console.error('No post ID available');
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SINGLE_COMMENT}/${postId}/?page=${currentPage}&limit=10`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching comments: ${response.statusText}`);
        }

        const commentsData = await response.json();
        setAllComments(commentsData); // Store all comments
        setComments(commentsData.data.slice(0, commentsPerPage)); // Set initial comments for the first page
      } catch (error: any) {
        console.error('Error fetching comments:', error.message);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, currentPage]);

  useEffect(() => {
    // Filter comments based on the current page and limit
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setComments(allComments.slice(startIndex, endIndex));
  }, [allComments, currentPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allComments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[125px] px-6 py-24 lg:px-8">
        <svg
          className="animate-spin h-24 w-24 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.183 8.049l2-2.758z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-3xl">
      <div>
        <div className="border-b border-gray-200"></div>
        <div>
          <div className="-mb-10">
            <h3 className="sr-only">All Comments</h3>

            {comments && comments.length > 0 ? (
              comments.map((comment: Comment, index) => (
                <div key={index} className="text-sm text-gray-500">
                  <div className="border-t border-gray-200 py-10">
                    <h3 className="font-medium text-gray-900">{comment.username}</h3>
                    <p>{moment(comment.created_at).format("MMMM Do YYYY - HH:MM:SS")}</p>

                    <div
                      className="prose prose-sm mt-4 max-w-none text-gray-500"
                      dangerouslySetInnerHTML={{ __html: comment.text }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(allComments.length / commentsPerPage)}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
