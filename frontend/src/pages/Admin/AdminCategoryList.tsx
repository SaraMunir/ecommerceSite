import { Fragment, useContext, useEffect, useState } from 'react'
import { Store } from '../../Store'
import { useCreateNewCategoryMutation, useCreateNewSubCategoryMutation, useEditCategoryMutation, useGetNewCategoriesByStoreIdQuery, updateRemoveSubCategory, deleteCategory } from '../../hooks/categoryHooks'
import { OverlayTrigger, Tooltip, Modal, Button  } from 'react-bootstrap';
import LoadingBox from '../../components/LoadingBox';
// import { title } from 'process';


function AdminCategoryList() {
    const [categoryList, setCategoryList] = useState<any>([])
    const [newCategoryAdded, setNewCategoryAdded] = useState<boolean>(false)
    const [newlyAddedCategory, setNewlyAddedCategory] = useState<any>({})
    const {state:{ storeInfo} } = useContext(Store)
    const { data: categories, refetch }=useGetNewCategoriesByStoreIdQuery(storeInfo?.storeId!)
    const { mutateAsync: createNewCategory } = useCreateNewCategoryMutation()
    const { mutateAsync: createNewSubCategory } = useCreateNewSubCategoryMutation()
    const [ showAddCategoryForm, setShowAddCategoryForm ] = useState<boolean>(false)
    const [ editSelectedCategory, setEditSelectedCategory ] = useState<boolean>(false)
    const [ selectedCategory, setSelectedCategory ] = useState<any>(null)
    const { mutateAsync: deleteSelectedCat } = deleteCategory(selectedCategory?._id)
    const [ removeSubCat, setRemoveSubCat ] = useState<any>({
        parentId: '',
        subCatId: '',
    })
    
    const { mutateAsync: removeSubCategory } = updateRemoveSubCategory(removeSubCat?.parentId, removeSubCat?.subCatId)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [modalMessage, setModalMessage] = useState<any>({
        message: '', 
        title: '',
        buttonText: 'Confirm',
        method: () => {}
    })
    // const handleShow = () => setShow(true);
    const deleteSubCategory = (childCatId: string, parentCatId: string) => {
        const nameOfChildCat = categoryList.find((cat: any) => cat._id === childCatId)?.name
        const nameOfParent = categoryList.find((cat: any) => cat._id === parentCatId)?.name
        setRemoveSubCat({
            parentId: parentCatId,
            subCatId: childCatId
        })
        setModalMessage({
            message: `<div class="alert alert-danger">Are you sure you want to remove the subcategory <b>"${nameOfChildCat}"</b> from <b>"${nameOfParent}"</b>? This action cannot be undone.</div>`,
            title: 'Confirm Deletion',
            method: () => removeChildCatFromParent(childCatId, parentCatId)
        })
        setShow(true)
    };
    const [ testCatList, setTestCatList ] = useState([
        {
            _id: '1tc1',
            name: 'Test Category 1',
            description: 'This is a test category',
            status: 'active',
            subCategories: ["5tc5", "6tc6"],
            parentId: '',
            storeId: storeInfo?.storeId || '',
            isChildren: false,
            isParent: true,
            showChildCat: false
        },
        {
            _id: '2tc1',
            name: 'Test Category 2',
            description: 'This is another test category',
            status: 'active',
            subCategories: ["3tc3", "4tc4"],
            parentId: '',
            storeId: storeInfo?.storeId || '',
            isChildren: false,
            isParent: true,
            showChildCat: false
        },
        {
            _id: '3tc3',
            name: 'Test Category 3',
            description: 'This is yet another test category',
            status: 'active',
            subCategories: [],
            parentId: '2tc1',
            storeId: storeInfo?.storeId || '',
            isChildren: false,
            isParent: false,
            showChildCat: false

        },
        {
            _id: '4tc4',
            name: 'Test Category 4',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: [],
            parentId: '2tc1',
            storeId: storeInfo?.storeId || '',
            isChildren: true,
            isParent: false,
            showChildCat: false

        },
        {
            _id: '5tc5',
            name: 'Test Category 5',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: [],
            parentId: '1tc1',
            storeId: storeInfo?.storeId || '',
            isChildren: true,
            isParent: false,
            showChildCat: false

        },
        {
            _id: '6tc6',
            name: 'Test Category 6',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: ["7tc7"],
            parentId: '1tc1',
            storeId: storeInfo?.storeId || '',
            isChildren: true,
            isParent: true,
            showChildCat: false

        },
        {
            _id: '7tc7',
            name: 'Test Category 7',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: [],
            parentId: '6tc6',
            storeId: storeInfo?.storeId || '',
            isChildren: true,
            isParent: false,
            showChildCat: false

        },
        {
            _id: '8tc8',
            name: 'Test Category 8',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: ["9tc9","10tc10"],
            parentId: '',
            storeId: storeInfo?.storeId || '',
            isChildren: false,
            isParent: true,
            showChildCat: false

        },
        {
            _id: '9tc9',
            name: 'Test Category 9',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: [],
            parentId: '8tc8',
            storeId: storeInfo?.storeId || '',
            isChildren: true,
            isParent: false,
            showChildCat: false

        },
        {
            _id: '10tc10',
            name: 'Test Category 10',
            description: 'This is a test category with subcategories',
            status: 'active',
            subCategories: [],
            parentId: '8tc8',
            storeId: storeInfo?.storeId || '',
            isChildren: true,
            isParent: false,
            showChildCat: false

        }
    ])
    const [ newCategory, setNewCategory ] = useState({
        name: '',
        description: '',
        status: 'active',
        subCategories: [],
        parentId: '',
        storeId: storeInfo?.storeId || '',
        isChildren: false,
        isParent: false
    })
    const [ newSubCategory, setNewSubCategory ] = useState({
        name: '',
        description: '',
        status: 'active',
        subCategories: [],
        parentId: '',
        storeId: storeInfo?.storeId || '',
        isChildren: false,
        isParent: false
    })
    const [ updateCategory, setUpdateCategory ] = useState({
        _id: '',
        name: '',
        description: '',
        status: 'active',
        subCategories: [],
        parentId: '',
        storeId: storeInfo?.storeId || '',
        isChildren: false,
        isParent: false
    })
    const renderTooltip = (tipMessage:string) => (
        <Tooltip id="button-tooltip">{tipMessage}</Tooltip>
    );    
    const { mutateAsync: editSelectCategory } = useEditCategoryMutation(updateCategory?._id)

    function CategoryListTab({category, catList, testIdx}:{category: any, catList : any[], testIdx: number}){
        return(
        <li key={category._id} className="list-group-item d-flex flex-column justify-content-between align-items-start border-top p-0">
            <a href={`#${category._id}`} className={selectedCategory?._id === category._id ? 'w-100 d-flex justify-content-between align-items-center py-3 ps-3 pe-2 bg-primary text-light link-offset-2 link-underline link-underline-opacity-0' : 'w-100 d-flex justify-content-between align-items-center py-3 ps-3 pe-2 link-offset-2 link-underline link-underline-opacity-0'} data-bs-toggle="list" role="tab" aria-controls={category._id} onClick={()=>setSelectedCategory(category)} >
                <div className='text-capitalize'>
                {category.name} &nbsp; &nbsp; 
                    {
                        category.subCategories.length > 0 ?
                        <span className='badge text-bg-light rounded-pill'>{category.subCategories.length}</span>
                        : null
                    }
                </div> 
                {
                    category.subCategories.length > 0 ?
                    <button className={selectedCategory?._id === category._id ? 'btn btn-outline-light text-light' : 'btn btn-outline-secondary'} onClick={()=>showChildCat(category._id)}>
                        {
                            !category.showSub ?
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="transparent"></rect> <path d="M17 9.5L12 14.5L7 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            :
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="transparent"></rect> <path d="M7 14.5L12 9.5L17 14.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        }
                    </button>
                    : null
                }

            </a>
            {
                category.subCategories.length && category.showSub ?
                <ul className='list-group list-group-flush w-100 ps-4 showTransition. show'>
                    {
                        catList.map((cat, subIdx)=>
                            cat.parentId === category._id && cat.isChildren ?
                            <CategoryListTab category={cat} catList={catList} testIdx={subIdx} key={'child-' + subIdx} />
                            : null
                        )
                    }
                </ul>
                : null
            }
        </li>
        )
    }
    function SelectedCatComponent({ category, catIdx }: { category: any, catIdx: number }) {
        return (
            <div key={category._id} id={`list-${category._id}`} role="tabpanel" aria-labelledby={`list-${category._id}-list`}>
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                    <h4 className='my-auto text-capitalize'>{category.name} &nbsp;
                        <span className={category.status ==="active" ? 'badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill me-3' : 'badge bg-danger-subtle border border-danger-subtle text-danger -emphasis rounded-pill me-3'}>{category.status}</span></h4>
                    <button className="btn btn-primary" onClick={() => {
                        setEditSelectedCategory(!editSelectedCategory)
                        setUpdateCategory(selectedCategory)
                        }}>
                            <span>Edit</span>
                    </button>
                </div>
                <div>
                    <div className='mt-3'>
                        <span className='fw-bold'>Description: &nbsp;</span>{category.description}
                    </div>
                    <div className='mt-3'> 
                        <span className='fw-bold'>Status: &nbsp;</span>
                        {category.status}
                    </div>
                    <div className='mt-3'>
                        <div className='fw-bold my-2'>Subcategories:</div>
                        <ul className='list-group list-group-checkable d-grid gap-2 border-0'>
                        {
                            category.isParent ?
                            categoryList.map((subCategory:any, subIdx:number) => (
                                subCategory.parentId === category._id && subCategory.isChildren ?
                                <Fragment key={`sub-${subCategory._id}_list-${subIdx}`}>
                                    <li className="list-group-item rounded-3 py-3 d-flex justify-content-between align-items-center" key={subCategory._id}>
                                        <span className="text-capitalize">

                                            {subCategory.name} 
                                        </span>
                                            <div>
                                                {
                                                    subCategory.status === 'active' ?
                                                <span className='badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill me-3'>
                                                    {subCategory.status}
                                                </span>
                                                :
                                                <span className='badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill  me-3'>
                                                    {subCategory.status}
                                                </span>
                                                }
                                                <span>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip("Remove subcategory from list")}>
                                                        <Button data-bs-toggle="tooltip" data-bs-placement="top"
                                                            data-bs-custom-class="custom-tooltip"
                                                            data-bs-title="Remove subcategory from list" className='fs-6 p-2 btn btn-outline-danger btn-close'variant="primary" onClick={() => deleteSubCategory(subCategory._id, category._id)}>
                                                        </Button>
                                                    </OverlayTrigger>
                                                </span>
                                            </div>
                                    </li>
                                </Fragment>
                                : null
                            ))
                            :
                            <li className="list-group-item rounded-3 py-3">No Subcategories</li>
                        }

                        </ul>
                    </div>
                </div>

            </div>
        )
    }
    const showChildCat = (categoryId: any) => {
        console.log('showChildCat called with categoryId:', categoryId  )
        let catEditedArray: any[] =[]

        categoryList.forEach((element: { _id: any; showSub: boolean }) => {
            if (element._id === categoryId) {
                element.showSub = !element.showSub
                
            }
            catEditedArray.push(element)
        });
        setCategoryList(catEditedArray)

    }
    const handleEditCategory = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const data:any = await editSelectCategory({
                name: updateCategory.name,
                description: updateCategory.description,
                status: updateCategory.status,
                subCategories: updateCategory.subCategories,
                parentId: updateCategory.parentId,
                storeId: storeInfo?.storeId || '',
                isChildren: updateCategory.isChildren,
                isParent: updateCategory.isParent
            })
            console.log('data  received', data)
            if(data) {
                console.log('Category edited successfully:', data)
                // setNewCategoryAdded(true)
                refetch()
                setSelectedCategory(data)
                setUpdateCategory({
                    _id: '',
                    name: '',
                    description: '',
                    status: 'active',
                    subCategories: [],
                    parentId: '',
                    storeId: storeInfo?.storeId || '',
                    isChildren: false,
                    isParent: false
                })
            } else {
                console.error('Failed to create category')
            }
            setEditSelectedCategory(false)

        } catch (error) {
            console.error('Error creating category:', error)
        }
    }
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const data = await createNewCategory(newCategory)

            console.log('data  received', data)
            if(data) {
                console.log('Category created successfully:', data)
                setNewlyAddedCategory(data)
                setNewCategoryAdded(true)

                setSelectedCategory(data)
                setNewCategory({
                    name: '',
                    description: '',
                    status: 'active',
                    subCategories: [],
                    parentId: '',
                    storeId: storeInfo?.storeId || '',
                    isChildren: false,
                    isParent: false
                })
            } else {
                console.error('Failed to create category')
            }
            refetch()
            setShowAddCategoryForm(false)

        } catch (error) {
            console.error('Error creating category:', error)
        }
    }
    const handleAddSubCategory = async (parentId: string) => {
        if (!newSubCategory.name ) {
            console.error('Subcategory name is required')
            return
        }

        console.log('Adding subcategory with parentId:', parentId)  
        console.log('newSubCategory', newSubCategory)
        let newSubCategoryTemp = {
            ...newSubCategory,
            isChildren: true,
            parentId: parentId,
        }
        console.log('newSubCategoryTemp', newSubCategoryTemp)
        try {
            const data = await createNewSubCategory(newSubCategoryTemp)
            console.log('data ', data)
            if (data) {
                console.log('Subcategory created successfully:', data)
                // setNewlyAddedCategory(data)
                if(data && data.category) {
                    setNewlyAddedCategory(data.category)
                }
                setNewCategoryAdded(true)
                setSelectedCategory(data.parentCategory)

                setNewSubCategory({
                    name: '',
                    description: '',
                    status: 'active',
                    subCategories: [],
                    parentId: '',
                    storeId: storeInfo?.storeId || '',
                    isChildren: true,
                    isParent: false
                })
            } else {
                console.error('Failed to create subcategory')
            }
            refetch()

        } catch (error) {
            console.error('Error creating subcategory:', error)
        }
    }
    const handleDeleteSelectedCategory = (catId: string) => {
        console.log('handleDeleteSelectedCategory called with catId:', catId)
        const nameOfCat = selectedCategory?.name
        setModalMessage({
            message: `<div className="alert alert-danger">Are you sure you want to delete the category <b>"${nameOfCat}"</b>? This action cannot be undone.</div>`,
            title: 'Confirm Deletion',
            method: () => deleteSelectedCategory()
        })
        setShow(true)
    }
    const deleteSelectedCategory = async () => {
        console.log('deleteSelectedCategory called with catId:', selectedCategory?._id)
        setIsLoading(true)
        try {
            const data = await deleteSelectedCat()
            console.log('data received', data)
            if(data?.status === 'success') {
                console.log('Category deleted successfully:', data)
                // setNewlyAddedCategory({})
                // setNewCategoryAdded(false)
                setModalMessage({
                    message: '',
                    title: '',
                    buttonText: 'Confirm',
                    method: () => {}
                })
                setIsLoading(false)
                handleClose()
                setSelectedCategory(null)
                refetch()
            } else {
                setIsLoading(false)
                setModalMessage({
                    message: `<div class="alert alert-danger">there was an error deleting the category "${selectedCategory?.name}". Please try again later.</div>`,
                    title: 'Confirm Deletion',
                    buttonText: 'Confirm',
                    method: () => deleteSelectedCategory()
                })
                console.error('Failed to delete category')
            }
        } catch (error) {
            setModalMessage({
                message: `<div class="alert alert-danger">there was an error deleting the category "${selectedCategory?.name}". Please try again later.</div>`,
                title: 'Confirm Deletion',
                buttonText: 'Confirm',
                method: () => deleteSelectedCategory()
            })
            setIsLoading(false)
            console.error('Error deleting category:', error)
        }
    }
    const removeChildCatFromParent = async (catId: string, parentCatId: string) => {
        try {
            const data = await removeSubCategory()
            if(data?.status === 'success') {
                console.log('Subcategory removed successfully:', data)
                handleClose()
                setRemoveSubCat({
                    parentId: '',
                    subCatId: '',
                })
                setModalMessage({
                    message: '',
                    title: '',
                    buttonText: 'Confirm',
                    method: () => {}
                })
                refetch()
                // setSelectedCategory(data.parentCategory)
            } else {
                console.error('Failed to remove subcategory')
            }
        } catch (error) {
            console.error('Error removing subcategory:', error)
        }
        
    }
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rootCatNum, setRootCatNum] = useState<number>(0)
    // const [error, setError] = useState<any>(null)
    useEffect(() => {
        if (categories) {
            let catEditedArray: any[] =[]
            let rootCat = 0
            if(!selectedCategory) {
                if (Array.isArray(categories) && categories.length > 0) {
                    categories.forEach(element => {
                        element.showSub = false
                        if (!element.isChildren) {
                            rootCat += 1
                        }
                        catEditedArray.push(element)
                    })
                    setCategoryList(catEditedArray)
                    setSelectedCategory(catEditedArray[0])
                }
                setRootCatNum(rootCat)
            }else{
                if(Array.isArray(categories) && categories.length> 0) {
                    categories.forEach((element: any) => {
                        if(Array.isArray(categoryList) && categoryList.length > 0) {
                            categoryList.forEach((cat: any) => {
                                if(cat._id === element._id) {
                                    catEditedArray.push({...element, showSub: cat.showSub})
                                }
                            })
                        }
                        if(newCategoryAdded && newlyAddedCategory._id === element._id) {
                            catEditedArray.push({...element, showSub: false})
                            if(rootCatNum) {
                                if(!newlyAddedCategory.isChildren) {
                                    rootCat = rootCatNum + 1
                                    setRootCatNum(rootCat)
                                }
                            }
                        }
                    })
                    // console.log('catEditedArray', catEditedArray)
                    setCategoryList(catEditedArray)
                }
            }
            console.log(rootCat, 'rootCat')
        }
    }, [categories])
    return (
    <div>
            <h1>Admin Category List</h1>
            <div className='d-flex justify-content-between align-items-center'>
                <h3>Category List</h3>
                <div className="d-flex">
                <button className='btn btn-primary me-2' onClick={() => refetch()}>Refresh</button>
                <button className='btn btn-primary' onClick={() => setShowAddCategoryForm(true)}>Add Category</button>
                </div>
            </div>

            <div className="row p-2 position-relative">
                <hr />
                <div className='row'>
                    <div className="col-md-5 m-0 p-0">
                        <h4 className='pb-2 mb-0 text-capitalize'>Root Categories: {rootCatNum}</h4>
                        <div className="card position-sticky top-0" style={{height: '80vh'}}>
                            <div className="card-body">
                                <ul className='list-group overflow-auto' style={{"height": "70vh"}} >
                                    {
                                        Array.isArray(categoryList) && categoryList.length > 0 ?
                                        categoryList.map((category:any, idx:number) => (
                                            !category.isChildren ?
                                                <CategoryListTab category={category} catList={categoryList} key={idx} testIdx={idx}/> 
                                            : 
                                            null
                                        ))
                                    :
                                    <li className="list-group-item">No test categories found.</li>

                                    }
                                </ul>
                                <div className="d-flex justify-content-end mt-3">
                                    <button className='btn btn-primary' onClick={() => setShowAddCategoryForm(true)}>Add Category</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card" >
                            <div className="card-body">
                                {
                                    selectedCategory ? 
                                    editSelectedCategory ?
                                        <div>
                                            <form className='mt-3' onSubmit={(e) => { e.preventDefault(); handleEditCategory(e); }}>
                                                <div className='mb-3'>
                                                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                                                    <input type="text" className="form-control" id="categoryName" value={updateCategory.name} onChange={(e) => setUpdateCategory({ ...updateCategory, name: e.target.value })} />
                                                </div>
                                                <div className='mb-3'>
                                                    <label htmlFor="categoryDescription" className="form-label">Description</label>
                                                    <textarea className="form-control" id="categoryDescription" rows={3} value={updateCategory.description} onChange={(e) => setUpdateCategory({ ...updateCategory, description: e.target.value })}></textarea>
                                                </div>
                                                <div className='mb-3'>
                                                    <label htmlFor="categoryStatus" className="form-label">Status</label>
                                                    <select className="form-select" id="categoryStatus" value={updateCategory.status} onChange={(e) => setUpdateCategory({ ...updateCategory, status: e.target.value })}>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Update Category</button>
                                                <button className='ms-3 btn btn-danger text-light me-3' onClick={() => handleDeleteSelectedCategory(selectedCategory?._id)}>Delete</button>
                                                <button className="btn btn-primary" onClick={() => {
                                                    setEditSelectedCategory(!editSelectedCategory)
                                                    setUpdateCategory({
                                                        _id: '',
                                                        name: '',
                                                        description: '',
                                                        status: 'active',
                                                        subCategories: [],
                                                        parentId: '',
                                                        storeId: storeInfo?.storeId || '',
                                                        isChildren: false,
                                                        isParent: false
                                                    })
                                                }}><span>Cancel</span></button>
                                            </form>
                                        </div>
                                        :
                                    <Fragment>
                                        <SelectedCatComponent category={selectedCategory} catIdx={1} key={selectedCategory?._id} />
                                        <div className='py-1'>
                                            <input type="text"  className='form-control list-group-item rounded-3 py-3 border border-1 px-3' placeholder='Add Subcategory' value={newSubCategory.name} onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}/>
                                            <div className='d-flex justify-content-end align-items-center my-2'>
                                                {
                                                newSubCategory.name ?
                                                <button type="submit" className="btn btn-primary " onClick={(e) => { e.preventDefault(); handleAddSubCategory(selectedCategory?._id); }} 
                                                >Add Subcategory</button>
                                                :
                                                <button type="submit" className="btn btn-primary" disabled>Add Subcategory</button>
                                                }
                                            </div>
                                        </div>

                                    </Fragment>
                                    : 
                                    <div className='text-center'>
                                        <h5 className="card-title">Category Details</h5>
                                    <p className="card-text">Select a category to see its details.</p>
                                    </div>  
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showAddCategoryForm ?
                    <div className='card position-absolute top-0 start-0 end-0 bottom-0 z-3' >
                        <div className='card-body'>
                            <div className="d-flex justify-content-end">
                                <button className="btn-close" onClick={() => setShowAddCategoryForm(false)}></button>
                            </div>
                            <h5 className='card-title'>Add New Category</h5>
                            <p className='card-text'>Fill in the details below to add a new category.</p>
                            <form action="" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="categoryName" value={newCategory.name} onChange={(e)=> setNewCategory({...newCategory, name: e.target.value})}  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoryDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="categoryDescription" value={newCategory.description} onChange={(e)=> setNewCategory({...newCategory, description: e.target.value})}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoryStatus" className="form-label">Status</label>
                                    <select className="form-select" id="categoryStatus" value={newCategory.status}  onChange={(e)=> setNewCategory({...newCategory, status: e.target.value})}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                {
                                newCategory.name  ?
                                <button type="submit" className="btn btn-primary">Add Category</button>:

                                <button type="submit" className="btn btn-primary" disabled>Add Category</button>
                                }
                                <button type="button" className="ms-2 btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    setNewCategory({
                                        name: '',
                                        description: '',
                                        status: 'active',
                                        subCategories: [],
                                        parentId: '',
                                    storeId: storeInfo?.storeId || '',
                                    isChildren: false,
                                    isParent: false
                                });
                                setShowAddCategoryForm(false)}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                    : null
                }
                

            </div>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMessage.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='position-relative' dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                {
                    isLoading ?
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center opacity-75 bg-secondary-subtle'>
                        <LoadingBox /> 
                    </div>
                    :
                    null
                }
                <Modal.Footer>
                    <Button variant="danger" className='text-light' onClick={modalMessage.method}>
                        {modalMessage.buttonText || 'Confirm'}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

    </div>
    )
}

export default AdminCategoryList