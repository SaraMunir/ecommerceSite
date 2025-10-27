import React, { useEffect, useState } from 'react'
import { useAddImageToPageSectionBlock, useReplaceImageByIdMutation } from '../../../../../hooks/newImageHooks';
import { url } from 'inspector';
import { image } from '@cloudinary/url-gen/qualifiers/source';
// import {useGetPageDetailsByIdQuery, useUpdatePageDetailMutation} from '../../../../../hooks/i';

function ImageType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails }: any)  {
    const [customImagePosition, setCustomImagePosition] = useState<boolean>(false);
    const { mutateAsync: uploadImageToSectionBlock } = useAddImageToPageSectionBlock();
    const { mutateAsync: replaceImageById } = useReplaceImageByIdMutation();

    const [blockImage, setBlockImage] = useState<any>(null);
    const update=(updatedBlock:any)=>{
        setEditBlock(updatedBlock);
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        console.log("Updated Section after text change:", updatedSection);
        updateSection(updatedSection);
    }
    const uploadImageToBlock = async (e: React.ChangeEvent<HTMLInputElement>, editBlock: any, setEditBlock: (block: any) => void, section: any, updateSection: (section: any) => void) => {
        console.log('section', section);
        const files = e.target.files;
        // if (files && files.length > 0) {
        //     setBlockImage(files && files[0] ? files[0] : null);
        // }
        // check if block has an image already
        if (editBlock.imageBlock && editBlock.imageBlock.media && editBlock.imageBlock.media.url) {
            // update existing image
            try {
                const response = await replaceImageById(editBlock.imageBlock.media.imageId);
                console.log("Replaced image response:", response);
            } catch (error) {
                console.error("Error replacing image:", error);
                // Handle error appropriately
                return
            }
        }
        let mainImg = files && files[0] ? files[0] : null;
        console.log('Selected main image:', mainImg);
        const formData = new FormData();
        formData.append('mainImage', mainImg as Blob);
        formData.append('storeId', JSON.stringify(storeInfo?.storeId));
        formData.append('pageId', JSON.stringify(pageDetails?._id));
        formData.append('sectionId', JSON.stringify(section?.id));
        formData.append('blockId', JSON.stringify(editBlock?.uid));
        formData.append('imageType', JSON.stringify("page_block_image"));
        try {
            const response = await uploadImageToSectionBlock(formData);
            //          {
            //     "url": "https://i.ibb.co/hxjNMpFR/f023b46296d6.jpg",
            //     "alt_text": "",
            //     "type": "page_block_image",
            //     "storeId": "67e80a027a7496cefab3ca0a",
            //     "mainImage": {
            //         "filename": "f023b46296d6.jpg",
            //         "name": "f023b46296d6",
            //         "mime": "image/jpeg",
            //         "extension": "jpg",
            //         "url": "https://i.ibb.co/hxjNMpFR/f023b46296d6.jpg"
            //     },
            //     "medium": {
            //         "filename": "f023b46296d6.jpg",
            //         "name": "f023b46296d6",
            //         "mime": "image/jpeg",
            //         "extension": "jpg",
            //         "url": "https://i.ibb.co/PsnyYBGZ/f023b46296d6.jpg"
            //     },
            //     "thumbNail": {
            //         "filename": "f023b46296d6.jpg",
            //         "name": "f023b46296d6",
            //         "mime": "image/jpeg",
            //         "extension": "jpg",
            //         "url": "https://i.ibb.co/wZXqLDhN/f023b46296d6.jpg"
            //     },
            //     "products": [],
            //     "isDeleted": false,
            //     "page": {
            //         "pageId": "68e141338c38804b2a0ebf81",
            //         "sectionId": "302c6282-d0e4-4436-b04b-f34815549827",
            //         "blockId": "112ea25c-5d3f-4309-ae76-02a50e4df64c",
            //         "type": "blockObject",
            //         "_id": "68fce70943fbdd1685cda7dc"
            //     },
            //     "_id": "68fce70943fbdd1685cda7db",
            //     "createdAt": "2025-10-25T15:04:41.742Z",
            //     "updatedAt": "2025-10-25T15:04:41.742Z",
            //     "__v": 0
            // }
            if (response) {
                console.log("Uploaded image response:", response);
                let updatedBlock = { ...editBlock, 
                    imageBlock:{
                        ...editBlock.imageBlock,
                        media: {
                            ...editBlock.imageBlock?.media,
                            url: response.url,
                            alt_text: response.alt_text || '',
                            type: response.type || 'page_block_image',
                            imageId: response._id, 
                            show: true
                        },
                        width: 100,
                        linkHref: '',
                    }
                };
                update(updatedBlock);
            }
        } catch (error) {
            console.error("Error uploading image to block:", error);
        }
        // uploadImageToSectionBlock(formData);
    }
    useEffect(() => {
        if (editBlock.imageBlock && editBlock.imageBlock.media && editBlock.imageBlock.media.url) {
            setBlockImage(editBlock.imageBlock.media.url);
        }else{
            setBlockImage(null);
        }
    }, [editBlock.imageBlock]);
    
    return (
        <div>
            <h5 className="card-title text-capitalize"><i className="bi bi-fonts"></i> image</h5>
            {/* Image Block Settings */}
            {/* upload image */}
            <div>
                {
                    blockImage ? (
                        <div className="mb-3">
                            <img src={blockImage} alt="Block" className="img-fluid" />
                        </div>
                    ) : (
                        <div className="mb-3">
                            <p>No image uploaded</p>
                        </div>
                    )
                }
            </div>
            <div className="mb-3">
                <label htmlFor="imageUpload" className="form-label">Upload Image</label>
                <input 
                type="file" className="form-control" 
                multiple id="imageUpload"
                onChange={(e) => 
                    uploadImageToBlock(e, editBlock, setEditBlock, section, updateSection)} />
            </div>
            <div className="mb-3">
                <label htmlFor="imageAltText" className="form-label">Image Description</label>
                <input type="text" className="form-control" id="imageAltText" value={editBlock?.imageBlock?.media?.alt_text} onChange={(e) => {
                    let updatedBlock = {...editBlock, 
                        imageBlock: {...editBlock.imageBlock, media: {...editBlock.imageBlock.media, alt_text: e.target.value}  }};
                    setEditBlock(updatedBlock);
                    let updatedSection = {...section};
                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                    updateSection(updatedSection);
                }}
                />
            </div>
            <div className='my-3'>
                <label htmlFor="imageFit" className="form-label">Image Fit</label>
                <select id="imageFit" className="form-select" value={editBlock.imageBlock?.settings?.fit} onChange={(e) => {
                    let updatedBlock = {...editBlock, imageBlock: {...editBlock.imageBlock, settings: {
                        ...editBlock.imageBlock?.settings,
                        fit: e.target.value
                    }}};
                    setEditBlock(updatedBlock);
                    let updatedSection = {...section};
                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                    updateSection(updatedSection);
                }}>
                    <option value="none">None</option>
                    <option value="contain">Contain</option>
                    <option value="cover">Cover</option>
                    <option value="fill">Fill</option>
                    <option value="scale-down">Scale Down</option>
                </select>
            </div>
            <div>
                {/* image position */}
                <label htmlFor="imagePosition" className="form-label">Image Position</label>
                {
                    !customImagePosition ?
                <select id="imagePosition" className="form-select" value={editBlock.imageBlock?.settings?.position} onChange={(e) => {
                    // setCustomImagePosition(false);
                    let updatedBlock = {...editBlock, imageBlock: {...editBlock.imageBlock, settings: {
                        ...editBlock.imageBlock?.settings, 
                        position: e.target.value,
                        objectPosition:{
                            x: 0,
                            y: 0
                        }
                    }}};
                    setEditBlock(updatedBlock);
                    let updatedSection = {...section};
                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                    updateSection(updatedSection);
                }}>
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </select>
                : null
                }
                <div className="form-check form-switch my-2">
                    <input className="form-check-input" type="checkbox" value="" id="checkCustomImagePosition" checked={customImagePosition} onChange={(e) => {
                        setCustomImagePosition(e.target.checked)
                        }} />
                    <label className="form-check-label" htmlFor="checkCustomImagePosition">
                        custom image position
                    </label>
                </div>
                {
                    customImagePosition ?
                    <div className="my-4 d-flex gap-2">
                        <div className="col-6">
                            <label htmlFor="imagePositionX" className="form-label">Image Position X (%)</label> 
                            <input type="number" className="form-control" id="imagePositionX" value={editBlock.imageBlock?.settings?.objectPosition?.x || 0} onChange={(e) => {
                                let updatedBlock = {...editBlock, imageBlock: {...editBlock.imageBlock, settings: {
                                    ...editBlock.imageBlock?.settings, 
                                    position: 'custom',
                                    objectPosition: {
                                        ...editBlock.imageBlock?.settings?.objectPosition,
                                        x: parseInt(e.target.value)
                                    }
                                }}};
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="imagePositionY" className="form-label">Image Position Y (%)</label> 
                            <input type="number" className="form-control" id="imagePositionY" value={editBlock.imageBlock?.settings?.objectPosition?.y || 0} onChange={(e) => {
                                let updatedBlock = {...editBlock, imageBlock: {...editBlock.imageBlock, settings: {
                                    ...editBlock.imageBlock?.settings,
                                    position: 'custom', 
                                    objectPosition: {
                                        ...editBlock.imageBlock?.settings?.objectPosition,
                                        y: parseInt(e.target.value)
                                    }
                                }}};
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }} />

                        </div>
                    </div>
                    : null
                }
                <div className="form-check form-switch">

                </div>
            </div>
        </div>
    )
}

export default ImageType