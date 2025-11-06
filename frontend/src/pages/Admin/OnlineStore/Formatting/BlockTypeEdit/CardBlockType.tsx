import { edit } from '@cloudinary/url-gen/actions/animated';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import FontSettings from './FontSettings';

function CardBlockType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails }: { selectedDesignBlock: any, editBlock: any, setEditBlock: (block: any) => void, section: any, updateSection: (section: any) => void, allFontFamilies: any, storeHeadingFont: any, storeTheme: any, storeBodyFont: any, storeInfo: any, pageDetails: any }) {
    const [cardItemToEdit, setCardItemToEdit] = useState<any>(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            show: false
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
    const removeCardItem = (cardItemId: string) => {
        const updatedCards = editBlock?.cardBlock?.cards.filter((item: any) => item._id !== cardItemId);
        const updatedBlock = {
            ...editBlock,
            cardBlock: {
                ...editBlock?.cardBlock,
                cards: updatedCards
            }
        };
        // updateSection(updatedBlock);
    };
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
                                        cardItem?.mediaType === 'image' ?
                                        <img src={cardItem?.media?.url ? cardItem?.media?.url : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} alt={cardItem?.media?.alt_text || ''} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                        :
                                        <div className="ratio ratio-1x1" style={{ width: '40px', height: '40px' }}>
                                            <video src={cardItem?.media?.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    }
                                </div>
                                <div>
                                    <h6 className='text-capitalize fw-bold mb-0'>{cardItem?.textBlock?.heading?.value || 'Untitled'}</h6>
                                    <p className='h6'>
                                        {
                                        cardItem?.textBlock?.content?.value && cardItem?.textBlock?.content?.value.length > 20 ?
                                        cardItem?.textBlock?.content?.value.substring(0, 20) + '...' :
                                        cardItem?.textBlock?.content?.value
                                        || 'No description'
                                        }

                                        <br />{cardItem?.mediaType}
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex">
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
                            <div className="mb-3">
                                <label htmlFor="heading" className='form-label'>Card Header</label>
                                <input type="text" className="form-control"
                                value={newCard?.heading.value}
                                placeholder="Carousel Title"
                                onChange={(e) => setNewCard({
                                    ...newCard,
                                    heading: {
                                        ...newCard?.heading,
                                        value: e.target.value
                                    }
                                })} /> 
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className='form-label'>Title</label>
                                <input type="text" className="form-control"
                                value={newCard?.title}
                                placeholder="Carousel Title"
                                onChange={(e) => setNewCard({
                                    ...newCard,
                                    title: e.target.value
                                })} /> 
                            </div>
                        </div>
                        : 
                        <div>
                            'Editing Card Item: {cardItemToEdit?.textBlock?.heading?.value || 'Untitled'}'
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

export default CardBlockType