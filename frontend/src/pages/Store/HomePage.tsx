import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
function HomePage() {
    const [showModal, setShowModal] = useState(false)
    const [section, setSection] = useState({
        uid: '',
        name: 'Hero Section',
        width: 'full',

    })
    const [homepage, setHomepage] = useState(
        {
  uid: "page_home",
  order: 0,
  slug: "home",
  title: "Homepage",
  seo: {
    title: "Soft Luxe – Elegant & Premium Beauty",
    description: "Discover elegant and premium beauty products with Soft Luxe.",
    keywords: ["beauty", "luxury", "premium", "soft luxe"]
  },
  body: [
    {
        uid: "section_hero",
        order: 0,
        name: "Hero Section",
        design:{
            grid:{
                gap:0,
                rows:12
            },
            height: 100,
            padding: {  top: 0, right: 0, bottom: 0, left: 0},
            margin: {  top: 0, right: 0, bottom: 0, left: 0},
        },
        background: {
            type: "image",
            value: "https://t3.ftcdn.net/jpg/02/85/87/26/360_F_285872680_Zq4LugtoLyN8ILSG0AE2bf1crbT4ojjE.jpg",
        },
        blocks: [
            {
                width: "100%",
                uid: "block_hero",
                order: 0,
                type: "text",
                enabled: true,
                typeOfText: "h1",
                fontsize: 16,
                textAlign: "center",
                heading: "Welcome to Soft Luxe",
                bodyHtml: "Experience elegance and premium beauty products.",
                fontColor: "#ffffffff",
                backgroundColor: "#d02828ff",
                gridArea: "2 / 10 / span 5 / span 5",
                padding: {  top: 0, right: 0, bottom: 0, left: 0},
                margin: {  top: 0, right: 0, bottom: 0, left: 0},
            }
        ]
    },

  ]
}
    )
    const [grid, setGrid] = useState({})
    const [bodySections, setBodySections] = useState<any[]>([])
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let targetElement:any = null;
    let span={rowSpan:1, colSpan:1}
    let currentId = 'test'+1
    
    const dragstartHandler = (e:any, block:any) => {
        e.dataTransfer.setData("text", JSON.stringify(block));
        console.log("e:", e);
        let draggedBlock = JSON.stringify(block);
        console.log("block:", block);
        targetElement = e.target;
        let allElements = document.getElementsByClassName('grid-item');
        span.rowSpan = block.rowSpan;
        span.colSpan = block.colSpan;
        Array.from(allElements).forEach(element => {
            element.classList.add('grid-item-active');
        });
        console.log("span:", span);
    }
    const dragHandler = (e:any, gridDiv:any, gridContainerId:string) => {
        e.preventDefault(); 
        // console.log('gridDiv:', gridDiv)
        // check if there is any existing drag-over-indicator div, if yes remove it
        let dragIndicators = document.getElementsByClassName('drag-over-indicator');
        Array.from(dragIndicators).forEach((indicator) => {
            indicator.remove();
        });
        let div = document.createElement('div');
        div.className = 'drag-over-indicator';
        div.style.gridArea = `${gridDiv.row} / ${gridDiv.col} / span ${span.rowSpan} / span ${span.colSpan} `;
        let gridElement = document.getElementById(gridContainerId);
        gridElement?.appendChild(div);

        // let allElements = document.getElementsByClassName('grid-item');
        // Array.from(allElements).forEach(element => {
        //     element.classList.add('grid-item-active');
        // });
    }

    const dropHandler = (e:any, gridDiv:any) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        const parsedData = JSON.parse(data);
        if(parsedData.blockadded){
            // update the position of the block
            let sectBlock ={
                ...parsedData,
                rowstart: gridDiv.row,
                colstart: gridDiv.col,
                blockadded: true,
            }
            console.log(sectBlock)
            console.log('sectionBlocks:', sectionBlocks)
            let updatedBlocks: typeof sectionBlocks = []
            sectionBlocks.forEach((block) => {
                if(block.id === parsedData.id){
                    updatedBlocks.push(sectBlock)
                }else{
                    updatedBlocks.push(block)
                }
            })
            console.log('updatedBlocks:', updatedBlocks)
            setSectionBlocks(updatedBlocks)
        }else{
            let sectBlock ={
                id: uuidv4(),
                type: parsedData.type,
                html: parsedData.html,
                rowSpan: parsedData.rowSpan,
                colSpan: parsedData.colSpan,
                colstart: gridDiv.col,
                rowstart: gridDiv.row,
                blockadded: true,
            }
            console.log(sectBlock)
            setSectionBlocks([...sectionBlocks, { ...sectBlock }]);
        }
        let allElements = document.getElementsByClassName('grid-item');
        Array.from(allElements).forEach(element => {
            element.classList.remove('grid-item-active');
            // element.classList.add('dragging');
        });
        // remove any existing drag-over-indicator div
        let dragIndicators = document.getElementsByClassName('drag-over-indicator');
        Array.from(dragIndicators).forEach((indicator) => {
            indicator.remove();
        });
        // Logic to handle the drop event and update the section/block position
    }
    const contentBlocks = [
        {
            type: "text",
            name: "Text Block",
            icon: "bi bi-fonts",
            rowSpan: 4,
            colSpan: 6,
            html: "<h2>Your Text Here</h2>"
        },
        {
            type: "image",
            name: "Image Block",
            icon: "bi bi-image",
            rowSpan: 5,
            colSpan: 4,
            html: "<img width='100%' src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' alt='Your Image Here' />"
        },
        {
            type: "video",
            name: "Video Block",
            icon: "bi bi-video",
            rowSpan: 5,
            colSpan: 4,
            html: "<video width='100%' controls><source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4'>Your browser does not support the video tag.</video>"
        },
        {
            type: "button",
            name: "Button Block",
            icon: "bi bi-menu-button",
            rowSpan: 1,
            colSpan: 4,
            html: "<button class='btn btn-primary w-100 h-100'>Click Me</button>"
        },
        {
            type: "form",
            name: "Form Block",
            icon: "bi bi-file-earmark-text",
            rowSpan: 4,
            colSpan: 6
        },
        {
            type: "accordion",
            name: "Accordion Block",
            icon: "bi bi-layout-accordion",
            rowSpan: 4,
            colSpan: 6
        },
    ]
    const [sectionBlocks, setSectionBlocks] = useState<any[]>([
        {
            id: uuidv4(),
            type: "text",
            html: "<h1>Welcome to Soft Luxe</h1><p>Experience elegance and premium beauty products.</p>",
            fontsize: 14,
            rowstart: 2,
            colstart: 5,
            rowSpan: 4,
            colSpan: 5,
            blockadded: true,
        }
    ])


    useEffect(() => {
        // create a grid of divs based on the number of rows and columns
        let gridTemplateRows = ''
        let gridDivs = []
        console.log(homepage.body[0].design.grid.rows)
        let divIndex = 0
        for(let j=0; j< homepage.body[0].design.grid.rows; j++) {
            for(let i=0; i< 24; i++) {
                let gridDiv = {
                    index: divIndex,
                    gridArea: `${j+1} / ${i+1} / span 1 / span 1`,
                    row: j+1,
                    col: i+1
                }
                gridDivs.push(gridDiv)
                divIndex++
            }
        }
        setGrid(gridDivs)
        // document.addEventListener('mousemove', (event) => {
        // const mouseX = event.clientX; // X-coordinate relative to the viewport
        // const mouseY = event.clientY; // Y-coordinate relative to the viewport

        // console.log(`Cursor position: X=${mouseX}, Y=${mouseY}`);
        // // You can use these coordinates to update elements, trigger animations, etc.
        // });
    }, [])
    

    return (
        <div>
            <h1>homepage</h1>
            <div className="container">
                {/* button to  open modal to add section for list of body sections */}
                <button onClick={() => setShowModal(true)}>Add Section</button>
                {/* list of body sections */}
                <div className="border w-100 border-primary rounded p-3 my-3 min-vh-30 bg-light">
                    {
                    homepage.body.map((section, index) => (
                        <div key={index} className='sections-cst' style={{
                            background: section.background.type == 'image' ? `url(${section.background.value}) no-repeat center/cover` : section.background.value == 'none' ? 'transparent' : `var(--${section.background.value})`,
                            display: 'grid',
                            gap: section.design?.grid ? `${section.design.grid.gap}px` : '0',
                            gridTemplateRows: `repeat(${section.design?.grid?.rows || 1}, 50px)`
                        }}>
                            {
                            section.blocks.map((block:any, bIndex:number) => (
                                <div key={bIndex} style={{
                                        fontSize: block.fontsize,
                                        textAlign: block.textAlign,
                                        color: block.fontColor,
                                        backgroundColor: block.backgroundColor,
                                        padding: `${block.padding.top}px ${block.padding.right}px ${block.padding.bottom}px ${block.padding.left}px`,
                                        margin: `${block.margin.top}px ${block.margin.right}px ${block.margin.bottom}px ${block.margin.left}px`,
                                        gridArea: block.gridArea ? block.gridArea : 'auto',
                                    }} >
                                    {block.type === 'text' && (
                                        <div dangerouslySetInnerHTML={{ __html:`<${block.typeOfText}>${block.bodyHtml}</${block.typeOfText}>` }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                    }
                </div>
                <div className="contentBlock">
                    <h4>Content Block</h4>
                    {/* <div className="draggableBlock border p-3 my-3 min-vh-10 bg-white" draggable={true} onDragStart={dragstartHandler} id="draggable_1">
                        Drag me to the grid
                    </div> */}
                    <div className='d-flex flex-wrap'>
                        {contentBlocks.map((block, index) => (
                            <div key={index} className="border p-2 my-2 bg-white col-4" style={{cursor: 'grab'}} draggable={true} onDragStart={(e) => dragstartHandler(e, block)} id={`content_block_${block.type}`}>
                                <i className={block.icon}></i> {block.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='sections-cst w-100' id='section_grid'>
                    {
                    grid && Object.keys(grid).length > 0 ?
                    grid.map((gridDiv:any) => (
                        <div className='grid-item' key={gridDiv.index} id={`grid_div_${gridDiv.index}`} 
                            style={{
                                gridArea: gridDiv.gridArea
                            }}
                            onDropCapture={(e) => dropHandler(e, gridDiv)}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                let dragIndicators = document.getElementsByClassName('drag-over-indicator');
                                Array.from(dragIndicators).forEach((indicator) => {
                                    indicator.remove();
                                });
                            }}
                            onDragOver={(e) => {
                                e.preventDefault()
                                dragHandler(e, gridDiv, "section_grid")
                            }}>
                        </div>
                    )) : (
                        <div>No grid sections available</div>
                    )}
                    {
                    sectionBlocks.map((block, index) => (
                        <div 
                            dangerouslySetInnerHTML={{ __html: block.html }} key={index} 
                            style={{
                            gridArea: `${block.rowstart} / ${block.colstart} / span ${block.rowSpan} / span ${block.colSpan}`,
                            }} 
                            draggable={true} 
                            onDragStart={(e) => dragstartHandler(e, block)} 
                            id={`section_block_${index}`}
                            className='sect-block-item'
                            onMouseOver={(e)=>{
                                addEditOptions(e.currentTarget, block)
                            }}
                            onMouseLeave={(e)=>{
                                let target = e.currentTarget;
                                target.classList.remove('block-item-active');
                            }}
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default HomePage