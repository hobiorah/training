import { useParams, Link } from "react-router-dom";

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

export default PostPage
