import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/esm/Modal';
import { useAddImageToPageSectionBlock, useReplaceImageByIdMutation } from '../../../../../hooks/newImageHooks';

import { text } from 'stream/consumers';

function CarouselType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails }: { selectedDesignBlock: any, editBlock: any, setEditBlock: (block: any) => void, section: any, updateSection: (section: any) => void, allFontFamilies: any, storeHeadingFont: any, storeTheme: any, storeBodyFont: any, storeInfo: any, pageDetails: any }) {
    const { mutateAsync: uploadImageToSectionBlock } = useAddImageToPageSectionBlock();
    const [imageResponse, setImageResponse] = useState<any>(null);

    const [mediaType, setMediaType] = useState<'video' | 'image'>('image');
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newCarousel, setNewCarousel] = useState({
        title: '', href: '',
        show: true,
        sortOrder: editBlock?.carouselBlock?.items?.length + 1 || 1,
        mediaType: 'image' as 'image' | 'video',
        media:{
            type: 'page_slider_banner_image',
            url: '',
            alt_text: '',
            imageId: '',
            show: false
        },
        video: {
            url: '',
            show: false
        },
        textBlock:{
            heading: {
                value: '',
                font: {
                    fontSize: 24,
                    fontFamily: storeTheme?.fonts?.heading || 'Arial',
                    fontFamilyId: storeTheme?.fonts?.headingId || 'arial',
                    fontColor: storeTheme?.colors?.primary || '#000000',
                    fontWeight: storeTheme?.fonts?.heading ?
                    allFontFamilies.find((font: any) => font.id === storeTheme?.fonts?.headingId)?.defaultWeight : 400,
                },
                textCase: 'capitalize',
                alignment: 'left',
            },
            subheading: {
                value: '',
                font: {
                    fontSize: 18,
                    fontFamily: storeTheme?.fonts?.heading || 'Arial',
                    fontFamilyId: storeTheme?.fonts?.headingId || 'arial',
                    fontColor: storeTheme?.colors?.primary || '#000000',
                    fontWeight: storeTheme?.fonts?.heading ?
                    allFontFamilies.find((font: any) => font.id === storeTheme?.fonts?.headingId)?.defaultWeight : 400,
                },
                textCase: 'capitalize',
                alignment: 'left',
            },
            content: {
                value: '',
                font: {
                    fontSize: 16,
                    fontFamily: storeTheme?.fonts?.body || 'Arial',
                    fontFamilyId: storeTheme?.fonts?.bodyId || 'arial',
                    fontColor: storeTheme?.colors?.text || '#000000',
                    fontWeight: storeTheme?.fonts?.body ?
                    allFontFamilies.find((font: any) => font.id === storeTheme?.fonts?.bodyId)?.defaultWeight : 400,
                },
                textCase: 'none',
                alignment: 'left',
            },
            cta: {
                value: '',
                font: {
                    fontSize: 18,
                    fontFamily: storeTheme?.fonts?.heading || 'Arial',
                    fontFamilyId: storeTheme?.fonts?.headingId || 'arial',
                    fontColor: storeTheme?.colors?.primary || '#000000',
                    fontWeight: storeTheme?.fonts?.heading ?
                    allFontFamilies.find((font: any) => font.id === storeTheme?.fonts?.headingId)?.defaultWeight : 400,
                },
                textCase: 'capitalize',
                alignment: 'center',
                type: 'button',
                href: '',
            },
        },
    });
    const selectedFont = allFontFamilies.find((font: any) => font.id === storeHeadingFont?.id);
    const update=(updatedBlock:any)=>{
        setEditBlock(updatedBlock);
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        updateSection(updatedSection);

    }
    const uploadImageToBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('section', section);
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            let mainImg = files && files[0] ? files[0] : null;
            const formData = new FormData();
            formData.append('mainImage', mainImg as Blob);
            formData.append('storeId', JSON.stringify(storeInfo?.storeId));
            formData.append('pageId', JSON.stringify(pageDetails?._id));
            formData.append('sectionId', JSON.stringify(section?.id));
            formData.append('blockId', JSON.stringify(""));
            formData.append('imageType', JSON.stringify("page_slider_banner_image"));
            try{
                const response = await uploadImageToSectionBlock(formData);
                console.log('Image upload response:', response);
                if(response && response._id){
                    // update the editBlock state with new image info
                    setImageResponse(response);
                    setNewCarousel({
                        ...newCarousel,
                        media: {
                            ...newCarousel.media,
                            url: response.url,
                            alt_text: response.alt_text,
                            imageId: response._id,
                            show: true,
                            type: response.type || 'page_slider_banner_image',
                        }
                    })
                }

            }catch(error){
                console.error('Image upload failed');
            }
        }
    }

