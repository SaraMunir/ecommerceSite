import React from 'react'

function TextBlockSettings({ type, newCard, setNewCard, allFontFamilies, index, modalType }: { type: string, newCard: any, setNewCard: (card: any) => void, allFontFamilies: any, index: number, modalType: string }) {
    const alighnments = ['left', 'center', 'right'];
    const textCase = ['capitalize', 'uppercase', 'lowercase'];
    return (
        <div>
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapseOne" + index} aria-expanded="true" aria-controls={"panelsStayOpen-collapseOne" + index}>
                    <label htmlFor="heading" className='form-label'>Card {type}</label>
                </button>
            </h2>
            <div id={"panelsStayOpen-collapseOne" + index} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}>
                <div className="accordion-body">
                    <div className="d-flex justify-content-end align-items-center">
                        {
                            !newCard?.[type]?.show ?
                            <span className='me-2 text-success'>Not Selected</span>
                            :
                            null
                            // <span className='me-2 text-danger'>Hidden</span>
                        }
                        <div className="form-check form-switch ms-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked={newCard?.[type]?.show} onChange={(e) => {
                                // if(modalType === 'edit'){

                                // }else{
                                //     setNewCard({
                                //         ...newCard,
                                //         [type]: {
                                //             ...newCard?.[type],
                                //             show: !newCard?.[type]?.show
                                //         }
                                //     })
                                // }
                            }}/>
                            <label className="form-check-label" htmlFor="switchCheckChecked"></label>
                        </div>
                    </div>
                {
                    newCard?.[type]?.show ? 
                    <div className=''>
                        <div className="mb-1">
                            <label htmlFor={`${type}Text`} className='form-label text-capitalize'>{type} </label>
                            {
                                type === 'content' ?
                                <textarea name="" id=""
                                className="form-control"
                                // value={newCard[type].value}
                                value={newCard?.[type]?.value}
                                onChange={(e) => {
                                    setNewCard({
                                        ...newCard,
                                        [type]: {
                                            ...newCard?.[type],
                                            value: e.target.value
                                        }
                                    });
                                }} >
                                </textarea>
                                : 
                            <input type="text" className="form-control"
                            id={`${type}Text`}
                            value={newCard?.[type]?.value}
                            placeholder="Card Content"
                            onChange={(e) => {
                                setNewCard({
                                    ...newCard,
                                    [type]: {
                                        ...newCard?.[type],
                                        value: e.target.value
                                    }
                                });
                            }} /> 
                            }
                        </div>
                        <div className="mb-1">
                            <label htmlFor={`${type}CardFontFamily`} className='my-2 form-label'>Font</label>
                            <select id={`${type}CardFontFamily`} className="form-select" 
                            defaultValue={allFontFamilies.find((font: any) => font.id === newCard?.[type]?.font?.fontFamilyId)?.id}
                            onChange={(e) => {
                                // Handle font family change
                                // also reset font weight to default of the selected font family
                                const selectedFont = allFontFamilies.find((font: any) => font.id === e.target.value);
                                setNewCard({
                                    ...newCard,
                                    [type]: {
                                        ...newCard?.[type],
                                        font: {
                                            ...newCard?.[type]?.font,
                                            fontFamilyId: e.target.value,
                                            fontFamily: selectedFont ? selectedFont.family : newCard?.[type]?.fontFamily,
                                            fontWeight: selectedFont ? selectedFont.defaultWeight : newCard?.[type]?.fontWeight
                                        }
                                    }
                                });
                            }}>
                                {
                                    allFontFamilies.map((fontFamily: any) => (
                                        <option key={fontFamily.id} value={fontFamily.id}
                                        >{fontFamily.family}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-1">
                            <label htmlFor={`${type}CardFontColor`} className='my-2 form-label'>Font Color</label>
                            <input type="color" id={`${type}CardFontColor`} className="form-control form-control-color"
                            defaultValue={newCard?.[type]?.font?.fontColor || '#000000'}
                            onChange={(e) => {
                                setNewCard({
                                    ...newCard,
                                    [type]: {
                                        ...newCard?.[type],
                                        font: {
                                            ...newCard?.[type]?.font,
                                            fontColor: e.target.value
                                        }
                                    }
                                });
                            }} />
                        </div>
                        <div className="row">
                            <div className='col-md-6'>
                                <label htmlFor={`${type}CardFontSize`} className='my-2 form-label'>Font Size</label>
                                <input type="number" id={`${type}CardFontSize`} className="form-control"
                                defaultValue={newCard?.[type]?.font?.fontSize || 16}
                                onChange={(e) => {
                                    setNewCard({
                                        ...newCard,
                                        [type]: {
                                            ...newCard?.[type],
                                            font: {
                                                ...newCard?.[type]?.font,
                                                fontSize: e.target.value
                                            }
                                        }
                                    });
                                }} />
                            </div>
                            <div className='col-md-6'>
                                                        <div className='col pe-2'>
                                    {/* font weight should update according to font family selection */}
                                    <label htmlFor="fontWeight" className='form-label my-2'>Font Weight</label>
                                    <select id="fontWeight"
                                    className="form-select"
                                    defaultValue={newCard?.[type]?.font?.fontWeight}
                                    onChange={(e) => {
                                        setNewCard({
                                            ...newCard,
                                            [type]: {
                                                ...newCard?.[type],
                                                font: {
                                                    ...newCard?.[type]?.font,
                                                    fontWeight: e.target.value
                                                }
                                            }
                                        });
                                    }}>
                                        {
                                            newCard?.[type]?.font?.fontFamilyId ?
                                            allFontFamilies.find((font: any) => font.id === newCard?.[type]?.font?.fontFamilyId)?.weights.map(
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
                                {/* <label htmlFor={`${type}CardFontWeight`} className='my-2 form-label'>Font Weight</label>
                                <input type="number" id={`${type}CardFontWeight`} className="form-control"
                                defaultValue={newCard?.[type]?.font?.fontWeight || 400}
                                onChange={(e) => {
                                    setNewCard({
                                        ...newCard,
                                        [type]: {
                                            ...newCard?.[type],
                                            font: {
                                                ...newCard?.[type]?.font,
                                                fontWeight: e.target.value
                                            }
                                        }
                                    });
                                }} /> */}
                            </div>
                        </div>
                        {/* text alignment */}
                        <div className="row">
                            <div className='col-md-6'>
                                <label htmlFor={`${type}CardTextAlignment`} className='form-label my-2'>Text Alignment: {newCard?.[type]?.alignment} </label>
                                <div className="d-flex">
                                    {
                                        alighnments.map((align, index) =>
                                            newCard?.[type]?.alignment === align ?
                                            <label key={align +`${index}-card-${type}`} id={align +`${index}-card-${type}`} className={
                                                align == "center" ? 
                                                    "btn btn-primary rounded-0": 
                                                align == "left" ? "btn btn-primary rounded-end-0" :
                                                    "btn btn-primary rounded-start-0"} htmlFor={`btn-check-${type}-card-${align}`}>
                                                {align === 'left' && <i className="bi bi-text-left"></i>}
                                                {align === 'center' && <i className="bi bi-text-center"></i>}
                                                {align === 'right' && <i className="bi bi-text-right"></i>}
                                            </label>
                                        :
                                        <div key={align +`${index}-card-${type}`} id={align +`${index}-card-${type}`}>
                                        <label  className={
                                            align == "center" ? 
                                            "btn btn-outline-primary rounded-0": 
                                            align == "left" ? "btn btn-outline-primary rounded-end-0" :
                                                "btn btn-outline-primary rounded-start-0"} htmlFor={`btn-check-${type}-card-${align}`}>
                                            {align === 'left' && <i className="bi bi-text-left"></i>}
                                            {align === 'center' && <i className="bi bi-text-center"></i>}
                                            {align === 'right' && <i className="bi bi-text-right"></i>}
                                        </label>
                                        <input type="checkbox" className="btn-check" id={`btn-check-${type}-card-${align}`} autoComplete="off"
                                        defaultValue={newCard?.[type]?.alignment}
                                        checked={newCard?.[type]?.alignment === align}
                                        onChange={() => {
                                            setNewCard({
                                                ...newCard,
                                                [type]: {
                                                    ...newCard?.[type],
                                                    alignment: align
                                                }
                                            })
                                        }}/>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor={`textBlockCase-Card-${type}`} className='form-label my-2'>Text Case{newCard?.[type]?.textCase} </label>
                                <div>
                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {
                                        textCase.map((caseType, index) => 
                                                newCard?.[type]?.textCase === caseType ?
                                                    <label key={caseType + `${index}-card-${type}`} id={caseType + `${index}-card-${type}`} className={
                                                        caseType === 'uppercase' ?
                                                        "btn btn-primary rounded-0":
                                                        caseType === 'capitalize' ?
                                                        "btn btn-primary rounded-end-0":
                                                        "btn btn-primary rounded-start-0"

                                                        } htmlFor={`btnradio-${caseType}-card-${type}`}>
                                                        {caseType === 'capitalize' && 'Aa'}
                                                        {caseType === 'uppercase' && 'AA'}
                                                        {caseType === 'lowercase' && 'aa'}
                                                    </label>
                                                :
                                            <div  key={caseType + `${index}-card-${type}`}>
                                                <input type="radio" className="btn-check" name="btnradio" id={`btnradio-${caseType}-card-${type}`} autoComplete="off"
                                                onChange={
                                                    () => {
                                                        setNewCard({
                                                            ...newCard,
                                                            [type]: {
                                                                ...newCard?.[type],
                                                                textCase: caseType
                                                            }
                                                        })
                                                    }
                                                }
                                                />
                                                <label className={
                                                    caseType === 'uppercase' ?
                                                    "btn btn btn-outline-primary rounded-0":
                                                    caseType === 'capitalize' ?
                                                    "btn btn btn-outline-primary rounded-end-0":
                                                    "btn btn btn-outline-primary rounded-start-0"
                                                    } htmlFor={`btnradio-${caseType}-card-${type}`}>
                                                    {caseType === 'capitalize' && 'Aa'}
                                                    {caseType === 'uppercase' && 'AA'}
                                                    {caseType === 'lowercase' && 'aa'}
                                                </label>
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-md-6'>
                                <label htmlFor={`${type}CardPaddingX`} className='my-2 form-label'>Padding-X</label>
                                <input type="number" className='form-control' id={`${type}CardPaddingX`} value={newCard?.[type]?.layout?.paddingX ? Number(newCard?.[type]?.layout?.paddingX) : 0} onChange={(e) => {
                                    setNewCard({
                                        ...newCard,
                                        [type]: {
                                            ...newCard?.[type],
                                            layout: {
                                                ...newCard?.[type]?.layout,
                                                paddingX: e.target.value
                                            }
                                        }
                                    })
                                }} />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor={`${type}CardPaddingY`} className='my-2 form-label'>Padding-Y</label>
                                <input type="number" className='form-control' id={`${type}CardPaddingY`} value={ newCard?.[type]?.layout?.paddingY ? Number(newCard?.[type]?.layout?.paddingY) : 0 } onChange={(e) => {
                                    setNewCard({
                                        ...newCard,
                                        [type]: {
                                            ...newCard?.[type],
                                            layout: {
                                                ...newCard?.[type]?.layout,
                                                paddingY: e.target.value
                                            }
                                        }
                                    })
                                }} />
                            </div>
                        </div>

                    </div>
                    :null
                }
                </div>
            </div>
        </div>
    )
}

export default TextBlockSettings