import React, { useContext, useEffect } from 'react'
import { useGetImageListByStoreIdQuery } from '../../../hooks/newImageHooks'
import { Store } from '../../../Store'
import LoadingBox from '../../../components/LoadingBox'
import MessageBox from '../../../components/MessageBox'
import { getError } from '../../../utils'

function AdminImageGallery() {
    const { state: { storeInfo } } = useContext(Store)
    const { data: images, isLoading, error } = useGetImageListByStoreIdQuery(storeInfo?.storeId!)

    return (
        <div>
            <h1>Admin Image Gallery</h1>

            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{getError(error)}</MessageBox>
            ) : (
                <div>Admin Image Gallery

                  <ul className='w-100 row justify-content-between align-items-center list-unstyled'>
                    {images?.map((img) => (
                      <li key={img._id} className='col-2 my-1'>
                        <img src={img.url} alt={img.alt} className='img-fluid'/>
                      </li>
                    ))}
                  </ul>
                </div>
            )}
        </div>
    )
}

export default AdminImageGallery