//     {
//     "url": "https://i.ibb.co/xKNkwwCx/2d97b151f1da.jpg",
//     "alt_text": "",
//     "type": "page_slider_banner_image",
//     "storeId": "67e80a027a7496cefab3ca0a",
//     "mainImage": {
//         "filename": "2d97b151f1da.jpg",
//         "name": "2d97b151f1da",
//         "mime": "image/jpeg",
//         "extension": "jpg",
//         "url": "https://i.ibb.co/xKNkwwCx/2d97b151f1da.jpg"
//     },
//     "medium": {
//         "filename": "2d97b151f1da.jpg",
//         "name": "2d97b151f1da",
//         "mime": "image/jpeg",
//         "extension": "jpg",
//         "url": "https://i.ibb.co/spZfccm8/2d97b151f1da.jpg"
//     },
//     "thumbNail": {
//         "filename": "2d97b151f1da.jpg",
//         "name": "2d97b151f1da",
//         "mime": "image/jpeg",
//         "extension": "jpg",
//         "url": "https://i.ibb.co/MymvKK2F/2d97b151f1da.jpg"
//     },
//     "products": [],
//     "isDeleted": false,
//     "page": {
//         "pageId": "68e141338c38804b2a0ebf81",
//         "sectionId": "90624a64-f1be-41c8-90a2-cd3840ca0269",
//         "blockId": "",
//         "type": "blockObject",
//         "_id": "68ffa9a2228e679881a8a8e5"
//     },
//     "_id": "68ffa9a2228e679881a8a8e4",
//     "createdAt": "2025-10-27T17:19:30.959Z",
//     "updatedAt": "2025-10-27T17:19:30.959Z",
//     "__v": 0
// }

    const addNewCarousel = async () => {
        console.log("Adding new carousel:", newCarousel);
        // const newCarouselItem={
        //     title: newCarousel?.title || 'New Carousel Item',
        //     href: newCarousel?.href || '',
        //     show: true,
        //     sortOrder: newCarousel?.sortOrder || 1,
        // }
        if(!newCarousel.textBlock.heading.value){
            return;
        }
        let updatedBlock = { ...editBlock,
            carouselBlock: {
                ...editBlock?.carouselBlock,
                items: [...(editBlock?.carouselBlock?.items || []), newCarousel]
            }
        }
        setEditBlock(updatedBlock);
        console.log("Updated Block after adding new carousel:", updatedBlock);
        // return
        update(updatedBlock);
        handleClose();
    }
    const removeCarouselItem = async (index: number) => {
        // check carousel has image, if yes, delete the image from backend
        return
        const updatedItems = editBlock?.carouselBlock?.items?.filter((item: any, idx: number) => idx !== index) || [];
        let updatedBlock = { ...editBlock,
            carouselBlock: {
                ...editBlock?.carouselBlock,
                items: updatedItems
            }
        }
        setEditBlock(updatedBlock);
        console.log("Updated Block after removing carousel:", updatedBlock);
        update(updatedBlock);
    }

    useEffect(() => {
        console.log("New Carousel State:", editBlock);
        console.log("selectedFont:", selectedFont);
        console.log("storeTheme:", storeTheme);
    }, [editBlock])

    return (
        <div>
            {/* add new carousel */}

            <div className="d-flex justify-content-between align-items-center">
                <h6 className="mt-3">Add New Carousel Item</h6>
                <button className="btn btn-primary" onClick={() => handleShow()}>Add Carousel</button>
            </div>
            <ul className="list-group list-group-flush max-vh-30 overflow-auto">
                {
                    editBlock?.carouselBlock?.items && editBlock?.carouselBlock?.items.length > 0 ?
                    editBlock?.carouselBlock?.items.map((carouselItem: any, idx: number) => (
                        <li key={'carouselItem-' + idx} className="list-group-item d-flex justify-content-between align-items-start">
                            <div>
                                <h6 className='fw-bold'>{carouselItem?.textBlock?.heading?.value || 'Untitled'}</h6>
                                <p>{carouselItem?.textBlock?.description?.value || 'No description'}</p>
                            </div>
                            <button className="btn btn-danger btn-sm text-light" onClick={() => removeCarouselItem(idx)}><i className="bi bi-trash"></i></button>
                        </li>
                    ))
                    : <li className="list-group-item">No carousel items added</li>
                }
                <li className="list-group-item">
                    
                    {/* <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Carousel Title" aria-label="Carousel Title" aria-describedby="button-addon2" value={newCarousel} onChange={(e) => setNewCarousel(e.target.value)}
                        onKeyDown={(e)=>{
                                if (e.key === 'Enter' && newCarousel) {
                                    addNewCarousel();
                                }
                            }}/>
                        <button disabled={!newCarousel} className="btn btn-outline-secondary" type="button" id="button-addon2"

                        onClick={() => {
                            if(newCarousel){
                                addNewCarousel();
                            }
                        }}
                        >
                        Add
                        </button>
                    </div> */}
                </li>
            </ul>
            <Modal show={show} onHide={handleClose} size="lg" centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add New Carousel Item
                    </Modal.Title>
                    
                </Modal.Header>
                <Modal.Body style={{ minHeight: "40vh"}}>
                    {
                        mediaType === 'image' ?
                        imageResponse && imageResponse.url ?
                        <div className="mb-3">
                            <img src={imageResponse.url} alt={imageResponse.alt_text || ''} className='img-fluid mb-3' />
                        </div>
                        : null
                        : 
                        newCarousel?.video?.url ?
                        <div>
                            <iframe width="560" height="315" src={newCarousel?.video?.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                        : null
                    }
                    <div className="mb-3">
                        <label htmlFor="heading" className='form-label'>Heading</label>
                        <input type="text" className="form-control"
                        value={newCarousel?.textBlock?.heading.value}
                        placeholder="Carousel Title"
                        onChange={(e) => setNewCarousel({
                            ...newCarousel,
                            textBlock: {
                                ...newCarousel?.textBlock,
                                heading: {
                                    ...newCarousel?.textBlock?.heading,
                                    value: e.target.value
                                }
                            }
                        })} /> 
                    </div>
                    {/* <div className="form-check form-switch my-2">
                        <input className="form-check-input" type="checkbox" value="" id="checkCustomImagePosition" checked={mediaType === 'image' } onChange={(e) => {
                            setMediaType(e.target.checked ? 'image' : 'video') }} />
                        <label className="form-check-label" htmlFor="checkCustomImagePosition">
                            {mediaType}
                        </label>
                    </div> */}
                    <div className="d-flex">
                        <button onClick={() => {
                            setMediaType('image')
                            setNewCarousel({
                                ...newCarousel,
                                mediaType: 'image'
                            })
                        }} 
                        className={mediaType === 'image' ? 'btn btn-primary rounded-end-0' : 'btn btn-outline-primary rounded-end-0'}>
                            <i className="bi bi-image"></i>
                        </button>
                        <button onClick={() => {
                            setMediaType('video')
                            setNewCarousel({
                                ...newCarousel,
                                mediaType: 'video'
                            })
                        }} className={mediaType === 'video' ? 'btn btn-primary rounded-start-0' : 'btn btn-outline-primary rounded-start-0'}>
                            <i className="bi bi-camera-reels-fill"></i>
                        </button>

                    </div>
                    {
                        mediaType === 'image' ? 
                        <div className="mb-3">
                            {/* image upload */}
                            <label htmlFor="imageUpload" className='form-label'>Upload Image</label>
                            <input
                                id="imageUpload"
                                type="file"
                                className="form-control"
                                placeholder=''
                                onChange={(e) => uploadImageToBlock(e)}
                            />
                        </div>
                        : 
                        <div className="mb-3">
                            <label htmlFor="video" className='form-label'>Video</label>
                            <input
                                id="video"
                                type="text"
                                className="form-control"
                                placeholder=''
                                onChange={(e) => setNewCarousel({
                                    ...newCarousel,
                                    video: {
                                        ...newCarousel.video,
                                        url: e.target.value
                                    }
                                })}
                            />
                        </div>
                    }
                    <div>

                    </div>
                    <div className="mb-3">
                        {/* subheading */}
                        <label htmlFor="subheading" className='form-label'>Subheading</label>
                        <input
                            id="subheading"
                            type="text"
                            className="form-control"
                            placeholder='Carousel Sub heading'
                            value={newCarousel?.textBlock?.subheading.value}
                            onChange={(e) => setNewCarousel({
                                ...newCarousel,
                                textBlock: {
                                    ...newCarousel?.textBlock,
                                    subheading: {
                                        ...newCarousel?.textBlock?.subheading,
                                        value: e.target.value
                                    }
                                }
                            })}
                        />
                    </div>
                    <div className='mb-3"'>
                        <label htmlFor="textContent" className='form-label'>Content</label>
                        <textarea
                            id="textContent"
                            className="form-control"
                            value={newCarousel?.textBlock?.content.value}
                            onChange={(e) => setNewCarousel({
                                ...newCarousel,
                                textBlock: {
                                    ...newCarousel?.textBlock,
                                    content: {
                                        ...newCarousel?.textBlock?.content,
                                        value: e.target.value
                                    }
                                }
                            })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={
                    () => {addNewCarousel()}}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default CarouselType