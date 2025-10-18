import React from 'react'
import { Block } from '../../../../types/PageType'

function Blocks({ block, addEditOptions, dragstartHandler, removeEditOptions, handleEditBlock, section, expandBlock, openEditBlockMenu, handleDeleteBlock }: { block: Block, addEditOptions: (target: HTMLElement, uid: string) => void, dragstartHandler: (e: React.DragEvent<HTMLDivElement>, block: Block, type: string) => void, removeEditOptions: (target: HTMLElement, uid: string) => void, handleEditBlock: (sectionId: string, block: Block) => void, section: any, expandBlock: (sectionId: string, blockUid: string, direction: 'top' | 'bottom' | 'left' | 'right', action: 'increase' | 'reduce') => void, openEditBlockMenu: (sectionId: string, block: Block) => void, handleDeleteBlock: (sectionId: string, blockUid: string) => void }) {
    return (
        <div
            style={{
                gridArea: `${block.rowstart} / ${block.colstart} / span ${block.rowSpan} / span ${block.colSpan}`,
                height: '100%',
                backgroundColor: '#ca5757ff',
                cursor: 'grab'
            }} 
            className='position-relative'
            onMouseOver={(e)=>{addEditOptions(e.currentTarget, block.uid)}}
            draggable={true} 
            onDragStart={(e) => {dragstartHandler(e, block, 'sectionBlock') }} 
            onMouseLeave={(e)=>{ removeEditOptions(e.currentTarget, block.uid)}}
            onClick={(e)=>{
                e.stopPropagation();
                // open the block edit modal
                handleEditBlock(section.id, block)
            }}
        >
            <div className="position-relative h-100">
                <div className="edit-block-borders position-absolute top-0 start-0 bottom-0 end-0 d-none" id={`block_borders_${block.uid}`}>
                    <div className="position-relative w-100 h-100 border border-2 border-primary">
                        <div className="position-absolute start-0 end-0 translate-middle-y top-0 d-flex justify-content-center flex-column align-items-center">
                            <button className='btn btn-sm btn-secondary px-2 py-0 rounded-bottom-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'top', 'increase')}>     
                                <i className="bi bi-arrow-up-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                            <button className='btn btn-sm btn-secondary px-2 py-0 pb-1 rounded-top-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'top', 'reduce')}> 
                                <i className="bi bi-arrow-down-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                        </div>
                        <div className="position-absolute start-50 end-100 top-100  translate-middle-x translate-middle-y d-flex justify-content-center flex-column align-items-center">
                            <button className='btn btn-sm btn-secondary px-2 py-0 rounded-bottom-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'bottom', 'reduce')}>     
                                <i className="bi bi-arrow-up-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                            <button className='btn btn-sm btn-secondary px-2 py-0 pb-1 rounded-top-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'bottom', 'increase')}> <i className="bi bi-arrow-down-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                        </div>
                        <div className="position-absolute start-0 end-100 top-50  translate-middle-x translate-middle-y d-flex justify-content-center">
                            <button className='btn-sm btn-secondary btn btn-block-edit-side rounded-end-0' onClick={() => expandBlock(section.id, block.uid, 'left', 'increase')}>
                                <i className="bi bi-arrow-left-short d-block" ></i>
                            </button>
                            <button className='btn-sm btn-secondary btn btn-block-edit-side py-1 rounded-start-0' onClick={() => expandBlock(section.id, block.uid, 'left', 'reduce')}>
                                <i className="bi bi-arrow-right-short d-block" ></i>
                            </button>
                        </div>
                        <div className="position-absolute start-100 end-0 top-50  translate-middle-x translate-middle-y d-flex justify-content-center">
                            <button
                                className="btn-sm btn-secondary btn btn-block-edit-side rounded-end-0"
                                onClick={() => expandBlock(section.id, block.uid, 'right', 'reduce')}
                            >
                                <i className="bi bi-arrow-left-short d-block"></i>
                            </button>
                            <button
                                className="btn-sm btn-secondary btn btn-block-edit-side py-1 rounded-start-0"
                                onClick={() => expandBlock(section.id, block.uid, 'right', 'increase')}
                            >
                                <i className="bi bi-arrow-right-short d-block"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    block.type === 'text' ?
                    <div 
                    id={`section_block_${block.uid}`}
                    className='sect-block-item h-100' 
                    dangerouslySetInnerHTML={{ __html:
                        `<${block.textBlock?.tag || 'div'}
                        style="
                            color: ${block.textBlock?.font?.fontColor || '#000000'};
                            font-weight: ${block.textBlock?.font?.fontWeight || 600};
                            font-size: ${block.textBlock?.font?.fontSize || 16}px;
                            font-style: ${block.textBlock?.font?.fontStyle || 'normal'};
                            font-family: ${block.textBlock?.font?.fontFamily || 'Open Sans, sans-serif'};
                            text-align: ${block.textBlock?.textAlign || 'left'};
                        "
                        >${block.textBlock?.content}</${block.textBlock?.tag ||'div'}>` }}></div>
                    :
                    <div dangerouslySetInnerHTML={{ __html: `
                    ${block.html}`}}
                    id={`section_block_${block.uid}`}
                    className='sect-block-item h-100'
                    />
                }
                <div className='position-absolute top-0 m-n4 end-0 d-none' id={`block_item_options_${block.uid}`} >
                    <div className="" role="group" aria-label="Basic example">
                        <button className="btn btn-sm btn-primary edit-block-btn" title="Edit Block"><i className="bi bi-pencil-square" onClick={() => openEditBlockMenu(section.id, block)}></i></button>
                        <button className="btn btn-sm btn-danger delete-block-btn" title="Delete Block" onClick={() => handleDeleteBlock(section.id, block.uid)}><i className="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blocks