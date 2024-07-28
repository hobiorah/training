# create react app 
`npx create-react-app 16tut`

# installing react-router
`npm i react-router-dom -S` the s makes it production
# snippet search
ctlre + alt + r pops up 

# start react app 
`npm start`

# everythign is within a root div
- so you might have to adjust the width and growth of this div
```
#root {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
# styled components product

# adding styles
- Each component naturally has a class of its name. ex: Header component has a .header class. If you write a .header class css it'll get applied to the Header componentpeopel usualyl create a style sheet for each component. you'll have to import the stylesheet in the component file
- one option inline
```
const Header = () => {
  return (
    // <div>
    //     Header
    // </div>
    <header style={{
        backgroundColor: 'mediumblue',
        color: 'white'
    }}>
        <h1>Groceries List</h1>
    </header>
  )
}

export default Header
```
- other option (inline using object)
```
const Header = () => {
    const headerStyle = {
         backgroundColor: 'royalblue',
        color: 'white'
    };
  return (
    // <div>
    //     Header
    // </div>
    <header style={headerStyle}>
        <h1>Groceries List</h1>
    </header>
  )
}

export default Header
```
## manually adding classes
`render() {
  return <span className="menu navigation-menu">Menu</span>
}`


# preventDefault 
- form: By default, if you have an input of type "submit" in a form then clicking that input (or hitting enter after filling in ANY inputs in the form) will send a post or get request to the server, redirecting the current page to the server's response.



# using method in attrivbutes like on click
```
const Content = () => {
    const handleNameChange = () => {
        const names = ["lets", 'get', 'right'];
        return names[1];
    }

    const handleClick = () =>{
        console.log('You clicked it ');
    }

    const handleClick2 = (name) =>{
        console.log(`${name} was clicked`);
    }

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>Hello bro {handleNameChange()}! </p>
        <button onClick={handleClick}>Click It</button>
        {/* this tells interpreter not to immediately invoke but to invoke only on onclick */}
        <button onClick={() => handleClick2('Dave')}>Click It</button>
        {/* this would immediately invoke the method for some reason */}
        <button onClick={handleClick2('Dave')}>Click It</button>
        <button onClick={(e) => handleClick3(e)}>Click It</button>

    </main>
  )
}
```

# state

- not supposed to update the value directly, supposed to use the set functionn
- state goes back to default when browser refreshes
- If you render the same component multiple times, each will get its own state. Click each button separately:
```
export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```


the value of the state variable doesn't update even if you change it until after you exit the method.
- whatever value of count is, will be used for every operation so even though its incremented in first setCount to n+ 1. the second call uses the initial value of count (n) so it just rewrites the count variable

```
const Content = () => {
    const [name, setName] = useState('Dave');
    const [count, setCount] = useState(0);

    const handleNameChange = () => {
        const names = ["lets", 'get', 'right'];
        const int = Math.floor(Math.random() * 3);

        //return names[1];
        setName(names[int]);
    }

    const handleClick = () =>{
        // the value of the state variable doesn't update even if you change it until after you exit the method
        setCount(count +1);
        setCount(count +1);
        console.log(count);
    }

```

## use cases
- for things you update and enter text to, you can use the onclick listener of the elments to update state variables which allows you to grab those values when necessary. when you're done using the value you cna reset them to empty if applicable
```
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
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  ```

  - a way to create a variable but has properties of the state feature. when you declare the state variable you can use it wherever as if its a regular variable
  Example: we create a windowsize object using state feature and initialize it with use effect. we return the variable so that we can use the values in it else where. the enxt sippet we import the method weeexpreted and pull out the weidth vairbale in the windowsize object

  ```
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });


//we're using a native hook
    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize();

        //this will allow you to always update the window when you want. use an event listener
        window.addEventListener("resize", handleResize);

        //use effect lets you execute code when a dependency chantes or when the application closes
   
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return windowSize;
}
export default useWindowSize;
```
```
import useWindowSize from './hooks/useWindowSize';

