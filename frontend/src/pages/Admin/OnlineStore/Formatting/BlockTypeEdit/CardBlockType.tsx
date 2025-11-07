import { edit } from '@cloudinary/url-gen/actions/animated';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import FontSettings from './FontSettings';
import { useAddImageToPageSectionBlock, useReplaceImageByIdMutation } from '../../../../../hooks/newImageHooks';
import TextBlockSettings from './TextBlockSettings';
import GoogleFont from 'react-google-font';

function CardBlockType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails }: { selectedDesignBlock: any, editBlock: any, setEditBlock: (block: any) => void, section: any, updateSection: (section: any) => void, allFontFamilies: any, storeHeadingFont: any, storeTheme: any, storeBodyFont: any, storeInfo: any, pageDetails: any }) {

    const ref = useRef<HTMLDivElement>(null);
    
    const { mutateAsync: replaceImageById } = useReplaceImageByIdMutation();
    const { mutateAsync: uploadImageToSectionBlock } = useAddImageToPageSectionBlock();
    const [imageResponse, setImageResponse] = useState<any>(null);
    const [cardItemToEdit, setCardItemToEdit] = useState<any>(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const borderWidths = [0, 2, 4, 6, 8, 10];
    const borderStyles = [
        {name:'none', value: 'none', icon: null},
        {name:'solid', value: 'solid', icon: `<i class="bi bi-dash-lg"></i><i class="ms-n1 bi bi-dash-lg"></i>`},
        {name:'dashed', value: 'dashed', icon: `<i class="bi bi-dash"></i><i class="ms-n1 bi bi-dash"></i><i class="ms-n1 bi bi-dash"></i>`},
        {name:'dotted', value: 'dotted', icon: `<i class="bi bi-dot"></i><i class="ms-n2 bi bi-dot"></i><i class="ms-n2 bi bi-dot"></i>`}
    ];

    const [newCardTemplate, setNewCardTemplate] = useState({
        mediaShow: false,
        title: '',
        href: '',
        show: true,
        sortOrder: editBlock?.carouselBlock?.items?.length + 1 || 1,
        mediaType: 'image' as 'image' | 'video',
        media:{
            type: 'page_slider_banner_image',
            url: '',
            alt_text: '',
            imageId: '',
            show: true
        },
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
            show: true,
            layout: {
                paddingX: '0',
                paddingY: '0',
                marginX: '0',
                marginY: '0',
                alignmentX: 'center',
                alignmentY: 'center',
            }
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
            show: true,
            layout: {
                paddingX: '0',
                paddingY: '0',
                marginX: '0',
                marginY: '0',
                alignmentX: 'center',
                alignmentY: 'center',
            }
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
            show: true,
            layout: {
                paddingX: '0',
                paddingY: '0',
                marginX: '0',
                marginY: '0',
                alignmentX: 'center',
                alignmentY: 'center',
            }
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
        layout: {
            paddingX: '0',
            paddingY: '0',
            marginX: '0',
            marginY: '0',
            alignmentX: 'center',
            alignmentY: 'center',
        },
        style: {
            borderColor: '#dddddd',
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderCorners: 0,
            borderStyle: 'solid',
        },
        expirePolicy: 'never' as 'never' | 'onDate',
        expirationDate: '',
        publishPolicy: 'immediate' as 'immediate' | 'onDate',
        publishDate: '',
    });
    const [newCard, setNewCard] = useState({...newCardTemplate});
    const [ modalType, setModalType] = useState<any>({
        type: null,
        modalHeader: '',
    });
    const update=(updatedBlock:any)=>{
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        updateSection(updatedSection);
        setEditBlock(updatedBlock);
    }
    const handleModal = async (type: string) => {
        setModalType({
            type: type,
            modalHeader: type === 'add' ? 'Add Carousel' : 'Edit Carousel'
        });
        handleShow();
    }
    const uploadImageToBlock = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('section', section);
        if(cardItemToEdit){
            if (cardItemToEdit?.media && cardItemToEdit?.media?.url && cardItemToEdit?.media?.imageId) {
                // update existing image
                try {
                    const response = await replaceImageById(cardItemToEdit.media.imageId);
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
            formData.append('imageType', JSON.stringify("page_card_image"));
            try{
                const response = await uploadImageToSectionBlock(formData);
                console.log('Image upload response:', response);
                if(response && response._id){
                    // update the editBlock state with new image info
                    setImageResponse(response);
                    setNewCard({
                        ...newCard,
                        media: {
                            ...newCard.media,
                            url: response.url,
                            alt_text: response.alt_text,
                            imageId: response._id,
                            show: true,
                            type: response.type || 'page_card_image',
                        }
                    })
                }
            }catch(error){
                console.error('Image upload failed');
            }
        }
    }
    const addNewCard = async () => {
        let updatedBlock = { ...editBlock, 
            cardBlock: {
                ...editBlock?.cardBlock,
                cards: [...(editBlock?.cardBlock?.cards || []), newCard]
            }
        };
        try {
            update(updatedBlock);
            handleClose();
            setNewCard({...newCardTemplate, sortOrder: (editBlock?.cardBlock?.cards?.length || 0) + 2});
        } catch (error) {
            console.error('Error creating new card:', error);
        }
    }
    const removeCardItem = (cardItemId: string) => {
        // console.log("Removing card item with id:", cardItemId);
        let allCardItems : any[] = []
        editBlock?.cardBlock?.cards.forEach((element: { _id: string; }) => {
            if(element._id != cardItemId){
                allCardItems.push(element);
            }else{
                console.log("found the item to remove", element);
            }
        });
        console.log("allCardItems after removal", allCardItems);
        const fixedCards = allCardItems.map((item, index) => ({
            ...item,
            sortOrder: index + 1
        }));
        // console.log("fixedCards after removal", fixedCards);
        const updatedBlock = {
            ...editBlock,
            cardBlock: {
                ...editBlock?.cardBlock,
                cards: fixedCards
            }
        };
        console.log("fixedCards after removal", fixedCards);
        update(updatedBlock);
        return

        // const updatedCards = editBlock?.cardBlock?.cards.filter((item: any) => item._id !== cardItemId);
        // // fix sortOrder after removal
        // const fixedCards = updatedCards.map((item, index) => ({
        //     ...item,
        //     sortOrder: index + 1
        // }));
        // const updatedBlock = {
        //     ...editBlock,
        //     cardBlock: {
        //         ...editBlock?.cardBlock,
        //         cards: fixedCards
        //     }
        // };
        // console.log("fixedCards after removal", fixedCards);
        // updateSection(updatedBlock);
    };
    useEffect(() => {
        const el = ref.current;
        el?.style.setProperty("--blockFont", 'Open Sans, sans-serif');

    }, [])
    
    return (
        <div>
            <ul className="list-group list-group-flush max-vh-30 overflow-auto card">
                <li className="list-group-item">
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-primary btn-sm" onClick={() => handleModal('add')}>Add Cards</button>
                    </div>
                </li>
                {
                    editBlock?.cardBlock?.cards && editBlock?.cardBlock?.cards.length > 0 ?
                    editBlock?.cardBlock?.cards.map((cardItem: any, idx: number) => (
                        <li key={'cardItem-' + idx} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center">
                                <div className="me-2">
                                    {
                                        cardItem?.media?.show ?
                                        <img src={cardItem?.media?.url ? cardItem?.media?.url : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt={cardItem?.media?.alt_text || ''} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                        :
                                        null
                                    }
                                </div>
                                <div>
                                    <h6 className='text-capitalize fw-bold mb-0'>{cardItem?.heading?.value || 'Untitled'}</h6>
                                    <p className='h6'>
                                        {
                                        cardItem?.content?.value && cardItem?.content?.value.length > 20 ?
                                        cardItem?.content?.value.substring(0, 20) + '...' :
                                        cardItem?.content?.value
                                        || 'No description'
                                        }<br />
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-tertiary btn-sm text-light me-2" onClick={() => {
                                    let updatedBlock = { ...editBlock, 
                                        cardBlock: {
                                            ...editBlock?.cardBlock,
                                            cards: [...(editBlock?.cardBlock?.cards || []), 
                                            {...cardItem, 
                                                _id: undefined, 
                                                sortOrder: (editBlock?.cardBlock?.cards?.length || 0) + 1,
                                                media:{
                                                    type: 'page_slider_banner_image',
                                                    url: '',
                                                    alt_text: '',
                                                    imageId: '',
                                                    show: true
                                                },
                                            }]
                                        }
                                    };
                                    update(updatedBlock);
                                }}><i className="bi bi-copy"></i></button>
                                <button className="btn btn-success btn-sm text-light me-2" onClick={() => {
                                    setCardItemToEdit(cardItem)
                                    console.log("cardItemToEdit", cardItem) 
                                    handleModal('edit')
                                }}><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-danger btn-sm text-light" onClick={() => removeCardItem(cardItem?._id)}><i className="bi bi-trash"></i></button>
                            </div>
                        </li>
                    ))
                    : <li className="list-group-item">No card items added</li>
                }
            </ul>
            <h6 className="card-title text-capitalize my-3">Edit Card Block Header</h6>
            <hr />
        <FontSettings editBlock={editBlock} update={update} blockType={editBlock?.cardBlock} blockTypeHeading={editBlock?.cardBlock?.heading}  type="heading" allFontFamilies={allFontFamilies} />
            <hr />
        <FontSettings editBlock={editBlock} update={update} blockType={editBlock?.cardBlock} blockTypeHeading={editBlock?.cardBlock?.subheading}  type="subheading" allFontFamilies={allFontFamilies} />
            <hr />
        <FontSettings editBlock={editBlock} update={update} blockType={editBlock?.cardBlock} blockTypeHeading={editBlock?.cardBlock?.content}  type="content" allFontFamilies={allFontFamilies} />
            <hr />
            <Modal show={show} onHide={handleClose} size="xl" centered >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType?.modalHeader}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: "40vh"}}>
                    <div className="row">
                        <div className="col-md-7">
                            {
                                modalType?.type === 'add' ?
                                <div>
                                    <div className="accordion" id="accordionPanelsStayOpenExample">
                                        <div className="accordion-item">
                                            <TextBlockSettings newCard={newCard} setNewCard={setNewCard} type="heading" allFontFamilies={allFontFamilies} index={0} modalType={modalType} />
                                        </div>
                                        <div className="accordion-item">
                                            <TextBlockSettings newCard={newCard} setNewCard={setNewCard} type="subheading" allFontFamilies={allFontFamilies} index={1} />
                                        </div>
                                        <div className="accordion-item">
                                            <TextBlockSettings newCard={newCard} setNewCard={setNewCard} type="content" allFontFamilies={allFontFamilies} index={2} />
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapseOne" + 3} aria-expanded="true" aria-controls={"panelsStayOpen-collapseOne" + 3}>
                                                    <label htmlFor="heading" className='form-label'>Card Image</label>
                                                </button>
                                            </h2>
                                            <div id={"panelsStayOpen-collapseOne" + 3} className={`accordion-collapse collapse`}>
                                                <div className="accordion-body">
                                                    <div className='mb-3'>
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <label htmlFor="title" className='form-label me-3'>Card Image</label>
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked={newCard?.media?.show} onChange={(e) => {
                                                                    setNewCard({
                                                                        ...newCard,
                                                                        media: {
                                                                            ...newCard?.media,
                                                                            show: !newCard?.media?.show
                                                                        }
                                                                    })
                                                                }}/>
                                                                <label className="form-check-label" htmlFor="switchCheckChecked"></label>
                                                            </div>
                                                        </div>
                                                        {
                                                            newCard?.media?.show ?
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
                                                            : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapseOne" + 4} aria-expanded="true" aria-controls={"panelsStayOpen-collapseOne" + 4}>
                                                    <label htmlFor="heading" className='form-label'>Card Styles</label>
                                                </button>
                                            </h2>
                                            <div id={"panelsStayOpen-collapseOne" + 4} className={`accordion-collapse collapse`}>
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="title" className='form-label'>Card Background Color</label>
                                                            <input type="color" className="form-control form-control-color" id="title" title="Choose your color"
                                                            value={newCard?.style?.backgroundColor || '#ffffff'}
                                                            onChange={(e) => setNewCard({
                                                                ...newCard,
                                                                style: {
                                                                    ...newCard?.style,
                                                                    backgroundColor: e.target.value
                                                                }
                                                            })} />
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label htmlFor="borderColor" className='form-label'>Card Border Color</label>
                                                            <input type="color" className="form-control form-control-color" id="borderColor" title="Choose your color"
                                                            value={newCard?.style?.borderColor || '#ffffff'}
                                                            onChange={(e) => setNewCard({
                                                                ...newCard,
                                                                style: {
                                                                    ...newCard?.style,
                                                                    borderColor: e.target.value
                                                                }
                                                            })} />
                                                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6">
                                <label htmlFor="buttonBorder" className="form-label">Border Style</label>
                                <div className="dropdown col">
                                    <button className="btn btn-outline-primary dropdown-toggle text-capitalize w-85" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                        <span>
                                        {
                                            newCard.style?.borderStyle ?
                                            // if border icon is string
                                            typeof borderStyles.find(style => style.value === newCard.style?.borderStyle)?.icon === "string" ?

                                            <span className='col-5' dangerouslySetInnerHTML={{__html: borderStyles.find(style => style.value === newCard.style?.borderStyle)?.icon ?? ''}}></span>
                                            : null
                                            : null
                                        }
                                        {
                                            typeof newCard.style?.borderStyle === "string" ?
                                            <span className='col-5'>
                                                {newCard.style?.borderStyle.charAt(0).toUpperCase() + newCard.style?.borderStyle.slice(1)}
                                            </span>
                                            :
                                            'Select Style'
                                        }
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu">
                                        {
                                            borderStyles.map((style,idx)=>
                                            <li key={'border-style-'+style+idx}>
                                                <button className={newCard.style?.borderStyle === style.value ? "dropdown-item d-flex active" : "dropdown-item d-flex"}
                                                onClick={()=>{
                                                    setNewCard({
                                                        ...newCard,
                                                        style: {
                                                            ...newCard.style,
                                                            borderStyle: style.value
                                                        }
                                                    })
                                                }}>
                                                    {
                                                        style.icon ? 
                                                        <React.Fragment>
                                                            <span className='col-5' dangerouslySetInnerHTML={{__html: style.icon}}></span>
                                                            {style.name.charAt(0).toUpperCase() + style.name.slice(1)}
                                                        </React.Fragment> :
                                                        <React.Fragment>
                                                            <span className='col-5'></span>None
                                                        </React.Fragment>
                                                    }
                                                    {/* {style.charAt(0).toUpperCase() + style.slice(1)} */}
                                                </button>
                                            </li>
                                            )
                                        }
                                        {/* <li><button className={editBlock.styles?.borderStyle === 'none' ||  !editBlock.styles?.borderStyle ? "dropdown-item active" : "dropdown-item"} 
                                        onClick={() => {
                                        let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderStyle: 'none'}};
                                            update(updatedBlock);
                                        }}>
                                            None</button></li>
                                        <li><button className={editBlock.styles?.borderStyle === 'solid' ? "dropdown-item d-flex active" : "dropdown-item d-flex "}
                                        onClick={()=>{
                                            let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderStyle: 'solid'}};
                                            update(updatedBlock);
                                        }}>
                                            <span className='col-5'><i className="bi bi-dash-lg"></i><i className="ms-n1 bi bi-dash-lg"></i></span> Solid</button></li>
                                        <li><button className={editBlock.styles?.borderStyle === 'dashed' ? "dropdown-item d-flex active" : "dropdown-item d-flex "}
                                        onClick={()=>{
                                            let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderStyle: 'dashed'}};
                                            update(updatedBlock);
                                        }}>
                                            <span className='col-5'><i className="bi bi-dash"></i><i className="ms-n1 bi bi-dash"></i><i className="ms-n1 bi bi-dash"></i></span> Dashed</button></li>
                                        <li><button className={editBlock.styles?.borderStyle === 'dotted' ? "dropdown-item d-flex active" : "dropdown-item d-flex "}
                                        onClick={()=>{
                                            let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderStyle: 'dotted'}};
                                            update(updatedBlock);
                                        }}>
                                            <span className='col-5'><i className="bi bi-dot"></i><i className="ms-n2 bi bi-dot"></i><i className="ms-n2 bi bi-dot"></i></span> Dotted</button></li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="buttonBorder" className="form-label">Border Width</label>
                                <div className="dropdown col">
                                    <button className="btn btn-outline-primary dropdown-toggle text-capitalize w-85 d-flex justify-content-between align-items-center py-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {newCard.style?.borderWidth ? 
                                        <span className='d-inline-block'
                                        style={{
                                            width: "80%",
                                            height: `${newCard.style?.borderWidth}px`,
                                            background: "black"
                                        }}></span>
                                        : 'None'}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu">
                                        {
                                            borderWidths.map((width,idx)=>
                                            <li key={'border-width-'+width+idx}>
                                                <button className={editBlock.styles?.borderWidth === width ? "dropdown-item d-flex justify-content-between align-items-center active" : "dropdown-item d-flex justify-content-between align-items-center"}
                                                style={{ minHeight: "40px" }}
                                                onClick={() => {
                                                    setNewCard({
                                                        ...newCard,
                                                        style: {
                                                            ...newCard.style,
                                                            borderWidth: width
                                                        }
                                                    })
                                                }}>
                                                    {
                                                        width === 0 ?
                                                        <React.Fragment>
                                                            None
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            <span className='col-9'
                                                            style={{
                                                                height: `${width}px`,
                                                                background: "black"
                                                            }}></span> 
                                                            <span className="col-3 text-end">

                                                            {width}
                                                            </span>
                                                            
                                                        </React.Fragment>
                                                    }
                                                </button>
                                            </li>
                                        )
                                        }
                                        {/* <li>
                                            <button className={editBlock.styles?.borderWidth > 10 ||  !editBlock.styles?.borderWidth ? "dropdown-item active" : "dropdown-item"}
                                            onClick={() => {
                                                setCustomBorderInputShow(true);
                                            }}>Custom</button>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : 
                                <div>
                                    <div className="accordion" id="accordionPanelsStayOpenExample">
                                        <div className="accordion-item">
                                            <TextBlockSettings newCard={cardItemToEdit} setNewCard={setCardItemToEdit} type="heading" allFontFamilies={allFontFamilies} index={0} modalType={modalType} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="col-md-5 mx-auto bg-lightGray p-3 text-font">
                            {
                                modalType?.type === 'add' ?
                                <div>
                                    {
                                        newCard?.heading?.font.fontFamily ?
                                        <GoogleFont fonts={[{ font: newCard?.heading?.font.fontFamily, weights: newCard?.heading?.font.fontWeight ? [newCard?.heading?.font.fontWeight] : [] }]} subsets={['latin', 'latin-ext']}/>
                                        : null
                                    }
                                    <div className="card mx-auto position-sticky top-5" style={{
                                        width: "18rem",
                                        borderColor: newCard?.style?.borderColor || '#dddddd',
                                        borderWidth: newCard?.style?.borderWidth ? `${newCard?.style?.borderWidth}px` : '1px',
                                        borderStyle: newCard?.style?.borderStyle || 'solid',
                                        backgroundColor: newCard?.style?.backgroundColor || '#ffffff',
                                        }}>
                                        {
                                            newCard?.media?.show ? 
                                            newCard?.media?.url ?
                                            <img src={newCard?.media?.url} className="card-img-top" alt={newCard?.media?.alt_text}/> 
                                            : 
                                            <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="card-img-top" alt="..."/>
                                            : null
                                        }
                                        <div className="card-body">
                                            {
                                                newCard?.heading.show ? 
                                                <h5 className="card-title"
                                                style={{
                                                    fontFamily: newCard?.heading?.font.fontFamily || 'Open Sans, sans-serif',
                                                    fontSize: newCard?.heading?.font.fontSize ? `${newCard?.heading?.font.fontSize}px` : '24px',
                                                    color: newCard?.heading?.font.fontColor || '#000000',
                                                    fontWeight: newCard?.heading?.font.fontWeight || 400,
                                                    textTransform: newCard?.heading?.textCase === 'capitalize' ? 'capitalize' :
                                                    newCard?.heading?.textCase === 'uppercase' ? 'uppercase' :
                                                    newCard?.heading?.textCase === 'lowercase' ? 'lowercase' : 'none',
                                                    textAlign: newCard?.heading?.alignment as any || 'left',
                                                    padding: `${newCard?.heading?.layout?.paddingY ? `${newCard?.heading?.layout?.paddingY}px` : '0'} ${newCard?.heading?.layout?.paddingX ? `${newCard?.heading?.layout?.paddingX}px` : '0'}` || '0',
                                                }}
                                                >{newCard?.heading.value || 'Card Title'}</h5> : null
                                            }
                                            {
                                                newCard?.subheading.show ? 
                                                <h6 className="card-subtitle mb-2"
                                                style={{
                                                    fontFamily: newCard?.subheading?.font.fontFamily || 'Open Sans, sans-serif',
                                                    fontSize: newCard?.subheading?.font.fontSize ? `${newCard?.subheading?.font.fontSize}px` : '18px',
                                                    color: newCard?.subheading?.font.fontColor || '#000000',
                                                    fontWeight: newCard?.subheading?.font.fontWeight || 400,
                                                    textTransform: newCard?.subheading?.textCase === 'capitalize' ? 'capitalize' :
                                                    newCard?.subheading?.textCase === 'uppercase' ? 'uppercase' :
                                                    newCard?.subheading?.textCase === 'lowercase' ? 'lowercase' : 'none',
                                                    textAlign: newCard?.subheading?.alignment as any || 'left',
                                                    padding: `${newCard?.subheading?.layout?.paddingY ? `${newCard?.subheading?.layout?.paddingY}px` : '0'} ${newCard?.subheading?.layout?.paddingX ? `${newCard?.subheading?.layout?.paddingX}px` : '0'}`,
                                                }}>
                                                    {newCard?.subheading.value || 'Card Subtitle'}</h6> : null
                                            }
                                            {
                                                newCard?.content.show ?
                                                <p className="card-text"
                                                style={{
                                                    fontFamily: newCard?.content?.font.fontFamily || 'Open Sans, sans-serif',
                                                    fontSize: newCard?.content?.font.fontSize ? `${newCard?.content?.font.fontSize}px` : '18px',
                                                    color: newCard?.content?.font.fontColor || '#000000',
                                                    fontWeight: newCard?.content?.font.fontWeight || 400,
                                                    textTransform: newCard?.content?.textCase === 'capitalize' ? 'capitalize' :
                                                    newCard?.content?.textCase === 'uppercase' ? 'uppercase' :
                                                    newCard?.content?.textCase === 'lowercase' ? 'lowercase' : 'none',
                                                    textAlign: newCard?.content?.alignment as any || 'left',
                                                    padding: `${newCard?.content?.layout?.paddingY ? `${newCard?.content?.layout?.paddingY}px` : '0'} ${newCard?.content?.layout?.paddingX ? `${newCard?.content?.layout?.paddingX}px` : '0'}`,
                                                }}
                                                >
                                                    {newCard?.content?.value || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'}
                                                </p>
                                                : null
                                            }
                                            {/* <h5 className="card-title">{newCard?.heading.value || 'Card Title'}</h5> */}
                                            {/* <h6 className="card-subtitle mb-2 text-body-secondary">{newCard?.subheading.value || 'Card Subtitle'}</h6> */}
                                            {/* <p className="card-text">
                                                {newCard?.content?.value || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'}
                                            </p> */}
                                            <a href="#" className="card-link">Card link</a>
                                            <a href="#" className="card-link">Another link</a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                {
                                    cardItemToEdit?.heading?.font.fontFamily ?
                                    <GoogleFont fonts={[{ font: cardItemToEdit?.heading?.font.fontFamily, weights: cardItemToEdit?.heading?.font.fontWeight ? [cardItemToEdit?.heading?.font.fontWeight] : [] }]} subsets={['latin', 'latin-ext']}/>
                                    : null
                                }
                                <div className="card mx-auto position-sticky top-5" style={{
                                    width: "18rem",
                                    borderColor: cardItemToEdit?.style?.borderColor || '#dddddd',
                                    borderWidth: cardItemToEdit?.style?.borderWidth ? `${cardItemToEdit?.style?.borderWidth}px` : '1px',
                                    borderStyle: cardItemToEdit?.style?.borderStyle || 'solid',
                                    backgroundColor: cardItemToEdit?.style?.backgroundColor || '#ffffff',
                                    }}>
                                    {
                                        cardItemToEdit?.media?.show ? 
                                        cardItemToEdit?.media?.url ?
                                        <img src={cardItemToEdit?.media?.url} className="card-img-top" alt={cardItemToEdit?.media?.alt_text}/> 
                                        : 
                                        <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="card-img-top" alt="..."/>
                                        : null
                                    }
                                    <div className="card-body">
                                        {
                                            cardItemToEdit?.heading.show ? 
                                            <h5 className="card-title"
                                            style={{
                                                fontFamily: cardItemToEdit?.heading?.font.fontFamily || 'Open Sans, sans-serif',
                                                fontSize: cardItemToEdit?.heading?.font.fontSize ? `${cardItemToEdit?.heading?.font.fontSize}px` : '24px',
                                                color: cardItemToEdit?.heading?.font.fontColor || '#000000',
                                                fontWeight: cardItemToEdit?.heading?.font.fontWeight || 400,
                                                textTransform: cardItemToEdit?.heading?.textCase === 'capitalize' ? 'capitalize' :
                                                cardItemToEdit?.heading?.textCase === 'uppercase' ? 'uppercase' :
                                                cardItemToEdit?.heading?.textCase === 'lowercase' ? 'lowercase' : 'none',
                                                textAlign: cardItemToEdit?.heading?.alignment as any || 'left',
                                                padding: `${cardItemToEdit?.heading?.layout?.paddingY ? `${cardItemToEdit?.heading?.layout?.paddingY}px` : '0'} ${cardItemToEdit?.heading?.layout?.paddingX ? `${cardItemToEdit?.heading?.layout?.paddingX}px` : '0'}` || '0',
                                            }}
                                            >{cardItemToEdit?.heading.value || 'Card Title'}</h5> : null
                                        }
                                        {
                                            cardItemToEdit?.subheading.show ? 
                                            <h6 className="card-subtitle mb-2"
                                            style={{
                                                fontFamily: cardItemToEdit?.subheading?.font.fontFamily || 'Open Sans, sans-serif',
                                                fontSize: cardItemToEdit?.subheading?.font.fontSize ? `${cardItemToEdit?.subheading?.font.fontSize}px` : '18px',
                                                color: cardItemToEdit?.subheading?.font.fontColor || '#000000',
                                                fontWeight: cardItemToEdit?.subheading?.font.fontWeight || 400,
                                                textTransform: cardItemToEdit?.subheading?.textCase === 'capitalize' ? 'capitalize' :
                                                cardItemToEdit?.subheading?.textCase === 'uppercase' ? 'uppercase' :
                                                cardItemToEdit?.subheading?.textCase === 'lowercase' ? 'lowercase' : 'none',
                                                textAlign: cardItemToEdit?.subheading?.alignment as any || 'left',
                                                padding: `${cardItemToEdit?.subheading?.layout?.paddingY ? `${cardItemToEdit?.subheading?.layout?.paddingY}px` : '0'} ${cardItemToEdit?.subheading?.layout?.paddingX ? `${cardItemToEdit?.subheading?.layout?.paddingX}px` : '0'}`,
                                            }}>
                                                {cardItemToEdit?.subheading.value || 'Card Subtitle'}</h6> : null
                                        }
                                        {
                                            cardItemToEdit?.content.show ?
                                            <p className="card-text"
                                            style={{
                                                fontFamily: cardItemToEdit?.content?.font.fontFamily || 'Open Sans, sans-serif',
                                                fontSize: cardItemToEdit?.content?.font.fontSize ? `${cardItemToEdit?.content?.font.fontSize}px` : '18px',
                                                color: cardItemToEdit?.content?.font.fontColor || '#000000',
                                                fontWeight: cardItemToEdit?.content?.font.fontWeight || 400,
                                                textTransform: cardItemToEdit?.content?.textCase === 'capitalize' ? 'capitalize' :
                                                cardItemToEdit?.content?.textCase === 'uppercase' ? 'uppercase' :
                                                cardItemToEdit?.content?.textCase === 'lowercase' ? 'lowercase' : 'none',
                                                textAlign: cardItemToEdit?.content?.alignment as any || 'left',
                                                padding: `${cardItemToEdit?.content?.layout?.paddingY ? `${cardItemToEdit?.content?.layout?.paddingY}px` : '0'} ${cardItemToEdit?.content?.layout?.paddingX ? `${cardItemToEdit?.content?.layout?.paddingX}px` : '0'}`,
                                            }}
                                            >
                                                {cardItemToEdit?.content?.value || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'}
                                            </p>
                                            : null
                                        }
                                        <a href="#" className="card-link">Card link</a>
                                        <a href="#" className="card-link">Another link</a>
                                    </div>
                                </div>

                                </div>
                            }
                        </div>
                    </div>
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
                    <Button variant="primary" 
                    disabled={!newCard?.heading?.value && !newCard?.subheading?.value && !newCard?.content?.value}
                    onClick={
                        () => {addNewCard()}}>
                        Add New Card
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CardBlockType