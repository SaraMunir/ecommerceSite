import { group } from 'console';
import { join } from 'path';
import  { Fragment, useState, useId, SetStateAction, useEffect, Key } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AdminVariants(props: any) {
    const [variantOptionsList, setVariantOptionsList] = useState<{ optionName: string; optionValues: string[] }[]>(
        props.varOptList && props.varOptList.length > 0 
        ? 
        props.varOptList 
        : []
    );
    const [existingVariantOpList, setExistingVariantOpList] = useState<{ optionName: string; optionValues: string[] }[]>([]);
    const [variantOption, setVariantOption] = useState({
        optionName: '',
        optionValues: ['']
    });
    const [newVariantList, setNewVariantList] = useState<{
        price: number;
        stock_quantity: number;
        barcode: string;
        sku: string;
        option_values: { optionName: string; optionValue: any }[];
        uuid?: string;
    }[]>([]);
    const [groupBy, setGroupBy] = useState<string>(variantOptionsList[0]?.optionName || '');
    // const [comboWithOptionName, setComboWithOptionName] = useState<any[]>([]);
    const [groupedVariantsList, setGroupedVariantsList] = useState<any[]>([]);
    const handleValueAdd = (value: string, idx: number) => {
        const newValues = [...variantOption.optionValues];
        newValues[idx] = value;
        setVariantOption({ ...variantOption, optionValues: newValues })
        if(idx == variantOption.optionValues.length - 1 && value.length > 0) {
            newValues.push('');
        }else{
            if(idx == variantOption.optionValues.length - 2 && value.length < 1) {
                newValues.pop();
            }
        }
        setVariantOption({ ...variantOption, optionValues: newValues });
    }
    const addExtraVariantOption = (e) => {
        console.log('addExtraVariantOption');
        console.log('props.varOptList', props.varOptList);
        console.log('rawVariantList', props.rawVariantList);
        e.preventDefault();
        const newVariants: any[] = [];
        // check if the product already has variant options
        if(props.varOptList.length > 0) {
            // if it does, then add the new variant option to the existing list
            // setVariantOptionsList([...variantOptionsList, variantOption]);
            console.log('props.varOptList', props.varOptList);
            let newCLeanVariantOptionValues: string [] = []
            console.log('variantOption', variantOption);
            variantOption.optionValues.forEach((item) => {
                if(item.length > 1) {
                    newCLeanVariantOptionValues.push(item);
                }
            })
            const variantOptionClean = {
            optionName: variantOption.optionName,
            optionValues: newCLeanVariantOptionValues
            }
            console.log('variantOptionClean', variantOptionClean);
            props.rawVariantList.forEach((item:any) => {
                console.log('item', item);
                let currentItemUUuid = item.uuid;
                if(variantOptionClean.optionValues.length>0) {
                    variantOptionClean.optionValues.forEach((value) => {
                        const newVariant = {
                            ...item,
                            oldUUid: currentItemUUuid,
                            uuid: uuidv4(),
                            _id: '',
                            option_values: [...item.option_values, {optionName: variantOptionClean.optionName, optionValue: value}]
                        };
                        newVariants.push(newVariant);
                    })
                }
            })
            console.log('newVariants', newVariants);
            if(newVariants.length > 0){
                setVariantOption({
                    optionName: '',
                    optionValues: [''],
                });
                let newVariantOptionsList = [...variantOptionsList, variantOptionClean];
                console.log('newVariantOptionsList', newVariantOptionsList);
                setNewVariantList(newVariants);
                groupVariants(newVariants, props.variantGroupBy);
                setVariantOptionsList(newVariantOptionsList);
                props.handleVarOptList(newVariantOptionsList)
            }

            // const values = variantOptionClean.optionValues.split(",").map(v => v.trim());
            // console.log('values', values);
        } else {
            // if it doesn't, then create a new list with the new variant option
            addVariantOption()
        }
    }
    const addVariantOption = () => {
        let newCLeanVariantOptionValues: string [] = []
        variantOption.optionValues.forEach((item) => {
            if(item.length > 0) {
                newCLeanVariantOptionValues.push(item);
            }
        })
        // console.log('newCLeanVariantOptionValues', newCLeanVariantOptionValues)
        const variantOptionClean = {
            optionName: variantOption.optionName,
            optionValues: newCLeanVariantOptionValues
        }
        if(variantOption.optionName.length > 2 && variantOption.optionValues.length > 0) {
            setVariantOption({
                optionName: '',
                optionValues: [''],
            });
            let newVariantOptionsList = [...variantOptionsList, variantOptionClean];
            setGroupBy(newVariantOptionsList[0].optionName);
            let generatedComboWithOptName=generateComboWithOptionName(newVariantOptionsList);
            console.log('generatedComboWithOptName', generatedComboWithOptName);
            // setComboWithOptionName(generatedComboWithOptName);
            const newList=createVariants(generatedComboWithOptName);
            setNewVariantList(newList);
            groupVariants(newList, newVariantOptionsList[0].optionName);
        }
    }
    const generateComboWithOptionName=(optionConfig: string | any[])=>{
        console.log('optionConfig', optionConfig);
        props.handleVarOptList(optionConfig);
        setVariantOptionsList(optionConfig);
        if (!optionConfig.length) return [];
        const [firstOption, ...restOptions] = optionConfig;
        let variants = firstOption.optionValues.map((value: any) => ({
            [firstOption.optionName]: value
        }));
        for (const option of restOptions) {
            const newVariants = [];
            for (const variant of variants) {
            for (const value of option.optionValues) {
                newVariants.push({
                ...variant,
                [option.optionName]: value
                });
            }
            }
            variants = newVariants;
        }
        return variants;
    }

    const createVariants = (list: any[]) => {
        let newVarList: any[] = []
        list.forEach((item, idx) => {
            let newVariant: {
                price: number;
                stock_quantity: number;
                barcode: string;
                sku: string;
                uuid?: string;
                option_values: { optionName: string; optionValue: any }[];
            } = {
                price: 0,
                stock_quantity: 0,
                barcode: '',
                sku: '',
                option_values: [],
                uuid: uuidv4()
            };
            newVariant.option_values = Object.keys(item).map((key, index) => (
                {
                    optionName: key,
                    optionValue: item[key]
                }
            ));
            newVarList.push(newVariant);
        })
        return newVarList;
    }
    const groupVariants = (variants: any[], groupBy:string) => {
        console.log('groupBy', groupBy);
        console.log('variants', variants);
        let groupedVariantOptions: SetStateAction<any[]> = [];
        variants.forEach((variant) => {
            // Check if the variant has the groupBy option
            let groupByValue = variant.option_values.find((opt: any) => opt.optionName === groupBy)?.optionValue;
            let groupByOption = variant.option_values.find((opt: any) => opt.optionName === groupBy)?.optionName;
            if (groupByValue) {
                let existingGroup = groupedVariantOptions.find((group: any) => group.groupBy === groupByValue);
                if (existingGroup) {
                    existingGroup.variants.push(variant);
                } else {
                    groupedVariantOptions.push({
                        groupBy: groupByValue,
                        groupByOption: groupByOption,
                        variants: [variant]
                    });
                }
            }
        });
        console.log('groupedVariantOptions', groupedVariantOptions);
        setGroupedVariantsList(groupedVariantOptions);
        let prodVariant={
            groupedVariantOptions: groupedVariantOptions,
            newVariantList: variants,
            variantOptionsList: variantOptionsList,
            groupBy: groupBy
        }
        props.onssChange(prodVariant);
        // props.onChange(['testing if this works']);
        // handleDataFromChild(prodVariant);
    }

    const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>, uuid: string, field: 'stock' | 'price' | 'sku') => {
        console.log('handleVariantChange', e.target.value, uuid, field);
        const newVariants = newVariantList.map((variant) => {
            if (variant.uuid === uuid) {
                return { ...variant, [field === 'stock' ? 'stock_quantity' : field === 'price' ? 'price' : 'sku']: e.target.value };
            }
            return variant;
        });
        setNewVariantList(newVariants);
        groupVariants(newVariants, groupBy);

    };
    useEffect(() => {
        // This code runs AFTER props.varOptList has been updated and the component re-rendered
        console.log('props.varOptList:', props.varOptList);

        if(props.varOptList && props.varOptList.length > 0) {
            setVariantOptionsList(props.varOptList);
            props.handleVarOptList(props.varOptList)

            setNewVariantList(props.rawVariantList);
            setExistingVariantOpList(props.varOptList);
            setGroupBy(props.variantGroupBy);
            groupVariants(props.rawVariantList, props.variantGroupBy);
        }
      }, [props.varOptList]); // Dependency array: effect runs when 'count' changes

    return (
        <div>
            <ul className="list-group-flush ps-0 mb-4">
                {
                    variantOptionsList && variantOptionsList.length > 0 ?
                    <Fragment>
                        
                        {
                        variantOptionsList.map((option, index) => (
                            <li key={index} className='list-group-item'>
                                <h5 className="card-title mb-2">{option.optionName}</h5>
                                <div className="d-flex mb-2">
                                    {option.optionValues.map((v, idx) => (
                                        <span className='bg-secondary me-2 py-2 px-3 rounded-2 text-center' key={idx}>
                                            {v}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </Fragment>
                    : 
                    null
                }
                <li className='list-group-item'>
                    <div className='mb-3'>
                        <div className='mb-2'>
                            <div>
                                <label htmlFor="optionName"  className='mb-1'>Option Name</label>
                                <input type="text" id='optionName' placeholder='Add Option Name' className="form-control py-2 mb-2" value={variantOption.optionName} onChange={(e) => 
                                    setVariantOption({ ...variantOption, optionName: e.target.value })
                                } />
                            </div>
                        </div>
                        {
                            variantOption.optionName.length > 2 ?
                            <Fragment>
                                <label htmlFor="optionValues" className='mb-1'>Option Values</label>
                                {/* {
                                    variantOption.optionValues.length > 0 ?
                                    <Fragment>
                                        {
                                            variantOption.optionValues.map((item, index) => (
                                                <div key={index} className="mb-3 position-relative d-flex justify-content-between align-items-center">{item}</div>
                                            ))
                                        }
                                    </Fragment> 
                                    :
                                    null
                                } */}
                                {
                                variantOption.optionValues.map((item, index) => (
                                    <div key={index} className="mb-3 position-relative d-flex justify-content-between align-items-center">
                                        <input type="text" id={`optionValue-${index}`} className="form-control py-2" value={item} onChange={(e) => handleValueAdd(e.target.value, index)} />
                                        {
                                            variantOption.optionValues.length > 1 && index === variantOption.optionValues.length - 2 ?
                                            <button className='position-absolute btn btn-outline-danger' style={{ right: '5px' }} disabled>
                                                <i className="fa fa-times"></i>
                                            </button>
                                            :
                                            index < variantOption.optionValues.length - 1 ?
                                            <button className='position-absolute btn btn-outline-danger' style={{ right: '5px' }} onClick={() => {
                                                const newValues = variantOption.optionValues.filter((_, i) => i !== index);
                                                setVariantOption({ ...variantOption, optionValues: newValues });
                                            }}><i className="fa fa-times"></i></button>
                                            : null
                                        }
                                    </div>
                                ))
                                }
                            </Fragment>
                            :
                            null
                        }
                        {/* {
                            variantOption.optionName && variantOption.optionValues.length > 0 ?
                            <div className="mb-2 d-flex justify-content-end align-items-center mb-2">
                                <button className="btn btn-primary" onClick={() => addVariantOption()}>
                                    Add Option Value
                                </button>
                            </div>
                            : 
                            <div className="d-flex justify-content-end align-items-center mb-2">
                                <button className="btn btn-primary" disabled>Add Option Value</button>
                            </div>
                        } */}
                        action: {props.action}
                        {
                            props.action === 'edit' ?
                                variantOption.optionName && variantOption.optionValues.length > 0 ?

                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <button className="btn btn-tertiary" onClick={(e) => addExtraVariantOption(e)}>
                                        Add Extra Option Value
                                    </button>
                                </div>
                                :
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <button className="btn btn-tertiary" disabled onClick={(e) => addExtraVariantOption(e)}>
                                        Add Extra Option Value
                                    </button>
                                </div>
                            :
                            variantOption.optionName && variantOption.optionValues.length > 0 ?
                            <div className="mb-2 d-flex justify-content-end align-items-center mb-2">
                                <button className="btn btn-primary" onClick={() => addVariantOption()}>
                                    Add Option Value 33
                                </button>
                            </div>
                            : 
                            <div className="d-flex justify-content-end align-items-center mb-2">

                                <button className="btn btn-primary" disabled>Add Option Value</button>
                            </div>

                        }
                    </div>
                </li>
            </ul>
            <div>
                {
                variantOptionsList && variantOptionsList.length > 0 ?
                <div>
                    <h4>Variant Options List</h4>
                    <div className=' mb-2'>
                        <div className="d-flex justify-content-center align-items-center">
                            <h6 className="mb-2 col-2">Group By:</h6>
                            <select className='form-select my-3' name="optionName" value={groupBy} id="optionName" 
                                onChange={(e) => { 
                                setGroupBy(e.target.value);
                                groupVariants(newVariantList, e.target.value) }}>
                                {
                                    variantOptionsList.map((option, index) => (
                                        <option key={index} value={option.optionName} defaultChecked={groupBy === option.optionName ? true : false}>
                                            {option.optionName}
                                        </option>
                                    ))
                                    
                                }
                            </select>
                        </div>
                    </div>
                </div>
                    : 
                null
                }
                {
                    groupedVariantsList && groupedVariantsList.length > 0 ?
                    <Fragment>

                    <h6>Variants</h6>
                    <ul className="p-0 accordion">
                        {
                            groupedVariantsList && groupedVariantsList.length > 0 ?
                            groupedVariantsList.map((group, index) => 
                                <div key={index} className='accordion-item'>
                                    <h5 className="accordion-header">
                                        <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`} className="accordion-button collapsed">
                                            {group.groupByOption} :{group.groupBy} ({group.variants && group.variants.length > 0 ? group.variants.length : 0})
                                        </button>
                                    </h5>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <ul className='accordion-body'>
                                            {
                                                group.variants && group.variants.length > 0 ?
                                                group.variants.map((variant: { option_values: any[]; stock_quantity: string | number | readonly string[] | undefined; uuid: string; }, idx: Key | null | undefined) => 
                                                <li className='pb-3 list-group-item mb-2 border-bottom border-primary' key={idx}>
                                                    <div className="col fs-5 fw-bold">
                                                        {
                                                            variant.option_values && variant.option_values.length > 1 ?
                                                            variant.option_values.map((opt: any, optIdx: number) => 
                                                                group.groupBy !== opt.optionValue ?
                                                                <span className='text-center' key={opt.optionName}>
                                                                    {opt.optionValue}
                                                                    {
                                                                        optIdx < variant.option_values.length - 1 ? ', ' : null
                                                                    }
                                                                </span>
                                                                    : null
                                                                )
                                                                : null
                                                        }
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="col">
                                                            <div className="mx-2 d-flex flex-column">
                                                                <label htmlFor={`stock_quantity_${variant.uuid}`}>Stock Quantity</label>
                                                                <input className='col' type="number" id={`stock_quantity_${variant.uuid}`} value={variant.stock_quantity}  onChange={(e) => handleVariantChange(e, variant.uuid , 'stock')}/>

                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mx-2 d-flex flex-column">
                                                                <label htmlFor={`price_${variant.uuid}`}>Price</label>
                                                                <input className='col' type="number" id={`price_${variant.uuid}`} value={variant.price} placeholder='Price' onChange={(e) => handleVariantChange(e, variant.uuid , 'price')}/>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mx-2 d-flex flex-column">
                                                                <label htmlFor={`sku_${variant.uuid}`}>SKU</label>
                                                                <input className='col' type="text" id={`sku_${variant.uuid}`} value={variant.sku} placeholder='SKU' onChange={(e) => handleVariantChange(e, variant.uuid , 'sku')}/>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </li>
                                                )
                                                : 
                                                <div>No variants available.</div>
                                            }
                                            {/* {
                                                group.variants.map((variant, idx) => (
                                                    <li key={idx} className='pb-3 list-group-item mb-2 border-bottom border-primary'>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span>{variant.option_values.map((opt: any) => opt.value).join(', ')}</span>
                                                            <span>Price: {variant.price}, Stock: {variant.stock_quantity}, SKU: {variant.sku}</span>
                                                        </div>
                                                    </li>
                                                ))
                                            } */}
                                        </ul>
                                    </div>
                                </div>
                            )
                            :
                            <li className='list-group-item'>
                                <div className="card-body">
                                    <p className="card-text">No grouped variants available.</p>
                                </div>
                            </li>
                        }
                    </ul>
                    </Fragment>
                    :null
                }

            </div>
        </div>
    )
}

export default AdminVariants