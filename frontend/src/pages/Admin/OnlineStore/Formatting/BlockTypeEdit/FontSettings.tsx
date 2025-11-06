import React from 'react'

function FontSettings(
    {editBlock, update, blockType, type, allFontFamilies, blockTypeHeading
}: {
    editBlock: any,
    update: (block: any) => void,
    blockType: any,
    type: string,
    allFontFamilies: any,
    blockTypeHeading: any
}) {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-capitalize"><i className="bi bi-fonts"></i> {type} Settings</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked={blockTypeHeading?.show} onChange={(e) => {
                        const updatedBlock = {
                            ...editBlock,
                            cardBlock: {
                                ...blockType,
                                [type]: {
                                    ...blockTypeHeading,
                                    show: !blockTypeHeading?.show
                                }
                            }
                        };
                        update(updatedBlock);
                    }}/>
                    <label className="form-check-label" htmlFor="switchCheckChecked"></label>
                </div>
            </div>
            {
                blockTypeHeading?.show ?
                <div>
                    {/* text */}
                    <div className="mb-3">
                        <label htmlFor={`${type}Text`} className='form-label text-capitalize'>{type} Text</label>
                        <input type="text" className="form-control"
                        id={`${type}Text`}
                        value={blockTypeHeading?.value || ''}
                        placeholder="Carousel Title"
                        onChange={(e) => {
                            const updatedBlock = {
                                ...editBlock,
                                cardBlock: {
                                    ...blockType,
                                    [type]: {
                                        ...blockTypeHeading,
                                        value: e.target.value
                                    }
                                }
                            };
                            update(updatedBlock);
                        }} /> 
                    </div>
                    {/* font family */}
                    <div className="mb-3">
                        <label htmlFor={`${type}FontFamily`} className='my-2 form-label'>Font</label>
                        <select id={`${type}FontFamily`} className="form-select" 
                        defaultValue={allFontFamilies.find((font: any) => font.id === blockTypeHeading?.font?.fontFamilyId)?.id}
                        onChange={(e) => {
                            // Handle font family change
                            // also reset font weight to default of the selected font family
                            const selectedFont = allFontFamilies.find((font: any) => font.id === e.target.value);
                            let updatedBlock = {
                                ...editBlock, 
                                cardBlock: {
                                    ...blockType,
                                    [type]: {
                                        ...blockTypeHeading,
                                        font: {
                                            ...blockTypeHeading?.font,
                                            fontFamilyId: e.target.value,
                                            fontFamily: selectedFont ? selectedFont.family : blockTypeHeading?.fontFamily,
                                            fontWeight: selectedFont ? selectedFont.defaultWeight : blockTypeHeading?.fontWeight
                                        }
                                    }
                                }
                            };
                            update(updatedBlock);
                            // setEditBlock(updatedBlock);
                        }}>
                            {
                                allFontFamilies.map((fontFamily: any) => (
                                    <option key={fontFamily.id} value={fontFamily.id}
                                    >{fontFamily.family}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* font color */}
                    <div>
                        <label htmlFor={`${type}FontColor`} className='my-2 form-label'>Font Color</label>
                        <input type="color" id={`${type}FontColor`} className="form-control form-control-color"
                        defaultValue={blockTypeHeading?.font?.fontColor || '#000000'}
                        onChange={(e) => {
                            let updatedBlock = {
                                ...editBlock,
                                cardBlock: {
                                    ...blockType,
                                    [type]: {
                                        ...blockTypeHeading,
                                        font: {
                                            ...blockTypeHeading.font,
                                            fontColor: e.target.value
                                        }
                                    }
                                }
                            };
                            update(updatedBlock);
                        }} />
                    </div>
                    {/* text alignment */}
                    <div className="row">
                        <div className='col-md-6'>
                            <label htmlFor={`${type}TextAlignment`} className='form-label my-2'>Text Alignment: {blockTypeHeading?.alignment} </label>
                            <div className="d-flex">
                                {
                                    blockTypeHeading?.alignment === "left" ?
                                    <label className="btn btn-primary rounded-end-0" htmlFor={`btn-check-${type}-left`}><i className="bi bi-text-left"></i></label> 
                                    :
                                    <>
                                    <input type="checkbox" className="btn-check" id={`btn-check-${type}-left`} autoComplete="off"
                                    defaultValue={blockTypeHeading?.alignment}
                                    checked={blockTypeHeading?.alignment === "left"}
                                    onChange={() => {
                                        let updatedBlock = {...editBlock, 
                                            cardBlock: {...blockType, 
                                                [type]: {
                                                    ...blockType[type], 
                                                    alignment: "left"}}};
                                            update(updatedBlock);
                                    }}/>
                                    <label className="btn btn-outline-primary rounded-end-0 btn-outline-2" htmlFor={`btn-check-${type}-left`}><i className="bi bi-text-left"></i></label>
                                    </>
                                }
                                {
                                    blockTypeHeading?.alignment === "center" ?
                                    <label className="btn btn-primary rounded-0" htmlFor={`btn-check-${type}-center`}><i className="bi bi-text-center"></i></label> 
                                    :
                                    <>
                                    <label className="btn btn-outline-primary rounded-0" htmlFor={`btn-check-${type}-center`}><i className="bi bi-text-center"></i></label>
                                    <input type="checkbox" className="btn-check" id={`btn-check-${type}-center`} autoComplete="off"
                                    defaultValue={blockTypeHeading?.alignment}
                                    checked={blockTypeHeading?.alignment === "center"}
                                    onChange={() => {
                                        let updatedBlock = {...editBlock, cardBlock: {...blockType, [type]: {...blockTypeHeading, alignment: "center"}}};
                                        update(updatedBlock);
                                    }}/>
                                    </>
                                }
                                {
                                    blockTypeHeading?.alignment === "right" ?
                                    <label className="btn btn-primary rounded-start-0" htmlFor={`btn-check-${type}-right`}><i className="bi bi-text-right"></i></label> 
                                    :
                                    <>
                                    <label className="btn btn-outline-primary rounded-start-0" htmlFor="btn-check-3"><i className="bi bi-text-left"></i></label>
                                    <input type="checkbox" className="btn-check" id={`btn-check-${type}-right`} autoComplete="off" 
                                    defaultValue={blockTypeHeading?.alignment}
                                    checked={blockTypeHeading?.alignment === "right"}
                                    onChange={() => {
                                        console.log("Right alignment selected");
                                        let updatedBlock = {...editBlock, cardBlock: {...blockType, [type]: {...blockTypeHeading, alignment: "right"}}};
                                        update(updatedBlock);
                                    }}/>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor={`textBlockCase-${type}`} className='form-label my-2'>Text Case{blockTypeHeading?.textCase} </label>
                            <div>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {
                                        blockTypeHeading?.textCase === "capitalize" ?
                                        <label className="btn btn-primary" htmlFor={`btnradioCapitalize-${type}`}>Aa</label>
                                        :
                                        <React.Fragment>
                                            <input type="radio" className="btn-check" 
                                            name="btnradio" id={`btnradioCapitalize-${type}`} autoComplete="off"
                                            onChange={
                                                () => {
                                                let updatedBlock = {...editBlock, cardBlock: {...blockType, [type]: {...blockTypeHeading, textCase: "capitalize"}}};
                                                update(updatedBlock);
                                                }
                                            }
                                            />
                                            <label className="btn btn btn-outline-primary" htmlFor={`btnradioCapitalize-${type}`}>Aa</label>
                                        </React.Fragment>
                                    }
                                    {
                                        blockTypeHeading?.textCase === "uppercase" ?
                                        <label className="btn btn-primary" htmlFor={`btnradioUpper-${type}`}>AA</label>
                                        :
                                        <React.Fragment>

                                            <input type="radio" className="btn-check" name="btnradio" id={`btnradioUpper-${type}`} autoComplete="off"
                                            onChange={
                                                () => {
                                                let updatedBlock = {...editBlock, cardBlock: {...blockType, 
                                                    [type]: {...blockTypeHeading, textCase: "uppercase"}}};
                                                update(updatedBlock);
                                                }
                                            }
                                            />
                                            <label className="btn btn-outline-primary" htmlFor={`btnradioUpper-${type}`}>AA</label>
                                        </React.Fragment>
                                    }
                                    {
                                        blockTypeHeading?.textCase === "lowercase" ?
                                        <label className="btn btn-primary" htmlFor={`btnradioLower-${type}`}>aa</label>
                                        :
                                        <React.Fragment>
                                            <input type="radio" className="btn-check" name="btnradio" id={`btnradioLower-${type}`} autoComplete="off"
                                            onChange={
                                                () => {
                                                let updatedBlock = {...editBlock, cardBlock: {...blockType, [type]: {...blockTypeHeading, textCase: "lowercase"}}};
                                                update(updatedBlock);
                                                }}/>
                                                <label className="btn btn-outline-primary" htmlFor={`btnradioLower-${type}`}>aa</label>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* font weight */}
                    <div className='row'>
                        {/* heading font styles */}
                        <div className='col pe-2'>
                            <label htmlFor={`headingFontWeight-${type}`} className='my-2 form-label'>Font Weight</label>
                            <select id={`headingFontWeight-${type}`}
                            className="form-select"
                            defaultValue={blockTypeHeading?.font?.fontWeight}
                            onChange={(e) => {
                                // Handle font weight change
                                let updatedBlock = {
                                    ...editBlock,
                                    cardBlock: {
                                        ...blockType,
                                        [type]: {
                                            ...blockTypeHeading,
                                            font: {
                                                ...blockTypeHeading?.font,
                                                fontWeight: e.target.value
                                            }
                                        }
                                    }
                                };
                                update(updatedBlock);
                            }}>
                                {
                                    blockTypeHeading.font.fontFamilyId ?
                                    allFontFamilies.find((font: any) => font.id === blockTypeHeading.font.fontFamilyId)?.weights.map(
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
                            <label htmlFor={`fontSize-${type}`} className='form-label my-2'>Font Size</label>
                            <input type="number" id={`fontSize-${type}`} className="form-control" 
                            defaultValue={blockTypeHeading?.font?.fontSize} onChange={(e) => {
                                // Handle font size change
                                let updatedBlock = {...editBlock, 
                                    cardBlock: {...editBlock.cardBlock, [type]: {...editBlock.cardBlock[type], font: {...editBlock.cardBlock[type].font, fontSize: e.target.value}}}};
                                update(updatedBlock);
                            }}
                            />
                        </div>
                    </div>
                    {/* padding settings */}
                    <div className='row'>
                        {/* heading font styles */}
                        <div className='col pe-2'>
                            <label htmlFor={`padding-X-${type}`} className='my-2 form-label'>Padding-X</label>
                            <input type="number" id={`padding-X-${type}`} className="form-control" 
                            defaultValue={blockTypeHeading?.layout?.paddingX} onChange={(e) => {
                                // Handle padding X change
                                let updatedBlock = {...editBlock, 
                                    cardBlock: {...editBlock.cardBlock, 
                                        [type]: {
                                            ...editBlock.cardBlock[type],
                                            layout: {
                                                ...editBlock.cardBlock[type]?.layout,
                                                paddingX: e.target.value
                                            }
                                        }
                                    }};
                                update(updatedBlock);
                            }}
                            />
                        </div>
                        <div className='col ps-2'>
                            <label htmlFor={`padding-Y-${type}`} className='my-2 form-label'>Padding-Y</label>
                            <input type="number" id={`padding-Y-${type}`} className="form-control" 
                            defaultValue={blockTypeHeading?.layout?.paddingY} onChange={(e) => {
                                // Handle padding Y change
                                let updatedBlock = {...editBlock, 
                                    cardBlock: {...editBlock.cardBlock, 
                                        [type]: {
                                            ...editBlock.cardBlock[type],
                                            layout: {
                                                ...editBlock.cardBlock[type]?.layout,
                                                paddingY: e.target.value
                                            }
                                        }
                                    }};
                                update(updatedBlock);
                            }}
                            />
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default FontSettings