import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const API_URL = 'https://jsonplaceholder.typicode.com/posts';


function App() {
  const [data, setadata] = useState([]);
  const [postData, setPostData] = useState({title: '', body: ''});
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({ id: '', title: '', body: '' });

   useEffect(()=>{
fetch(API_URL)
.then(response =>{
  if(response.ok){
    return response.json();
  }else{
    throw new Error("error fetching data from api")
  }
})
.then(data => setadata(data))
.catch(error => setError(error.message))
   },[]);

   function handlePost(){
    fetch(API_URL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        title: postData.title,
        body: postData.body
      })
    })
    .then(response => {
      if(response.ok){
        return response.json();
      }else{
        throw new Error("error fetching data from api")
      }
    })
    .then(newData => setadata([...data, newData]))
    .catch(error => setError(error.message))
   }
   
   function handlePostTitleChange(event){
    setPostData({...postData, title: event.target.value})
   }
    
   function handleUpdate(){
    fetch(`${API_URL}/${updateData.id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(...updateData),
    })
    .then(response =>{
      if(response.ok){
        return response.json();
      }else{
        throw new Error("Couldn't update")
      }
    }).then(updateData =>{
      setadata(data.map((item => (item.id === updateData.id ? updateData : item ))))
    })
    .catch(error => setError(error.message));

   }


   function handleUpdateTitleChange(event) {
      setUpdateData({...updateData, title: event.target.value})
   }

  return (
    <>
<h1>API Integration Example</h1>
       <h2>GET Request</h2>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>

        <input type="text" 
        placeholder='title'
        value={postData.title}
        onChange={handlePostTitleChange}
        />
       <button onClick={handlePost}>Add Post</button>


       <input type="text" 
        placeholder='title'
        value={postData.title}
        onChange={handleUpdateTitleChange}
        />
       <button onClick={handleUpdate}>Update Post</button>

    </>
  )
}

export default App
