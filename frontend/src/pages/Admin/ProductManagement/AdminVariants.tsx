import { group } from 'console';
import  { Fragment, useState, useId, SetStateAction, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AdminVariants(props: any) {
    const [variantOptionsList, setVariantOptionsList] = useState<{ optionName: string; optionValues: { value: string }[] }[]>([]);
    const [variantOption, setVariantOption] = useState({
        optionName: '',
        optionValues: [
            {value:''}
        ],
    });
    const [newVariantList, setNewVariantList] = useState<{
        price: number;
        stock_quantity: number;
        barcode: string;
        sku: string;
        option_values: { optionName: string; optionValue: any }[];
    }[]>([]);
    const [groupBy, setGroupBy] = useState<string>(variantOptionsList[0]?.optionName || '');
    // const [comboWithOptionName, setComboWithOptionName] = useState<any[]>([]);
    const [groupedVariantsList, setGroupedVariantsList] = useState<any[]>([]);

    const handleValueAdd = (value: string, idx: number) => {
        const newValues = [...variantOption.optionValues];
        newValues[idx].value = value;
        setVariantOption({ ...variantOption, optionValues: newValues })
        if(idx == variantOption.optionValues.length - 1 && value.length > 0) {
            newValues.push({ value: '' });
        }else{
            if(idx == variantOption.optionValues.length - 2 && value.length < 1) {
                newValues.pop();
            }
        }
        setVariantOption({ ...variantOption, optionValues: newValues });
    }
    const addVariantOption = () => {
        let newCLeanVariantOptionValues: { value: string }[] = []
        variantOption.optionValues.forEach((item) => {
            if(item.value.length > 2) {
                newCLeanVariantOptionValues.push({ value: item.value });
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
                optionValues: [
                    { value: '' }
                ],
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
                    optionValue: item[key].value
                }
            ));
            newVarList.push(newVariant);
        })
        return newVarList;
    }
    const groupVariants = (variants: any[], groupBy:string) => {
        let groupedVariantOptions: SetStateAction<any[]> = [];
        variants.forEach((variant) => {
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


    const handleStockQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, uuid: string) => {
        console.log('handleStockQuantityChange', e.target.value, uuid);
        const newVariants = newVariantList.map((variant) => {
            if (variant.uuid === uuid) {
                return { ...variant, stock_quantity: Number(e.target.value) };
            }
            return variant;
        });
        setNewVariantList(newVariants);
        groupVariants(newVariants, groupBy);

    };
    useEffect(() => {
        // This code runs AFTER 'count' has been updated and the component re-rendered
        // console.log('Latest count:', );
        console.log('variantOptionsList updated:', variantOptionsList);
      }, [variantOptionsList]); // Dependency array: effect runs when 'count' changes

    return (
        <div>
            {/* <button onClick={() => generateCombo(variantOptionsList)}>Add Variant Option</button> */}
            {/* <button className='btn btn-primary' onClick={() => createVariants(comboWithOptionName)}>Add Variant Option</button> */}
            
            <div>
                <h4>Current Variant Options</h4>
                <ul className="list-group mb-4">
                    {
                        variantOptionsList && variantOptionsList.length > 0 ?
                        <Fragment>
                            
                            {
                            variantOptionsList.map((option, index) => (
                                <li key={index} className='list-group-item'>
                                    <h5 className="card-title mb-2">{option.optionName}</h5>
                                    <div className="d-flex mb-2">
                                        {option.optionValues.map((v, idx) => (
                                            <span className='bg-secondary me-2 py-2 px-3 rounded-2 text-center' key={idx}>{v.value}</span>
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
                                    <input type="text" id='optionName' placeholder='Add Option Name' className="form-control py-2 mb-2" value={variantOption.optionName} onChange={(e) => setVariantOption({ ...variantOption, optionName: e.target.value })} />
                                </div>
                            </div> 
                            {
                                variantOption.optionName.length > 2 ?
                                <Fragment>
                                    <label htmlFor="optionValues" className='mb-1'>Option Values</label>
                                    {variantOption.optionValues.map((item, index) => (
                                        <div key={index} className="mb-3 position-relative d-flex justify-content-between align-items-center">
                                            <input type="text" id={`optionValue-${index}`} className="form-control py-2" value={item.value} onChange={(e) => handleValueAdd(e.target.value, index)} />
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
                                    ))}
                                </Fragment>
                                :
                                null
                            }
                            {
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
                            }
                        </div>
                    </li>
                </ul>
                <div>
                    <div>
                        <h4>Variant Options List</h4>
                        {
                            variantOptionsList && variantOptionsList.length > 0 ?
                            <div className=' mb-2'>
                                <div className="d-flex justify-content-center align-items-center">
                                    <h5 className="mb-2 col-2">Group By:</h5>
                                    <select className='form-select my-3' name="optionName" value={groupBy} id="optionName" onChange={(e) => { 
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
                            : 
                        <div className='card mb-2'>
                            <div className="card-body">
                                <p className="card-text">No variant options available.</p>
                            </div>
                        </div>
                        }
                    </div>
                    <h4>New Variant List</h4>
                    <ul className="p-0 accordion">
                        {
                            groupedVariantsList && groupedVariantsList.length > 0 ?
                            groupedVariantsList.map((group, index) => 
                                <div key={index} className='accordion-item'>
                                    <h5 className="accordion-header">
                                        <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`} className="accordion-button collapsed">
                                            {group.groupByOption} :?? {group.groupBy} ({group.variants && group.variants.length > 0 ? group.variants.length : 0})
                                        </button>
                                    </h5>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <ul className='accordion-body'>
                                            {
                                                group.variants && group.variants.length > 0 ?
                                                group.variants.map((variant, idx) => 
                                                <li className='list-group-item d-flex mb-2 border-2 border-primary' key={idx}>
                                                    {variant.uuid + ' : '}
                                                    {
                                                        variant.option_values && variant.option_values.length > 1 ?
                                                        variant.option_values.map((opt: any, optIdx: number) => 
                                                            group.groupBy !== opt.optionValue ?
                                                            <span className='px-1 rounded-2 text-center' key={opt.optionName}>
                                                                {opt.optionValue}
                                                                {
                                                                    optIdx < variant.option_values.length - 1 ? ', ' : null
                                                                }
                                                            </span>
                                                                : null
                                                            )
                                                            : null
                                                    }
                                                        <input type="text" value={variant.stock_quantity}  onChange={(e) => handleStockQuantityChange(e, variant.uuid)}/>
                                                </li>
                                            )
                                                : 
                                                <div>No variants available.</div>
                                            
                                            }
                                            {/* {
                                                group.variants.map((variant, idx) => (
                                                    <li key={idx} className='list-group-item'>
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

                </div>
            </div>
            {/* <div>
                <ul className="list-group">
                    {
                        groupedVariants && Object.keys(groupedVariants).length > 0 ?
                        Object.keys(groupedVariants).map((key, index) => (  
                            <li key={index} className='list-group-item'>
                                <div className="card-body">
                                    <h5 className="card-title mb-2">
                                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample-${index}`} aria-expanded="false" aria-controls={`collapseExample-${index}`}>
                                            {key}
                                        </button>
                                        <div className="fs-6 my-2">{groupedVariants[key].length} variants</div>
                                    </h5>
                                    <div className='collapse' id={`collapseExample-${index}`}>
                                        <div className="d-flex mb-2" id={`collapseExample-${index}`}>
                                            <ul className='list-group w-100'>
                                                {
                                                groupedVariants[key].map((variant: any, idx: number) => (
                                                    variant.option_values.length > 1 ?
                                                    <li className='list-group-item me-2 py-2 px-3 rounded-2 text-center' key={idx}>
                                                        {variant.option_values.map((opt: any) => 
                                                            opt.value != variant.groupBy ?
                                                            opt.value.length > 0 ?
                                                            <span className='list-group' key={opt.key}>{}</span>
                                                            : null
                                                            : null
                                                            )}
                                                    </li>
                                                    :null
                                                ))
                                                }

                                            </ul>
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) 
                        :
                        <div className='card mb-2'>
                            <div className="card-body">
                                <p className="card-text">No variants available.</p>
                            </div>
                        </div>
                    }
                </ul>
                <ul>

                </ul>
            </div> */}
        </div>
    )
}

export default AdminVariants