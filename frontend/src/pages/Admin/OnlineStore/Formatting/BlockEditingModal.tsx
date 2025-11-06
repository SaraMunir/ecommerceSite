import React, { useEffect, useState } from 'react'
import designBlockContents from '../../../../designBlockContents.json';
import fontFamilies from '../../../../designFonts.json';
import { edit } from '@cloudinary/url-gen/actions/animated';
import TextType from './BlockTypeEdit/TextType';
import ButtonType from './BlockTypeEdit/ButtonType';
import AccordionType from './BlockTypeEdit/AccordionType';
import ImageType from './BlockTypeEdit/ImageType';
import CarouselType from './BlockTypeEdit/CarouselType';
import CardBlockType from './BlockTypeEdit/CardBlockType';



function BlockEditingModal({type, section, editBlock, setEditBlock, updateSection, closeEditBlockMenu, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails}: {type: string, section: any, editBlock: any, setEditBlock: (block: any) => void, updateSection: (section: any) => void, closeEditBlockMenu: () => void, storeHeadingFont: any, storeTheme: any, storeBodyFont: any, storeInfo: any, pageDetails: any }) {

    const [designBlocks] = useState(designBlockContents.contentBlocks)
    const [allFontFamilies] = useState(fontFamilies.fonts)
    const [selectedDesignBlock, setSelectedDesignBlock] = useState<any>(null);
    const [customBorderWidth, setCustomBorderWidth] = useState<number | null>(null);
    const [customBorderInputShow, setCustomBorderInputShow] = useState<boolean>(false);
    const update=(updatedBlock:any)=>{
        setEditBlock(updatedBlock);
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        console.log("Updated Section after text change:", updatedSection);
        updateSection(updatedSection);
    }
    const borderStyles = ['none', 'solid', 'dashed', 'dotted'];
    const borderStyles2 = [
        {name:'none', value: 'none', icon: null},
        {name:'solid', value: 'solid', icon: `<i class="bi bi-dash-lg"></i><i class="ms-n1 bi bi-dash-lg"></i>`},
        {name:'dashed', value: 'dashed', icon: `<i class="bi bi-dash"></i><i class="ms-n1 bi bi-dash"></i><i class="ms-n1 bi bi-dash"></i>`},
        {name:'dotted', value: 'dotted', icon: `<i class="bi bi-dot"></i><i class="ms-n2 bi bi-dot"></i><i class="ms-n2 bi bi-dot"></i>`}
    ];
    const borderWidths = [0, 2, 4, 6, 8, 10];
    useEffect(() => {
        const _dragTarget = document.getElementById("block-editor");
        dragElement(_dragTarget);
        function dragElement(elmnt: HTMLElement | null) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (!elmnt) return;
            const header = document.getElementById(elmnt.id + "-header");
            if (header) {
                /* if present, the header is where you move the DIV from:*/
                (header as HTMLElement).onmousedown = dragMouseDown;
            } else {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                elmnt.onmousedown = dragMouseDown;
            }
            function dragMouseDown(e: MouseEvent) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
            function elementDrag(e: MouseEvent) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                if (elmnt) {
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
            }
            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }, [editBlock]);
    useEffect(() => {
        console.log("Editing block details:", editBlock);
        // Find the corresponding design block
        if(editBlock){
            const foundBlock = designBlocks.find((block) => block.type === editBlock?.type);
            setSelectedDesignBlock(foundBlock || null);
        }
    }, [editBlock, designBlocks]);

    return (
        <div className='position-absolute' id='block-editor'  style={{ maxWidth: "45vw", minWidth: "40vw"}}>
            <div className='card col vh-85 p-0' id='block-editor'  style={{ zIndex: 2000, }} >
                <div id='block-editor-header' className='w-100 py-3 bg-primary bg-opacity-50 rounded-top' style={{cursor: 'move'}}>
                    
                <button className='btn btn-primary bg-primary position-absolute top-0 end-0 translate-middle' onClick={(e) => {closeEditBlockMenu();}}><i className="bi bi-x-lg"></i>
                </button>
                </div>
                <div className="card-body min-vh-45 position-relative overflow-auto px-3">
                    <h5 className="card-title text-capitalize"><i className="bi bi-brush"></i> &nbsp;{selectedDesignBlock?.name}  Editor</h5>
                    <hr/>
                    {
                        editBlock?.type == "text" ?
                        <TextType 
                            selectedDesignBlock={selectedDesignBlock} 
                            editBlock={editBlock}
                            setEditBlock={setEditBlock}
                            section={section}
                            updateSection={updateSection}
                            allFontFamilies={allFontFamilies}
                        />
                        : null
                    }
                    {
                        editBlock?.type == "button" ?
                        <ButtonType 
                            selectedDesignBlock={selectedDesignBlock} 
                            editBlock={editBlock}
                            setEditBlock={setEditBlock}
                            section={section}
                            updateSection={updateSection}
                            allFontFamilies={allFontFamilies}
                        />
                        : null
                    }
                    {
                        editBlock?.type == "accordion" ?
                        <AccordionType 
                            selectedDesignBlock={selectedDesignBlock} 
                            editBlock={editBlock}
                            setEditBlock={setEditBlock}
                            section={section}
                            updateSection={updateSection}
                            allFontFamilies={allFontFamilies}
                            storeHeadingFont={storeHeadingFont}
                            storeTheme={storeTheme}
                            storeBodyFont={storeBodyFont}
                        />
                        : null
                    }
                    {
                        editBlock?.type == "image" ?
                        <ImageType 
                            selectedDesignBlock={selectedDesignBlock} 
                            editBlock={editBlock}
                            setEditBlock={setEditBlock}
                            section={section}
                            updateSection={updateSection}
                            allFontFamilies={allFontFamilies}
                            storeHeadingFont={storeHeadingFont}
                            storeTheme={storeTheme}
                            storeBodyFont={storeBodyFont}
                            storeInfo={storeInfo}
                            pageDetails={pageDetails}
                        />
                        : null
                    }
                    {
                        editBlock?.type == "carousel" ?
                        <CarouselType 
                            selectedDesignBlock={selectedDesignBlock} 
                            editBlock={editBlock}
                            setEditBlock={setEditBlock}
                            section={section}
                            updateSection={updateSection}
                            allFontFamilies={allFontFamilies}
                            storeHeadingFont={storeHeadingFont}
                            storeTheme={storeTheme}
                            storeBodyFont={storeBodyFont}
                            storeInfo={storeInfo}
                            pageDetails={pageDetails}
                        />
                        : null
                    }
                    {
                        editBlock?.type == "cardBlock" ?
                        <CardBlockType 
                            selectedDesignBlock={selectedDesignBlock} 
                            editBlock={editBlock}
                            setEditBlock={setEditBlock}
                            section={section}
                            updateSection={updateSection}
                            allFontFamilies={allFontFamilies}
                            storeHeadingFont={storeHeadingFont}
                            storeTheme={storeTheme}
                            storeBodyFont={storeBodyFont}
                            storeInfo={storeInfo}
                            pageDetails={pageDetails}
                        />
                        : null
                    }
                    <br />
                    <h5 className="card-title text-capitalize"><i className="bi bi-palette"></i> &nbsp; Colors</h5>
                    <hr/>
                        <label htmlFor="blockBackgroundColor">Background</label>
                    <div className="d-flex mb-3 flex-row align-items-center justify-content-between">
                        {/* general block settings */}
                        <input type="color" id="blockBackgroundColor" className="form-control colorPickerInput" value={editBlock.backgroundColor ? editBlock.backgroundColor : "transparent"} onChange={(e) => {
                            let updatedBlock = {...editBlock, backgroundColor: e.target.value};
                            setEditBlock(updatedBlock);
                            let updatedSection = {...section};
                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                            updateSection(updatedSection);
                        }} />
                        <button className="btn btn-sm btn-outline-primary" onClick={() => {
                            let updatedBlock = {...editBlock, backgroundColor: ""};
                            setEditBlock(updatedBlock);
                            let updatedSection = {...section};
                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                            updateSection(updatedSection);
                        }}><i className="bi bi-trash"></i></button>
                    </div>
                    <br />
                    <h5 className="card-title text-capitalize"><i className="bi bi-layout-wtf"></i> &nbsp; Layout</h5>
                    <hr/>
                    <div className="d-flex">
                        {/* padding */}
                        <div className="col pe-2">
                            <label htmlFor="blockPadding">Padding-X (px)</label>
                            <input type="number" id="blockPadding" className="form-control" defaultValue={editBlock?.layout?.paddingX} onChange={(e) => {
                                let updatedBlock = {...editBlock, 
                                    layout:{
                                        ...editBlock.layout,
                                        paddingX: parseInt(e.target.value)
                                    }
                                };
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }}/>
                        </div>
                        <div className="col ps-2">
                            <label htmlFor="blockPadding">Padding-Y (px)</label>
                            <input type="number" id="blockPadding" className="form-control" defaultValue={editBlock.layout?.paddingY} onChange={(e) => {
                                let updatedBlock = {...editBlock, 
                                    layout:{
                                        ...editBlock.layout,
                                        paddingY: parseInt(e.target.value)
                                    }
                                };
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }} />
                        </div>
                    </div>
                    {/* <div className="d-flex">
                        <div className="col pe-2">
                            <label htmlFor="blockMargin">Margin-X (px)</label>
                            <input type="number" id="blockMargin" className="form-control" defaultValue={editBlock.layout?.marginX} onChange={(e) => {
                                let updatedBlock = {...editBlock,
                                    layout:{
                                        ...editBlock.layout,
                                        marginX: parseInt(e.target.value)
                                    }
                                };
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }} />
                        </div>
                        <div className="col ps-2">
                            <label htmlFor="blockMargin">Margin-Y (px)</label>
                            <input type="number" id="blockMargin" className="form-control" defaultValue={editBlock.layout?.marginY} onChange={(e) => {
                                let updatedBlock = {...editBlock,
                                    layout:{
                                        ...editBlock.layout,
                                        marginY: parseInt(e.target.value)
                                    }
                                };
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }} />
                        </div>
                        
                    </div> */}
                    <div className="d-flex">
                        <div className="col pe-2">
                            <label htmlFor="blockAlignment" className='my-2'>Alignment - Y {editBlock.layout?.alignmentY}</label>
                            <div>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {
                                        editBlock.layout?.alignmentY === 'top' ?
                                        <label className="btn btn-primary" htmlFor="btnradioYTop"><i className="bi bi-align-top"></i></label>
                                        :
                                        <>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioYTop" autoComplete="off"  
                                            onChange={
                                                () => {
                                                    let updatedBlock = {...editBlock, layout: {...editBlock.layout, alignmentY: "top"}};
                                                    setEditBlock(updatedBlock);
                                                    let updatedSection = {...section};
                                                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                    updateSection(updatedSection);
                                                }
                                            }/>
                                            <label className="btn btn-outline-primary" htmlFor="btnradioYTop"><i className="bi bi-align-top"></i></label>
                                        </>
                                    }
                                    {
                                        editBlock.layout?.alignmentY === 'center' ?
                                        <label className="btn btn-primary" htmlFor="btnradioYCenter"><i className="bi bi-align-middle"></i></label>
                                        :
                                        <>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioYCenter" autoComplete="off"
                                            onChange={()=>{
                                                let updatedBlock = {...editBlock, layout: {...editBlock.layout, alignmentY: "center"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                            }}
                                            />
                                            <label className="btn btn-outline-primary" htmlFor="btnradioYCenter"><i className="bi bi-align-middle"></i></label>
                                        </>
                                    }
                                    {
                                        editBlock.layout?.alignmentY === 'bottom' ?
                                        <label className="btn btn-primary" htmlFor="btnradioYBottom"><i className="bi bi-align-middle"></i></label>
                                        :
                                        <>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioYBottom" autoComplete="off"
                                            onChange={()=>{
                                                let updatedBlock = {...editBlock, layout: {...editBlock.layout, alignmentY: "bottom"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                            }}
                                            />
                                            <label className="btn btn-outline-primary" htmlFor="btnradioYBottom"><i className="bi bi-align-bottom"></i></label>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col pe-2">
                            <label htmlFor="blockAlignment" className='my-2'>Alignment - X {editBlock.layout?.alignmentX}</label>
                            <div>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {
                                        editBlock.textBlock?.layout?.alignmentX === 'start' ?
                                        <label className="btn btn-primary" htmlFor="btnradioXStart"><i className="bi bi-align-start"></i></label>
                                        :
                                        <>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioXStart" autoComplete="off" 
                                            onChange={
                                                () => {
                                                    let updatedBlock = {...editBlock, layout: {...editBlock.layout, alignmentX: "start"}};
                                                    setEditBlock(updatedBlock);
                                                    let updatedSection = {...section};
                                                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                    updateSection(updatedSection);
                                                }
                                            }/>
                                            <label className="btn btn-outline-primary" htmlFor="btnradioXStart"><i className="bi bi-align-start"></i></label>
                                        </>
                                    }
                                    {
                                        editBlock.layout?.alignmentX === 'center' ?
                                        <label className="btn btn-primary" htmlFor="btnradioXCenter"><i className="bi bi-align-center"></i></label>
                                        :
                                        <>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioXCenter" autoComplete="off"
                                            onChange={()=>{
                                                let updatedBlock = {...editBlock, layout: {...editBlock.layout, alignmentX: "center"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                            }}
                                            />
                                            <label className="btn btn-outline-primary" htmlFor="btnradioXCenter"><i className="bi bi-align-center"></i></label>
                                        </>
                                    }
                                    {
                                        editBlock.layout?.alignmentX === 'end' ?
                                        <label className="btn btn-primary" htmlFor="btnradioXEnd"><i className="bi bi-align-end"></i></label>
                                        :
                                        <>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioXEnd" autoComplete="off"
                                            onChange={()=>{
                                                let updatedBlock = {...editBlock, layout: {...editBlock.layout, alignmentX: "end"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                            }}
                                            />
                                            <label className="btn btn-outline-primary" htmlFor="btnradioXEnd"><i className="bi bi-align-end"></i></label>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-3 border-top'>
                        <h5 className="card-title text-capitalize my-4"><i className="bi bi-palette"></i> &nbsp; Appearance</h5>
                        <hr />
                        <div className="d-flex">
                            {/* block corner controls */}
                            <div className="col pe-2">
                                <label htmlFor="blockBorderRadius">Corner 
                                    {
                                    editBlock?.styles?.borderCorners ?
                                    `(${editBlock.styles.borderCorners}px)` 
                                    : null
                                    }
                                </label>

                                {/* <label for="range1" class="form-label">Example range</label> */}
                                <input type="range" className="form-range" id="blockBorderRadius"
                                    min="0" max="100" step="1" value={editBlock?.styles?.borderCorners ? editBlock.styles.borderCorners : 0} onChange={(e) => {
                                        let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderCorners: e.target.value}};
                                        setEditBlock(updatedBlock);
                                        let updatedSection = {...section};
                                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                        updateSection(updatedSection);
                                    }}></input>
                            </div>
                        </div>
                        {/* border */}
                        <div>
                            <label htmlFor="blockBorderColor">Border Color</label>
                            <input type="color" className="form-control form-control-color w-100" id="blockBorderColor" value={editBlock?.styles?.borderColor || 'transparent'} onChange={(e) => {
                                let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderColor: e.target.value}};
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }} />
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6">
                                <label htmlFor="buttonBorder" className="form-label">Border Style</label>
                                <div className="dropdown col">
                                    <button className="btn btn-outline-primary dropdown-toggle text-capitalize w-85" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                        <span>
                                        {
                                            editBlock.styles?.borderStyle ?
                                            // if border icon is string
                                            typeof borderStyles2.find(style => style.value === editBlock.styles?.borderStyle)?.icon === "string" ?

                                            <span className='col-5' dangerouslySetInnerHTML={{__html: borderStyles2.find(style => style.value === editBlock.styles?.borderStyle)?.icon ?? ''}}></span>
                                            : null
                                            : null
                                        }
                                        {
                                            typeof editBlock.styles?.borderStyle === "string" ?
                                            <span className='col-5'>
                                                {editBlock.styles?.borderStyle.charAt(0).toUpperCase() + editBlock.styles?.borderStyle.slice(1)}
                                            </span>
                                            :
                                            'Select Style'
                                        }
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu">
                                        {
                                            borderStyles2.map((style,idx)=>
                                            <li key={'border-style-'+style+idx}>
                                                <button className={editBlock.styles?.borderStyle === style.value ? "dropdown-item d-flex active" : "dropdown-item d-flex"}
                                                onClick={()=>{
                                                    let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderStyle: style.value}};
                                                    update(updatedBlock);
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
                                        {editBlock.styles?.borderWidth ? 
                                        <span className='d-inline-block'
                                        style={{
                                            width: "80%",
                                            height: `${editBlock.styles?.borderWidth}px`,
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
                                                    let updatedBlock = {...editBlock, styles: {...editBlock.styles, borderWidth: width}};
                                                    update(updatedBlock);
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
    )
}

export default BlockEditingModal