import React, { useEffect, useState } from 'react'
import designBlockContents from '../../../../designBlockContents.json';
import fontFamilies from '../../../../designFonts.json';
import { edit } from '@cloudinary/url-gen/actions/animated';


function BlockEditingModal({type, section, editBlock, setEditBlock, updateSection}: {type: string, section: any, editBlock: any, setEditBlock: (block: any) => void, updateSection: (section: any) => void}) {
    const [designBlocks] = useState(designBlockContents.contentBlocks)
    const [allFontFamilies] = useState(fontFamilies.fonts)
    const [selectedDesignBlock, setSelectedDesignBlock] = useState<any>(null);
    useEffect(() => {
        console.log("Editing block details:", editBlock);
        // Find the corresponding design block
        if(editBlock){
            const foundBlock = designBlocks.find((block) => block.type === editBlock?.type);
            setSelectedDesignBlock(foundBlock || null);
        }
    }, [editBlock, designBlocks]);

    return (
        <div className='card col-md-4 col-sm-5 mx-auto my-3 position-absolute top-0 end-0 bottom-0' style={{ zIndex: 2000 }} >
            <div className="card-body min-vh-45 position-relative">
                <button className='btn bg-primary btn-close position-absolute top-0 end-0 translate-middle' onClick={(e) => {
                    // showEditSectionModal(e, section.id);
                }}></button>
                <h6 className="card-title text-capitalize"><i className="bi bi-brush"></i> &nbsp;{selectedDesignBlock?.name}  Editor</h6>
                <hr/>
                <div className="">
                    {
                        selectedDesignBlock && selectedDesignBlock.type == "text" ? (
                            <div>
                                <label htmlFor="textContent" className="form-label">Text Content</label>
                                <input type="text" id="textContent" defaultValue={editBlock.textBlock.content} className="form-control" onChange={(e) => {
                                    // Handle text content change
                                    let updatedBlock = {...editBlock, textBlock: {...editBlock.textBlock, content: e.target.value}};
                                    setEditBlock(updatedBlock);
                                    let updatedSection = {...section};
                                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                    console.log("Updated Section after text change:", updatedSection);
                                    updateSection(updatedSection);
                                }} />
                                <div>
                                    <label htmlFor="textTag">Type</label>
                                    <select id="textTag" className="form-select"
                                    defaultValue={editBlock.textBlock.tag}
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
                                                <option key={tagOption} value={tagOption}
                                                selected={editBlock.tag === tagOption}
                                                >{tagOption}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="fontSize">Font Size</label>
                                    <input type="number" id="fontSize" className="form-control" defaultValue={editBlock.textBlock.font.fontSize} onChange={(e) => {
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
                                <div>
                                    <label htmlFor="fontStyle">Font Style</label>
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
                                                selected={editBlock.textBlock.font.fontStyle === styleOption}
                                                >{styleOption}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* <div>
                                    <label htmlFor="fontWeight">Font Weight</label>
                                    <select id="fontWeight" className="form-select" onChange={(e) => {
                                        // Handle font weight change
                                        let updatedBlock = {...editBlock, fontWeight: e.target.value};
                                        setEditBlock(updatedBlock);
                                        let updatedSection = {...section};
                                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                        console.log("Updated Section after font weight change:", updatedSection);
                                        updateSection(updatedSection);
                                    }}>
                                        {
                                            selectedDesignBlock.fontWeightOptions.map((weightOption: string) => (
                                                <option key={weightOption} value={weightOption}
                                                selected={editBlock.fontWeight === weightOption}
                                                >{weightOption}</option>
                                            ))
                                        }
                                    </select>
                                </div> */}
                                <div>
                                    <label htmlFor="fontFamily">Font Family</label>
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
                                        // if (selectedFont) {
                                        //     updatedBlock.textBlock.font.fontWeight = selectedFont.defaultWeight;
                                        // }   
                                        setEditBlock(updatedBlock);
                                        let updatedSection = {...section};
                                        updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                                        console.log("Updated Section after font family change:", updatedSection);
                                        updateSection(updatedSection);
                                    }}>
                                        {
                                            allFontFamilies.map((fontFamily: any) => (
                                                <option key={fontFamily.id} value={fontFamily.id}
                                                selected={
                                                    editBlock.textBlock.font.fontFamilyId ? 
                                                    editBlock.textBlock.font.fontFamilyId === fontFamily.id 
                                                    :
                                                fontFamily.family === "Open Sans" 
                                                
                                                }
                                                >{fontFamily.family}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    {/* font weight should update according to font family selection */}
                                    <label htmlFor="fontWeight">Font Weight</label>
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
                                                        selected={weightOption === editBlock.textBlock.font.fontWeight}
                                                        >{weightOption}</option>
                                                    );
                                                })
                                            : 
                                            allFontFamilies.find((font: any) => font.family === "Open Sans")?.weights.map(
                                                (weightOption: number | string) => {
                                                    // const weightStr = weightOption.toString();
                                                    return (
                                                        <option key={weightOption} value={weightOption}
                                                        selected={weightOption === "600"}
                                                        >{weightOption}</option>
                                                    );
                                                }
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default BlockEditingModal