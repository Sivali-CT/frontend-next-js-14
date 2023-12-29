'use client'
import React, {useState, useEffect} from 'react'
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
    const [comments, setComments] = useState([]);
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
                //   console.log('Post id:', firstPostId);
                  
                  setPostId(firstPostId);
                  setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchPosts();
    }, [route]);

    useEffect(() => {
        const fetchComments = async () => {
          try {
            if (!postId) {
              console.error('No post ID available');
              return;
            }
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_SINGLE_COMMENT}/${postId}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error(`Error fetching comments: ${response.statusText}`);
            }
    
            const commentsData = await response.json();            
            setComments(commentsData);
          } catch (error: any) {
            console.error('Error fetching comments:', error.message);
          }
        };
    
        if (postId) {
          fetchComments();
        }
      }, [postId]);
    
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
        return <p>Error: {error}</p>;
      }

  return (
    <div className="mx-auto mt-16 w-full max-w-3xl">
    <div>
      <div className="border-b border-gray-200">
      
      </div>
      <div>
        <div className="-mb-10">
          <h3 className="sr-only">All Comments</h3>

          {comments.map((comment: Comment, index) => (
            <div key={index} className=" text-sm text-gray-500">
              <div className= 'border-t border-gray-200 py-10'>
                <h3 className="font-medium text-gray-900">{comment.username}</h3>
                <p>
                  {moment(comment.created_at).format("MMMM Do YYYY - HH:MM:SS")}
                </p>

                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
