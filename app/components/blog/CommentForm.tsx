'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';

export default function CommentForm() {
    const { route } = useParams();
    const [commentText, setCommentText] = useState('');
    const [username, setUsername] =  useState('');
    const [postId, setPostId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        }
        fetchPosts();
    }, [route]);

    const handleSubmit = async () => {
        try {
            if (!postId) {
                console.error('No post ID available');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_COMMENT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: postId,
                    text: commentText,
                    username: username,
                }),
            });

            if (response.ok) {
                console.log('Comment submitted successfully.');
                setCommentText('');
                setUsername('');
            } else {
                console.error('Error submitting comment:', response.statusText);
            }
        } catch (error: any) {
            console.error('Error submitting comment:', error.message)
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-[125px] px-6 py-24 lg:px-8">
                <svg className="animate-spin h-24 w-24 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.183 8.049l2-2.758z"></path>
                </svg>
            </div>
        )
    }

    if (error) {
        return <p>Error: {error}</p>
    }

  return (
    <div className='mx-auto max-w-3xl border-t mt-16'>
        <form className='mt-8'>
            <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                Add your comment
            </label>
            <div className="mt-2">
                <textarea
                rows={4}
                name="text"
                id="text"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                />
            </div>
            <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center'>
                    <label htmlFor="username" className='text-xs font-light text-gray-900'>Name:</label>
                    <div>
                        <input id="username" name="username" type="text" className='border ml-2 text-xs font-normal px-3 py-1.5 rounded' value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        className="block w-full rounded-md bg-blue-600 px-3.5 py-1.5 text-center text-sm font-semibold text-white shadow-sm"
                        disabled={!commentText || !username}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
      </form>
    </div>  )
}