function App() {
  const {width} = useWindowSize;
```
# lists
file in lists folder


# forms
//disable default behavior that form reloads broswer when submitted
 ` e.preventDefault();`

# useRef
import { FaPlus } from 'react-icons/fa'; //importing an icon
import { useRef } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addItem'>Add Item</label>
            <input
                autoFocus
                //ref is a way to have access to the javacript object of the element. we can then make function calls on the element
                ref={inputRef}
                id='addItem'
                type='text'
                placeholder='Add Item'
                required
                // set value to what the state variable is
                value={newItem}
                // update state variable
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                // use the javacript object that repreents the element to set focus on that element
                onClick={() => inputRef.current.focus()}
            >
                {/*  using an icon as the button(slick the button text) */}
                <FaPlus />  
            </button>
        </form>
    )
}

export default AddItem

 # use effect
 useEffect(() => {
    console.log('track');
    //items is being watched so we can put methods in here that should be fired when state changes
    //the method that changes state cant be in here, that has to fire first which will call this method
    //this will also initialize localStorage since this fire runs on load
    localStorage.setItem('shoppinglist', JSON.stringify(items));

   }, [items]); // whenever something (usually state) in the array changes, the method fires. aka depenecy. wehen empty, the method only runs on load time

## run code when everything loads - initiatilze datamodels with api requests
   //we can create multiple use effects. this one it run one app first launches so we can fetch results
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

 ## use effect can execute "clean up" code
```
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize();

        //this will allow you to always update the window when you want. use an event listener
        window.addEventListener("resize", handleResize);

        //use effect lets you execute code when a dependency chantes or when the application closes
        
        const cleanUp = () => {
            console.log('runs if a use effect dep changes');

        }
            return cleanup
         
    }, [])

    return windowSize;
}

export default useWindowSize;
```
# running api server with json file
-one of the turotiral videos in the react slist: the 01tut folder, not the react router one
`npx json-server -p 3500 data/db.json`

# fetching data with axios

- create a File, maybe in a api/posts.js folder that contains axious import and exports the creation of an anxious instance
```
import axios from 'axios';

export default axios.create({
    // have to update when we are hitting a prodcution/different server
    baseURL: 'http://localhost:3500'
});

```

# useParams - get data from the url user submits /:id
   this value is coming from the route - url user sumbited /hey/5. looks like useParams lets you pull data from the route
    `const { id } = useParams(); `

    ```
    return (
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home posts={searchResults} />} />
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
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
```

# when a view element doesnt have data and therefore wont display anything and you want  to show that 
```
const PostPage = ({ posts, handleDelete }) => {
    // this value is coming from the route - url user sumbited /hey/5. looks like useParams lets you pull data from the route
    const { id } = useParams(); 
    const post = posts.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {/* if post exists we show data */}
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}
```

# blank elements <>
it apperas that react forces you to put html elements in a parent container. the elemeents 
```
return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
```
- notice how the main container is "negated" because of the javascript insertion below it

# custom hooks
- you then import where you want to use, then invoke the method and pull out the variables you want from the object (prob all)
` const {width} = useWindowSize();`
```
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });


//we're using a native hook
    useEffect(() => {
        console.log("initial windowsize to rezise")


        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            console.log("supposed to rezise")
        }

        handleResize();

        //this will allow you to always update the window when you want. use an event listener
        window.addEventListener("resize", handleResize);

        //use effect lets you execute code when a dependency chantes or when the application closes. could also pass a function with multiple lines vs simple anonymous function
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return windowSize;
}

export default useWindowSize;
```

## hooks created by other people 
Collections of Hooks:
https://nikgraf.github.io/react-hooks/
https://www.npmjs.com/package/react-use


# imports
either pulling out a function or variable that was exported

# react icons
`npm i react-icons`'

# context

`import { DataProvider } from './context/DataContext'; //we can use data provider to provide data to components`



old way - using props(passing values in in main app component)
```
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
```


## getting data in indidivual components
import use context hook from react 
import your datacontext file/object 

now you pull out the values you want from useContext(DataContext)
```
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);
```