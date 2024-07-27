import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import EditPost from './EditPost';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
// old way import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Layout from './Layout';
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const {width} = useWindowSize();
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
 
  const navigate = useNavigate();
  

  useEffect(() => {
    //whenever the data changes which will change on dataurl change from useAxiousFetch, update the posts object
    setPosts(data);
  }, [data])

  
  
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
  ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }
*/
const handleEdit = async (id) => {
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const updatedPost = { id, title: editTitle, datetime, body: editBody };
  try {
    const response = await api.put(`/posts/${id}`, updatedPost); //put cause were replacing entire object
    // we need to make sure the posts variable contains all the posts keeping in mind that it must contain the udpated post, not what the post was before. this method gves you the element and whatever you return is what will be contianed in the new array
    //in this case when we find the id we updated we return that object so that the new array contains that updated item, otherwise, we return the post that already exists
    setPosts(posts.map(post => post.id === id ? { ...response.data } : post)); //the ...
    setEditTitle('');
    setEditBody('');
    navigate('/');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  // get details from post from data user entered into elemeents. elements grabbed data then updated state variables
  const newPost = { id, title: postTitle, datetime, body: postBody };
  try {
    const response = await api.post('/posts', newPost);
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
const handleDelete = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
    //create new array and only show posts that dont contain id we deleted.
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
  
  return (
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
        width={width}
      />}>
        <Route index element={<Home posts={searchResults} fetchError = {fetchError} isLoading={isLoading} />} />
        <Route path="post">
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />
           <Route path="edit/:id" element={<EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />} />
        </Route>
        <Route path="edit/:id" element={<EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;