import React, { Fragment, use, useCallback, useEffect, useState, useContext } from 'react'
import { NewProduct, NewProductVariant } from '../../../types/NewProduct';
import AdminVariants from './AdminVariants';
import { useAddImageToNewProductMutation, useCreateNewProductMutation } from '../../../hooks/newProductHooks';
// import { useGetCategoriesByStoreIdQuery } from '../hooks/categoryHooks'
// Update the import path to the correct location of your Store context/provider
import { Store } from '../../../Store'
import LoadingBox from '../../../components/LoadingBox';

function AdminProdForm(props: any) {
    const {state:{ storeInfo}, dispatch } = useContext(Store)
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({
        _id: '',
        storeId: storeInfo?.storeId || '',
        name: '',
        description: {
            short: '',
            long: ''
        },
        sku: '',
        slug: '',
        brand: '',
        vendor: '',
        barcode: '',
        type: 'physical',
        categories: [],
        collections: [],
        tags: [],
        media: {
            main_image: {
                url: '',
                imageId: ''
            },
            gallery: [],
            video: '',
            ar_model: '',
            alt_text: ''
        },
        pricing: {
            price: 0,
            currency: 'USD'
        },
        inventory: {
            track_inventory: false,
            stock_quantity: 0,
            allow_backorder: false,
            warehouse_location: ''
        },
        variants: [],
        shipping: {
            weight: 0,
            dimensions: {
                length: 0,
                width: 0,
                height: 0
            },
            free_shipping: false
        },
        seo: {
            title: '',
            description: '',
            keywords: []
        },
        publishing: {
            status: 'draft',
            visibility: 'public',
            publish_date: ''
        },
        variant_map:{
            isVariant: false,
            variantOptions: [],
            groupedVariantOptions: [],
            newVariantList: [],
            fullVariantList: [],
        }
    });
    const [inventory, setInventory] = useState({
        track_inventory: false,
        stock_quantity: 0,
        allow_backorder: false,
        warehouse_location: ''
    });
    const [shipping, setShipping] = useState({
        weight: 0,
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        free_shipping: false,
        shipping_class: '',
        fulfillment_method: 'manual'
    });

    const { mutateAsync: uploadImage } = useAddImageToNewProductMutation();
    // const [createNewProductMutation] = useCreateNewProductMutation();
    const { mutateAsync: createNewProductMutation } = useCreateNewProductMutation()
    const [ name, setName ] = useState('');
    const [ slug, setSlug ] = useState('');
    const [ sku, setSku ] = useState('');
    const [ type, setType ] = useState<"physical" | "digital" | "service">('physical');
    const [ brand, setBrand ] = useState('');
    const [ barcode, setBarcode ] = useState('');
    const [ vendor, setVendor ] = useState('');
    const [ media, setMedia ] = useState({
        main_image: {
            url: '',
            imageId: ''
        },
        gallery: [],
        video: '',
        ar_model: '',
        alt_text: ''
    });
    const [ pricing, setPricing ] = useState({
        price: 0,
        currency: 'USD',
        sale_price: 0,
        compare_at_price: 0,
        cost_per_item: 0,
        taxable: true
    });
    const [ description, setDescription ] = useState({
        short: '',
        long: ''
    });
    const [ mainImage, setMainImage ] = useState<File | null>(null)
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setMainImage(files && files[0] ? files[0] : null);
        }
    };
    const [ gallery, setGallery ] = useState<File[]>([]);
    const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        let galleryFiles: File[] = [];
        if (files && files.length > 0) {
            // const fileArray = Array.from(files);
            if (files && files.length > 0) {
                if (files && files[0]) {
                    galleryFiles.push(files[0]);
                    setGallery([...gallery, ...files[0] ? [files[0]] : []]);
                }
        }
        }
    };
    const handleRemoveImage = (index: number) => {
        setGallery(gallery.filter((_, i) => i !== index));
    };
    const [ variantOptionsList, setVariantOptionsList] = useState<{ optionName: string; optionValues: any }[]>([]);
    const [ rawVariantList, setRawVarList ] = useState<{}[]>([]);
    const [ variantGroupBy, setVariantGroupBy ] = useState<string>('');
    const handleChange = useCallback((nextValue: { groupBy: React.SetStateAction<string>; newVariantList: React.SetStateAction<{}[]>; }) => {
        console.log('handleChange called with nextValue:', nextValue);
        setVariantGroupBy(nextValue.groupBy);
        setRawVarList(nextValue.newVariantList);

    }, []);
    const handleVarOptList = useCallback((varOptList: React.SetStateAction<{ optionName: string; optionValues: any; }[]>) => {
        console.log('handleVarOptList called with varOptList:', varOptList);
        setVariantOptionsList(varOptList);
    }, []);

    useEffect(() => {
        console.log('Product props:', props.product);
        
        if (props.product && Object.keys(props.product).length > 0) {
            setProduct(props.product);

            setName(props.product.name || '');
            setSlug(props.product.slug || '');
            setPricing({
                price: props.product.pricing.price || 0,
                currency: props.product.pricing.currency || 'USD',
                sale_price: props.product.pricing.sale_price || 0,
                compare_at_price: props.product.pricing.compare_at_price || 0,
                cost_per_item: props.product.pricing.cost_per_item || 0,
                taxable: props.product.pricing.taxable || true
            });
            setDescription({
                short: props.product.description.short || '',
                long: props.product.description.long || ''
            });
            setSku(props.product.sku || '');
            setType(props.product.type || 'physical');  
            setBrand(props.product.brand || '');
            setVendor(props.product.vendor || '');
            setBarcode(props.product.barcode || '');
            setMedia({
                main_image: {
                    url: props.product.media.main_image.url || '',
                    imageId: props.product.media.main_image.imageId || ''
                },
                gallery: props.product.media.gallery || [],
                video: props.product.media.video || '',
                ar_model: props.product.media.ar_model || '',
                alt_text: props.product.media.alt_text || ''
            });
        }
    }, [props.product, variantOptionsList]);
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>, action: string) => {
        e.preventDefault();
        let variantOptionValues: any[] = []
        if(variantOptionsList && variantOptionsList.length > 0) {
            variantOptionsList.forEach(element => {
                let varOptObj = {
                    optionName: element.optionName,
                    optionValues: [] as any[]
                }
                if(element.optionValues && Array.isArray(element.optionValues)) {
                    element.optionValues.forEach((value: any) => {
                        varOptObj.optionValues.push(value.value ?? value);
                    });

                }
                variantOptionValues.push(varOptObj);
            });
        } else {
            variantOptionValues = [];
        }

        // Handle form submission logic here
        const productData: NewProduct = {
            name,
            slug,
            pricing,
            description,
            sku,
            type,
            brand,
            vendor,
            barcode,
            media,
            variantMap: {
                isVariant: variantOptionsList.length > 0,
                variants: rawVariantList.length > 0 ? rawVariantList : [],
                variantOptions: variantOptionValues,
                variantGroupBy: variantGroupBy,
            },
            _id: '',
            storeId: storeInfo?.storeId || '',
            categories: [],
            inventory: {
                track_inventory: false,
                stock_quantity: 0,
                allow_backorder: false,
                warehouse_location: ''
            }
        }
        console.log("variantOptionsList", variantOptionsList)
        console.log("action", action)
        if(props.action.action ==='add') {
            createNewProduct(productData, variantOptionValues);
        }else{
            updateProduct(productData);
        }

    }
    const createNewProduct = async (productData: NewProduct, variantOptionValues: any[]) => {
        console.log("Creating new product with data:", productData);
        if(props.action.action === 'add') {
            // new product must have atleast name to be created
            if(name){
                if((gallery && gallery.length > 0) || mainImage) {
                    // need to handle main image separately and gallery images separately
                    const formData = new FormData();

                    // ⬅️ Append main image
                    if( mainImage) {
                        formData.append('mainImage', mainImage as Blob);
                    }
                     // ⬅️ Append gallery images (as array
                    if (gallery && gallery.length > 0) {
                        gallery.forEach((img: Blob | File) => {
                        formData.append('gallery', img); // repeat key for array
                        });
                    }
                    // formData.append('file', gallery as unknown as Blob);
                    formData.append('productData', JSON.stringify(productData));
                    console.log("formData", formData);
                    try {
                            // ⬅️ Upload via image + product handler
                        const response = await uploadImage(formData);
                        if (response) {
                            console.log("Image uploaded successfully:", response);
                        }
                    } catch (error) {
                        console.error("Error uploading image:", error);
                    }
                    // const response = await uploadImage(formData);
                }else{
                    try {
                        const data:any = await createNewProductMutation(
                            {
                            name,
                            slug,
                            pricing,
                            description,
                            sku,
                            type,
                            brand,
                            vendor,
                            barcode,
                            media,
                            variantMap: {
                                isVariant: variantOptionsList.length > 0,
                                variants: rawVariantList.length > 0 ? rawVariantList : [],
                                variantOptions: variantOptionValues,
                                variantGroupBy: variantGroupBy,
                            },
                            _id: '',
                            storeId: storeInfo?.storeId || '',
                            categories: [],
                            inventory: {
                                track_inventory: false,
                                stock_quantity: 0,
                                allow_backorder: false,
                                warehouse_location: ''
                            }
                        }
                    )
                        console.log('Product created successfully:', data);
                    } catch (error) {
                        console.error('Error creating product:', error);
                    }
                }
            }
        }
    }
    const updateProduct = async (productData: NewProduct) => {
        console.log('Updating product with id:', product._id);
        console.log('original Product name:', product.name);
        console.log('name:', name);
        // compare the original product with the new product to see if there are any changes
        if (product.name !== name) {
            console.log('Product name has changed.');
        }

    }

