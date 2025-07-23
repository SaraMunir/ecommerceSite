import React, { useState } from 'react'

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useAddImageToProductMutation } from '../../../../hooks/productHooks';
import axios from 'axios';
function PromoTags() {
    // const cld = new Cloudinary({ cloud: { cloudName: 'dbdgbk9zj' } });
    // const img = cld
    //       .image('/images/kBeautyLogo.png') // Use your image path here
    //       .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    //       .quality('auto')
    //       .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
    const [first, setFirst] = useState<File | null>(null)
    const { mutateAsync: uploadImage } = useAddImageToProductMutation();
    const handleupload = async (file: File | null) => {
      const formData = new FormData();

    formData.append('file', file as Blob);
    console.log("formData", formData);
    // return
    axios.post('http://localhost:4000/upload',formData )
    .then( res => {
        console.log(res.data);
        if (res.data.success) {
            console.log('Image uploaded successfully!');
        } else {
            console.log('Image upload failed: ' + res.data.message);
        }
    })
    .catch(er => console.log(er))
  
  
    }
    const secondHandleUpload = async (file: File | null) => {

        const formData = new FormData();

        formData.append('file', file as Blob);

        console.log("formData", formData);
        
        try {
            const response = await uploadImage(formData);
            console.log('Image uploaded successfully:', response);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
  return (
    <div>
        { first ?
        <div>
          <h2>Selected Image:</h2>
          <p>{first.name}</p>
          <img src={URL.createObjectURL(first)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        : <p>No image selected</p>
        
    }
        {/* <AdvancedImage cldImg={img}/> */}
        <input
          type="file"
          name="promoImage"
          id="promoImage"
          onChange={(e) => {
            const files = e.target.files;
            setFirst(files && files[0] ? files[0] : null);
          }}
        />
        <button
          onClick={(e) => handleupload(first)}
        >
          upload image
        </button>
        <button
          onClick={(e) => secondHandleUpload(first)}
        >
          upload image
        </button>
    </div>
  )
}

export default PromoTags




// const App = () => {
  
//   // Use this sample image or upload your own via the Media Explorer

//   return (<AdvancedImage cldImg={img}/>);
// };

// export default App