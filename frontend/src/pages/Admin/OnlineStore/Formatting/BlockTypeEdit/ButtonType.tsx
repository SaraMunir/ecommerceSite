import React from 'react'

function ButtonType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies }: any) {
    const update=(updatedBlock:any)=>{
        setEditBlock(updatedBlock);
        let updatedSection = {...section};
        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
        console.log("Updated Section after text change:", updatedSection);
        updateSection(updatedSection);
    }
    return (
        <div className="">
            {
                selectedDesignBlock && selectedDesignBlock.type == "button" ? (
                    <div>
                        <label htmlFor="textContent" className="form-label">Text Content</label>
                        <input type="text" id="textContent" defaultValue={editBlock.buttonBlock?.content} className="form-control" onChange={(e) => {
                            // Handle text content change
                            let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, content: e.target.value}};
                            update(updatedBlock);

                        }} />
                        <div>
                            <label htmlFor="textTag" className='my-2 form-label'>Type</label>
                            <select id="textTag" className="form-select"
                            defaultValue={editBlock.buttonBlock?.tag}
                            onChange={(e) => {
                                // Handle text tag change
                                let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, tag: e.target.value}};
                                update(updatedBlock);
                            }}>
                                {
                                    selectedDesignBlock.tagOptions.map((tagOption: string) => (
                                        <option key={tagOption} value={tagOption}>{tagOption}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="buttonHref" className="form-label my-2">Button Link (Href)</label>
                            <input type="text" id="buttonHref" defaultValue={editBlock.buttonBlock?.href} className="form-control" onChange={(e) => {
                                // Handle button href change
                                let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, href: e.target.value}};
                                update(updatedBlock);
                            }} />
                        </div>
                        <div>
                            <label htmlFor="fontFamily" className='my-2 form-label'>Font Family</label>
                            <select id="fontFamily" className="form-select" 
                            defaultValue={editBlock.buttonBlock.font.fontFamilyId}
                            onChange={(e) => {
                                // Handle font family change
                                // also reset font weight to default of the selected font family
                                const selectedFont = allFontFamilies.find((font: any) => font.id === e.target.value);
                                console.log("Selected Font Family:", selectedFont);
                                let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, 
                                    font: {...editBlock.buttonBlock.font, 
                                        fontFamilyId: e.target.value,
                                        fontFamily: selectedFont ? selectedFont.family : editBlock.buttonBlock.font.fontFamily,
                                        fontWeight: selectedFont ? selectedFont.defaultWeight : editBlock.buttonBlock.font.fontWeight,
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
                                        //     editBlock.buttonBlock.font.fontFamilyId ? 
                                        //     editBlock.buttonBlock.font.fontFamilyId === fontFamily.id 
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
                                <label htmlFor="textAlignment" className='form-label my-2'>Text Alignment {editBlock.buttonBlock.alignment} </label>
                                <div className="d-flex">
                                    {
                                        editBlock.buttonBlock.alignment === "left" ?
                                        <label className="btn btn-primary rounded-end-0" htmlFor="btn-check"><i className="bi bi-text-left"></i></label> 
                                        :
                                        <>
                                        <input type="checkbox" className="btn-check" id="btn-check" autoComplete="off"
                                        defaultValue={editBlock.buttonBlock.alignment}
                                        checked={editBlock.buttonBlock.alignment === "left"}
                                        onChange={() => {
                                            let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, alignment: "left"}};
                                            setEditBlock(updatedBlock);
                                            let updatedSection = {...section};
                                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                            updateSection(updatedSection);
                                        }}/>

                                        <label className="btn btn-outline-primary rounded-end-0 btn-outline-2" htmlFor="btn-check"><i className="bi bi-text-left"></i></label>
                                        </>
                                    }
                                    {
                                        editBlock.buttonBlock.alignment === "center" ?
                                        <label className="btn btn-primary rounded-0" htmlFor="btn-check-2"><i className="bi bi-text-center"></i></label> 
                                        :
                                        <>
                                        <label className="btn btn-outline-primary rounded-0" htmlFor="btn-check-2"><i className="bi bi-text-center"></i></label>
                                        <input type="checkbox" className="btn-check" id="btn-check-2" autoComplete="off"
                                        defaultValue={editBlock.buttonBlock.alignment}
                                        checked={editBlock.buttonBlock.alignment === "center"}
                                        onChange={() => {
                                            let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, alignment: "center"}};
                                            setEditBlock(updatedBlock);
                                            let updatedSection = {...section};
                                            updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                            updateSection(updatedSection);
                                        }}/>
                                        </>
                                    }
                                    {
                                        editBlock.buttonBlock.alignment === "right" ?
                                        <label className="btn btn-primary rounded-start-0" htmlFor="btn-check-3"><i className="bi bi-text-right"></i></label> 
                                        :
                                        <>
                                        <input type="checkbox" className="btn-check" id="btn-check-3" autoComplete="off" 
                                        defaultValue={editBlock.buttonBlock.alignment}
                                        checked={editBlock.buttonBlock.alignment === "right"}
                                        onChange={() => {
                                            let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, alignment: "right"}};
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
                                <label htmlFor="buttonBlockAlignment" className='form-label my-2'>Text Case{editBlock.buttonBlock.textCase} </label>
                                <div>
                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                        {
                                            editBlock.buttonBlock?.textCase === "capitalize" ?
                                            <label className="btn btn-primary" htmlFor="btnradioCapitalize">Aa</label>
                                            :
                                            <React.Fragment>
                                                <input type="radio" className="btn-check" 
                                                name="btnradio" id="btnradioCapitalize" autoComplete="off"
                                                onChange={
                                                    () => {
                                                    let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, textCase: "capitalize"}};
                                                    setEditBlock(updatedBlock);
                                                    let updatedSection = {...section};
                                                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                    console.log("Updated Section after text case change:", updatedSection);
                                                    updateSection(updatedSection);
                                                    }
                                                }
                                                />
                                                <label className="btn btn btn-outline-primary" htmlFor="btnradioCapitalize">Aa</label>
                                            </React.Fragment>
                                        }
                                        {
                                            editBlock.buttonBlock.textCase === "uppercase" ?
                                            <label className="btn btn-primary" htmlFor="btnradioUpper">AA</label>
                                            :
                                            <React.Fragment>

                                                <input type="radio" className="btn-check" name="btnradio" id="btnradioUpper" autoComplete="off"
                                                onChange={
                                                    () => {
                                                    let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, textCase: "uppercase"}};
                                                    setEditBlock(updatedBlock);
                                                    let updatedSection = {...section};
                                                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                                    console.log("Updated Section after text case change:", updatedSection);

                                                    updateSection(updatedSection);
                                                    }
                                                }
                                                />
                                                <label className="btn btn-outline-primary" htmlFor="btnradioUpper">AA</label>
                                            </React.Fragment>
                                        }
                                        {
                                            editBlock.buttonBlock.textCase === "lowercase" ?
                                            <label className="btn btn-primary" htmlFor="btnradioLower">aa</label>
                                            :
                                            <React.Fragment>
                                                <input type="radio" className="btn-check" name="btnradio" id="btnradioLower" autoComplete="off"
                                                onChange={
                                                    () => {
                                                    let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, textCase: "lowercase"}};
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
                                defaultValue={editBlock.buttonBlock.font.fontWeight}
                                onChange={(e) => {
                                    // Handle font weight change
                                    let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, font: {...editBlock.buttonBlock.font, fontWeight: e.target.value}}};
                                    setEditBlock(updatedBlock);
                                    let updatedSection = {...section};
                                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                    updateSection(updatedSection);
                                }}>
                                    {
                                        editBlock.buttonBlock.font.fontFamilyId ?
                                        allFontFamilies.find((font: any) => font.id === editBlock.buttonBlock.font.fontFamilyId)?.weights.map(
                                            (weightOption: number | string) => {
                                                // const weightStr = weightOption.toString();
                                                return (
                                                    <option key={weightOption} value={weightOption}
                                                    // selected={weightOption === editBlock.buttonBlock.font.fontWeight}
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
                                defaultValue={editBlock.buttonBlock.font.fontSize} onChange={(e) => {
                                    // Handle font size change
                                    let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, font: {...editBlock.buttonBlock.font, fontSize: e.target.value}}};
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
                            <input type="color" id="blockTextColor" className="form-control colorPickerInput" defaultValue={editBlock.buttonBlock.font.fontColor} onChange={(e) => {
                                let updatedBlock = {...editBlock, buttonBlock: {...editBlock.buttonBlock, font: {...editBlock.buttonBlock.font, fontColor: e.target.value}}};
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

export default ButtonType