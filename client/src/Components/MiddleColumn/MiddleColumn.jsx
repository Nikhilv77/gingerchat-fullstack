import React from 'react'
import './MiddleColumn.css'
import SharePosts from '../SharePosts/SharePosts'
import Posts from '../Posts/Posts'

const MiddleColumn = () => {
  return (
    <div className="middle-column">
      <SharePosts />
      <Posts />
    </div>
  )
}

export default MiddleColumn
