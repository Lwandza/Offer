import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetching() {
    const[posts, setPost] = useState([])

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/EthanMarrs/8a5c090fe3787cff0f4f044d0dc35278/raw/751c0b21a6648dfe6b99e1924c0068ee2b7fac70/interviewRequests.json')
            .then(res => {
                console.log(res)
                setPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.candidate}</li>
                ))}
            </ul>
        </div>
    )
}

export default DataFetching
