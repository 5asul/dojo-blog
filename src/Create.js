import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title,setTitle]= useState('');
    const [body,setBody]= useState('');
    const [author,setAuther]= useState('');
    const [isPending,setIsPending]= useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog= {title, body, author:'mario'};

        setIsPending(true);

        fetch('http://localhost:4000/blogs',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        }).then(() =>{
            console.log('new blog created');
            setIsPending(false);
            // history.go(-1)
            history.push('/'); 
        })
        
    }
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Blog title</label>
                <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title} required />
                <label htmlFor="">Blog body</label>
                <textarea value={body} onChange={(e)=> setBody(e.target.value)} required></textarea>
                <label htmlFor="">Author</label>
                <select value={author} onChange={(e)=>setAuther(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled >Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;