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
import { DataProvider } from './context/DataContext'; //we can use data provider to provide data to components

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
 
  
  
  return (
    // this provides dataprovider to all components and they can subscribe at will. they will pull the data using useContext hook
    <DataProvider> 
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="post">
            <Route index element={<NewPost/>} />
            <Route path=":id" element={<PostPage/>} />
            {/* <Route path="edit/:id" element={<EditPost />} /> */}
          </Route>
          <Route path="edit/:id" element={<EditPost/>} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;