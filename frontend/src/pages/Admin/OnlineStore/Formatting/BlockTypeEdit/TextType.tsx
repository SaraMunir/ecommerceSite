import React from 'react'
import fontFamilies from '../../../../designFonts.json';
import designBlockContents from '../../../../designBlockContents.json';
import { edit } from '@cloudinary/url-gen/actions/animated';

function TextType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies }: any) {
  return (
    <div className="">
        {
            selectedDesignBlock && selectedDesignBlock.type == "text" ? (
                <div>
                    <label htmlFor="textContent" className="form-label">Text Content</label>
                    <input type="text" id="textContent" defaultValue={editBlock.textBlock?.content} className="form-control" onChange={(e) => {
                        // Handle text content change
                        let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, content: e.target.value}};
                        setEditBlock(updatedBlock);
                        let updatedSection = {...section};
                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                        console.log("Updated Section after text change:", updatedSection);
                        updateSection(updatedSection);
                    }} />
                    <div>
                        <label htmlFor="textTag" className='my-2 form-label'>Type</label>
                        <select id="textTag" className="form-select"
                        defaultValue={editBlock.textBlock?.tag}
                        onChange={(e) => {
                            // Handle text tag change
                            let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, tag: e.target.value}};
                            setEditBlock(updatedBlock);
                            let updatedSection = {...section};
                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                            console.log("Updated Section after text tag change:", updatedSection);
                            updateSection(updatedSection);
                        }}>
                            {
                                selectedDesignBlock.tagOptions.map((tagOption: string) => (
                                    <option key={tagOption} value={tagOption}>{tagOption}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fontStyle" className='my-2 form-label'>Font Style</label>
                        <select id="fontStyle" className="form-select" 
                        defaultValue={editBlock.textBlock.font.fontStyle}
                        onChange={(e) => {
                            // Handle font style change
                            let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, font: {...editBlock.textBlock.font, fontStyle: e.target.value}}};
                            setEditBlock(updatedBlock);
                            let updatedSection = {...section};
                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                            console.log("Updated Section after font style change:", updatedSection);
                            updateSection(updatedSection);
                        }}>
                            {
                                selectedDesignBlock.fontStyleOptions.map((styleOption: string) => (
                                    <option key={styleOption} value={styleOption}
                                    // selected={editBlock.textBlock.font.fontStyle === styleOption}
                                    >{styleOption}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fontFamily" className='my-2 form-label'>Font</label>
                        <select id="fontFamily" className="form-select" 
                        defaultValue={editBlock.textBlock.font.fontFamilyId}
                        onChange={(e) => {
                            // Handle font family change
                            // also reset font weight to default of the selected font family
                            const selectedFont = allFontFamilies.find((font: any) => font.id === e.target.value);
                            console.log("Selected Font Family:", selectedFont);
                            let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, 
                                font: {...editBlock.textBlock.font, 
                                    fontFamilyId: e.target.value,
                                    fontFamily: selectedFont ? selectedFont.family : editBlock.textBlock.font.fontFamily,
                                    fontWeight: selectedFont ? selectedFont.defaultWeight : editBlock.textBlock.font.fontWeight,
                                }}};  
                            setEditBlock(updatedBlock);
                            let updatedSection = {...section};
                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                            console.log("Updated Section after font family change:", updatedSection);
                            updateSection(updatedSection);
                        }}>
                            {
                                allFontFamilies.map((fontFamily: any) => (
                                    <option key={fontFamily.id} value={fontFamily.id}
                                    // selected={
                                    //     editBlock.textBlock.font.fontFamilyId ? 
                                    //     editBlock.textBlock.font.fontFamilyId === fontFamily.id 
                                    //     :
                                    // fontFamily.family === "Open Sans" 
                                    
                                    // }
                                    >{fontFamily.family}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="row">
                        <div className='col-md-6'>
                            <label htmlFor="textAlignment" className='form-label my-2'>Text Alignment {editBlock.textBlock.alignment} </label>
                            <div className="d-flex">
                                {
                                    editBlock.textBlock.alignment === "left" ?
                                    <label className="btn btn-primary rounded-end-0" htmlFor="btn-check"><i className="bi bi-text-left"></i></label> 
                                    :
                                    <>
                                    <input type="checkbox" className="btn-check" id="btn-check" autoComplete="off"
                                    defaultValue={editBlock.textBlock.alignment}
                                    checked={editBlock.textBlock.alignment === "left"}
                                    onChange={() => {
                                        let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, alignment: "left"}};
                                        setEditBlock(updatedBlock);
                                        let updatedSection = {...section};
                                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                        updateSection(updatedSection);
                                    }}/>

                                    <label className="btn btn-outline-primary rounded-end-0 btn-outline-2" htmlFor="btn-check"><i className="bi bi-text-left"></i></label>
                                    </>
                                }
                                {
                                    editBlock.textBlock.alignment === "center" ?
                                    <label className="btn btn-primary rounded-0" htmlFor="btn-check-2"><i className="bi bi-text-center"></i></label> 
                                    :
                                    <>
                                    <label className="btn btn-outline-primary rounded-0" htmlFor="btn-check-2"><i className="bi bi-text-center"></i></label>
                                    <input type="checkbox" className="btn-check" id="btn-check-2" autoComplete="off"
                                    defaultValue={editBlock.textBlock.alignment}
                                    checked={editBlock.textBlock.alignment === "center"}
                                    onChange={() => {
                                        let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, alignment: "center"}};
                                        setEditBlock(updatedBlock);
                                        let updatedSection = {...section};
                                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                        updateSection(updatedSection);
                                    }}/>
                                    </>
                                }
                                {
                                    editBlock.textBlock.alignment === "right" ?
                                    <label className="btn btn-primary rounded-start-0" htmlFor="btn-check-3"><i className="bi bi-text-right"></i></label> 
                                    :
                                    <>
                                    <input type="checkbox" className="btn-check" id="btn-check-3" autoComplete="off" 
                                    defaultValue={editBlock.textBlock.alignment}
                                    checked={editBlock.textBlock.alignment === "right"}
                                    onChange={() => {
                                        let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, alignment: "right"}};
                                        setEditBlock(updatedBlock);
                                        let updatedSection = {...section};
                                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                        updateSection(updatedSection);
                                    }}/>
                                    <label className="btn btn-outline-primary rounded-start-0" htmlFor="btn-check-3"><i className="bi bi-text-left"></i></label>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="textBlockAlignment" className='form-label my-2'>Text Case{editBlock.textBlock.textCase} </label>
                            <div>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {
                                        editBlock.textBlock?.textCase === "capitalize" ?
                                        <label className="btn btn-primary" htmlFor="btnradioCapitalize">Aa</label>
                                        :
                                        <React.Fragment>
                                            <input type="radio" className="btn-check" 
                                            name="btnradio" id="btnradioCapitalize" autoComplete="off"
                                            onChange={
                                                () => {
                                                let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, textCase: "capitalize"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                                }
                                            }
                                            />
                                            <label className="btn btn btn-outline-primary" htmlFor="btnradioCapitalize">Aa</label>
                                        </React.Fragment>
                                    }
                                    {
                                        editBlock.textBlock.textCase === "uppercase" ?
                                        <label className="btn btn-primary" htmlFor="btnradioUpper">AA</label>
                                        :
                                        <React.Fragment>

                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioUpper" autoComplete="off"
                                            onChange={
                                                () => {
                                                let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, textCase: "uppercase"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                                }
                                            }
                                            />
                                            <label className="btn btn-outline-primary" htmlFor="btnradioUpper">AA</label>
                                        </React.Fragment>
                                    }
                                    {
                                        editBlock.textBlock.textCase === "lowercase" ?
                                        <label className="btn btn-primary" htmlFor="btnradioLower">aa</label>
                                        :
                                        <React.Fragment>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradioLower" autoComplete="off"
                                            onChange={
                                                () => {
                                                let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, textCase: "lowercase"}};
                                                setEditBlock(updatedBlock);
                                                let updatedSection = {...section};
                                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                updateSection(updatedSection);
                                                }}/>
                                                <label className="btn btn-outline-primary" htmlFor="btnradioLower">aa</label>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    

                    <div className="d-flex justify-content-between">
                        <div className='col pe-2'>
                            {/* font weight should update according to font family selection */}
                            <label htmlFor="fontWeight" className='form-label my-2'>Font Weight</label>
                            <select id="fontWeight"
                            className="form-select"
                            defaultValue={editBlock.textBlock.font.fontWeight}
                            onChange={(e) => {
                                // Handle font weight change
                                let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, font: {...editBlock.textBlock.font, fontWeight: e.target.value}}};
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                updateSection(updatedSection);
                            }}>
                                {
                                    editBlock.textBlock.font.fontFamilyId ?
                                    allFontFamilies.find((font: any) => font.id === editBlock.textBlock.font.fontFamilyId)?.weights.map(
                                        (weightOption: number | string) => {
                                            // const weightStr = weightOption.toString();
                                            return (
                                                <option key={weightOption} value={weightOption}
                                                // selected={weightOption === editBlock.textBlock.font.fontWeight}
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
                            defaultValue={editBlock.textBlock.font.fontSize} onChange={(e) => {
                                // Handle font size change
                                let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, font: {...editBlock.textBlock.font, fontSize: e.target.value}}};
                                setEditBlock(updatedBlock);
                                let updatedSection = {...section};
                                updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                console.log("Updated Section after font size change:", updatedSection);
                                updateSection(updatedSection);
                            }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="blockTextColor" className='form-label my-2'>Text Color</label>
                        <input type="color" id="blockTextColor" className="form-control colorPickerInput" defaultValue={editBlock.textBlock.font.fontColor} onChange={(e) => {
                            let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, font: {...editBlock.textBlock.font, fontColor: e.target.value}}};
                            setEditBlock(updatedBlock);
                            let updatedSection = {...section};
                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                            updateSection(updatedSection);
                        }} />
                    </div>
                </div>
            ) : (
                null
            )
        }
    </div>
  )
}

export default TextType