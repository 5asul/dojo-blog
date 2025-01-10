import { useParams,useHistory } from "react-router-dom";
import useFetch from "./useFetch";


const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog , error , isPending}= useFetch('http://localhost:4000/blogs/'+id);
    const history = useHistory();
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const handleClick = async () => {
        fetch(`${baseURL}/blogs/`+blog.id,{
            method: 'DELETE',

        }).then(() => {
            history.push('/');
        })
    }
    return ( 
        <div className="blog-details">
            {isPending&& <div>isLoading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;