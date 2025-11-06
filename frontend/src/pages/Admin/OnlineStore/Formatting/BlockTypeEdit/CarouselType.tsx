import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/esm/Modal';
import { useAddImageToPageSectionBlock, useReplaceImageByIdMutation } from '../../../../../hooks/newImageHooks';

import { text } from 'stream/consumers';

function CarouselType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails }: { selectedDesignBlock: any, editBlock: any, setEditBlock: (block: any) => void, section: any, updateSection: (section: any) => void, allFontFamilies: any, storeHeadingFont: any, storeTheme: any, storeBodyFont: any, storeInfo: any, pageDetails: any }) {
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const { mutateAsync: uploadImageToSectionBlock } = useAddImageToPageSectionBlock();
    const [imageResponse, setImageResponse] = useState<any>(null);
    const [carouselItemToEdit, setCarouselItemToEdit] = useState<any>(null);
    const { mutateAsync: replaceImageById } = useReplaceImageByIdMutation();
    
    const [ modalType, setModalType] = useState<any>({
        type: null,
        modalHeader: '',
    });
    const [mediaType, setMediaType] = useState<'video' | 'image'>('image');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newCarouselTemplate, setNewCarouselTemplate] = useState({
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
        expirePolicy: 'never' as 'never' | 'onDate',
        expirationDate: '',
        publishPolicy: 'immediate' as 'immediate' | 'onDate',
        publishDate: '',
    });
    const [newCarousel, setNewCarousel] = useState({...newCarouselTemplate});
    const selectedFont = allFontFamilies.find((font: any) => font.id === storeHeadingFont?.id);
    const update=(updatedBlock:any)=>{
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        updateSection(updatedSection);
        setEditBlock(updatedBlock);
    }

    const uploadImageToBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('section', section);
        if(carouselItemToEdit){
            if (carouselItemToEdit?.media && carouselItemToEdit?.media?.url && carouselItemToEdit?.media?.imageId) {
                // update existing image
                try {
                    const response = await replaceImageById(carouselItemToEdit.media.imageId);
                    console.log("Replaced image response:", response);
                } catch (error) {
                    console.error("Error replacing image:", error);
                    // Handle error appropriately
                    return
                }
            }
        }
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
    const saveChanges = async () => {
        console.log("Saving changes to carousel:", carouselItemToEdit);
        // if new image file is selected, upload it
        if(editImageFile){
            const uploadNewImage = async () => {
                const formData = new FormData();
                    // formData.append('image', editImageFile);
                formData.append('mainImage', editImageFile as Blob);
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
                        let updatedCarouselItem = {
                            ...carouselItemToEdit,
                            media: {
                                ...carouselItemToEdit.media,
                                url: response.url,
                                alt_text: response.alt_text,
                                imageId: response._id,
                                show: true,
                                type: response.type || 'page_slider_banner_image',
                            }
                        }
                        let allCarouselItems: any[] = [];
                        editBlock?.carouselBlock?.items?.forEach((item: any) => {
                            if(item._id === updatedCarouselItem._id){
                                allCarouselItems.push(updatedCarouselItem);
                            }else{
                                allCarouselItems.push(item);
                            }
                        });
                        let updatedBlock = { ...editBlock,
                            carouselBlock: {
                                ...editBlock?.carouselBlock,
                                items: allCarouselItems
                            }
                        }
                        console.log("Updated Block after adding new carousel:", updatedBlock);
                        // return
                        update(updatedBlock);
                        setCarouselItemToEdit(null);
                        setEditImageFile(null);
                        handleClose();
                    }
                }catch(error){
                    console.error('Image upload failed:', error);
                }
            }
            // const formData = new FormData();
            // check if replacing existing image or adding new image
            if(carouselItemToEdit?.media && carouselItemToEdit?.media?.url && carouselItemToEdit?.media?.imageId){
                try {
                    const response = await replaceImageById(carouselItemToEdit.media.imageId);
                    console.log("Replaced image response:", response);
                    if (!response) {
                        console.error("Failed to replace image");
                        return;
                    }
                    uploadNewImage();

                } catch (error) {
                    console.error("Error replacing image:", error);
                    // Handle error appropriately
                    return
                }
            }else{
                uploadNewImage();
            }
        }
        let allCarouselItems: any[] = [];
        editBlock?.carouselBlock?.items?.forEach((item: any) => {
            if(item._id === carouselItemToEdit._id){
                allCarouselItems.push(carouselItemToEdit);
            }else{
                allCarouselItems.push(item);
            }
        });
        let updatedBlock = { ...editBlock,
            carouselBlock: {
                ...editBlock?.carouselBlock,
                items: [...allCarouselItems]
            }
        }
        console.log("Updated Block after editing carousel:", updatedBlock);
        try {
            update(updatedBlock);
            setCarouselItemToEdit(null);
            handleClose();
        } catch (error) {
            console.error("Error adding new carousel item:", error);
        }
    }
    const addNewCarousel = async () => {
        console.log("Adding new carousel:", newCarousel);
        if(!newCarousel.textBlock.heading.value){
            return;
        }
        console.log("New Carousel to add:", newCarousel);
        let updatedBlock = { ...editBlock,
            carouselBlock: {
                ...editBlock?.carouselBlock,
                items: [...(editBlock?.carouselBlock?.items || []), newCarousel]
            }
        }
        console.log("Updated Block after adding new carousel:", updatedBlock);
        // return
        try {
            
            update(updatedBlock);
            // setEditBlock(updatedBlock);
            handleClose();
            setNewCarousel({...newCarouselTemplate});
        } catch (error) {
            console.error("Error adding new carousel item:", error);
        }
    }
    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Handle image upload
            console.log("Uploading image:", file);
        }
        // temporrily set image file to state
        setEditImageFile(file || null);
    }
    const toEmbedUrl = (raw: string) => {
        try {
            const u = new URL(raw);
            if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
            const id = u.hostname === 'youtu.be'
                ? u.pathname.slice(1)
                : u.searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : raw;
            }
            if (u.hostname.includes('vimeo.com')) {
            const id = u.pathname.split('/').filter(Boolean)[0];
            return id ? `https://player.vimeo.com/video/${id}` : raw;
            }
            return raw;
        } catch {
            return raw;
        }
    };
    const editCarouselItem= (index: number) => {
        console.log("Editing carousel item at index:", index);
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
    const handleModal = async (type: string) => {
        setModalType({
            type: type,
            modalHeader: type === 'add' ? 'Add Carousel' : 'Edit Carousel'
        });
        handleShow();
    }
    useEffect(() => {
        console.log("New Carousel State:", editBlock);
        console.log("selectedFont:", selectedFont);
        console.log("storeTheme:", storeTheme);
    }, [editBlock])
    return (
        <div>
            <ul className="list-group list-group-flush max-vh-30 overflow-auto card">
                <li className="list-group-item">
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm" onClick={() => handleModal('add')}>Add Carousel</button>
                    </div>
                </li>
                {
                    editBlock?.carouselBlock?.items && editBlock?.carouselBlock?.items.length > 0 ?
                    editBlock?.carouselBlock?.items.map((carouselItem: any, idx: number) => (
                        <li key={'carouselItem-' + idx} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center">
                                <div className="me-2">
                                    {
                                        carouselItem?.mediaType === 'image' ?
                                        <img src={carouselItem?.media?.url ? carouselItem?.media?.url : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt={carouselItem?.media?.alt_text || ''} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                        :
                                        <div className="ratio ratio-1x1" style={{ width: '40px', height: '40px' }}>
                                            <video src={carouselItem?.media?.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    }
                                </div>
                                <div>
                                    <h6 className='text-capitalize fw-bold mb-0'>{carouselItem?.textBlock?.heading?.value || 'Untitled'}</h6>
                                    <p className='h6'>
                                        {
                                        carouselItem?.textBlock?.content?.value && carouselItem?.textBlock?.content?.value.length > 20 ?
                                        carouselItem?.textBlock?.content?.value.substring(0, 20) + '...' :
                                        carouselItem?.textBlock?.content?.value
                                        || 'No description'
                                        }

                                        <br />{carouselItem?.mediaType}
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-success btn-sm text-light me-2" onClick={() => {
                                    setCarouselItemToEdit(carouselItem)
                                    console.log("carouselItemToEdit", carouselItem) 
                                    handleModal('edit')
                                }}><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-danger btn-sm text-light" onClick={() => removeCarouselItem(carouselItem?._id)}><i className="bi bi-trash"></i></button>
                            </div>
                        </li>
                    ))
                    : <li className="list-group-item">No carousel items added</li>
                }
            </ul>
            <Modal show={show} onHide={handleClose} size="lg" centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType?.modalHeader}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: "40vh"}}>
                    {
                        modalType?.type === 'add' ?
                        <div>
                            {
                                mediaType === 'image' ?
                                imageResponse && imageResponse.url ?
                                <div className="mb-3">
                                    <img src={imageResponse.url} alt={imageResponse.alt_text || ''} className='img-fluid mb-3' />
                                </div>
                                : null
                                : 
                                newCarousel?.video?.url ?
                                <div className="ratio ratio-16x9">
                                    <iframe src={toEmbedUrl(newCarousel.video.url)} title="Video"
                                    frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                    />
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
                            <div className="mb-3">
                                <label htmlFor="title" className='form-label'>Title</label>
                                <input type="text" className="form-control"
                                value={newCarousel?.title}
                                placeholder="Carousel Title"
                                onChange={(e) => setNewCarousel({
                                    ...newCarousel,
                                    title: e.target.value
                                })} /> 
                            </div>
                            <div className="d-flex">
                                <button onClick={() => {
                                    setMediaType('image')
                                    setNewCarousel({
                                        ...newCarousel,
                                        mediaType: 'image',
                                    })
                                }} 
                                className={mediaType === 'image' ? 'btn btn-primary rounded-end-0' : 'btn btn-outline-primary rounded-end-0'}>
                                    <i className="bi bi-image"></i>
                                </button>
                                <button onClick={() => {
                                    setMediaType('video')
                                    setNewCarousel(nc => ({
                                    ...nc,
                                    mediaType: 'video',
                                    media: { ...nc.media, show: false },
                                    video: { ...(nc.video || {}), url: nc.video?.url || '', show: true },
                                    }));
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
                                        onChange={(e) => setNewCarousel(nc => ({
                                            ...nc,
                                            mediaType: 'video',
                                            video: { ...(nc.video || {}), url: toEmbedUrl(e.target.value), show: true },
                                            media: { ...(nc.media || {}), show: false },
                                        }))}
                                        />
                                </div>
                            }
                            <div>
                            </div>
                            <div className="mb-3">
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
                            <div className="d-flex justify-content-between">
                                <div className={newCarousel?.publishPolicy === 'onDate' ? "mb-3 col-6 me-3" : "mb-3 col"}>
                                    <label htmlFor="publishPolicy" className='form-label'>Publish Policy</label>
                                    <select
                                        id="publishPolicy"
                                        className="form-select"
                                        value={newCarousel?.publishPolicy}
                                        onChange={(e) => setNewCarousel({
                                            ...newCarousel,
                                            publishPolicy: e.target.value as 'immediate' | 'onDate',
                                        })}>
                                        <option value="immediate">immediate</option>
                                        <option value="onDate">On Date</option>
                                    </select>
                                </div>
                                {
                                    newCarousel?.publishPolicy === 'onDate' ?
                                    <div className="mb-3 col-6">
                                        <label htmlFor="publishDate" className='form-label'>Publish Date</label>
                                        <input type="datetime-local" id="publishDate" className="form-control"
                                            min={new Date().toISOString().slice(0,16)}
                                            value={newCarousel?.publishDate || new Date().toISOString().slice(0,16)}
                                            onChange={(e) => 
                                            {
                                                let publishDateTime = new Date(e.target.value).getTime();
                                                let newCarouselCopy = { ...newCarousel };
                                                newCarouselCopy.publishDate = e.target.value;
                                                if(newCarousel?.expirePolicy === 'onDate' && newCarousel?.expirationDate < e.target.value){
                                                    const publishDateTime = new Date( e.target.value).getTime();
                                                    const minExpireDateTime = publishDateTime + 60000;
                                                    newCarouselCopy.expirationDate = new Date(minExpireDateTime).toISOString().slice(0,16);
                                                }
                                                setNewCarousel({...newCarouselCopy})
                                            }}
                                        />
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className={newCarousel?.expirePolicy === 'onDate' ? "mb-3 col-6 me-3" : "mb-3 col"}>
                                    <label htmlFor="expirationPolicy" className='form-label'>Expiration Policy</label>
                                    <select
                                        id="expirationPolicy"
                                        className="form-select"
                                        value={newCarousel?.expirePolicy}
                                        onChange={(e) => {
                                            setNewCarousel({
                                            ...newCarousel,
                                            expirePolicy: e.target.value as 'never' | 'onDate',
                                            })

                                        }}>
                                        <option value="never">Never</option>
                                        <option value="onDate">On Date</option>
                                    </select>
                                </div>
                                {
                                    newCarousel?.expirePolicy === 'onDate' ?
                                    <div className="mb-3 col-6">
                                        <label htmlFor="expirationDate" className='form-label'>Expiration Date</label>
                                        <input
                                        type="datetime-local" id="expirationDate" className="form-control"
                                        min={ newCarousel?.publishDate ? 
                                        new Date(new Date(newCarousel?.publishDate).getTime() + 60000).toISOString().slice(0,16) 
                                        : new Date().toISOString().slice(0,16)}
                                        value={newCarousel?.expirationDate || new Date().toISOString().slice(0,16)}
                                            onChange={(e) => setNewCarousel({
                                                ...newCarousel,
                                                expirationDate: e.target.value
                                            })}
                                        />
                                        {
                                            newCarousel?.publishDate && newCarousel?.expirationDate && new Date(newCarousel?.expirationDate).getTime() <= new Date(newCarousel?.publishDate).getTime() ?
                                            <div className="text-danger">Expiration date must be after publish date.</div>
                                            : null
                                        }
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        : 
                        <div>
                            {
                                editImageFile && editImageFile instanceof File ?
                                <div className="mb-3">
                                    <img src={URL.createObjectURL(editImageFile)} alt={carouselItemToEdit?.media?.alt_text || ''} className='img-fluid mb-3' />
                                </div>
                                : 
                                carouselItemToEdit?.mediaType === 'image' ?
                                carouselItemToEdit?.media && carouselItemToEdit?.media.url ?
                                <div className="mb-3">
                                    <img src={carouselItemToEdit?.media.url} alt={carouselItemToEdit?.media.alt_text || ''} className='img-fluid mb-3' />
                                </div>
                                : null
                                : 
                                carouselItemToEdit?.video?.url ?
                                <div>
                                    <iframe width="100%" height="100%" src={carouselItemToEdit?.video?.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                                : null
                            }
                            <div className="mb-3">
                                <label htmlFor="heading" className='form-label'>Heading</label>
                                <input type="text" className="form-control"
                                value={carouselItemToEdit?.textBlock?.heading.value}
                                placeholder="Carousel Title"
                                onChange={(e) => setCarouselItemToEdit({
                                    ...carouselItemToEdit,
                                    textBlock: {
                                        ...carouselItemToEdit?.textBlock,
                                        heading: {
                                            ...carouselItemToEdit?.textBlock?.heading,
                                            value: e.target.value
                                        }
                                    }
                                })} /> 
                            </div>
                            <div className="d-flex">
                                <button onClick={() => {
                                    setMediaType('image')
                                    setCarouselItemToEdit({
                                        ...carouselItemToEdit,
                                        mediaType: 'image'
                                    })
                                }} 
                                className={carouselItemToEdit?.mediaType === 'image' ? 'btn btn-primary rounded-end-0' : 'btn btn-outline-primary rounded-end-0'}>
                                    <i className="bi bi-image"></i>
                                </button>
                                <button onClick={() => {
                                    setMediaType('video')
                                    setCarouselItemToEdit({
                                        ...carouselItemToEdit,
                                        mediaType: 'video'
                                    })
                                }} className={carouselItemToEdit?.mediaType === 'video' ? 'btn btn-primary rounded-start-0' : 'btn btn-outline-primary rounded-start-0'}>
                                    <i className="bi bi-camera-reels-fill"></i>
                                </button>

                            </div>
                            {
                                carouselItemToEdit?.mediaType === 'image' ? 
                                <div className="mb-3">
                                    {/* image upload */}
                                    <label htmlFor="imageUpload" className='form-label'>Upload Image</label>
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        className="form-control"
                                        placeholder=''
                                        onChange={(e) => imageHandler(e)}
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
                                        value={carouselItemToEdit?.video?.url}
                                        onChange={(e) => setCarouselItemToEdit({
                                            ...carouselItemToEdit,
                                            video: {
                                                ...carouselItemToEdit.video,
                                                url: e.target.value
                                            }
                                        })}
                                    />
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="subheading" className='form-label'>Subheading</label>
                                <input
                                    id="subheading"
                                    type="text"
                                    className="form-control"
                                    placeholder=''
                                    value={carouselItemToEdit?.subheading}
                                    onChange={(e) => setCarouselItemToEdit({
                                        ...carouselItemToEdit,
                                        subheading: e.target.value
                                    })}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="textContent" className='form-label'>Content</label>
                                <textarea
                                    id="textContent"
                                    className="form-control"
                                    value={carouselItemToEdit?.textBlock?.content.value}
                                    onChange={(e) => setCarouselItemToEdit({
                                        ...carouselItemToEdit,
                                        textBlock: {
                                            ...carouselItemToEdit?.textBlock,
                                            content: {
                                                ...carouselItemToEdit?.textBlock?.content,
                                                value: e.target.value
                                            }
                                        }
                                    })}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className={carouselItemToEdit?.publishPolicy === 'onDate' ? "mb-3 col-6 me-3" : "mb-3 col"}>
                                    <label htmlFor="publishPolicy" className='form-label'>Publish Policy</label>
                                    <select
                                        id="publishPolicy"
                                        className="form-select"
                                        value={carouselItemToEdit?.publishPolicy}
                                        onChange={(e) => setCarouselItemToEdit({
                                            ...carouselItemToEdit,
                                            publishPolicy: e.target.value as 'immediate' | 'onDate',
                                        })}>
                                        <option value="immediate">Immediate</option>
                                        <option value="onDate">On Date</option>
                                    </select>
                                </div>
                                {
                                    carouselItemToEdit?.publishPolicy === 'onDate' ?
                                    <div className="mb-3 col-6">
                                        <label htmlFor="publishDate" className='form-label'>Publish Date</label>
                                        <input type="datetime-local" id="publishDate" className="form-control"
                                            min={new Date().toISOString().slice(0,16)}
                                            value={carouselItemToEdit?.publishDate || new Date().toISOString().slice(0,16)}
                                            onChange={(e) => 
                                            {
                                                let publishDateTime = new Date(e.target.value).getTime();
                                                let newCarouselCopy = { ...carouselItemToEdit };
                                                newCarouselCopy.publishDate = e.target.value;
                                                if(newCarouselCopy?.expirePolicy === 'onDate' && newCarouselCopy?.expirationDate < e.target.value){
                                                    const publishDateTime = new Date( e.target.value).getTime();
                                                    const minExpireDateTime = publishDateTime + 60000;
                                                    newCarouselCopy.expirationDate = new Date(minExpireDateTime).toISOString().slice(0,16);
                                                }
                                                setCarouselItemToEdit({...newCarouselCopy})
                                            }}
                                        />
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className={carouselItemToEdit?.expirePolicy === 'onDate' ? "mb-3 col-6 me-3" : "mb-3 col"}>
                                    <label htmlFor="expirationPolicy" className='form-label'>Expiration Policy</label>
                                    <select
                                        id="expirationPolicy"
                                        className="form-select"
                                        value={carouselItemToEdit?.expirePolicy}
                                        onChange={(e) => {
                                            setCarouselItemToEdit({
                                            ...carouselItemToEdit,
                                            expirePolicy: e.target.value as 'never' | 'onDate',
                                            })

                                        }}>
                                        <option value="never">Never</option>
                                        <option value="onDate">On Date</option>
                                    </select>
                                </div>
                                {
                                    carouselItemToEdit?.expirePolicy === 'onDate' ?
                                    <div className="mb-3 col-6">
                                        <label htmlFor="expirationDate" className='form-label'>Expiration Date</label>
                                        <input
                                        type="datetime-local" id="expirationDate" className="form-control"
                                        min={ carouselItemToEdit?.publishDate ? 
                                        new Date(new Date(carouselItemToEdit?.publishDate).getTime() + 60000).toISOString().slice(0,16) 
                                        : new Date().toISOString().slice(0,16)}
                                        value={carouselItemToEdit?.expirationDate || new Date().toISOString().slice(0,16)}
                                            onChange={(e) => setCarouselItemToEdit({
                                                ...carouselItemToEdit,
                                                expirationDate: e.target.value
                                            })}
                                        />
                                        {
                                            carouselItemToEdit?.publishDate && carouselItemToEdit?.expirationDate && new Date(carouselItemToEdit?.expirationDate).getTime() <= new Date(carouselItemToEdit?.publishDate).getTime() ?
                                            <div className="text-danger">Expiration date must be after publish date.</div>
                                            : null
                                        }
                                    </div>
                                    : null
                                }
                            </div>

                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {
                    modalType?.type === 'edit' ?
                    <Button variant="primary" onClick={
                        () => {saveChanges()}}>
                        Save Changes 
                    </Button>
                    : 
                    <Button variant="primary" onClick={
                        () => {addNewCarousel()}}>
                        Add New Carousel
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CarouselType