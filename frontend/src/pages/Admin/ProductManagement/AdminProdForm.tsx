import React, { Fragment, use, useCallback, useEffect, useState, useContext, act } from 'react'
import { customAlphabet } from 'nanoid';
import { NewProduct, NewProductVariant } from '../../../types/NewProduct';
import AdminVariants from './AdminVariants';

import { deleteProductMutation, updateProductMutation, useAddImageToExistingProductMutation, useAddImageToNewProductMutation, useChangeMainImageProductMutation, useCreateNewProductMutation, useUploadGalleryImageToProd } from '../../../hooks/newProductHooks';
// Update the import path to the correct location of your Store context/provider
import { Store } from '../../../Store'
import LoadingBox from '../../../components/LoadingBox';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useGetNewCategoriesByStoreIdQuery, useCreateNewCategoryMutation } from '../../../hooks/categoryHooks';

function AdminProdForm(props: any) {
    const [isLoading, setIsLoading] = useState(false);
    const {state:{ storeInfo}, dispatch } = useContext(Store)
    const [show, setShow] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const handleClose = () =>{ 
        setShow(false)
        setLoadingMessage('Loading...');
        setIsLoading(false);
    };
    const handleMessageClose = () =>{ 
        setShowMessageModal(false)
        setIsLoading(false);
    };
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
    
    function generateUniqueShortId(prefix = 'PROD') {
        return `${prefix}-${nanoid()}`;
    }
    const [productId, setProductId] = useState<string>(props?.product?.product_id || generateUniqueShortId('PROD'));
    const [modalMessage, setModalMessage] = useState<any>({
        message: '', 
        title: '',
        buttonText: 'Confirm',
        method: () => {}
    })
    const handleShow = () => setShow(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const [product, setProduct] = useState({
        _id: props?.product?._id || '',
        storeId: storeInfo?.storeId || '',
        name: props?.product?.name || '',
        product_id: props?.product?.product_id || generateUniqueShortId('PROD'),
        description: {
            short: '',
            long: ''
        },
        sku: generateUniqueShortId('SKU'),
        slug: '',
        brand: '',
        vendor: '',
        barcode: '',
        type: 'physical',
        categoryList: [],
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
            publish_date: '',
            expire_policy: 'never',
            expire_at: ''
        },
        variant_map:{
            isVariant: false,
            variantOptions: [],
            groupedVariantOptions: [],
            newVariantList: [],
            fullVariantList: [],
        }
    });
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectedCategoryOptions, setSelectedCategoryOptions] = useState<{ value: string; label: string }[]>([]);
    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<string[]>(['tag1', 'tag2', 'tag3']);
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
    const { mutateAsync: updateProductDetail } = updateProductMutation();
    const { mutateAsync: uploadGalleryImageToProd } = useUploadGalleryImageToProd();
    const { mutateAsync: changeMainImageToProd } = useChangeMainImageProductMutation();
    const { mutateAsync: uploadImageToProd } = useAddImageToExistingProductMutation();
    const { mutateAsync: uploadImage } = useAddImageToNewProductMutation();
    const { mutateAsync: deleteProduct } = deleteProductMutation(product._id)
    const { mutateAsync: createNewProductMutation } = useCreateNewProductMutation()
    const { mutateAsync: createNewCategory } = useCreateNewCategoryMutation()
    
    const { data: categories, refetch }=useGetNewCategoriesByStoreIdQuery(storeInfo?.storeId!)
    const [allCategories, setAllCategories] = useState<any>(categories || []);
    const [ category, setCategory ] = useState<string>('');

    const [ name,   setName ] = useState('');
    const [ slug,   setSlug ] = useState('');
    const [ sku,    setSku ] = useState(generateUniqueShortId('SKU'));
    const [ type,   setType ] = useState<"physical" | "digital" | "service">('physical');
    const [ brand,  setBrand ] = useState('');
    const [ barcode,setBarcode ] = useState('');
    const [ vendor, setVendor ] = useState('');
    const [ updateMainImage, setUpdateMainImage ] = useState(false);
    const [ publishing, setPublishing ] = useState({
            status: 'draft',
            visibility: ['public'],
            publish_at: '',
            expire_policy: 'never',
            expire_at: ''
        });
    const [ media,  setMedia ] = useState<{
        main_image: { url: string; imageId: string };
        gallery: { url: string; imageId: string }[];
        video: string;
        ar_model: string;
        alt_text: string;
    }>({
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
    const handleRemoveImage = (index: number) => {
        setGallery(gallery.filter((_, i) => i !== index));
    };
    const [ variantOptionsList, setVariantOptionsList] = useState<{ optionName: string; optionValues: any }[]>([]);
    const [ productVarOptList, setProductVarOptList ] = useState<{ optionName: string; optionValues: any }[]>(props.varOptList && props.varOptList.length > 0 ? props.varOptList : []); 
    const [ rawVariantList, setRawVarList ] = useState<{}[]>([]);
    const [ variantGroupBy, setVariantGroupBy ] = useState<string>('');
    const handleChange = useCallback((nextValue: { groupBy: React.SetStateAction<string>; newVariantList: React.SetStateAction<{}[]>; }) => {
        setVariantGroupBy(nextValue.groupBy);
        setRawVarList(nextValue.newVariantList);
    }, []);
    const handleVarOptList = useCallback((varOptList: React.SetStateAction<{ optionName: string; optionValues: any; }[]>) => {
        setVariantOptionsList(varOptList);
    }, []);
    const handleNameAdd = (value: string) => {
        setName(value);
        setSlug(value.toLowerCase().replace(/ /g, '-'));
        // setSku(value.toLowerCase().replace(/ /g, '_'));
    };
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
        if(publishing.expire_policy === 'onDate' && publishing.expire_at && publishing.publish_at && new Date(publishing.expire_at) < new Date(publishing.publish_at)) {
            setModalMessage({
                message: `<div class="alert alert-danger">Expiration date cannot be earlier than publish date.</div>`,
                title: 'Error',
                buttonText: 'Close',
                method: () => {}
            });
            setShowMessageModal(true);
            return;
        }
        // Handle form submission logic here
        const productData: NewProduct = finalProductData(variantOptionValues);
        // const productData: NewProduct = {
        //     name,
        //     slug,
        //     pricing,
        //     description,
        //     sku,
        //     product_id: productId,
        //     type,
        //     brand,
        //     vendor,
        //     barcode,
        //     media,
        //     variantMap: {
        //         isVariant: variantOptionsList.length > 0,
        //         variants: rawVariantList.length > 0 ? rawVariantList : [],
        //         variantOptions: variantOptionValues,
        //         variantGroupBy: variantGroupBy,
        //     },
        //     _id: props.product._id || '',
        //     storeId: storeInfo?.storeId || '',
        //     categories,
        //     inventory, 
        //     shipping,
        //     publishing
        // }

        if(props.action.action ==='add') {
            createNewProduct(productData, variantOptionValues);
        }else{
            updateProduct(productData);
        }
    }
    const createNewProduct = async (productData: NewProduct, variantOptionValues: any[]) => {
        if(props.action.action === 'add') {
            // new product must have atleast name to be created
            if(name){
                if((gallery && gallery.length > 0) || mainImage) {
                    setIsLoading(true);
                    setShow(true);
                    setLoadingMessage('Uploading images and creating product. Please wait...');
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
                    formData.append('productData', JSON.stringify(productData));
                    console.log("formData", formData);
                    try {
                        // ⬅️ Upload via image + product handler
                        const response = await uploadImage(formData);
                        if (response) {
                            console.log("Image uploaded successfully:", response);
                            setLoadingMessage('Product created successfully!');
                            // ⬅️ Handle response and reset form
                            setTimeout(() => {
                                setIsLoading(false);
                                setShow(false);
                                setLoadingMessage('');
                                window.location.href = `/Admin/Store/${storeInfo?.storeId}/NewProducts/manageProduct/edit?prdId=${response.product._id}`;

                            }, 1000);
                        }
                    } catch (error) {
                        console.error("Error uploading image:", error);
                        if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object' && (error as any).response !== null && 'data' in (error as any).response) {
                            console.error("Error uploading image:", (error as any).response.data.message);
                            setLoadingMessage(`Error creating product. Please try again. Error: ${error instanceof Error ? (error as any).response.data.message : String((error as any).response.data.message)}`);
                        } else {
                            console.error("Error uploading image:", error);
                            setLoadingMessage(`Error creating product. Please try again. Error: ${error instanceof Error ? error.message : String(error)}`);
                        }
                        setIsLoading(false);
                    }
                    // const response = await uploadImage(formData);
                }else{
                    try {
                        setIsLoading(true);
                        setShow(true);
                        setLoadingMessage('Creating product. Please wait...');
                        const data:any = await createNewProductMutation(finalProductData(variantOptionValues));
                        // ⬅️ Handle response and reset form
                        setLoadingMessage(data.message || 'Product created successfully!');
                        setTimeout(() => {
                            setIsLoading(false);
                            setShow(false);
                            setLoadingMessage('');
                            // redirect to product list or details page
                            // /Admin/Store/1001/NewProducts/manageProduct/edit?prdId=687c2f37df77da435b13e925
                            window.location.href = `/Admin/Store/${storeInfo?.storeId}/NewProducts/manageProduct/edit?prdId=${data.product._id}`;
                        }, 1000);
                    } catch (error) {
                        console.error('Error creating product:', error);
                        setLoadingMessage(`Error creating product. Please try again. Error: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
            }
        }
    }
    const uploadMainImageToProd = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const files = event.target.files;
        if (files && files.length > 0) {
            setMainImage(files && files[0] ? files[0] : null);
        }
        let mainImg = files && files[0] ? files[0] : null;
        console.log('Selected main image:', mainImg);
        const formData = new FormData();
        
        formData.append('mainImg', mainImg as Blob);
        formData.append('storeId', JSON.stringify(storeInfo?.storeId));
        formData.append('prodId', JSON.stringify(product._id));
        try {
            // ⬅️ Upload via image + product handler
            const response = await uploadImageToProd(formData);
            if (response) {
                console.log("Main image uploaded successfully:", response);
                setMedia({
                    ...media,
                    main_image: {
                        url: response.mainImageUrl,
                        imageId: response.imageId
                    }
                });
                setModalMessage({
                    message: `<div class="alert alert-success">Image uploaded successfully.</div>`,
                    title: 'Success',
                    buttonText: 'Close',
                    method: () => {}
                });
                setShowMessageModal(true);
                setIsLoading(false);
                setTimeout(() => {
                    setShowMessageModal(false);
                    setModalMessage({
                        message: '', 
                        title: '',
                        buttonText: 'Confirm',
                        method: () => {}
                    });
                }, 1000);
            }
        } catch (error) {
            console.error('Error uploading main image:', error);
            setModalMessage({
                message: `<div class="alert alert-danger">Error uploading main image. Please try again.</div>`,
                title: 'Error',
                buttonText: 'Close',
                method: () => {}
            });
            setShowMessageModal(true);
            setIsLoading(false);
        }

    }
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
    const handleImgUploadToGallery = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleImgUploadToGallery called");
        setIsLoading(true);
        setModalMessage({
            message: `<div class="alert alert-info">Uploading Image.... Please wait.</div>`,
            title: 'Uploading Image',
            buttonText: 'Close',
            method: () => {}
        });
        setShowMessageModal(true);
        const files = event.target.files;
            let galleryImg = files && files[0] ? files[0] : null;
            if (files && files.length > 0) {
                // setMainImage(files && files[0] ? files[0] : null);
                galleryImg = files && files[0] ? files[0] : null;
                const formData = new FormData();
                formData.append('galleryImg', galleryImg as Blob);
                formData.append('storeId', JSON.stringify(storeInfo?.storeId));
                formData.append('prodId', JSON.stringify(product._id));
                try {
                    const response = await uploadGalleryImageToProd(formData);
                    if (response) {
                        console.log("gallery image uploaded successfully:", response);
                        setMedia({
                            ...media,
                                gallery: [
                                    ...media.gallery,
                                    {
                                        url: response.galleryImageUrl,
                                        imageId: response.imageId
                                    }
                                ]
                        });
                        setModalMessage({
                            message: `<div class="alert alert-success">Image uploaded successfully.</div>`,
                            title: 'Success',
                            buttonText: 'Close',
                            method: () => {}
                        });
                        setShowMessageModal(true);
                        setIsLoading(false);
                        props.refetch();
                        setTimeout(() => {
                            setShowMessageModal(false);
                            setModalMessage({
                                message: '', 
                                title: '',
                                buttonText: 'Confirm',
                                method: () => {}
                            });
                        }, 1000);
                    }
                } catch (error) {
                    console.error('Error uploading gallery image:', error);
                    setModalMessage({
                        message: `<div class="alert alert-danger">Error uploading gallery image. Please try again.</div>`,
                        title: 'Error',
                        buttonText: 'Close',
                        method: () => {}
                    });
                    setShowMessageModal(true);
                    setIsLoading(false);
                    return;
                }
                // setUpdateMainImage(true);
            }else{
                console.error('No files selected for upload.');
                setIsLoading(false);
                setShowMessageModal(false);
                return;
            }
    }
    const handleChangeMainImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setModalMessage({
            message: `<div class="alert alert-info">Uploading Image.... Please wait.</div>`,
            title: 'Uploading Image',
            buttonText: 'Close',
            method: () => {}
        });
        setShowMessageModal(true);
        const files = event.target.files;
        if (files && files.length > 0) {
            setMainImage(files && files[0] ? files[0] : null);
            // setUpdateMainImage(true);
        }
        let mainImg = files && files[0] ? files[0] : null;
        console.log('Selected main image:', mainImg);
        const formData = new FormData();
        formData.append('mainImg', mainImg as Blob);
        formData.append('oldMainImgId', JSON.stringify(product.media.main_image.imageId));
        formData.append('storeId', JSON.stringify(storeInfo?.storeId));
        formData.append('prodId', JSON.stringify(product._id));
        try {
            // ⬅️ Upload via image + product handler
            const response = await changeMainImageToProd(formData);
            if (response) {
                console.log("Main image uploaded successfully:", response);
                setMedia({
                    ...media,
                    main_image: {
                        url: response.mainImageUrl,
                        imageId: response.imageId
                    }
                });
                setModalMessage({
                    message: `<div class="alert alert-success">Image uploaded successfully.</div>`,
                    title: 'Success',
                    buttonText: 'Close',
                    method: () => {}
                });
                setShowMessageModal(true);
                setIsLoading(false);
                setTimeout(() => {
                    setShowMessageModal(false);
                    setModalMessage({
                        message: '', 
                        title: '',
                        buttonText: 'Confirm',
                        method: () => {}
                    });
                }, 2000);
            }
        } catch (error) {
            console.error('Error uploading main image:', error);
            setModalMessage({
                message: `<div class="alert alert-danger">Error uploading main image. Please try again.</div>`,
                title: 'Error',
                buttonText: 'Close',
                method: () => {}
            });
            setShowMessageModal(true);
            setIsLoading(false);
            
        }
    };
    const showUpdatedProduct = async () => {
        let variantOptionValues: any[] = []
        if(variantOptionsList && variantOptionsList.length > 0) {
            console.log("variantOptionsList", variantOptionsList);
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
        // console.log('variantOptionValues:', variantOptionValues);
        const updatedProductData: NewProduct = finalProductData(variantOptionValues);
        // const updatedProductData: NewProduct = {
        //     name,
        //     slug,
        //     product_id: productId,
        //     pricing,
        //     description,
        //     sku,
        //     type,
        //     brand,
        //     vendor,
        //     barcode,
        //     media,
        //     variantMap: {
        //         isVariant: variantOptionsList.length > 0,
        //         variants: rawVariantList.length > 0 ? rawVariantList : [],
        //         variantOptions: variantOptionValues,
        //         variantGroupBy: variantGroupBy,
        //     },
        //     _id: props?.product?._id || '',
        //     storeId: storeInfo?.storeId || '',
        //     categories,
        //     inventory,
        //     shipping,
        //     publishing,
        //     tags
        // }
        console.log('Updated product data:', updatedProductData);
    }
    const finalProductData = (variantOptionValues: any) => {
        return{
            name,
            slug,
            product_id: productId,
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
            _id: props?.product?._id || '',
            storeId: storeInfo?.storeId || '',
            categoryList,
            inventory,
            shipping,
            publishing,
            tags,
        }
    }
    const updateProduct = async (productData: NewProduct) => {
        setModalMessage({
            message: `<div class="alert alert-info">Updating product.... Please wait.</div>`,
            title: 'Updating Product',
            buttonText: 'Close',
            method: () => {}
        });
        setShowMessageModal(true);

        let variantOptionValues: any[] = []
        if(variantOptionsList && variantOptionsList.length > 0) {
            console.log("variantOptionsList", variantOptionsList);
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
        // console.log('variantOptionValues:', variantOptionValues);
        const updatedProductData: NewProduct = finalProductData(variantOptionValues);
        // const updatedProductData: NewProduct = {
        //     name,
        //     slug,
        //     product_id: productId,
        //     pricing,
        //     description,
        //     sku,
        //     type,
        //     brand,
        //     vendor,
        //     barcode,
        //     media,
        //     variantMap: {
        //         isVariant: variantOptionsList.length > 0,
        //         variants: rawVariantList.length > 0 ? rawVariantList : [],
        //         variantOptions: variantOptionValues,
        //         variantGroupBy: variantGroupBy,
        //     },
        //     _id: props?.product?._id || '',
        //     storeId: storeInfo?.storeId || '',
        //     categories,
        //     inventory,
        //     shipping,
        //     publishing,
        //     tags
        // }
        console.log('Updated product data:', updatedProductData);
        const formData = new FormData();
        // ⬅️ Append product data
        const jsonData = JSON.stringify(updatedProductData);

        if (!jsonData || jsonData === 'undefined') {
            throw new Error('Product data is invalid before sending');
        }
        formData.append('productData', jsonData);
        setIsLoading(true);
        try {
            const response = await updateProductDetail(formData);
            console.log('Product updated successfully:', response);
            setModalMessage({
                message: `<div class="alert alert-success">Product updated successfully.</div>`,
                title: 'Success',
                buttonText: 'Close',
                method: () => {}
            });
            setShowMessageModal(true);
            setTimeout(() => {
                setShowMessageModal(false);
                setModalMessage({
                    message: '', 
                    title: '',
                    buttonText: 'Confirm',
                    method: () => {}
                });
            }, 1000);
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating product:', error);
            setModalMessage({
                message: `<div class="alert alert-danger">Error updating product. Please try again.</div>`,
                title: 'Error',
                buttonText: 'Close',
                method: () => {}
            });
            setShowMessageModal(true);
            setIsLoading(false);
            return;
            
        }
    }
    const deleteProductById = (productId: string) => {
        console.log('Deleting product with id:', productId);
        // Implement the delete logic here
        // You can use a mutation or an API call to delete the product
        // After deletion, you can redirect or update the state accordingly
        setModalMessage({
            message: `<div class="alert alert-danger">Are you sure you want to remove the product <b>"${name}"</b>? This action cannot be undone.</div>`,
            title: 'Confirm Deletion',
            method: () => completeDeletion(productId)
        })
        setIsLoading(false);
        setShowMessageModal(true);
        console.log('Deleting product with id:', productId);
    }
    const completeDeletion = async (productId: string) => {
        console.log('Completing deletion for product with id:', productId);
        setIsLoading(true);
        try {
            const response = await deleteProduct();
            console.log('Product deleted successfully:', response);
            // setLoadingMessage('Product deleted successfully!');
            if (response && response.success) {
                setModalMessage({
                    message: `<div class="alert alert-danger">Product deleted successfully</div>`,
                    title: 'Product Deleted',
                    method: () => {}
                })
            }
            setTimeout(() => {
                setIsLoading(false);
                setModalMessage({
                    message: '', 
                    title: '',
                    buttonText: 'Confirm',
                    method: () => {}
                })
                setShowMessageModal(false);
                // Redirect to product list or another page
                window.location.href = `/Admin/Store/${storeInfo?.storeId}/NewProducts`;
            }, 1000);

        }catch (error) {
            console.error('Error deleting product:', error);
        }
    }
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
    const addNewCategory = async () => {
        console.log("Adding new category:", newCategory);
        if(!newCategory.name) {
            setModalMessage({
                message: `<div class="alert alert-danger">Category name is required.</div>`,
                title: 'Error',
                buttonText: 'Close',
                method: () => {}
            });
            setShowMessageModal(true);
            return;
        }
        const data = await createNewCategory(newCategory)
        console.log("New category created response:", data);
        console.log("New category ._id", data._id);
        if (data && data?._id) {
            // console.log("New category created:", data.);
            // console.log("New category id:", data.category._id);
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
            // refetch();
            // fetch categories again and set to allCategories state
            const categories = await refetch();
            console.log("Refetched categories:", categories);
            setAllCategories(categories.data || []);
            if(categories && categories.data) {
                setCategoryList([...categoryList, data._id]);
            }
            // setCategoryList([...categoryList, data.category._id]);

        }
    }
    useEffect(() => {
        if (props.product && Object.keys(props.product).length > 0) {
            setProduct(props.product);
            setProductId(props.product.product_id || generateUniqueShortId('PROD'));
            setCategoryList(props.product.categoryList || []);
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
                    url: props.product.media?.main_image?.url || '',
                    imageId: props.product.media?.main_image?.imageId || ''
                },
                gallery: props.product.media?.gallery || [],
                video: props.product.media?.video || '',
                ar_model: props.product.media?.ar_model || '',
                alt_text: props.product.media?.alt_text || ''
            });
            setInventory({
                track_inventory: props.product.inventory.track_inventory || false,
                stock_quantity: props.product.inventory.stock_quantity || 0,
                allow_backorder: props.product.inventory.allow_backorder || false,
                warehouse_location: props.product.inventory.warehouse_location || ''
            });
            setShipping({
                weight: props.product.shipping?.weight || 0,
                dimensions: {
                    length: props.product.shipping?.dimensions.length || 0,
                    width: props.product.shipping?.dimensions.width || 0,
                    height: props.product.shipping?.dimensions.height || 0
                },
                free_shipping: props.product.shipping?.free_shipping || false,
                shipping_class: props.product.shipping?.shipping_class || '',
                fulfillment_method: props.product.shipping?.fulfillment_method || 'manual'
            });
            setBrand(props.product.brand || '');
            setVendor(props.product.vendor || '');
            setProductVarOptList(props.product.variantMap?.variantOptions || []);
            setVariantGroupBy(props.product.variantMap?.variantGroupBy || '');
            setRawVarList(props.product.variantMap?.variants || []);
            setPublishing({
                status: props.product.publishing?.status || 'draft',
                visibility: props.product.publishing?.visibility || ['public'],
                publish_at: props.product.publishing?.publish_at || '',
                expire_policy: props.product.publishing?.expire_policy || 'never',
                expire_at: props.product.publishing?.expire_at || ''
            });

            // if(categories && categories.length > 0 && props.product.categoryList && props.product.categoryList.length > 0) {
            //     let selectedCategories = categories.filter(cat => props.product.categoryList.includes(cat._id));
            //     setSelectedCategoryOptions(selectedCategories.map(cat => ({ value: cat._id, label: cat.name })));
            // }
            setTags(props.product.tags || []);
        }
    }, [props.product]);
    useEffect(() => {
        if(Array.isArray(categories) && categories.length> 0) {
        console.log("categories", categories);
        // let selectedCategories = categories.filter(cat => props.product.categoryList && props.product.categoryList.includes(cat._id));
        // console.log("selectedCategories", selectedCategories);
        setAllCategories(categories)

    }
    }, [categories])
    
    // util function
    const toDatetimeLocal = (isoString: string | number | Date) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
    };

return (
    <Fragment>
        <div className="container position-relative m-0 p-0">
            <button className='btn btn-primary' onClick={() => showUpdatedProduct()}>show product update</button>
            <div className=''>
            </div>
            <p>{product.name}
                <br />
                {product.product_id}
            </p>
            <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e, props.action.action);
                }}>
                <h4>storeinfo </h4>
                <div className="d-flex justify-content-end align-items-center mb-3">
                    <label htmlFor="productStatus" className="form-label">Status</label>
                    <select className="badge bg-secondary mx-2 col-3 col-lg-2" id="productStatus" value={publishing.status} onChange={(e) => setPublishing({...publishing, status: e.target.value})}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                {
                    props.action.action === 'edit' && props.product?._id ?
                    <div className="d-flex justify-content-end align-items-center mb-3">
                        <a href={`/store/${storeInfo?.storeId}/product/${product.slug || ''}?productId=${product._id}`} target="_blank" rel="noopener noreferrer" className='btn btn-secondary col-3 col-md-2'>Preview <i className="bi bi-eye-fill"></i></a>
                    </div>
                    : 
                    null
                }
                <div className="row mx-auto">
                    <div className="col-sm-7 mb-3">
                        <div className="card product-details-card">
                            <div className="card-header">
                                <h5>Basic Product Info <small>( id: {props.product?._id} )</small></h5>
                            </div>
                            <div className="card-body">
                                {/* <p>Form to add or edit a product will go here</p> */}
                                {/* Add your form components here */}
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={name} onChange={(e) => handleNameAdd(e.target.value)} />
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
                                <div className="my-3 border-top pt-3  col-6">
                                    <label htmlFor="productCostPerItem" className="form-label">Cost Per Item</label>
                                    <input type="number" className="form-control" id="productCostPerItem" placeholder="Enter product cost per item" value={pricing.cost_per_item} onChange={(e) => setPricing({...pricing, cost_per_item: Number(e.target.value)})} />
                                </div>
                                <div className="my-3 border-top pt-3 col-6">
                                    <label htmlFor="productCompareAtPrice" className="form-label">Compare At Price</label>
                                    <input type="number" className="form-control" id="productCompareAtPrice" placeholder="Enter product compare at price" value={pricing.compare_at_price} onChange={(e) => setPricing({...pricing, compare_at_price: Number(e.target.value)})} />
                                </div>
                                <div className="my-3 border-top pt-3">
                                    <label htmlFor="productCurrency" className="form-label">Currency</label>
                                    <input type="text" className="form-control" id="productCurrency" placeholder="Enter product currency" value={pricing.currency} onChange={(e) => setPricing({...pricing, currency: e.target.value})} />
                                </div>
                                <div className="my-3 border-top pt-3 d-flex justify-content-between">
                                    <label htmlFor="productTaxable" className="form-label">Taxable</label>
                                    <label className="switch ms-3">
                                        <input type="checkbox" id="toggleSwitch" checked={pricing.taxable} onChange={(e) => setPricing({...pricing, taxable: e.target.checked})} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Product Variants */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Product Variants</h5>
                            </div>
                            <div className="card-body">
                                {/* Add variant management components here */}
                                <AdminVariants onssChange={handleChange} handleVarOptList={handleVarOptList} varOptList={productVarOptList} rawVariantList={rawVariantList} variantGroupBy={variantGroupBy} action={props.action.action}/>
                                
                            </div>
                        </div>
                        {/* Inventory Management */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Inventory Management</h5>
                            </div>
                            <div className="card-body">
                                {/* Add inventory management components here */}
                                <div className="pt-3 my-3 d-flex justify-content-between">
                                    <label htmlFor="trackInventory" className="form-label">Track Inventory</label>
                                    <label className="switch ms-3">
                                        <input type="checkbox" id="toggleSwitch" checked={inventory.track_inventory} onChange={(e) => setInventory({...inventory, track_inventory: e.target.checked})} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="my-3 border-top ">
                                    <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                                    <input type="number" className="form-control" id="stockQuantity" placeholder="Enter stock quantity" value={inventory.stock_quantity} onChange={(e) => setInventory({...inventory, stock_quantity: Number(e.target.value)})} />
                                </div>
                                <div className="my-3 border-top pt-3 d-flex justify-content-between">
                                    <label htmlFor="allowBackorder" className="form-label">Allow Backorder</label>
                                    <label className="switch ms-3">
                                        <input type="checkbox" id="toggleSwitch" checked={inventory.allow_backorder} onChange={(e) => setInventory({...inventory, allow_backorder: e.target.checked})} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="my-3 border-top">
                                    <label htmlFor="warehouseLocation" className="form-label">Warehouse Location</label>
                                    <input type="text" className="form-control" id="warehouseLocation" placeholder="Enter warehouse location" value={inventory.warehouse_location} onChange={(e) => setInventory({...inventory, warehouse_location: e.target.value})} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 mb-3">
                        {/* Media */}
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
                                        <div className='position-relative'>
                                            {
                                                isLoading ? 
                                                <div className='position-absolute top-0 start-0 end-0 bottom-0 z-1 d-flex justify-content-center align-items-center' 
                                                style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                                                    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                                                </div>
                                                :
                                                null
                                            }
                                            <h5>Main Image</h5>
                                            {
                                                media.main_image?.url  ?
                                                <div className="position-relative">
                                                    <button className="bg-transparent btn btn-outline-primary position-absolute top-0 start-0 bg-white p-1 border-3" style={{ width: '35px', height: '35px'}}  onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById('changeMainImg')?.click();
                                                        }}>
                                                        <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                                    </button>
                                                    <img className='w-100 t3' src={media.main_image?.url} alt="" />
                                                    <input type="file" hidden className="form-control" id="changeMainImg" multiple placeholder='upload main image' onChange={(e) => handleChangeMainImg(e)} />
                                                </div>
                                                : mainImage ?
                                                <div className="position-relative" style={{border:"1px solid red"}}>
                                                    mainImage ? 
                                                    <button className="bg-transparent btn btn-outline-primary position-absolute top-0 start-0 bg-white p-1 border-3" style={{ width: '40px', height: '40px', background: 'red' }} onClick={(e) => {
                                                        e.preventDefault();
                                                        document.getElementById('productImages')?.click();
                                                        }}>
                                                        <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                                    </button>
                                                    <img className='w-100 t' src={URL.createObjectURL(mainImage)} alt="Selected" />
                                                </div>
                                                :
                                                // check if product exists and has no main image
                                                    props.product?._id && !props.product?.media?.main_image?.url ?
                                                    // if product exists and has no main image, show input to upload main image
                                                    <div className="position-relative">
                                                        <button className='bg-lightGray p-4 w-100 border-primary' style={{ minHeight: "150px"}} onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById('productMainNewImg')?.click();
                                                        }}> test
                                                            <svg fill="currentColor" width="50px" height="50px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                                        </button>
                                                        existing product has no main image
                                                        <br />
                                                        <input type="file" hidden className="form-control" id="productMainNewImg" multiple placeholder='upload main image' onChange={(e) => uploadMainImageToProd(e)} />
                                                    </div>
                                                    : 
                                                    //if product does not exist meaning adding a new product show input to handle new image upload
                                                    <div>
                                                        <button className='bg-lightGray p-4 w-100' style={{ minHeight: "150px"}} onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById('productImages')?.click();
                                                        }}>
                                                            second
                                                            <svg fill="currentColor" width="50px" height="50px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                                        </button>
                                                        <br />
                                                        No main image selected
                                                        <input hidden type="file" className="form-control" id="productImages" multiple placeholder='upload main image' onChange={(e) => handleImageUpload(e)} />
                                                    </div>
                                            }

                                            <input type="file" hidden className="form-control" id="productImages" multiple placeholder='upload main image' onChange={(e) => handleImageUpload(e)} />
                                        </div>
                                    </div> 
                                    <div className='col'>
                                        <h5>Gallery Images</h5>
                                        <div className="rounded-1 row m-auto bg-lightGrayLighter p-3">
                                            {
                                                media.gallery && media.gallery.length > 0 ?
                                                media.gallery.map((image, index) => (
                                                    <div className="position-relative" style={{ width: "100px", height: "100px" }} key={index}>
                                                        <img className='h-100 object-fit-contain w-100 rounded-2' key={index} style={{ objectFit: 'contain', height: '100px', }} src={image?.url} alt="" />
                                                    </div>
                                                ))  
                                                : 
                                                gallery && gallery.length > 0 ?
                                                gallery.map((image, index) => (
                                                    <div className="position-relative" style={{ width: "100px", height: "100px" }} key={index}>
                                                        <img className='h-100 object-fit-contain w-100 rounded-2' key={index} style={{ objectFit: 'contain', height: '100px', }} src={URL.createObjectURL(image)} alt="" />
                                                        <button className='btn btn-sm position-absolute top-0 end-5 bg-secondary' onClick={() => handleRemoveImage(index)}><i className="fa fa-times"></i></button>
                                                    </div>
                                                )) 
                                                : <p>No gallery images selected</p>
                                            }
                                            {/* check if theres an existing product */}
                                            {
                                                props.action.action === 'edit' && props.product?._id  ?
                                        <Fragment>
                                            <button className='btn btn-outline-primary mt-2 p-3 d-flex align-items-center justify-content-center' onClick={(e) => {
                                                e.preventDefault();
                                                console.log('Adding images to gallery');
                                                document.getElementById('addImgToGallery')?.click();
                                                }} style={{ width: '80px', height: '80px' }}>
                                                <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                            </button>
                                            <input  type="file" hidden className="form-control" id="addImgToGallery" multiple placeholder='upload gallery images' onChange={(e) => handleImgUploadToGallery(e)} />
                                        </Fragment>
                                                    :
                                            <button className='btn btn-outline-primary mt-2 p-3 d-flex align-items-center justify-content-center' onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('productGallery')?.click();
                                                }} style={{ width: '80px', height: '80px' }}>
                                                22
                                                <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></g></svg>
                                                <input  type="file" hidden className="form-control" id="productGallery" multiple placeholder='upload gallery images' onChange={(e) => handleGalleryUpload(e)} />
                                            </button>
                                            }
                                        </div>
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
                        {/* publishing */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Publishing</h5>
                            </div>
                            <div className="card-body">
                                {/* Add publishing components here */}
                                <div className="mb-3">
                                    <label htmlFor="productStatus" className="form-label">Status</label>
                                    <select className="form-select" id="productStatus" value={publishing.status} onChange={(e) => setPublishing({...publishing, status: e.target.value})}>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productVisibility" className="form-label">Visibility</label>
                                    <select multiple className="form-select" id="productVisibility" value={publishing.visibility} onChange={(e) => setPublishing({...publishing, visibility: Array.from(e.target.selectedOptions, option => option.value)})}>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="password_protected">Password Protected</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    publishing.publish_at:{publishing.publish_at}
                                    <br />
                                    <label htmlFor="productPublishAt" className="form-label">Publish At</label>
                                    <input type="datetime-local" className="form-control" id="productPublishAt" value={toDatetimeLocal(publishing.publish_at)} onChange={(e) => setPublishing({...publishing, publish_at: e.target.value})} />
                                </div>
                                <div>
                                    <label htmlFor="productExpirePolicy" className="form-label">Expire Policy</label>
                                    <select className="form-select" id="productExpirePolicy" value={publishing.expire_policy} onChange={(e) => setPublishing({...publishing, expire_policy: e.target.value})}>
                                        <option value="never">Never</option>
                                        <option value="onDate">On Date</option>
                                    </select>
                                </div>
                                {
                                    publishing.expire_policy === 'onDate' ? (
                                        <div className="mb-3">
                                        <label htmlFor="productExpireAt" className="form-label">Expire At</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="productExpireAt"
                                            value={toDatetimeLocal(publishing.expire_at)}
                                            min={publishing.publish_at ? toDatetimeLocal(publishing.publish_at) : undefined}
                                            onChange={(e) => {
                                            const newExpire = e.target.value;
                                            // Prevent expire_at earlier than publish_at
                                            if (publishing.publish_at && new Date(newExpire) < new Date(publishing.publish_at)) {
                                                alert("Expiration date cannot be earlier than publish date.");
                                                return;
                                            }
                                            setPublishing({ ...publishing, expire_at: newExpire });
                                            }}
                                        />
                                        {
                                            publishing.publish_at && new Date(publishing.expire_at) < new Date(publishing.publish_at) ? (
                                            <div className="text-danger mt-1">
                                                Expiration date cannot be earlier than publish date.
                                            </div>
                                            ) : null
                                        }
                                        </div>
                                    ) : null
                                }

                            </div>
                        </div>

                        {/* Shipping Details */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Shipping Details</h5>
                            </div>
                            <div className="card-body">
                                {/* Add shipping details components here */}
                                <div className="mb-3">
                                    <label htmlFor="productWeight" className="form-label">Weight (kg)</label>
                                    <input type="number" className="form-control" id="productWeight" placeholder="Enter product weight" value={shipping.weight} onChange={(e) => setShipping({...shipping, weight: Number(e.target.value)})} />
                                </div>
                                <div className="my-3 border-top pt-3">
                                    <label htmlFor="productDimensions" className="form-label">Dimensions (L x W x H in cm)</label>
                                    <div className="d-flex">
                                        <input type="number" className="form-control me-2" placeholder="Length" value={shipping.dimensions.length} onChange={(e) => setShipping({...shipping, dimensions: {...shipping.dimensions, length: Number(e.target.value)}})} />
                                        <input type="number" className="form-control me-2" placeholder="Width" value={shipping.dimensions.width} onChange={(e) => setShipping({...shipping, dimensions: {...shipping.dimensions, width: Number(e.target.value)}})} />
                                        <input type="number" className="form-control" placeholder="Height" value={shipping.dimensions.height} onChange={(e) => setShipping({...shipping, dimensions: {...shipping.dimensions, height: Number(e.target.value)}})} />
                                    </div>
                                    <small className="form-text text-muted">Please enter the dimensions in centimeters.</small>

                                </div>
                                <div className="my-3 border-top pt-3 d-flex justify-content-between">
                                    <label htmlFor="productFreeShipping" className="form-label">Free Shipping</label>
                                    <label className="switch ms-3">
                                        <input type="checkbox" id="toggleSwitch" checked={shipping.free_shipping} onChange={(e) => setShipping({...shipping, free_shipping: e.target.checked})} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="my-3 border-top pt-3">
                                    <label htmlFor="productShippingClass" className="form-label">Shipping Class</label>
                                    <select className="form-select" id="productShippingClass" value={shipping.shipping_class} onChange={(e) => setShipping({...shipping, shipping_class: e.target.value})}>
                                        <option value="">Select Shipping Class</option>
                                        <option value="standard">Standard</option>
                                        <option value="oversized">Oversized</option>
                                        <option value="fragile">Fragile</option>
                                        <option value="express">Express</option>
                                        <option value="overnight">Overnight</option>
                                        <option value="international">International</option>
                                        <option value="free">Free Shipping</option>
                                        <option value="local">Local Pickup</option>
                                        <option value="flat_rate">Flat Rate</option>
                                    </select>
                                </div>
                                <div className="my-3 border-top pt-3">
                                    <label htmlFor="productFulfillmentMethod" className="form-label">Fulfillment Method</label>
                                    <select className="form-select mt-2" value={shipping.fulfillment_method} onChange={(e) => setShipping({...shipping, fulfillment_method: e.target.value})}>
                                        <option value="manual">Manual</option>
                                        <option value="dropship">dropship</option>
                                        <option value="3PL">3rd Party Logistics</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Brand and Vendor */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Brand and Vendor</h5>
                            </div>
                            <div className="card-body">
                                {/* Add brand and vendor components here */}
                                <div className="mb-3">
                                    <label htmlFor="productBrand" className="form-label">Brand</label>
                                    <input type="text" className="form-control" id="productBrand" placeholder="Enter product brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productVendor" className="form-label">Vendor</label>
                                    <input type="text" className="form-control" id="productVendor" placeholder="Enter product vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} />
                                </div>
                            </div>

                        </div>
                        {/* product categories */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Product Categories</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-wrap align-items-baseline">
                                    {categoryList.map((category, index) => (
                                        <span key={index} className="rounded-1 bg-secondary mx-2 py-2 d-inline position-relative px-4 mb-3">
                                            {/* get name of category from categories by id */}
                                            {allCategories.find(cat => cat._id === category)?.name}
                                                <span className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle vhw-4 vw-4 vhw-md-2 vw-md-2  text-center d-flex align-items-center justify-content-center text-light cstfs-14 cstfs-md-16 cstfs-lg-18" role="button" tabIndex={0} onClick={() => 
                                            setCategoryList(categoryList.filter((t, i) => i !== index))
                                        }>
                                            <i className="bi bi-x"></i>
                                        </span>
                                        </span>
                                    ))}
                                </div>
                                {/* Add tags components here */}
                                <div className="mb-3">
                                    <label htmlFor="productCategories" className="form-label">Categories</label>
                                    <select name="productCategories" id="productCategories" className="form-select mt-2" value={category} onChange={(e) => {
                                        // FILTER OUT DUPLICATES
                                        if (!categoryList.includes(e.target.value)) {
                                            setCategoryList([...categoryList, e.target.value])
                                        }
                                    }}>
                                        <option value="">Select a category</option>
                                        {allCategories.map((category, index) => (
                                            category.status === 'active' ? (
                                                <option key={index} value={category._id}>{category.name}</option>
                                            ) : null
                                        ))}
                                    </select>

                                    <input type="text" className="form-control mt-3" id="productNewCategory" placeholder="Or enter new category" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} onKeyDown={(e) => {
                                        if (e.key === 'Enter' && newCategory.name) {
                                            e.preventDefault();
                                            // check if category already exists in categoryList
                                            // if (!categoryList.includes(category)) {
                                            //     setCategoryList([...categoryList, category]);
                                            //     setCategory('');
                                            // }
                                            addNewCategory()
                                        }
                                    }} />
                                    <small className="form-text text-muted">Example: female, male, unisex etc</small>
                                </div>
                            </div>
                        </div>
                        {/* product TAgs */}
                        <div className="card mt-3">
                            <div className="card-header">
                                <h5>Product Tags</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-wrap align-items-baseline">
                                    {tags.map((tag, index) => (
                                        <div key={index}  className="rounded-1 bg-secondary mx-2 py-2 d-inline position-relative px-4 mb-3">{tag}
                                        <span className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle vhw-4 vw-4 vhw-md-2 vw-md-2  text-center d-flex align-items-center justify-content-center text-light cstfs-14 cstfs-md-16 cstfs-lg-18" role="button" tabIndex={0} onClick={() => 
                                            setTags(tags.filter((t, i) => i !== index))
                                        }>
                                            <i className="bi bi-x"></i>
                                        </span>
                                        </div>
                                    ))}
                                </div>
                                {/* Add tags components here */}
                                <div className="mb-3">
                                    <label htmlFor="productTags" className="form-label">Tags (comma separated)</label>
                                    <input type="text" className="form-control" id="productTags" placeholder="Enter product tags here" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={(e) => {
                                        if (e.key === 'Enter' && tag) {
                                            e.preventDefault();
                                            setTags([...tags, tag]);
                                            setTag('');
                                        }
                                    }} />
                                    <small className="form-text text-muted">Example: tag1, tag2, tag3</small>
                                </div>
                            </div>
                        </div>

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
                        <div className="d-flex justify-content-end">

                            <button type="submit" className="btn btn-primary me-2">Update Product</button>
                            <button type="button" className="btn btn-danger me-2" onClick={() => deleteProductById(product._id)}>Delete Product</button>
                        </div>
                    }
                    {/* {
                        name ?
                        <button type="submit" className="btn btn-primary me-2">Save Product</button>
                        : <button type="submit" className="btn btn-secondary me-2" disabled>Save Product</button>
                    } */}
                    {/* <button type="submit" className="btn btn-primary" >Save Product</button> */}
                </div>
            </form>
            
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex flex-column justify-content-center align-items-center min-vh-40'>
                    <div className='my-3 fs-4'>
                        {loadingMessage}
                    </div>
                    {
                        isLoading ? <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} /> : null
                    }
                </Modal.Body>
                <Modal.Footer> {
                    isLoading
                        ?
                        <Button variant="primary" disabled>Processing...</Button> :
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                </Button>
                    
                    }
                {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>
            <Modal show={showMessageModal} onHide={handleMessageClose} aria-labelledby="contained-modal-title-vcenter"
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
                    <Button variant="secondary" onClick={handleMessageClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </Fragment>
    )
}

export default AdminProdForm