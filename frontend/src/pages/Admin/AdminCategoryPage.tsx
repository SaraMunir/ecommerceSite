import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../Store'
import { useCreateCategoryMutation, useGetCategoriesByStoreIdQuery } from '../../hooks/categoryHooks'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'
import { Category } from '../../types/Category'
import { connect } from 'http2'

function AdminCategoryPage() {
const [selectedCategory, setSelectedCategory] = useState<any>({})
const {state:{ storeInfo}, dispatch } = useContext(Store)
const [allCatColumns, setAllCatColumns] = useState<any>([])
const [categoryList, setCategoryList] = useState<any>([])

const [inputNewCatValue, setInputNewCatValue] = useState<any>({
    parentId:'', catColIdx: '', inputVal:''
})
const { data: categories, isLoading, error, refetch } =useGetCategoriesByStoreIdQuery(storeInfo?.storeId!)
const { mutateAsync: createCategory } = useCreateCategoryMutation()

    useEffect(()=>{
        // console.log("exceptionError: ", exceptionError)
        if(categories){
            setCategoryList(categories)
            // console.log('caterios qty', categories.length)
            let categoryListTemp: any[] =[]
            if (Array.isArray(categories) && categories.length > 0) {
                categories.forEach(element => {
                    if(!element.parentId){
                        let objele= element
                        objele.selected = false
                        categoryListTemp.push(objele)
                    }
                });
            }
            console.log("categoryListTemp", categoryListTemp)
            console.log("categories", categories)
            let colList = []
            let firstColObj = {
                colName:'list of all cols',
                colId:0,
                catList : categoryListTemp
            }
            colList.push(firstColObj)
            setAllCatColumns(colList)
        }

    }, [categories, categoryList])

const selectCategory =(id:string, idx:number, catColIdx:number)=>{

    if(categoryList){
        if(id != selectedCategory._id){
            if(catColIdx == 0){
                let selectCat:any = {}
                let categoryListTemp: any[] =[]

                categoryList.forEach((element: { _id?: any }) => {
                    if(!element.parentId){
                        let object= element
                        if(element._id == id){
                            object.selected = true
                            // element.selected=true
                            selectCat = element
                            setSelectedCategory(object)
                        }else{
                            object.selected = false
                            // element.selected=false
                        }
                        categoryListTemp.push(object)

                    }
                });
                let subCategoryCol: any={
                    colName:selectCat.name,
                    colId:selectCat._id,
                    catList:[]
                }
                let newArr=[...allCatColumns]
                if(selectCat.subCategories && selectCat.subCategories.length>0){
                    if(catColIdx == 0){

                        let colList = []
                        let firstColObj = {
                            colName:'list of all cols',
                            colId:0,
                            catList : categoryListTemp
                        }

                        colList.push(firstColObj)
                        newArr=[...colList]
                    }
                    selectCat.subCategories.forEach((subCat: string) => {
                        const test = categoryList.filter((filterid: { _id: string })=> subCat == filterid._id )
                        subCategoryCol.catList.push(test[0])
                    });
                }else{
                    let colList = []
                        let firstColObj = {
                            colName:'list of all cols',
                            colId:0,
                            catList : categoryListTemp
                        }
                    colList.push(firstColObj)
                    let nextColumn = {
                        colName:selectCat.name,
                        colId:id,
                        catList : []
                    }
                    colList.push(nextColumn)
                    setAllCatColumns(colList)
                    console.log('colList',colList)
                }
                console.log('arrayOfSubs', subCategoryCol)
                if(subCategoryCol.catList.length>0){
                    newArr.push(subCategoryCol)
                    console.log("newArr", newArr)
                    setAllCatColumns(newArr)
                }
            }else{
                // doing the following steps. copying the subcat list and editing the selected value changes the original value as well. so in order to avoid that we make a shallow copy of edit the new list which will not affect the original list. 
                let selectedColumn=allCatColumns[catColIdx]
                console.log('selected column', selectedColumn)
                // making a shallow copy of the selected column list
                let newTestArr=Object.assign({},allCatColumns[catColIdx])
                // making a shallow copy of the selected column list to edit the list
                let newSecondaryarr: any[]=[]
                // console.log('check if there is another column after', allCatColumns[catColIdx+1])
                // if(allCatColumns[catColIdx+1]){
                //     console.log('how many:', allCatColumns.length)
                //     console.log('which index??:', catColIdx)
                //     let newColList = allCatColumns.splice(allCatColumns.length-catColIdx)
                //     console.log("newColList", newColList)
                // }else{

                // }

                let nextSubCategoryCol: any={
                    colName:'',
                    colId:"",
                    catList:[]
                }
                newTestArr.catList.forEach((element: any) => {
                    let newObj = Object.assign({},element)
                    newObj.selected=true
                    if(newObj._id == id){
                        newObj.selected =true
                        nextSubCategoryCol.colName=newObj.name
                        nextSubCategoryCol.colId=newObj._id
                        if(newObj.subCategories && newObj.subCategories.length>0){
                            newObj.subCategories.forEach((subCat: string) => {
                                const test = categoryList.filter((filterid: { _id: string })=> subCat == filterid._id )
                                nextSubCategoryCol.catList.push(test[0])
                            });
                        }
                        console.log("nextSubCategoryCol", nextSubCategoryCol)

                        newSecondaryarr.push(newObj)
                        // newSecondaryarr.push(nextSubCategoryCol)
                        setSelectedCategory(newObj)
                    }else{
                        newObj.selected =false
                        newSecondaryarr.push(newObj)
                    }
                });
                // console.log('newSecondaryarr', newSecondaryarr)
                // console.log('newTestArr', newTestArr)
                newTestArr.catList=newSecondaryarr
                let newCatColList = []

                // seperating the list from the selected edited list. 
                allCatColumns.forEach((element, eleIdx) => {
                    if( eleIdx < catColIdx){
                        newCatColList.push(element)
                    }
                });
                // adding the selected edited list 
                newCatColList.push(newTestArr)
                newCatColList.push(nextSubCategoryCol)
                if(nextSubCategoryCol.catList.length>0){
                    // newCatColList.push(nextSubCategoryCol)

                }
                setAllCatColumns(newCatColList)
            }
            // if(categories[idx].subCategories){
            //     categories[idx].subCategories.forEach(subCat => {
            //         let subCatId = subCat 
            //         const test = categories.filter((filterid)=> subCat == filterid._id )
            //         console.log('test:', test)
            //         arrayOfSubs.push(test[0])
            //     });
            // }
        }
    }
}
const addNewCat=async()=>{
    let newCategory={
        description:'', 
        name: inputNewCatValue.inputVal, 
        parentCategories:[inputNewCatValue.parentId],
        status:true,
        storeId: storeInfo?.storeId!,
        subCategories:[],
        parentId: inputNewCatValue.parentId
    }
    console.log('inputNewCatValue', inputNewCatValue)
    console.log('inputNewCatValue', inputNewCatValue)

    // return
    try {
        const data = await createCategory({
            description:'', 
            name: inputNewCatValue.inputVal, 
            parentCategories:[inputNewCatValue.parentId],
            status:true,
            storeId: storeInfo?.storeId!,
            subCategories:[],
            parentId: inputNewCatValue.parentId
        })
        if(data.status=='success'){
            console.log('data;', data)
            refetch()
            setInputNewCatValue({
                parentId:'', catColIdx: '', inputVal:''
            })
        }
    } catch (error) {
        console.log('error in catch', error)
        // toast.error(getError(error as ApiError))
    }
    // allCatColumns[inputNewCatValue.catColIdx]
    // allCatColumns.forEach(element => {
    //     if(element.id == inputNewCatValue.parentId){
    //         element.subCategories
    //     }
    // });

}
    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ) :
    (
        <div>
            <h1>Admin Category Page</h1>
            <h4>selected category: , {selectedCategory.name}{selectedCategory._id}</h4>
            <div className="d-flex overflow-x-auto w-100">
                {
                    allCatColumns?
                    allCatColumns.map((catCol: any, catColIdx:number)=>
                        <div className='card col-3 p-4' key={'catCol-'+catColIdx}>
                            <div className="list-group">
                                <h6>

                            {catCol.colName} 
                                </h6>
                            <span style={{fontSize:'12px'}}>

                            {catCol.colId} // number of cats :{catCol.catList.length }
                            </span>
                            <div className='overflow-auto' style={{"maxHeight": "65vh"}}>

                                {
                                catCol.catList.length > 0 ?
                                catCol.catList.map((cat: Category, catIdx: number)=>
                                    <div key={'category'+ cat._id} className={cat.selected ? "list-group-item list-group-item-action position-relative active" :"list-group-item list-group-item-action position-relative"} aria-current="true" onClick={()=>selectCategory(cat._id, catIdx, catColIdx)}>{cat.name} <br />
                                    <span style={{fontSize:'12px'}}> {cat._id}</span>
                                    {cat.subCategories.length>0?<span className="badge text-bg-primary position-absolute top-0 end-0 m-2">{cat.subCategories.length}</span>:null}
                                    
                                    </div>
                                )
                                : null
                                }
                            </div>
                            {
                                inputNewCatValue.inputVal ?
                            <div>
                                input vals: 
                                parentId: {inputNewCatValue.parentId} <br />
                                catColIdx: {inputNewCatValue.catColIdx} <br />
                                inputVal: {inputNewCatValue.inputVal} <br />
                            </div>
                            :null
                            }
                            <div className="input-group my-3">
                                <input type="text" className="form-control" placeholder="Add New" aria-label="Add New" aria-describedby="button-addon2" onChange={(e)=>setInputNewCatValue({
                                    parentId: catCol.colId > 0 ?catCol.colId : '' , catColIdx: catColIdx, inputVal:e.target.value
                                    })}/>
                                    {!inputNewCatValue.inputVal ? 
                                    
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" disabled >Add</button>
                                    : 
                                    <button className="btn btn-primary" type="button" id="button-addon2"  onClick={()=>addNewCat()}>Add</button>
                                    }
                            </div>
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