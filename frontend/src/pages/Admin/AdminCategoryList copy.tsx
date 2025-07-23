import { useContext, useEffect, useState } from 'react'
import { Store } from '../../Store'
import { useCreateNewCategoryMutation, useGetNewCategoriesByStoreIdQuery } from '../../hooks/categoryHooks'

function AdminCategoryList() {

    const [categoryList, setCategoryList] = useState<any>([])
    const {state:{ storeInfo}, dispatch } = useContext(Store)
    const { data: categories, isLoading, error, refetch }=useGetNewCategoriesByStoreIdQuery(storeInfo?.storeId!)
    const { mutateAsync: createNewCategory } = useCreateNewCategoryMutation()
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target
    //     // setFormData((prevData) => ({ ...prevData, [name]: value }))
    // }
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        status: 'active',
        subCategories: [],
        parentId: '',
        storeId: storeInfo?.storeId || ''
    })

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const data = await createNewCategory(newCategory)

            console.log('data ', data)
            if (data) {
                console.log('Category created successfully:', data)
                setNewCategory({
                    name: '',
                    description: '',
                    status: 'active',
                    subCategories: [],
                    parentId: '',
                    storeId: storeInfo?.storeId || ''
                })
            } else {
                console.error('Failed to create category')
            }
            refetch()
        } catch (error) {
            console.error('Error creating category:', error)
        }
    }
    useEffect(() => {
        if (categories) {
            setCategoryList(categories)
            let categoryListTemp: any[] = []
            if (Array.isArray(categories) && categories.length > 0) {
                categories.forEach(element => {
                    if (!element.parentId) {
                        let category = element
                        categoryListTemp.push(category)
                    }
                })
                setCategoryList(categoryListTemp)
            } else {
                setCategoryList([])
            }
        }
        return () => {
            setCategoryList([])
        }
    }, [categories])

    
    return (
    <div>
            <h1>Admin Category List</h1>
            <div className='d-flex justify-content-between align-items-center'>
                <h3>Category List</h3>
                <div className="d-flex">
                <button className='btn btn-primary' onClick={() => refetch()}>Refresh</button>
                <button className='btn btn-primary' onClick={() => refetch()}>Add Category</button>

                </div>
            </div>
            <div className="row">
                {/* <ul className="list-group list-group-flush">
                    {
                        categoryList.length > 0 ? 
                        categoryList.map((category:any, idx:number) => (
                            <li key={idx} className="list-group-item d-flex flex-column">
                                <span>{category.name}</span>
                                <span>{category.description}</span>
                                <span>{category.status}</span>
                                <span>Id: {category._id}</span>
                                {
                                    category.parentCategories && category.parentCategories.length > 0 ?
                                    <ul className="list-group list-group-flush">
                                        {
                                            category.parentCategories.map((parentCategory:any, index:number) => (
                                                parentCategory ?
                                                <li key={index} className="list-group-item d-flex flex-column">
                                                    <span>Id: {parentCategory.name}</span> 
                                                    parent length {category.parentCategories.length}
                                                </li>
                                                : null
                                            ))
                                        }
                                    </ul>
                                    : null
                                }

                            </li>
                        )) : 
                        <li>No categories found.</li>
                    }
                </ul> */}
                {/* {
                    categoryList.length > 0 ?
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        {
                            categoryList.map((category:any, idx:number) => (
                        <div className="accordion-item" key={idx}>
                            <h2 className="accordion-header">
                                <button className={idx === 0 ?"accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${idx}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${idx}`}>
                                    #{idx + 1} {category.name}
                                </button>
                            </h2>
                            <div className={ idx === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} id={`panelsStayOpen-collapse${idx}`} >
                                <div className="accordion-body">
                                    <strong>This is the first item’s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                            ))
                        }

                    </div>:
                    <h6>No categories found.</h6>
                } */}
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4 border-end" style={{minHeight: '40vh'}}>
                                <div className="list-group list-group-flush" id="list-tab" role="tablist">
                                    { categoryList.length > 0 ? 
                                        categoryList.map((category:any, idx:number) => (
                                            <a key={category._id} className={
                                                idx === 0 ? "list-group-item list-group-item-action active" :
                                                "list-group-item list-group-item-action"} id={`list-${category._id}-list`} data-bs-toggle="list" href={`#list-${category._id}`} role="tab" aria-controls={`list-${category._id}`}>{category.name}</a>
                                        ))
                                        :<div className="list-group-item">No categories found.</div>
                                    }
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="tab-content my-4" id="nav-tabContent">
                                    { categoryList.length > 0 ? 
                                        categoryList.map((category:any, idx:number) => (
                                            <div key={category._id} className={
                                                idx === 0 ? "tab-pane fade show active" :
                                                "tab-pane fade"} id={`list-${category._id}`} role="tabpanel" aria-labelledby={`list-${category.id}-list`}>
                                                    <h4>{category.name}</h4>
                                                    <hr />
                                                    {category.description && <p className="card-text">{category.description}</p>}
                                            </div>
                                        ))
                                        :
                                        <div className="tab-pane fade">No categories found.</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                {/* <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <strong>This is the first item’s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Accordion Item #2
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>

                </div> */}

            </div>

    </div>
    )
}

export default AdminCategoryList