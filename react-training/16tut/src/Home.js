import Feed from './Feed';

const Home = ({ posts }) => {
    return (
        <main className="Home">
            {/* if there are posts than llad the feed component, if not say nothing to diisplay */}
            {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>
    )
}

export default Home
