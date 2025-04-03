import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../Store'
import { useGetCategoriesByStoreIdQuery } from '../../hooks/categoryHooks'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'
import { Category } from '../../types/Category'

function AdminCategoryPage() {
const [selectedCategory, setSelectedCategory] = useState<any>({})
const {state:{ storeInfo}, dispatch } = useContext(Store)
const [allCatColumns, setAllCatColumns] = useState<any>([])
const [categoryList, setCategoryList] = useState<any>([])


const { data: categories, isLoading, error } =useGetCategoriesByStoreIdQuery(storeInfo?.storeId!)
    useEffect(()=>{
        // console.log("exceptionError: ", exceptionError)
        if(categories){
            setCategoryList(categories)
            // console.log('caterios qty', categories.length)
            let colList = []
            let firstColObj = {
                colName:'list of all cols',
                colId:0,
                catList : categories
            }
            colList.push(firstColObj)
            // firstColObj.catList
            setAllCatColumns(colList)
            console.log('colList',colList)
        }

    }, [categories, categoryList])

const selectCategory =(id:string, idx:number, catColIdx:number)=>{

    console.log('id:', id)
    console.log('idx:', idx)
    console.log("allCatColumns", allCatColumns)
    if(categoryList){
        if(categoryList.length>0)
        setSelectedCategory(categoryList[idx])
        let subCategoryCol: any={
            colName:categoryList[idx].name,
            colId:categoryList[idx]._id,
            catList:[]
        }
        console.log('selected category: ', categoryList[idx])
        if(categoryList[idx].subCategories && categoryList[idx].subCategories.length>0){
            categoryList[idx].subCategories.forEach((subCat: string) => {
                let subCatId = subCat 
                console.log('test:', subCat)
                const test = categoryList.filter((filterid: { _id: string })=> subCat == filterid._id )
                console.log('test:', test)
                subCategoryCol.catList.push(test[0])
            });
        }
        // if(categories[idx].subCategories){
        //     categories[idx].subCategories.forEach(subCat => {
                
        //         let subCatId = subCat 
                
        //         const test = categories.filter((filterid)=> subCat == filterid._id )
        //         console.log('test:', test)
        //         arrayOfSubs.push(test[0])
        //     });
        // }
        console.log('arrayOfSubs', subCategoryCol)
        if(subCategoryCol.catList.length>0){
            let newArr=[...allCatColumns]
            newArr.push(subCategoryCol)
            console.log("newArr", newArr)
            setAllCatColumns(newArr)
        }
    }
}

    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ) :
    (
        <div>
            <h1>Admin Category Page</h1>
            <div className='w-100 overflow-x-auto'>
                <div className='d-flex overflow-x-auto w-100' >
                    <div className="list-group" style={{minWidth:"400px"}}>
                        {
                            categories ?
                            categories.map((category:Category, idx:number)=>

                                category.parentCategories.length>0 ?
                                null
                            :
                            <button key={'catId'+category._id} className={selectedCategory._id == category._id ? "list-group-item list-group-item-action active" :"list-group-item list-group-item-action"} aria-current="true" onClick={()=>selectCategory(category._id, idx,0)}>
                                {category.name}
                            </button>
                            )
                            :null
                        }
                    </div>
                    <div className="list-group" style={{minWidth:"400px"}}>
                        <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                            The current link item
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                        <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                        <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                        <a className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
                    </div>
                    
    

                </div>

            </div>
            <div className="row">
                {
                    allCatColumns?
                    allCatColumns.map((catCol: any, catColIdx:number)=>

                        <div className='card col-4 p-4' key={'catCol-'+catColIdx}>
                            <div className="list-group">
                                category column no: {catColIdx}
                            {
                            catCol.catList.length > 0 ?
                            catCol.catList.map((cat: Category, catIdx: number)=>
                            <div   key={'category'+ cat._id} className={selectedCategory._id == cat._id ? "list-group-item list-group-item-action active" :"list-group-item list-group-item-action"} aria-current="true" onClick={()=>selectCategory(cat._id, catIdx, catColIdx)}>
                            {cat.name} </div>
                            )
                            : null
                            }
                            </div>
                        </div>

                    )
                        :null
                }
            </div>
            

        </div>
    )
}

export default AdminCategoryPage