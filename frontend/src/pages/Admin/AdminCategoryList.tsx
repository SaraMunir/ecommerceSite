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
                <h5>Category List</h5>
                <button className='btn btn-primary' onClick={() => refetch()}>Refresh</button>
            </div>
            <div className="row">
                <ul className="list-group list-group-flush">
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
                </ul>
                <div className='card'>
                    <div className='card-body'>
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
                        </form>
                    </div>
                </div>

            </div>

        {/* <div className="row">
            <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Home</a>
                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Profile</a>
                    <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Messages</a>
                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Settings</a>
                </div>
            </div>
            <div className="col-8">
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                </div>
            </div>
        </div> */}
    </div>
    )
}

export default AdminCategoryList