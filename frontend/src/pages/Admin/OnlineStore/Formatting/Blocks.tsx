import React, { use, useEffect, useRef, useState } from 'react'
import { Block } from '../../../../types/PageType'
import GoogleFont from 'react-google-font';
import fontFamilies from '../../../../designFonts.json';

function Blocks({ block, addEditOptions, dragstartHandler, removeEditOptions, handleEditBlock, section, expandBlock, openEditBlockMenu, handleDeleteBlock,  }: { block: Block, addEditOptions: (target: HTMLElement, uid: string) => void, dragstartHandler: (e: React.DragEvent<HTMLDivElement>, block: Block, type: string) => void, removeEditOptions: (target: HTMLElement, uid: string) => void, handleEditBlock: (sectionId: string, block: Block) => void, section: any, expandBlock: (sectionId: string, blockUid: string, direction: 'top' | 'bottom' | 'left' | 'right', action: 'increase' | 'reduce') => void, openEditBlockMenu: (sectionId: string, block: Block) => void, handleDeleteBlock: (sectionId: string, blockUid: string) => void }) {
    const [blockFonts, setBlockFonts] = useState<any[]>([]);
    const [fontWeights, setFontWeights] = useState<any[]>([]);
    const [blockFont, setBlockFont] = useState<string>('');
    const [generalStyles, setGeneralStyles] = useState<any>({});

    const ref = useRef<HTMLDivElement>(null);
    // let r = document.querySelector(':root') as HTMLElement | null;

    useEffect(() => {
        const el = ref.current;
        el?.style.setProperty("--blockFont", block.textBlock?.font.fontFamily || 'Open Sans, sans-serif');
        // el.style.setProperty("--customSecondary", theme.customSecondary);
        // el.style.setProperty("--customAccent", theme.customAccent);
        // el.style.setProperty("--customBackground", theme.customBackground);
        // el.style.setProperty("--customText", theme.customText);
        // el.style.setProperty("--bodyFont", theme.bodyFont);
        // el.style.setProperty("--headingFont", theme.headingFont);
        let allFonts: any[] = [];
        if(block.textBlock){
            let fontObj = [
                {
                    uid: block.uid,
                    fontFamily: block.textBlock.font.fontFamily,
                    fontId: block.textBlock.font.fontId
                }
            ];
            setBlockFont(block.textBlock.font.fontFamily);
            allFonts = [...allFonts, ...fontObj];
        // find all the font weight of the family in blockFonts
        let fontWeights = fontFamilies.fonts.find(font => font.family === block?.textBlock?.font.fontFamily)?.weights || [];
        setFontWeights(fontWeights);
    }
    if(block.layout){
        let genSTylSt  = {
            background: block.backgroundColor ? block.backgroundColor : block.buttonBlock?.background ?  block.buttonBlock?.background : 'transparent',
            padding: `${block.layout?.paddingY || 0 }px ${block.layout?.paddingX || 0 }px`,
            margin: `${block.layout?.marginY || 0 }px ${block.layout?.marginX || 0 }px`,
            marginX: block.layout.marginX || '0',
            marginY: block.layout.marginY || '0',
            // display: 'flex',
            justifyContent: 
                block.layout?.alignmentX === 'center' ? 'center' : 
                block.layout?.alignmentX === 'end' ? 'flex-end' : 'flex-start',
            alignItems: 
                block.layout?.alignmentY === 'center' ? 'center' :
                block.layout?.alignmentY === 'bottom' ? 'flex-end' : 'flex-start',
            height: '100%',
            borderRadius: block.styles?.borderCorners ? `${block.styles.borderCorners}px` : '0px',
            borderColor: block.styles?.borderColor || 'transparent',
            borderWidth: block.styles?.borderWidth ? `${block.styles.borderWidth}px` : '0px',
            borderStyle: block.styles?.borderStyle || 'solid',
        }
        setGeneralStyles({
            ...genSTylSt 
        });
    }
        setBlockFonts(allFonts);
    }, [ block, blockFont ]);

    return (
        <div
            style={{
                gridArea: `${block.rowstart} / ${block.colstart} / span ${block.rowSpan} / span ${block.colSpan}`,
                height: '100%',
                // backgroundColor: '#ca5757ff',
                cursor: 'grab', 

            }} 
            className='position-relative text-font'
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
            {
                blockFont ?
                <GoogleFont fonts={[{ font: block?.textBlock?.font.fontFamily, weights: fontWeights }]} subsets={['latin', 'latin-ext']}/>
                : null
            }
            <div className="position-relative h-100">
                <div className="edit-block-borders position-absolute top-0 start-0 bottom-0 end-0 d-none" id={`block_borders_${block.uid}`}>
                    <div className="position-relative w-100 h-100 border border-2 border-primary">
                        <div className="position-absolute z-3 start-0 end-0 translate-middle-y top-0 d-flex justify-content-center flex-column align-items-center">
                            <button className='btn btn-sm btn-secondary px-2 py-0 rounded-bottom-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'top', 'increase')}>     
                                <i className="bi bi-arrow-up-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                            <button className='btn btn-sm btn-secondary px-2 py-0 pb-1 rounded-top-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'top', 'reduce')}> 
                                <i className="bi bi-arrow-down-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                        </div>
                        <div className="position-absolute z-3 start-50 end-100 top-100  translate-middle-x translate-middle-y d-flex justify-content-center flex-column align-items-center">
                            <button className='btn btn-sm btn-secondary px-2 py-0 rounded-bottom-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'bottom', 'reduce')}>     
                                <i className="bi bi-arrow-up-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                            <button className='btn btn-sm btn-secondary px-2 py-0 pb-1 rounded-top-0 text-align-center d-flex justify-content-center align-items-center' onClick={() => expandBlock(section.id, block.uid, 'bottom', 'increase')}> <i className="bi bi-arrow-down-short d-block" style={{ height: '1rem' }}></i>
                            </button>
                        </div>
                        <div className="position-absolute z-3 start-0 end-100 top-50  translate-middle-x translate-middle-y d-flex justify-content-center">
                            <button className='btn-sm btn-secondary btn btn-block-edit-side rounded-end-0' onClick={() => expandBlock(section.id, block.uid, 'left', 'increase')}>
                                <i className="bi bi-arrow-left-short d-block" ></i>
                            </button>
                            <button className='btn-sm btn-secondary btn btn-block-edit-side py-1 rounded-start-0' onClick={() => expandBlock(section.id, block.uid, 'left', 'reduce')}>
                                <i className="bi bi-arrow-right-short d-block" ></i>
                            </button>
                        </div>
                        <div className="position-absolute z-3 start-100 end-0 top-50  translate-middle-x translate-middle-y d-flex justify-content-center">
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
                    block.type === 'image' || block.type === 'carousel' || block.type === 'cardBlock' ?
                    <div className=" position-absolute top-0 start-0 bottom-0 end-0 z-1"></div>
                    : null
                }

                {
                    block.type === 'text' ?
                    <div id={`section_block_${block.uid}`} className='sect-block-item h-100'> 
                        <div 
                        style={{
                            ...generalStyles
                        }}
                        dangerouslySetInnerHTML={{ __html:
                        `<${block.textBlock?.tag || 'div'}
                        style="
                            color: ${block.textBlock?.font?.fontColor || '#000000'};
                            font-weight: ${block.textBlock?.font?.fontWeight || 600};
                            font-size: ${block.textBlock?.font?.fontSize || 16}px;
                            font-style: ${block.textBlock?.font?.fontStyle || 'normal'};
                            font-family: ${block.textBlock?.font?.fontFamily || 'Open Sans, sans-serif'};
                            text-align: ${block.textBlock?.alignment || 'start'};
                            text-transform: ${block.textBlock?.textCase || 'none'};
                            height: 100%;
                        "
                        >${block.textBlock?.content}</${block.textBlock?.tag ||'div'}>` }}>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    block.type === 'button' ?
                    <div id={`section_block_${block.uid}`}  className='sect-block-item h-100' >
                        {
                            block?.buttonBlock?.tag === 'anchor' ? 
                        <div 
                        style={{
                            ...generalStyles
                        }}
                            dangerouslySetInnerHTML={{ __html:
                                `<a
                                style="
                                    background: transparent;
                                    width: 100%;
                                    color: ${block.buttonBlock?.font?.fontColor || '#000000'};
                                    font-weight: ${block.buttonBlock?.font?.fontWeight || 600};
                                    font-size: ${block.buttonBlock?.font?.fontSize || 16}px;
                                    font-style: ${block.buttonBlock?.font?.fontStyle || 'normal'};
                                    font-family: ${block.buttonBlock?.font?.fontFamily || 'Open Sans, sans-serif'};
                                    text-align: ${block.buttonBlock?.alignment || 'start'};
                                    text-transform: ${block.buttonBlock?.textCase || 'none'};
                                ">${block.buttonBlock?.content}</a>` }}
                                >
                        </div>
                            : 
                        <div 
                        style={{
                            ...generalStyles
                        }}
                            dangerouslySetInnerHTML={{ __html:
                                `<${block?.buttonBlock?.tag === 'button' ? 'button' : block?.buttonBlock?.tag === 'anchor' ? 'a' : 'div'}
                                style="
                                    background: transparent;
                                    width: 100%;
                                    color: ${block.buttonBlock?.font?.fontColor || '#000000'};
                                    font-weight: ${block.buttonBlock?.font?.fontWeight || 600};
                                    font-size: ${block.buttonBlock?.font?.fontSize || 16}px;
                                    font-style: ${block.buttonBlock?.font?.fontStyle || 'normal'};
                                    font-family: ${block.buttonBlock?.font?.fontFamily || 'Open Sans, sans-serif'};
                                    text-align: ${block.buttonBlock?.alignment || 'start'};
                                    text-transform: ${block.buttonBlock?.textCase || 'none'};
                                "
                                >${block.buttonBlock?.content}</${block.buttonBlock?.tag ||'button'}>` }}
                                >
                        </div>
                        }
                    </div>
                    : null
                }
                {
                    block.type === 'accordion' ?
                    <div id={`section_block_${block.uid}`}  className='sect-block-item h-100' >
                        <div className="accordion" id="accordionExample"
                        style={{
                            ...generalStyles,
                            width: '100%',
                        }}
                        >
                            {
                                block.accordionBlock?.accordions && block.accordionBlock.accordions.length > 0 ?
                                <div className='w-100'>
                                    {
                                        block.accordionBlock.accordions.map((accordion: any, index: number) => (
                                            <div key={accordion._id} className="accordion-item">
                                                <p className="accordion-header" 
                                                    id={`heading${accordion._id}`}

                                                >
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${accordion._id}`} aria-expanded={index === 0 ? "true" : "false"} aria-controls={`collapse${accordion._id}`}
                                                    style={{
                                                    fontFamily: block.accordionBlock?.heading.font.fontFamily || 'Open Sans, sans-serif',
                                                    fontSize: block.accordionBlock?.heading.font.fontSize ? `${block.accordionBlock?.heading.font.fontSize}px` : '16px',
                                                    fontWeight: block.accordionBlock?.heading.font.fontWeight || 600,
                                                    color: block.accordionBlock?.heading.font.fontColor || '#000000',
                                                    textAlign: block.accordionBlock?.heading?.alignment || 'start',
                                                    textTransform: block.accordionBlock?.heading?.textCase || 'none',
                                                }}
                                                >
                                                        {accordion.heading.title}
                                                    </button>
                                                </p>
                                                <div id={`collapse${accordion._id}`} className={index === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                    <div className="accordion-body" style={{
                                                        fontFamily: block.accordionBlock?.content.font.fontFamily || 'Open Sans, sans-serif',
                                                        fontSize: block.accordionBlock?.content.font.fontSize ? `${block.accordionBlock?.content.font.fontSize}px` : '16px',
                                                        fontWeight: block.accordionBlock?.content.font.fontWeight || 600,
                                                        color: block.accordionBlock?.content.font.fontColor || '#000000',
                                                        textAlign: block.accordionBlock?.content?.alignment    || 'start',
                                                        textTransform: block.accordionBlock?.content?.textCase || 'none',
                                                    }}>
                                                        {accordion.content.content}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Accordion Item #1
                                </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    ...Your accordion content goes here...
                                </div>
                                </div>
                            </div>
                            }
                            {/* <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Accordion Item #2
                                </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Accordion Item #3
                                </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    : null
                }
                {
                    block.type === 'image' ?
                    <div id={`section_block_${block.uid}`}  className='sect-block-item h-100'>
                        { 
                            block?.imageBlock ?
                            block?.imageBlock && block?.imageBlock?.media && block?.imageBlock?.media?.url ?
                            <img src={block?.imageBlock?.media?.url} alt={block?.imageBlock?.media?.altText || ''} className='img-fluid h-100 w-100' 
                            style={{ 
                                objectFit: block?.imageBlock?.settings?.fit || 'contain', 
                                display: block?.imageBlock?.media?.show ? 'block' : 'none',
                                objectPosition: 
                                block?.imageBlock?.settings?.position === 'custom' && block?.imageBlock?.settings?.objectPosition ?
                                    `${block?.imageBlock?.settings?.objectPosition.x || 50}% ${block?.imageBlock?.settings?.objectPosition.y || 50}%`
                                    :
                                    block?.imageBlock?.settings?.position ? block?.imageBlock?.settings?.position : '50% 50%',
                            }}
                            />
                            : 
                            <div className='w-100 h-100 position-relative d-flex justify-content-center align-items-center text-uppercase' style={{ 
                                backgroundImage: 'url(https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png)', 
                                backgroundSize: 'cover', 
                                backgroundRepeat: 'no-repeat', 
                                backgroundPosition: 'center' }}>
                                <h5>no image uploaded</h5>
                            </div>
                            : 
                            <div className='w-100 h-100 position-relative d-flex justify-content-center align-items-center text-uppercase' style={{ 
                                backgroundImage: 'url(https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png)', 
                                backgroundSize: 'cover', 
                                backgroundRepeat: 'no-repeat', 
                                backgroundPosition: 'center' }}>
                                <h5>no image uploaded</h5>
                            </div>
                        }

                    </div>
                    : null
                }
                {/* {
                    block.type === 'carousel' ?
                    <div id={`section_block_${block.uid}`} className='sect-block-item h-100 w-100'>
                        {
                            block?.carouselBlock ? 
                            <div id={"carouselExampleIndicators" + block.uid} className="carousel slide h-100 w-100" data-bs-ride="carousel">
                                <div className='carousel-indicators'>
                                    {
                                        block?.carouselBlock?.items && block?.carouselBlock?.items.length > 0 ?
                                        block?.carouselBlock?.items.map((item: any, index: number) => (
                                            <button key={item._id} type='button' data-bs-target={"#carouselExampleIndicators" + block.uid} data-bs-slide-to={index} aria-label={`Slide ${index + 1}`}></button>
                                        ))  
                                        : null
                                    }
                                </div>
                                <div className='carousel-inner h-100 w-100'>
                                    {
                                        block?.carouselBlock?.items && block?.carouselBlock?.items.length > 0 ?
                                        block?.carouselBlock?.items.map((item: any, index: number) => (
                                            <div key={item._id} className={index === 0 ? 'carousel-item active h-100' : 'carousel-item h-100'}>
                                                {
                                                    item.mediaType === 'image' ?
                                                    <img src={item.media.url} className='d-block w-100' alt={item.media.alt}/>
                                                    :
                                                    <div className='d-block w-100'>
                                                        <iframe width="560" height="315" src={item.video.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                    </div>
                                                }
                                            </div>
                                        ))
                                        : null
                                    }
                                </div>
                                <button className='carousel-control-prev' type='button' data-bs-target={"#carouselExampleIndicators" + block.uid} data-bs-slide='prev'><span className='carousel-control-prev-icon' aria-hidden='true'></span><span className='visually-hidden'>Previous</span></button>
                                <button className='carousel-control-next' type='button' data-bs-target={"#carouselExampleIndicators" + block.uid} data-bs-slide='next'><span className='carousel-control-next-icon' aria-hidden='true'></span><span className='visually-hidden'>Next</span></button>
                            </div>
                            :
                    <div id={`section_block_${block.uid}`}
                        className='sect-block-item h-100'>
                        <div dangerouslySetInnerHTML={{ __html: `
                        ${block.html}`}}
                        style={
                            {
                                ...generalStyles,
                            height: '100%',
                            background: block.backgroundColor || 'transparent',
                            padding: `${block.layout?.paddingY || 0 }px ${block.layout?.paddingX || 0 }px`,
                            margin: `${block.layout?.marginY || 0 }px ${block.layout?.marginX || 0 }px`,
                            display: 'flex',
                            justifyContent: 
                                block.layout?.alignmentX === 'center' ? 'center' : 
                                block.layout?.alignmentX === 'end' ? 'flex-end' : 'flex-start',
                            alignItems: 
                                block.layout?.alignmentY === 'center' ? 'center' : 
                                block.layout?.alignmentY === 'bottom' ? 'flex-end' : 'flex-start',
                            }
                        }
                        />
                    </div>
                        }

                    </div>
                    : null
                } */}
                {
                    block.type == 'carousel' ? 
                    <div id={`section_block_${block.uid}`} className='sect-block-item h-100 w-100'>
                        {
                            block?.carouselBlock?.items && block?.carouselBlock?.items.length > 0 ?
                            <div className="carousel slide h-100 w-100" id={`carouselExampleIndicators_${block.uid}`} data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    {
                                        block?.carouselBlock?.items.map((item: any, index: number) => (
                                            <button key={`carousel-indicator-${block.uid}-${index}`} type="button" data-bs-target={`#carouselExampleIndicators_${block.uid}`} data-bs-slide-to={index} className={index === 0 ? "active": ""} aria-current={index === 0 ? "true": ""} aria-label={"Slide "+(index + 1)}></button>
                                        ))
                                    }
                                </div>
                                <div className="carousel-inner h-100">
                                    {
                                        block?.carouselBlock?.items.map((item: any, index: number) => (
                                            <div className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`} key={`carousel-item-${block.uid}-${index}`}>
                                                {
                                                    item.mediaType === 'image' ?
                                                    <img src={item?.media?.url} className="d-block w-100 h-100 object-fit-cover" alt={item.altText} />
                                                    :
                                                    <div className='d-block w-100 h-100'>
                                                        <iframe width="100%" height="100%" src={item.video.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                    </div>
                                                }
                                            
                                            </div>
                                        ))
                                    }
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators_${block.uid}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators_${block.uid}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            :
                            <div id={`section_block_${block.uid}`}
                        className='sect-block-item h-100'>
                        <div dangerouslySetInnerHTML={{ __html: `
                        ${block.html}`}}
                        style={
                            {
                                ...generalStyles,
                            height: '100%',
                            background: block.backgroundColor || 'transparent',
                            padding: `${block.layout?.paddingY || 0 }px ${block.layout?.paddingX || 0 }px`,
                            margin: `${block.layout?.marginY || 0 }px ${block.layout?.marginX || 0 }px`,
                            display: 'flex',
                            justifyContent: 
                                block.layout?.alignmentX === 'center' ? 'center' : 
                                block.layout?.alignmentX === 'end' ? 'flex-end' : 'flex-start',
                            alignItems: 
                                block.layout?.alignmentY === 'center' ? 'center' : 
                                block.layout?.alignmentY === 'bottom' ? 'flex-end' : 'flex-start',
                            }
                        }
                        />
                    </div>
                        }
                    </div>
                    : null
                }
                {
                    block.type == 'cardBlock' ?
                    block?.cardBlock  ?
                    <div className="text-center w-100 mx-auto h-100"
                    style={{ ...generalStyles, width: '100%'}}>
                        {
                            block?.cardBlock?.heading?.show ?
                            <h2 style={{
                                fontFamily: block?.cardBlock?.heading?.font?.fontFamily || 'Open Sans, sans-serif',
                                fontSize: block?.cardBlock?.heading?.font?.fontSize ? `${block?.cardBlock?.heading?.font?.fontSize}px` : '24px',
                                fontWeight: block?.cardBlock?.heading?.font?.fontWeight || 700,
                                color: block?.cardBlock?.heading?.font?.fontColor || '#000000',
                                textAlign: block?.cardBlock?.heading?.alignment || 'center',
                                textTransform: block?.cardBlock?.heading?.textCase || 'none',
                                padding: `${block?.cardBlock?.heading?.layout?.paddingY || 0 }px ${block?.cardBlock?.heading?.layout?.paddingX || 0 }px`,
                            }}
                            >{block?.cardBlock?.heading?.value}</h2>
                            : null
                        }
                        {
                            block?.cardBlock?.subheading?.show ?
                            <h6 style={{
                                fontFamily: block?.cardBlock?.subheading?.font?.fontFamily || 'Open Sans, sans-serif',
                                fontSize: block?.cardBlock?.subheading?.font?.fontSize ? `${block?.cardBlock?.subheading?.font?.fontSize}px` : '20px',
                                fontWeight: block?.cardBlock?.subheading?.font?.fontWeight || 600,
                                color: block?.cardBlock?.subheading?.font?.fontColor || '#000000',
                                textAlign: block?.cardBlock?.subheading?.alignment || 'center',
                                textTransform: block?.cardBlock?.subheading?.textCase || 'none',
                                padding: `${block?.cardBlock?.subheading?.layout?.paddingY || 0 }px ${block?.cardBlock?.subheading?.layout?.paddingX || 0 }px`,
                            }}>{block?.cardBlock?.subheading?.value}</h6>
                            : null
                        }
                        {
                            block?.cardBlock?.content?.show ?
                            <p style={{
                                fontFamily: block?.cardBlock?.content?.font?.fontFamily || 'Open Sans, sans-serif',
                                fontSize: block?.cardBlock?.content?.font?.fontSize ? `${block?.cardBlock?.content?.font?.fontSize}px` : '16px',
                                fontWeight: block?.cardBlock?.content?.font?.fontWeight || 400,
                                color: block?.cardBlock?.content?.font?.fontColor || '#000000',
                                textAlign: block?.cardBlock?.content?.alignment || 'center',
                                textTransform: block?.cardBlock?.content?.textCase || 'none',
                                padding: `${block?.cardBlock?.content?.layout?.paddingY || 0 }px ${block?.cardBlock?.content?.layout?.paddingX || 0 }px`,
                            }}
                            >{block?.cardBlock?.content?.value}</p>
                            : null
                        }
                        <div className="row g-3 justify-content-center">
                            {
                                block?.cardBlock?.cards && block?.cardBlock?.cards.length > 0 ?
                                block.cardBlock.cards.map((card, index) => (
                                    <div className={block?.cardBlock?.cards && block?.cardBlock?.cards.length < 3 ? "mx-auto  col-xs-2 col-md-3" :"mx-auto col-md-3 col-sm-4"} key={index}>
                                        <div className={block?.cardBlock?.cards && block?.cardBlock?.cards.length < 3  ? "card mx-auto" :"card mx-auto"} style={{
                                            borderColor: card?.style?.borderColor || '#dddddd',
                                            borderWidth: card?.style?.borderWidth ? `${card?.style?.borderWidth}px` : '1px',
                                            borderStyle: card?.style?.borderStyle || 'solid',
                                            backgroundColor: card?.style?.backgroundColor || '#ffffff',
                                        }}>
                                            {
                                                card.media.show ?
                                                <img src={ card.media.url ? card.media.url : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' } className="card-img-top" alt={card.title} />
                                                :
                                                null
                                            }
                                            <div className="card-body">
                                                {
                                                    card?.heading?.show ?
                                                    <h6 className="card-subtitle mb-2"
                                                    style={{
                                                        fontFamily: card?.heading?.font?.fontFamily || 'Open Sans, sans-serif',
                                                        fontSize: card?.heading?.font?.fontSize ? `${card?.heading?.font?.fontSize}px` : '16px',
                                                        fontWeight: card?.heading?.font?.fontWeight || 400,
                                                        color: card?.heading?.font?.fontColor || '#000000',
                                                        textAlign: card?.heading?.alignment || 'center',
                                                        textTransform: card?.heading?.textCase || 'none',
                                                        padding: `${card?.heading?.layout?.paddingY || 0 }px ${card?.heading?.layout?.paddingX || 0 }px`,
                                                    }}
                                                    >{card?.heading?.value}</h6>
                                                    : null
                                                }
                                                {
                                                    card?.subheading?.show ?
                                                    <h6 className="card-subtitle mb-2"
                                                    style={{
                                                        fontFamily: card?.subheading?.font?.fontFamily || 'Open Sans, sans-serif',
                                                        fontSize: card?.subheading?.font?.fontSize ? `${card?.subheading?.font?.fontSize}px` : '16px',
                                                        fontWeight: card?.subheading?.font?.fontWeight || 400,
                                                        color: card?.subheading?.font?.fontColor || '#000000',
                                                        textAlign: card?.subheading?.alignment || 'center',
                                                        textTransform: card?.subheading?.textCase || 'none',
                                                        padding: `${card?.subheading?.layout?.paddingY || 0 }px ${card?.subheading?.layout?.paddingX || 0 }px`,
                                                    }}
                                                    >{card?.subheading?.value}</h6>
                                                    : null
                                                }
                                                {
                                                    card?.content?.show ?
                                                    <p className="card-text"
                                                    style={{
                                                        fontFamily: card?.content?.font?.fontFamily || 'Open Sans, sans-serif',
                                                        fontSize: card?.content?.font?.fontSize ? `${card?.content?.font?.fontSize}px` : '16px',
                                                        fontWeight: card?.content?.font?.fontWeight || 400,
                                                        color: card?.content?.font?.fontColor || '#000000',
                                                        textAlign: card?.content?.alignment || 'center',
                                                        textTransform: card?.content?.textCase || 'none',
                                                        padding: `${card?.content?.layout?.paddingY || 0 }px ${card?.content?.layout?.paddingX || 0 }px`,
                                                    }}
                                                    >{card?.content?.value}</p>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                    :
                    <div id={`section_block_${block.uid}`}
                        className='sect-block-item h-100'>
                        <div dangerouslySetInnerHTML={{ __html: `
                        ${block.html}`}}
                        style={
                            {
                                ...generalStyles,
                                height: '100%',
                                background: block.backgroundColor || 'transparent',
                                padding: `${block.layout?.paddingY || 0 }px ${block.layout?.paddingX || 0 }px`,
                                margin: `${block.layout?.marginY || 0 }px ${block.layout?.marginX || 0 }px`,
                                display: 'flex',
                                justifyContent: 
                                    block.layout?.alignmentX === 'center' ? 'center' : 
                                    block.layout?.alignmentX === 'end' ? 'flex-end' : 'flex-start',
                                alignItems: 
                                    block.layout?.alignmentY === 'center' ? 'center' : 
                                    block.layout?.alignmentY === 'bottom' ? 'flex-end' : 'flex-start',
                            }
                        }
                        />
                    </div>
                    : 
                    null
                }

                {
                    block.type != 'button' && block.type != 'text' && block.type != 'accordion' && block.type != 'image' && block.type != 'carousel' && block.type != 'carousel'&& block.type != 'cardBlock' ?
                    <div id={`section_block_${block.uid}`}
                        className='sect-block-item h-100'>
                        <div dangerouslySetInnerHTML={{ __html: `
                        ${block.html}`}}
                        style={
                            {
                                ...generalStyles,
                            height: '100%',
                            background: block.backgroundColor || 'transparent',
                            padding: `${block.layout?.paddingY || 0 }px ${block.layout?.paddingX || 0 }px`,
                            margin: `${block.layout?.marginY || 0 }px ${block.layout?.marginX || 0 }px`,
                            display: 'flex',
                            justifyContent: 
                                block.layout?.alignmentX === 'center' ? 'center' : 
                                block.layout?.alignmentX === 'end' ? 'flex-end' : 'flex-start',
                            alignItems: 
                                block.layout?.alignmentY === 'center' ? 'center' : 
                                block.layout?.alignmentY === 'bottom' ? 'flex-end' : 'flex-start',
                            }
                        }
                        />
                    </div>
                    : null
                }
                <div className='position-absolute top-0 m-n4 end-0 d-none z-3' id={`block_item_options_${block.uid}`} >
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