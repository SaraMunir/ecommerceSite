// import React from 'react'

function DesignElements({element, section, idx}: {element:any, section:any, idx:number}) {
    return (
        element.type == 'logo' ?
        <a className='d-inline-block col heading-font fw-bolder fs-3' href="#" key={idx}>
            <img src={element.src} alt={element.alt} style={{ width: '50px', height: '50px' }} /> {element.text}
        </a>
        :
        <>
        {
            element.type == 'link' ?
            <a className={
                section.position === "end" && element.icon 
                ? 'col-2'
                : 'col'
                } href={"#"+element.href} key={idx} 
                dangerouslySetInnerHTML={{ 
                    __html:  section.position === "end" && element.icon ? 
                    element.icon : element.name }}>

            </a>
            : 
            element.type == 'dropdown' ?
            <a className='col' href={"#"+element.href} key={idx}>
                {element.name}
            </a>
            : 
            element.type == 'megamenu' ?
            <a className='col' href={"#"+element.href} key={idx}>
                {element.name}
            </a>
            : 
            element.type == 'function' ?
            <button className={
                section.position === "end" && element.icon 
                ? 'col-2 btn'
                : 'col'
                } key={idx}
                dangerouslySetInnerHTML={{ 
                    __html:  section.position === "end" && element.icon ? 
                    element.icon : element.name }}
                >
                
            </button>
            : 
            null
        }
        
        </>
    )
}

export default DesignElements