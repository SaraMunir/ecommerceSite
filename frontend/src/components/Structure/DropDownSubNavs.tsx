// import React from 'react'
import {  useGetSubCategoriesQuery } from '../../hooks/categoryHooks';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils';
import { Category, SubCategory } from '../../types/Category';
import { useNavigate } from 'react-router-dom';

function DropDownSubNavs({category}:{category: Category}) {
    const { data: subCategories, isLoading, error} = useGetSubCategoriesQuery()

    let navigate  = useNavigate();

    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ) :
    (
        <div className='position-absolute top-0 start-100 ms-3 hover-menu '>
            <div className="list-group bg-white border" style={{minWidth:"11rem"}}>
            {subCategories!.map((subCat:SubCategory)=>
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
            )}
            </div>
        </div>
    )
}

export default DropDownSubNavs