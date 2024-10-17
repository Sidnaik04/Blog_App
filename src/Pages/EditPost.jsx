import React,{useState, useEffect} from 'react'
import { Container, PostForm } from '../Components'
import service from '../Appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null); //for post
    const {slug} = useParams(); //for url -> based on url edit will take place
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ):null
}

export default EditPost

//To edit post

