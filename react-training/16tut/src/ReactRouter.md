## routes - individual route goes into a route element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/*" element ={<App/>}>
              {/* <App /> */}
          </Route>
        </Routes>
        
    </Router>
   
  </React.StrictMode>
);
# route - telling react what components to load when user enters url
```
return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
       {/* Switch declares that we will have different routes/pages to load */}
      <Switch>
        {/* without exacpt path this would catch everything so we only want this to catch / not things like /post */}
        <Route exact path="/">
          <Home posts={searchResults} />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        {/* we can use this approach when we arent passing any props to the component */}
        <Route path="/about" component={About} />
        {/* if no other paths were captured with our route defintions, this will catch everthing */}
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
  ```
# links - uses routers created in parent component to issue write page/component
 {/* links render to anchor text but tell react not to pull react from server but route to proper component. 
                leverages the router we created in parent app */}
```
import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
               
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
```

# useParam
// this value is coming from the route - url user sumbited /hey/5. looks like useParams lets you pull data from the route
- lets you pull data from the url
    `const { id } = useParams(); `

# useHistory - get user to go to certain page/route
```const navigate = useNavigate();

 navigate('/');
 ```