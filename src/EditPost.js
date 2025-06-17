import React from 'react'
import { useParams, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import DataContext from './context/DataContex';

const EditPost = () => {
  const { posts, handleEdit, setEditTitle, setEditBody, editTitle, editBody } =useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => (post.id).toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <main className="NewPost">
        {editTitle && (
          <>
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => handleEdit(e, post.id)}>
              <label htmlFor="postTitle">Title:</label>
              <input
                type="text"
                id="postTitle"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor="postBody">Post:</label>
              <textarea
                id="postBody"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </>
        )}
        {!editTitle && (
          <p>Post not found. <Link to="/">Visit our Home Page</Link></p>
        )}
    </main>
  )
}

export default EditPost
