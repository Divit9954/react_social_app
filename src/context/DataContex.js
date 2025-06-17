import { createContext , useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from '../api/posts';
import EditPost from '../EditPost';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';
const DataContext = createContext({});
export const DataProvider = ({ children }) =>{
    const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }
  , [data]);
  
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? (parseInt(posts[posts.length - 1].id) + 1).toString() : "1";
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); 
    const newPost = { id, title: postTitle, datetime, body: postBody };
      try {
        const response= await api.post('/', newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/');
      }
      catch (err) {
        console.error(`Error:  ${err.message}`);

      }

  };
const handleEdit = async (e, id) => {
    e.preventDefault();
    console.log("handleEdit called with id:", id);
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    console.log("Updated post data:", updatedPost);
    try {
      const response = await api.put(`/${id}`, updatedPost);
      console.log("API response:", response);
      const postsList = posts.map((post) => (post.id === id ? { ...response.data } : post));
      setPosts(postsList);
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.error(`Error:  ${err.message}`);
    }
  }

  const handleDelete = async(e) => {
    try {
    await api.delete(`/${e}`);
    const id = e;
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate('/');
    } catch (err) {
      console.error(`Error:  ${err.message}`);
    }
  }
 
    return (
        <DataContext.Provider value={{
            width,search, setSearch,
            searchResults, fetchError, isLoading,
              handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
              posts, handleEdit, setEditTitle, setEditBody, editTitle, editBody,handleDelete

        }}>
            {children}
        </DataContext.Provider>
    );
}
export default DataContext;