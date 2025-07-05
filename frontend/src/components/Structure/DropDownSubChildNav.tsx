import React from 'react'
import { Button } from 'react-bootstrap';



function DropDownSubChildNav(props: { category: {
    _id: string; subCategories: any[];  
}; categories: any}) {

    const showChildSection = (parentId:string)=>{
        document.getElementById(parentId).classList.remove("d-none")
    }
    const hideCildSection = (parentId:string)=>{
        document.getElementById(parentId).classList.add("d-none")
    }
    return (
        <>
            <Button variant="link" className=''><i className="fas fa-chevron-right"></i></Button>
            <div className='position-absolute top-0 start-100 hover-menu d-none' id={'parent-'+props.category._id}>
                <div className="list-group bg-white border">
                    {
                        props.category.subCategories.map((grandChild)=>
    
                            <>
                            {
                                props.categories.map((subGrandChild:any)=>
                                subGrandChild._id == grandChild ?
                                    subGrandChild.subCategories.length > 0 ?
                                    <div className='list-group-item list-group-item-action p-3 rounded-0' onMouseEnter={()=>showChildSection('parent-'+subGrandChild._id)} onMouseLeave={()=>hideCildSection('parent-'+subGrandChild._id)}>
                                        {subGrandChild.name}
                                        {
                                        subGrandChild.subCategories.length > 0 ?
                                        <>
                                        <DropDownSubChildNav category={subGrandChild} categories={props.categories}/>
                                        </>
                                        :
                                        null
                                    }
                                    </div>
                                    :
                                    <div className='list-group-item list-group-item-action p-3 rounded-0'>
                                    {subGrandChild.name}
                                    
                                    </div>
                                    
                                
                                :null
                                )
                            }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
  }

export default DropDownSubChildNav