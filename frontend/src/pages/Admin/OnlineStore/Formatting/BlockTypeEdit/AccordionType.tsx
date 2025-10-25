import { edit } from '@cloudinary/url-gen/actions/animated';
import { FontWeight } from '@cloudinary/url-gen/qualifiers';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AccordionType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont }: any) {
    const [newAccordionTitle, setNewAccordionTitle] = useState('');
    const [newAccordionContent, setNewAccordionContent] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const update=(updatedBlock:any)=>{
        setEditBlock(updatedBlock);
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        console.log("Updated Section after text change:", updatedSection);
        updateSection(updatedSection);
    }
    const addNewAccordion=()=>{
        const selectedFont = allFontFamilies.find((font: any) => font.id === storeHeadingFont?.id);
        const selectedFontBody = allFontFamilies.find((font: any) => font.id === storeBodyFont?.id);
        const newAccordion = {
            uid: uuidv4(),
            heading: {
                title: newAccordionTitle
            },
            content: {
                content: newAccordionContent || 'content goes here'
            },
        };
        let updatedBlock = { ...editBlock ,
            accordionBlock: {
                ...editBlock.accordionBlock,
                accordions: [...(editBlock.accordionBlock?.accordions || []), newAccordion],
            },
        };
        console.log("New Accordion to add:", newAccordion);
        console.log("updatedBlock:", updatedBlock);
        update(updatedBlock);
        setNewAccordionTitle('');
        setNewAccordionContent('');
    }
    const [accordionToEdit, setAccordionToEdit] = React.useState<any>(null);
    const [accordionModalOpen, setAccordionModalOpen] = React.useState(false);
    return (
        <div>
            <ul className="list-group list-group-flush">
                {
                    editBlock?.accordionBlock?.accordions?.map((accordion: any, index: number) => (
                        <li className='list-group-item d-flex justify-content-between align-items-start' key={index} >
                            <h6 className='fw-bold'>{accordion.heading.title} </h6>
                            <div className="d-flex">
                                <button className="btn btn-primary btn-sm mb-2 me-2"
                                    onClick={() => {
                                        console.log("Editing accordion:", accordion);
                                        setAccordionToEdit(accordion);
                                        setAccordionModalOpen(true);
                                        handleShow();
                                    }}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-danger btn-sm mb-2 text-white"
                                    onClick={() => {
                                        // remove accordion from editBlock.accordionBlock.accordions
                                        const updatedAccordions = editBlock.accordionBlock.accordions.filter((acc: any) => acc._id !== accordion._id);
                                        console.log("Updated Accordions after deletion:", updatedAccordions);
                                        let updatedBlock = { ...editBlock ,
                                            accordionBlock: {
                                                ...editBlock.accordionBlock,
                                                accordions: updatedAccordions
                                            }
                                        };
                                        update(updatedBlock);
                                    }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))
                }
                <li className="list-group-item">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Accordion Title" aria-label="Accordion Title" aria-describedby="button-addon2" value={newAccordionTitle} onChange={(e) => setNewAccordionTitle(e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter' && newAccordionTitle) {
                                addNewAccordion();
                            }
                        }}/>

                        <button disabled={!newAccordionTitle} className="btn btn-outline-secondary" type="button" id="button-addon2"

                        onClick={() => {
                            if(newAccordionTitle){
                                addNewAccordion();
                            }
                        }}
                        >
                        Add
                        </button>
                    </div>
                </li>
            </ul>
            <hr />
            <h5 className="card-title text-capitalize"><i className="bi bi-fonts"></i> Heading</h5>
            <div>
                <label htmlFor="fontFamily" className='my-2 form-label'>Font</label>
                <select id="fontFamily" className="form-select" 
                defaultValue={editBlock?.accordionBlock?.heading?.font?.fontFamilyId}
                onChange={(e) => {
                    // Handle font family change
                    // also reset font weight to default of the selected font family
                    console.log("Font Family Change Event:", e.target.value);
                    const selectedFont = allFontFamilies.find((font: any) => font.id === e.target.value);
                    console.log("Selected Font Family:", selectedFont);
                    let updatedBlock = {
                        ...editBlock, 
                        accordionBlock: {
                            ...editBlock.accordionBlock, 
                            heading: {
                                ...editBlock.accordionBlock?.heading,
                                font:{
                                    ...editBlock.accordionBlock?.heading?.font,
                                    fontFamilyId: e.target.value,
                                    fontFamily: selectedFont ? selectedFont.family : editBlock.accordionBlock.heading.fontFamily,
                                    fontWeight: selectedFont ? selectedFont.defaultWeight : editBlock.accordionBlock.heading.fontWeight
                                    }
                                }
                            }
                    };
                    setEditBlock(updatedBlock);
                    update(updatedBlock);
                }}>
                    {
                        allFontFamilies.map((fontFamily: any) => (
                            <option key={fontFamily.id} value={fontFamily.id}
                            >{fontFamily.family}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="headingFontColor" className='my-2 form-label'>Font Color</label>
                <input type="color" id="headingFontColor" className="form-control form-control-color"
                defaultValue={editBlock?.accordionBlock?.heading?.font?.fontColor || '#000000'}
                onChange={(e) => {
                    let updatedBlock = {
                        ...editBlock,
                        accordionBlock: {
                            ...editBlock.accordionBlock,
                            heading: {
                                ...editBlock.accordionBlock.heading,
                                font: {
                                    ...editBlock.accordionBlock.heading.font,
                                    fontColor: e.target.value
                                }
                            }
                        }
                    };
                    setEditBlock(updatedBlock);
                    update(updatedBlock);
                }} />
            </div>
            <div className="row">
                <div className='col-md-6'>
                    <label htmlFor="textAlignment" className='form-label my-2'>Text Alignment {editBlock.accordionBlock?.heading?.alignment} </label>
                    <div className="d-flex">
                        {
                            editBlock.accordionBlock?.heading?.alignment === "left" ?
                            <label className="btn btn-primary rounded-end-0" htmlFor="btn-check"><i className="bi bi-text-left"></i></label> 
                            :
                            <>
                            <input type="checkbox" className="btn-check" id="btn-check" autoComplete="off"
                            defaultValue={editBlock.accordionBlock?.heading?.alignment}
                            checked={editBlock.accordionBlock?.heading?.alignment === "left"}
                            onChange={() => {
                                let updatedBlock = {...editBlock, 
                                    accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, alignment: "left"}}};
                                    setEditBlock(updatedBlock);
                                    update(updatedBlock);
                            }}/>
                            <label className="btn btn-outline-primary rounded-end-0 btn-outline-2" htmlFor="btn-check"><i className="bi bi-text-left"></i></label>
                            </>
                        }
                        {
                            editBlock.accordionBlock?.heading?.alignment === "center" ?
                            <label className="btn btn-primary rounded-0" htmlFor="btn-check-2"><i className="bi bi-text-center"></i></label> 
                            :
                            <>
                            <label className="btn btn-outline-primary rounded-0" htmlFor="btn-check-2"><i className="bi bi-text-center"></i></label>
                            <input type="checkbox" className="btn-check" id="btn-check-2" autoComplete="off"
                            defaultValue={editBlock.accordionBlock?.heading?.alignment}
                            checked={editBlock.accordionBlock?.heading?.alignment === "center"}
                            onChange={() => {
                                let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, alignment: "center"}}};
                                setEditBlock(updatedBlock);
                                update(updatedBlock);
                            }}/>
                            </>
                        }
                        {
                            editBlock.accordionBlock?.heading?.alignment === "right" ?
                            <label className="btn btn-primary rounded-start-0" htmlFor="btn-check-3"><i className="bi bi-text-right"></i></label> 
                            :
                            <>
                            <input type="checkbox" className="btn-check" id="btn-check-3" autoComplete="off" 
                            defaultValue={editBlock.accordionBlock?.heading?.alignment}
                            checked={editBlock.accordionBlock?.heading?.alignment === "right"}
                            onChange={() => {
                                let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, alignment: "right"}}};
                                setEditBlock(updatedBlock);
                                update(updatedBlock);
                            }}/>
                            <label className="btn btn-outline-primary rounded-start-0" htmlFor="btn-check-3"><i className="bi bi-text-left"></i></label>
                            </>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="textBlockAlignment" className='form-label my-2'>Text Case{editBlock?.accordionBlock?.heading?.textCase} </label>
                    <div>
                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            {
                                editBlock.accordionBlock?.heading?.textCase === "capitalize" ?
                                <label className="btn btn-primary" htmlFor="btnradioCapitalize">Aa</label>
                                :
                                <React.Fragment>
                                    <input type="radio" className="btn-check" 
                                    name="btnradio" id="btnradioCapitalize" autoComplete="off"
                                    onChange={
                                        () => {
                                        let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, textCase: "capitalize"}}};
                                        setEditBlock(updatedBlock);
                                        update(updatedBlock);
                                        }
                                    }
                                    />
                                    <label className="btn btn btn-outline-primary" htmlFor="btnradioCapitalize">Aa</label>
                                </React.Fragment>
                            }
                            {
                                editBlock.accordionBlock?.heading?.textCase === "uppercase" ?
                                <label className="btn btn-primary" htmlFor="btnradioUpper">AA</label>
                                :
                                <React.Fragment>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradioUpper" autoComplete="off"
                                    onChange={
                                        () => {
                                        let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, textCase: "uppercase"}}};
                                        setEditBlock(updatedBlock);
                                        update(updatedBlock);
                                        }
                                    }
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="btnradioUpper">AA</label>
                                </React.Fragment>
                            }
                            {
                                editBlock.accordionBlock?.heading?.textCase === "lowercase" ?
                                <label className="btn btn-primary" htmlFor="btnradioLower">aa</label>
                                :
                                <React.Fragment>
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradioLower" autoComplete="off"
                                    onChange={
                                        () => {
                                        let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, textCase: "lowercase"}}};
                                        setEditBlock(updatedBlock);
                                        update(updatedBlock);
                                        }}/>
                                        <label className="btn btn-outline-primary" htmlFor="btnradioLower">aa</label>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className='row'>
                {/* heading font styles */}
                <div className='col pe-2'>
                    <label htmlFor="headingFontWeight" className='my-2 form-label'>Font Weight</label>
                    <select id="headingFontWeight"
                    className="form-select"
                    defaultValue={editBlock?.accordionBlock?.heading?.font?.fontWeight}
                    onChange={(e) => {
                        // Handle font weight change
                        let updatedBlock = {
                            ...editBlock,
                            accordionBlock: {
                                ...editBlock.accordionBlock,
                                heading: {
                                    ...editBlock.accordionBlock?.heading,
                                    font: {
                                        ...editBlock.accordionBlock?.heading?.font,
                                        fontWeight: e.target.value
                                    }
                                }
                            }
                        };
                        setEditBlock(updatedBlock);
                        console.log("Updated Block after font weight change:", updatedBlock);
                        setEditBlock(updatedBlock);
                        update(updatedBlock);
                    }}>
                        {
                            editBlock.accordionBlock.heading.font.fontFamilyId ?
                            allFontFamilies.find((font: any) => font.id === editBlock.accordionBlock.heading.font.fontFamilyId)?.weights.map(
                                (weightOption: number | string) => {
                                    return (
                                        <option key={weightOption} value={weightOption}
                                        >{weightOption}</option>
                                    );
                                })
                            : 
                            allFontFamilies.find((font: any) => font.family === "Open Sans")?.weights.map(
                                (weightOption: number | string) => {
                                    // const weightStr = weightOption.toString();
                                    return (
                                        <option key={weightOption} value={weightOption}
                                        // selected={weightOption === "600"}
                                        >{weightOption}</option>
                                    );
                                }
                            )
                        }
                    </select>
                </div>
                <div className='col ps-2'>
                    <label htmlFor="fontSize" className='form-label my-2'>Font Size</label>
                    <input type="number" id="fontSize" className="form-control" 
                    defaultValue={editBlock.accordionBlock.heading.font.fontSize} onChange={(e) => {
                        // Handle font size change
                        let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, heading: {...editBlock.accordionBlock.heading, font: {...editBlock.accordionBlock.heading.font, fontSize: e.target.value}}}};
                        setEditBlock(updatedBlock);
                        update(updatedBlock);
                    }}
                    />
                </div>
            </div>
            <hr />
            <h5 className="card-title text-capitalize"><i className="bi bi-fonts"></i> Content</h5>
            <div>
                <label htmlFor="fontFamily" className='my-2 form-label'>Font</label>
                <select id="fontFamily" className="form-select" 
                defaultValue={editBlock?.accordionBlock?.content?.font?.fontFamilyId}
                onChange={(e) => {
                    // Handle font family change
                    // also reset font weight to default of the selected font family
                    console.log("Font Family Change Event:", e.target.value);
                    const selectedFont = allFontFamilies.find((font: any) => font.id === e.target.value);
                    console.log("Selected Font Family:", selectedFont);
                    let updatedBlock = {
                        ...editBlock, 
                        accordionBlock: {
                            ...editBlock.accordionBlock, 
                            content: {
                                ...editBlock.accordionBlock?.content,
                                font:{
                                    ...editBlock.accordionBlock?.content?.font,
                                    fontFamilyId: e.target.value,
                                    fontFamily: selectedFont ? selectedFont.family : editBlock.accordionBlock.content.fontFamily,
                                    fontWeight: selectedFont ? selectedFont.defaultWeight : editBlock.accordionBlock.content.fontWeight
                                    }
                                }
                            }
                    };
                    setEditBlock(updatedBlock);
                    update(updatedBlock);
                }}>
                    {
                        allFontFamilies.map((fontFamily: any) => (
                            <option key={fontFamily.id} value={fontFamily.id}
                            >{fontFamily.family}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="contentFontColor" className='my-2 form-label'>Font Color</label>
                <input type="color" id="contentFontColor" className="form-control form-control-color"
                defaultValue={editBlock?.accordionBlock?.content?.font?.fontColor || '#000000'}
                onChange={(e) => {
                    let updatedBlock = {
                        ...editBlock,
                        accordionBlock: {
                            ...editBlock.accordionBlock,
                            content: {
                                ...editBlock.accordionBlock.content,
                                font: {
                                    ...editBlock.accordionBlock.content.font,
                                    fontColor: e.target.value
                                }
                            }
                        }
                    };
                    setEditBlock(updatedBlock);
                    update(updatedBlock);
                }} />
            </div>
            <div className='row'>
                {/* content font styles */}
                <div className='col pe-2'>
                    <label htmlFor="contentFontWeight" className='my-2 form-label'>Font Weight</label>
                    <select id="contentFontWeight"
                    className="form-select"
                    defaultValue={editBlock?.accordionBlock?.content?.font?.fontWeight}
                    onChange={(e) => {
                        // Handle font weight change
                        let updatedBlock = {
                            ...editBlock,
                            accordionBlock: {
                                ...editBlock.accordionBlock,
                                content: {
                                    ...editBlock.accordionBlock?.content,
                                    font: {
                                        ...editBlock.accordionBlock?.content?.font,
                                        fontWeight: e.target.value
                                    }
                                }
                            }
                        };
                        setEditBlock(updatedBlock);
                        update(updatedBlock);
                    }}>
                        {
                            editBlock.accordionBlock.content.font.fontFamilyId ?
                            allFontFamilies.find((font: any) => font.id === editBlock.accordionBlock.content.font.fontFamilyId)?.weights.map(
                                (weightOption: number | string) => {
                                    return (
                                        <option key={weightOption} value={weightOption}
                                        >{weightOption}</option>
                                    );
                                })
                            : 
                            allFontFamilies.find((font: any) => font.family === "Open Sans")?.weights.map(
                                (weightOption: number | string) => {
                                    // const weightStr = weightOption.toString();
                                    return (
                                        <option key={weightOption} value={weightOption}
                                        // selected={weightOption === "600"}
                                        >{weightOption}</option>
                                    );
                                }
                            )
                        }
                    </select>
                </div>
                <div className='col ps-2'>
                    <label htmlFor="fontSize" className='form-label my-2'>Font Size</label>
                    <input type="number" id="fontSize" className="form-control" 
                    defaultValue={editBlock.accordionBlock.content.font.fontSize} onChange={(e) => {
                        // Handle font size change
                        let updatedBlock = {...editBlock, accordionBlock: {...editBlock.accordionBlock, content: {...editBlock.accordionBlock.content, font: {...editBlock.accordionBlock.content.font, fontSize: e.target.value}}}};
                        setEditBlock(updatedBlock);
                        update(updatedBlock);
                    }}
                    />
                </div>
            </div>
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <input type="text" className="form-control ms-3 col-12"
                        value={accordionToEdit?.heading?.title}
                        style={{
                            fontSize: "16px",
                            border: "none",
                            fontWeight: "bold",
                        }}
                        onChange={(e) => setAccordionToEdit({
                            ...accordionToEdit,
                            heading: {
                                ...accordionToEdit.heading,
                                title: e.target.value
                            }
                        })}
                    /></Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                    {/* {
                        accordionToEdit?.content?.content || 'No content available.'
                    } */}
                    <textarea
                        className="form-control"
                        value={accordionToEdit?.content?.content}
                        onChange={(e) => setAccordionToEdit({
                            ...accordionToEdit,
                            content: {
                                ...accordionToEdit.content,
                                content: e.target.value
                            }
                        })}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={
                    () => {
                        // Save changes logic here
                        console.log("Saving changes for accordion:", accordionToEdit);
                        // updateAccordion(accordionToEdit);
                        let updatedAccordions: any[] = [];
                        editBlock.accordionBlock.accordions.forEach((acc: any) => {
                            console.log("acc", acc);
                            console.log("accordionToEdit", accordionToEdit);
                            console.log("Comparing accordion IDs:", acc._id, accordionToEdit._id);
                            if (acc._id === accordionToEdit._id) {
                                updatedAccordions.push(accordionToEdit);
                            } else {
                                updatedAccordions.push(acc);
                            }
                        });
                        let updatedBlock = { ...editBlock , accordionBlock: { ...editBlock.accordionBlock, accordions: updatedAccordions } };
                        update(updatedBlock);
                        handleClose();
                    }
                }>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        </div>
    )
}

export default AccordionType