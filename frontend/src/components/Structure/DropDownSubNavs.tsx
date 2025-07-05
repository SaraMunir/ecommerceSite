// import React from 'react'

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { Category, SubCategory } from '../../types/Category';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
// import DropDownSubNavs from '../Structure/DropDownSubChildNav';
import DropDownSubChildNav from './DropDownSubChildNav';


function DropDownSubNavs(props: { category: { subCategories: any[];  }; categories: any}) {
    // const { data: subCategories, isLoading, error} = useGetSubCategoriesQuery()

    let navigate  = useNavigate();
    const showChildSection = (parentId:string)=>{
        console.log('parentId', parentId)
        document.getElementById(parentId).classList.remove("d-none")
    }
    const hideCildSection = (parentId:string)=>{
        document.getElementById(parentId).classList.add("d-none")
    }

    return (

        <div className='position-absolute top-0 start-100 ms-0 hover-menu '>
            <div className="list-group bg-white border ms-3" >
                {props.category.subCategories.map((sub: any)=>
                <>
                {
                    props.categories?
                    props.categories.map((subCat:  Category )=>
                        subCat._id == sub ?

                    
                    subCat.subCategories.length > 0 ? 

                    <div key={"sub"+subCat._id} className={subCat.subCategories.length > 0 ?'list-group-item list-group-item-action p-3 rounded-0 position-relative':'list-group-item list-group-item-action p-3 rounded-0'} onMouseEnter={()=>showChildSection('parent-'+subCat._id)}
                    onMouseLeave={()=>hideCildSection('parent-'+subCat._id)}
                    >
                        {subCat.name}
                        {
                            subCat.subCategories.length > 0 ?
                            <><DropDownSubChildNav category={subCat} categories={props.categories}/></>
                            :
                            null
                        }
                    </div>
                    :
                    <div key={"sub"+subCat._id} className={subCat.subCategories.length > 0 ?'list-group-item list-group-item-action p-3 rounded-0 position-relative':'list-group-item list-group-item-action p-3 rounded-0'}  onClick={(e)=>{
                        e.preventDefault()
                        navigate("/Category/"+ subCat.name + "/" + subCat._id)}}>
                        {subCat.name}
                    </div>




                        :null
                    )
                    :
                    <div>categories: {props.categories.length}</div>
                }
                </>
                
                    // <div>{sub}</div>
                    
                )}
            {/* {categories!.map((subCat:SubCategory)=>
            <>
                {
                    category.subCategories.map((subSubCat:string)=>
                        <>{
                            subSubCat == subCat._id ? 
                            <button key={"sub"+subCat._id} className='ist-group-item list-group-item-action p-3 rounded-0"' onClick={(e)=>{
                                e.preventDefault()
                                navigate("/Category/"+ subCat.name + "/" + subCat._id)}}>
                            {subCat.dispName}
                            </button> 
                            :
                            <></>
                        }</>
                    )
                }
            </>
            )} */}
            </div>
        </div>
    )
    
}

export default DropDownSubNavs