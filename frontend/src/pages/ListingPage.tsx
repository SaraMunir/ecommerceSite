// import React from 'react'
import { useParams } from 'react-router-dom';

export default function ListingPage() {
    const {categoryName} = useParams<{ categoryName: string }>();
    const {id} = useParams<{ id: string }>();
    // let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>ListingPage cate:{categoryName} / id: {id} </div>
  )
}
