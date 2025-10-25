import React, { useState } from 'react'
import { useAddImageToPageSectionBlock } from '../../../../../hooks/newImageHooks';

function ImageType({ selectedDesignBlock, editBlock, setEditBlock, section, updateSection, allFontFamilies, storeHeadingFont, storeTheme, storeBodyFont, storeInfo, pageDetails }: any)  {
    const { mutateAsync: uploadImageToSectionBlock } = useAddImageToPageSectionBlock();

    const [blockImage, setBlockImage] = useState<File | null>(null);
    const uploadImageToBlock = async (e: React.ChangeEvent<HTMLInputElement>, editBlock: any, setEditBlock: (block: any) => void, section: any, updateSection: (section: any) => void) => {
        console.log('section', section);
        const files = e.target.files;
        if (files && files.length > 0) {
            setBlockImage(files && files[0] ? files[0] : null);
        }
        let mainImg = files && files[0] ? files[0] : null;
        console.log('Selected main image:', mainImg);
        const formData = new FormData();
        
        formData.append('mainImage', mainImg as Blob);
        formData.append('storeId', JSON.stringify(storeInfo?.storeId));
        formData.append('pageId', JSON.stringify(pageDetails?._id));
        formData.append('sectionId', JSON.stringify(section?.id));
        formData.append('blockId', JSON.stringify(editBlock?.uid));
        try {
            const response = await uploadImageToSectionBlock(formData);
            if (response) {
                console.log("Uploaded image response:", response);
                // let updatedBlock = { ...editBlock, imageId: response._id, imageUrl: response.url };
                // setEditBlock(updatedBlock);
                // let updatedSection = { ...section };
                // updatedSection.blocks = updatedSection.blocks.map((block: any) => block.uid === editBlock.uid ? updatedBlock : block);
                // updateSection(updatedSection);
            }

        } catch (error) {
            console.error("Error uploading image to block:", error);
            
        }

        // uploadImageToSectionBlock(formData);
    }
    return (
        <div>
            <h5 className="card-title text-capitalize"><i className="bi bi-fonts"></i> image</h5>
            {/* Image Block Settings */}
            {/* upload image */}
            <div className="mb-3">
                <label htmlFor="imageUpload" className="form-label">Upload Image</label>
                <input 
                type="file" className="form-control" 
                multiple
                id="imageUpload" onChange={(e) => 
                    uploadImageToBlock(e, editBlock, setEditBlock, section, updateSection)} />
            </div>
            <div className="mb-3">
                <label htmlFor="imageAltText" className="form-label">Alt Text</label>
                <input type="text" className="form-control" id="imageAltText" value={editBlock.altText} onChange={(e) => {
                    let updatedBlock = {...editBlock, altText: e.target.value};
                    setEditBlock(updatedBlock);
                    let updatedSection = {...section};
                    updatedSection.blocks = updatedSection.blocks.map((block:any) => block.uid === editBlock.uid ? updatedBlock : block);
                    updateSection(updatedSection);
                }}
                />
            </div>
        </div>
    )
}

export default ImageType