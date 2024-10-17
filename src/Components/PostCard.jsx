import React from 'react'
import appwriteService from '../Appwrite/conf'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div  className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}  className='rounded-xl'/>
            </div>

            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard

//Click on the card image to read the article further

/*
1. import appwriteService
2. import Link from react-router
3. props -> $id(syntax for id in appwrite), title of card and image of card
4. Link -> Navigate to post/id    id-> of the post
5. link of the image from the appwriteService.previewFile
*/