return (
    <div>
        {
            isLoading ? <LoadingBox /> : null
        }
        <p>{product.name}</p>
        <form action="" onSubmit={(e) => handleSubmit(e, props.action)}>
            <h4>storeinfo </h4>
            <div className="row mx-auto">
                <div className="col-sm-5 mb-3">
                    <div className="card product-details-card">
                        <div className="card-header">
                            <h5>Basic Product Info</h5>
                        </div>
                        <div className="card-body">
                            {/* <p>Form to add or edit a product will go here</p> */}
                            {/* Add your form components here */}
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDescriptionShort" className="form-label">Short Description</label>
                                <input type="text" className="form-control" id="productDescriptionShort" placeholder="Enter short description" value={description.short} onChange={(e) => setDescription({...description, short: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDescriptionLong" className="form-label">Long Description</label>
                                <textarea className="form-control" id="productDescriptionLong" placeholder="Enter long description" value={description.long} onChange={(e) => setDescription({...description, long: e.target.value})}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productSlug" className="form-label">Slug</label>
                                <input type="text" className="form-control" id="productSlug" placeholder="Enter product slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productSKU" className="form-label">SKU</label>
                                <input type="text" className="form-control" id="productSKU" placeholder="Enter product SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="barCode" className="form-label">Bar code</label>
                                <input type="text" className="form-control" id="barCode" placeholder="Enter product bar code" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productType" className="form-label">Product Type</label>
                                <select name="productType" id="" className="form-control" value={type} onChange={(e) => setType(e.target.value as "physical" | "digital" | "service")}>
                                    <option value="physical">Physical</option>
                                    <option value="digital">Digital</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card product-pricing-card mt-3">
                        <div className="card-header">
                            <h5>Product Pricing</h5>
                        </div>
                        <div className="card-body row">
                            <div className="mb-3 col-6">
                                <label htmlFor="productPrice" className="form-label">Price</label>
                                <input type="number" className="form-control" id="productPrice" placeholder="Enter product price" value={pricing.price} onChange={(e) => setPricing({...pricing, price: Number(e.target.value)})} />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="productSalePrice" className="form-label">Sale Price</label>
                                <input type="number" className="form-control" id="productSalePrice" placeholder="Enter product sale price" value={pricing.sale_price} onChange={(e) => setPricing({...pricing, sale_price: Number(e.target.value)})} />
                            </div>
                            <div className="mb-3  col-6">
                                <label htmlFor="productCostPerItem" className="form-label">Cost Per Item</label>
                                <input type="number" className="form-control" id="productCostPerItem" placeholder="Enter product cost per item" value={pricing.cost_per_item} onChange={(e) => setPricing({...pricing, cost_per_item: Number(e.target.value)})} />
                            </div>
                            <div className="mb-3  col-6">
                                <label htmlFor="productCompareAtPrice" className="form-label">Compare At Price</label>
                                <input type="number" className="form-control" id="productCompareAtPrice" placeholder="Enter product compare at price" value={pricing.compare_at_price} onChange={(e) => setPricing({...pricing, compare_at_price: Number(e.target.value)})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productCurrency" className="form-label">Currency</label>
                                <input type="text" className="form-control" id="productCurrency" placeholder="Enter product currency" value={pricing.currency} onChange={(e) => setPricing({...pricing, currency: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productTaxable" className="form-label">Taxable</label>
                                <input type="checkbox" className="form-check-input" id="productTaxable" checked={pricing.taxable} onChange={(e) => setPricing({...pricing, taxable: e.target.checked})} />
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h5>Shipping Details</h5>
                        </div>
                        <div className="card-body">
                            {/* Add shipping details components here */}
                            <p>Shipping details section will go here</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-7 mb-3">
                    <div className="card">
                        <div className="card-header">
                            <h5>Product Media</h5>
                        </div>
                        <div className="card-body">
                            {/* Add media upload components here */}
                            <p>Media upload section will go here</p>
                            {/* <label htmlFor="productImages" className="form-label">Product Images</label> */}
                            <div className="row mx-auto">
                                <div className="mb-3 col-lg-5">
                                    <div>
                                        <h5>Main Image</h5>
                                        {
                                            mainImage ?
                                            <img className='w-100 t' src={URL.createObjectURL(mainImage)} alt="Selected" />
                                            : 
                                            media.main_image?.url ?
                                            <img className='w-100 t3' src={media.main_image?.url} alt="" />
                                            :
                                            <p>No main image selected</p>
                                        }
                                        <input type="file" className="form-control" id="productImages" multiple placeholder='upload main image' onChange={(e) => handleImageUpload(e)} />
                                    </div>
                                </div> 
                                <div className='col'>
                                    <h5>Gallery Images</h5>
                                    <div className="row m-auto">
                                        {
                                            gallery && gallery.length > 0 ?
                                            gallery.map((image, index) => (
                                                <div className="position-relative" style={{ width: "100px", height: "100px" }} key={index}>
                                                    <img className='h-100 object-fit-contain w-100 rounded-2' key={index} style={{ objectFit: 'contain', height: '100px', }} src={URL.createObjectURL(image)} alt="" />
                                                    <button className='btn btn-sm position-absolute top-0 end-5 bg-secondary' onClick={() => handleRemoveImage(index)}><i className="fa fa-times"></i></button>
                                                </div>
                                            ))
                                            : media.gallery && media.gallery.length > 0 ?
                                            media.gallery.map((image, index) => (
                                                <img className='h-100 object-fit-contain w-100 rounded-2' key={index} style={{ objectFit: 'contain', height: '100px', }} src={image} alt="" />
                                            ))
                                            : <p>No gallery images selected</p>
                                        }
                                        {/* width: 100px;height: 100px;display: flex;align-items: center;justify-content: center; */}
                                        <button className='btn btn-outline-primary mt-2 p-3 d-flex align-items-center justify-content-center' onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('productGallery')?.click();
                                        }} style={{ width: '80px', height: '80px' }}>
                                            <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                        </button>
                                    </div>
                                    <input  type="file" hidden className="form-control" id="productGallery" multiple placeholder='upload gallery images' onChange={(e) => handleGalleryUpload(e)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productAltText" className="form-label">Image Alt Text</label>
                                <input type="text" className="form-control" id="productAltText" placeholder="Enter image alt text" value={media.alt_text} onChange={(e) => setMedia({...media, alt_text: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productVideo" className="form-label">Video</label>
                                <input type="text" className="form-control" id="productVideo" placeholder="Enter video URL" value={media.video} onChange={(e) => setMedia({...media, video: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productArModel" className="form-label">AR Model</label>
                                <input type="text" className="form-control" id="productArModel" placeholder="Enter AR model URL" value={media.ar_model} onChange={(e) => setMedia({...media, ar_model: e.target.value})} />
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h5>Product Variants</h5>
                        </div>
                        <div className="card-body">
                            {/* Add variant management components here */}
                            <AdminVariants onssChange={handleChange} handleVarOptList={handleVarOptList}/>
                            <div className="bg-secondary">
                                
                            {
                                variantOptionsList && variantOptionsList.length > 0 ?
                                <div>
                                    <h6>Variant Options</h6>
                                    <ul>
                                        {variantOptionsList.map((option, index) => (
                                            <li key={index}>
                                                {option.optionName}: {option.optionValues.map(v => v.value).join(', ')}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                : <p>No variant options available</p>
                            }
                            {
                                rawVariantList && rawVariantList.length > 0 ?
                                <div>
                                    <h6>Raw Variant List</h6>
                                    <ul>
                                        {rawVariantList.map((variant, index) => (
                                            <li key={index}>
                                                {JSON.stringify(variant)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                : <p>No raw variant list available</p>
                            }
                            {
                                variantGroupBy &&
                                <div>
                                    <h6>Variant Group By</h6>
                                    <p>{variantGroupBy}</p>
                                </div>
                            }
                            </div>

                        </div>
                    </div>
                </div>
                    <div className="">
                    </div>
            </div>
            <div className="d-flex justify-content-end">
                {
                    props.action.action === 'add' ?
                    name ?
                        <button type="submit" className="btn btn-primary me-2">Add Product</button>
                        :
                        <button type="submit" className="btn btn-primary me-2" disabled>Add Product</button>
                    :
                    <button type="submit" className="btn btn-primary me-2">Update Product</button>
                }
                {/* {
                    name ?
                    <button type="submit" className="btn btn-primary me-2">Save Product</button>
                    : <button type="submit" className="btn btn-secondary me-2" disabled>Save Product</button>
                } */}
                {/* <button type="submit" className="btn btn-primary" >Save Product</button> */}
            </div>

        </form>
    </div>
    )
}

export default AdminProdForm