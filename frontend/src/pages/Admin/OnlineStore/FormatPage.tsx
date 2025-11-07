// import React from 'react'
import React, { useState, useEffect, useRef, useContext } from 'react'

import { useParams } from 'react-router-dom';
import designBlockContents from '../../../designBlockContents.json'
import { v4 as uuidv4 } from 'uuid'
import ToolTip from '../../../components/ToolTip';
import SectionEditBlock from './Formatting/SectionEditBlock';
import { url } from 'inspector';
import { Store } from '../../../Store copy';
import {useGetPageDetailsByIdQuery, useUpdatePageDetailMutation} from '../../../hooks/pageHooks';
import { useCreatePageMutation } from '../../../hooks/pageHooks';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import BlockEditingModal from './Formatting/BlockEditingModal';
import { Block } from '../../../types/PageType';
import Blocks from '../OnlineStore/Formatting/Blocks'; // <-- Import the Block component
import { useGetStoreDetailsByIdQuery } from '../../../hooks/storeHooks';
import GoogleFont from 'react-google-font';
import { text } from 'stream/consumers';

function FormatPage() {
    let { pageName } = useParams();
    const [designBlocks] = useState(designBlockContents.contentBlocks)
    let span={rowSpan:1, colSpan:1}
    const [ sections, setSections] = useState<any[]>([])
    const [ showBlockMenu, setShowBlockMenu] = useState(false)
    const [ showpageSettings, setShowpageSettings] = useState(false)
    const [ isDragging, setIsDragging] = useState(false);
    const [ draggedBlock, setDraggedBlock] = useState<any>(null);
    const [ editSection, setEditSection] = useState(false);
    const [ pageDetails, setPageDetails] = useState<any>(null);
    const {state:{ mode, userInfo, userAdminInfo, exceptionError, storeInfo}, dispatch } = useContext(Store)
    const { mutateAsync: createPage } = useCreatePageMutation();
    const { mutateAsync: updatePage } = useUpdatePageDetailMutation();
    const { data: pageDetailById } = useGetPageDetailsByIdQuery(storeInfo.storeId, pageName ?? '');
    const [ editBlock, setEditBlock ] = useState<any>(null);
    const [ isBlockEditingModalOpen, setIsBlockEditingModalOpen ] = useState(false);
    const [ currentSection, setCurrentSection ] = useState<any>(null);
    const { data: store }=useGetStoreDetailsByIdQuery(storeInfo?.storeId!)
    const [ storeHeadingFont, setStoreHeadingFont] = useState<any>({});
    const [ storeBodyFont, setStoreBodyFont] = useState<any>({});
    const [ storeDetails, setStoreDetails] = useState<any>(null);
    const [ storeTheme, setStoreTheme] = useState<any>(null);
    // Removed undefined 'menuOpen' usage to fix compile error
    // To get the value of menuOpen from App.tsx, you need to lift the state up to a common ancestor (e.g., App.tsx) and pass it down as a prop.
    // Example usage:
    // In App.tsx:
    // const [menuOpen, setMenuOpen] = useState(false);
    // <FormatPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

    // In FormatPage.tsx:
    // Add props: 
    // function FormatPage({ menuOpen, setMenuOpen }: { menuOpen: boolean, setMenuOpen: (open: boolean) => void }) {
    // Now you can use menuOpen and setMenuOpen directly.
    // const [sectionBlocks, setSectionBlocks] = useState<any[]>([])
    const onBlockDragEnd = () => setIsDragging(false);

    const dropHandler = async (e:any, gridDiv:any, sectionId:string) => {
        e.preventDefault();
        setIsDragging(false);     
        setShowBlockMenu(false);
        const data = e.dataTransfer.getData("text");
        const parsedData = JSON.parse(data);
        // check if the block is already added to the section
        // let sectionBlocks = sections.filter((section) => section.id === sectionId);
        // check if the block is already added to the section
        // find section from sections by id
        let section = sections.find((section) => section.id === sectionId);
        let sectionBlocks = section?.blocks || [];
        if(section){
            // update the section with the new block
            // find if the block is already added to the section

            // if the block is already added to the section, update the position of the block
            // else add the block to the section
            // setSectionBlocks([...sectionBlocks, sectBlock])  
            if(parsedData.uid){
                let sectBlock ={
                    ...parsedData,
                    colstart: gridDiv.col,
                    rowstart: gridDiv.row,
                    blockadded: true,
                }
                // update the existing block in sectionBlocks
                let updateSectionsBlocks: any[] = []
                sectionBlocks.forEach((element: any) => {
                    if(element.uid === parsedData.uid){
                        element = {
                            ...sectBlock, colstart: gridDiv.col, rowstart: gridDiv.row
                        };
                        console.log("Block updated:", element);
                        updateSectionsBlocks.push(element);
                    }else{
                        updateSectionsBlocks.push(element);
                        console.log("No matching block found for update.");
                    }
                });
                // sectionBlocks = sectionBlocks.map((block: any) => block.uid === existingBlock.uid ? sectBlock : block);

                // sectionBlocks = sectionBlocks.map((block) => block.id === existingBlock.id ? sectBlock : block);
                console.log("Updated sectionBlocks:", updateSectionsBlocks);
                let updatedSection = {
                    ...section,
                    blocks: updateSectionsBlocks
                }
                let updatedSections = sections.map((sec) => sec.id === section.id ? updatedSection : sec);
                setSections(updatedSections);
                // return
                if (pageDetails && pageDetails._id) {
                    // update the pageDetails with the new section
                    let updatedPageDetails = {
                        ...pageDetails,
                        pageContent: {
                            ...pageDetails.pageContent,
                            sections: [...updatedSections]
                        }
                    }
                    console.log("Updating existing page with details:", updatedPageDetails);
                    setPageDetails(updatedPageDetails);
                    // dispatch to update the store
                    try{
                        const data = await updatePage(updatedPageDetails);
                        console.log("Page updated:", data);
                    }catch(error){
                        console.error("Error updating page:", error);
                    }
                }
            }else{
                console.log("Adding new block to section");
                let sectBlock: Block = {
                    uid: uuidv4(),
                    type: parsedData.type,
                    html: parsedData.html,
                    rowSpan: parsedData.rowSpan,
                    colSpan: parsedData.colSpan,
                    colstart: gridDiv.col,
                    rowstart: gridDiv.row,
                    blockadded: true,
                    layout: {
                        paddingX: parsedData.defaultLayout?.paddingX || '0',
                        paddingY: parsedData.defaultLayout?.paddingY || '0',
                        marginX: parsedData.defaultLayout?.marginX || '0',
                        marginY: parsedData.defaultLayout?.marginY || '0',
                        alignmentX: parsedData.defaultLayout?.alignmentX || 'start',
                        alignmentY: parsedData.defaultLayout?.alignmentY || 'start',
                    }
                }
                switch(parsedData.type){
                    case 'text':
                        sectBlock.textBlock = {
                            html: parsedData.html,
                            content: parsedData.defaultText,
                            tag: parsedData.defaultTag,
                            font: {
                                fontColor: parsedData.defaultStyles?.color || '#000000',
                                fontWeight: parsedData.defaultStyles?.fontWeight || 600,
                                fontSize: parsedData.defaultStyles?.fontSize || 16,
                                fontStyle: parsedData.defaultStyles?.fontStyle || 'normal',
                                fontFamily: storeHeadingFont?.heading || 'Open Sans, sans-serif',
                                fontFamilyId: storeHeadingFont?.headingId || 'openSans',
                            },
                            textCase: 'capitalize',
                            alignment: 'left',
                        };
                        break
                    case 'button':
                        sectBlock.backgroundColor = storeDetails?.storeTheme?.colors?.primary || '#000000';
                        sectBlock.buttonBlock = {
                            content: parsedData.defaultText,
                            tag: parsedData.defaultTag,
                            font: {
                                // fontColor: parsedData.defaultStyles?.color || '#000000',
                                fontWeight: parsedData.defaultStyles?.fontWeight || 600,
                                fontSize: parsedData.defaultStyles?.fontSize || 16,
                                fontStyle: parsedData.defaultStyles?.fontStyle || 'normal',
                                fontFamily: storeHeadingFont?.heading || 'Open Sans, sans-serif',
                                fontFamilyId: storeHeadingFont?.headingId || 'openSans',
                            },
                            textCase: 'capitalize',
                            alignment: 'left',
                        };
                        break;
                    case 'accordion':
                        sectBlock.accordionBlock = {
                            accordions: [],
                            heading: {
                                font: {
                                    fontFamily: storeHeadingFont?.heading || 'Open Sans, sans-serif',
                                    fontFamilyId: storeHeadingFont?.headingId || 'openSans',
                                    fontWeight: 600,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                },
                                textCase: 'capitalize',
                                alignment: 'left',
                            },
                            content: {
                                font: {
                                    fontFamily: storeBodyFont?.body || 'Open Sans, sans-serif',
                                    fontFamilyId: storeBodyFont?.bodyId || 'openSans',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                },
                                textCase: 'none',
                                alignment: 'left',
                            }
                        };
                        break;
                    case 'cardBlock':
                        sectBlock.cardBlock = {
                            cards: [],
                            heading: {
                                font: {
                                    fontFamily: storeHeadingFont?.heading || 'Open Sans, sans-serif',
                                    fontFamilyId: storeHeadingFont?.headingId || 'openSans',
                                    fontWeight: 600,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                },
                                textCase: 'capitalize',
                                alignment: 'left',
                                value: 'Your Heading Here',
                                show: true
                            },
                            subheading: {
                                font: {
                                    fontFamily: storeHeadingFont?.heading || 'Open Sans, sans-serif',
                                    fontFamilyId: storeHeadingFont?.headingId || 'openSans',
                                    fontWeight: 600,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                },
                                textCase: 'capitalize',
                                alignment: 'left',
                                value: 'Your Subheading Here',
                                show: true
                            },
                            content: {
                                font: {
                                    fontFamily: storeBodyFont?.body || 'Open Sans, sans-serif',
                                    fontFamilyId: storeBodyFont?.bodyId || 'openSans',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                },
                                textCase: 'none',
                                alignment: 'left',
                                value: 'Your content goes here. A summary of the content.',
                                show: true
                            }
                        };
                        break;
                }
                sectionBlocks = [...sectionBlocks, sectBlock];
                let updatedSection = {
                    ...section,
                    blocks: sectionBlocks
                }
                let updatedSections = sections.map((sec) => sec.id === section.id ? updatedSection : sec);
                if (pageDetails && pageDetails._id) {
                    // update the pageDetails with the new section
                    let updatedPageDetails = {
                        ...pageDetails,
                        pageContent: {
                            ...pageDetails.pageContent,
                            sections: [...updatedSections]
                        }
                    }
                    console.log("Updating existing page with details:", updatedPageDetails);
                    setPageDetails(updatedPageDetails);
                    // dispatch to update the store
                    try{
                        const data = await updatePage(updatedPageDetails);
                        console.log("Page updated:", data);
                    }catch(error){
                        console.error("Error updating page:", error);
                    }
                }
                setSections(updatedSections);
            }
            // update the existing block in the section
        }
        let allElements = document.getElementsByClassName('grid-item');
        Array.from(allElements).forEach(element => {
            element.classList.remove('grid-item-active');
            // element.classList.add('dragging');
        });
        // remove any existing drag-over-indicator div
        let dragIndicators = document.getElementsByClassName('drag-over-indicator');
        Array.from(dragIndicators).forEach((indicator) => {
            indicator.remove();
        });
        // Logic to handle the drop event and update the section/block position
    }
    const showGrids = (value:boolean)=>{
        if(value){
            let allElements = document.getElementsByClassName('grid-item');
            Array.from(allElements).forEach(element => {
                element.classList.add('grid-item-active');
            });
        }else{
            let allElements = document.getElementsByClassName('grid-item');
            Array.from(allElements).forEach(element => {
                element.classList.remove('grid-item-active');
            });
        }
    }
    const dragstartHandler = (e:any, block:any, origin:string) => {
        setIsDragging(true);     
        if(block.type === 'image'){
            e.stopPropagation();
            e.dataTransfer.setData('text/plain', JSON.stringify(block));
        }else{
            e.dataTransfer.setData("text", JSON.stringify(block));
        }      
        
        span.rowSpan = block.rowSpan;
        span.colSpan = block.colSpan;
        setDraggedBlock(block);
        console.log("origin", origin);
        setTimeout(() => {
        let allElements = document.getElementsByClassName('grid-item');
        Array.from(allElements).forEach(element => {
            element.classList.add('grid-item-active');
        });
        }, 100);

    }
    const dragHandler = (e:any, gridDiv:any, gridContainerId:string, span:any) => {
        e.preventDefault(); 
        // get the dragged block details from dataTransfer
        // check if there is any existing drag-over-indicator div, if yes remove it
        let dragIndicators = document.getElementsByClassName('drag-over-indicator');
        Array.from(dragIndicators).forEach((indicator) => {
            indicator.remove();
        });
        let div = document.createElement('div');
        div.className = 'drag-over-indicator';
        div.style.gridArea = `${gridDiv.row} / ${gridDiv.col} / span ${draggedBlock.rowSpan} / span ${draggedBlock.colSpan} `;
        let gridElement = document.getElementById(gridContainerId);
        gridElement?.appendChild(div);
    }
    const openEditBlockMenu = (sectionId:any, block:any) => {
        let blockBorder = document.getElementById(`section_block_${block.uid}`);
        // find other open edit modals and close them
        if(isBlockEditingModalOpen){
            // sect-block-item
        let allEditModals = document.getElementsByClassName('sect-block-item');
        Array.from(allEditModals).forEach(modal => {
            modal.classList.remove('border-primary', 'border-3', 'border');
        });
            closeEditBlockMenu();
        }
        // let blockBorder = document.getElementById(`section_block_${block.uid}`);
        if(blockBorder){
            // blockBorder.classList.remove('d-none');
            blockBorder.classList.add('border-primary', 'border-3', 'border');
        }
        setEditBlock(block);
        setIsBlockEditingModalOpen(true);
        setCurrentSection(
            sections.find((section) => section.id === sectionId)
        );
    }
    const closeEditBlockMenu = () => {
        if(editBlock){
            let blockBorder = document.getElementById(`section_block_${editBlock.uid}`);
            if(blockBorder){
                blockBorder.classList.remove('border-primary', 'border-3', 'border');
            }
            setEditBlock(null);
            setCurrentSection(null);
                    setIsBlockEditingModalOpen(false);

        }
    }
    const handleEditBlock = (sectionId:any, block:any) => {
        // open the block edit modal
        // find the edit modal div and remove d-none class
        console.log("block clicked");
        // check if editblock is already open, if yes update the editBlock state
        if(isBlockEditingModalOpen){
            let blockBorder = document.getElementById(`section_block_${block.uid}`);
            if(blockBorder){
                // blockBorder.classList.remove('d-none');
                blockBorder.classList.add('border-primary', 'border-3', 'border');
            }
            setEditBlock(block);
            setCurrentSection(
                sections.find((section) => section.id === sectionId)
            );
        }
        let editModal = document.getElementById(`block_borders_${block.uid}`);
        if(editModal){
            editModal.classList.remove('d-none');
            editModal.classList.add('d-block');
        }
        // add d-none class to all other edit modal divs
        let allEditModals = document.getElementsByClassName('edit-block-borders');
        Array.from(allEditModals).forEach(modal => {
            if (modal !== editModal) {
                modal.classList.remove('d-block');
                modal.classList.add('d-none');
            }
        });
        toggleSectionEditBtns('hide', sectionId);
        // click outside the modal to close it except when clicking on the edit buttons
        let handleClickOutside = (event: MouseEvent) => {
            if (editModal && !editModal.contains(event.target as Node)) {
                editModal.classList.remove('d-block');
                editModal.classList.add('d-none');
                setEditSection(false);
                toggleSectionEditBtns('show', sectionId);
            }
        };
        if(editBlock == null){
            document.addEventListener('click', handleClickOutside, { once: true });
        }
        setEditSection(true);
    }
    const handleDeleteBlock = async(sectionId:any, blockId:any) => {
        // Logic to delete the block
        console.log("Deleting block:", blockId, "from section:", sectionId);
        let section = sections.find((section) => section.id === sectionId);
        if(section){
            let sectionBlocks = section?.blocks || [];
            sectionBlocks = sectionBlocks.filter((block) => block.uid !== blockId);
            section.blocks = sectionBlocks;
        }
        let updatedSections = sections.map((sec) => sec.id === section.id ? section : sec);
        setSections(updatedSections);
        if (pageDetails && pageDetails._id) {
            let updatedPageDetails = {
                ...pageDetails,
                pageContent: {
                    ...pageDetails.pageContent,
                    sections: [...updatedSections]
                }
            };
            setPageDetails(updatedPageDetails);
            // dispatch to update the store
            // console
            try{
                const data = await updatePage(updatedPageDetails);
                console.log("Page updated:", data);

            }catch(error){
                console.error("Error updating page:", error);
           }
        }
    }
    const addEditOptions = (target:any, blockId:any) => {

        // find child div with class block-item-options and remove invisible class and add class visible
        let options = document.querySelector(`#block_item_options_${blockId}`);
        if(options){
            options.classList.remove('d-none');
            options.classList.add('visible');
        }
    }
    const removeEditOptions = (target:any, blockId:any) => {
        let options = document.querySelector(`#block_item_options_${blockId}`);
        if(options){
            options.classList.add('d-none');
            options.classList.remove('visible');
        }
    }
    const createGridDivs = (rows:number, cols:number) => {
        let divIndex = 0
        let gridDivs = []
        for(let j=0; j < rows; j++) {
            for(let i=0; i< cols; i++) {
                let gridDiv = {
                    index: divIndex,
                    gridArea: `${j+1} / ${i+1} / span 1 / span 1`,
                    row: j+1,
                    col: i+1
                }
                gridDivs.push(gridDiv)
                divIndex++
            }
        }
        return gridDivs;
    }
    const addSectionHandler = async (position:any, sectionId:any) => {
        let gridDivs = createGridDivs(12, 24);
        const newSection ={
            id: uuidv4(),
            order: sections.length + 1,
            name: `Section ${sections.length + 1}`,
            blocks: [],
            grid: { rows: 12, cols: 24, gap: 3 },
            gridDivs: gridDivs,
            gap: 3,
            sectionDivision: 0,
            background: {
                image: {
                    url: '',
                    alt_text: '',
                    type: 'promotion_banner',
                    imageId: undefined,
                    show: false,
                    file: null,
                },
                video: { url: '', show: false },
                color: '#ffffff',
            }
        }
        // if page exists
        let allSections: React.SetStateAction<any[]> = [];

        if (position === 'none') {
            allSections = [...sections, newSection];
            setSections(allSections);
        } else if (position === 'before') {
            // get currenet section index from sections array
            let currentIndex = sections.findIndex((section) => section.id === sectionId);
            allSections = [...sections.slice(0, currentIndex), newSection, ...sections.slice(currentIndex)];
            setSections(allSections);
        } else if (position === 'after') {
            let currentIndex = sections.findIndex((section) => section.id === sectionId);
            allSections = [...sections.slice(0, currentIndex + 1), newSection, ...sections.slice(currentIndex + 1)];
            setSections(allSections);
        }
        if (pageDetails && pageDetails._id) {
            // update the pageDetails with the new section
            let updatedPageDetails = {
                ...pageDetails,
                pageContent: {
                    ...pageDetails.pageContent,
                    sections: [...allSections]
                }
            };
            console.log("Updating existing page with details:", updatedPageDetails);
            setPageDetails(updatedPageDetails);
            // dispatch to update the store
            try{
                const data = await updatePage(updatedPageDetails);
                console.log("Page updated:", data);

            }catch(error){
                console.error("Error updating page:", error);

            }
        }else{
            let pageDetail = {
                id: uuidv4(),
                pageContent: { sections: [newSection] },
                // sections: [newSection],
                name: pageName || 'New Page',
                pageName: pageName ?? 'New Page',
                storeId: storeInfo?.storeId || '',
                storeNumber: storeInfo?.storeNumber || '',
                slug: pageName?.toLowerCase().replace(/\s+/g, '_') || 'new_page',

            }
            console.log("Creating new page with details:", pageDetail);
            // return
            setPageDetails(pageDetail);
            // dispatch to update the store
            try{
                const data = await createPage(pageDetail);
                console.log("Page created:", data);
            }catch(error){
                console.error("Error creating page:", error);
            }
        }
        console.log("sections after adding new section:", sections);
    }
    const togglePageSettings = (e: React.MouseEvent, action: 'enter' | 'leave' | 'drag', sectionId: string) => {
        e.stopPropagation();
        let target = document.getElementById(`section_${sectionId}`);
        let addSectionBtn = document.querySelectorAll(`.section_edit_btns_${sectionId}`);
        // console.log("addSectionBtn:", addSectionBtn);
        if (action === 'drag') {
            // addSectionBtn.forEach((btn) => {
            //     btn.classList.add('invisible');
            // });
        } else if(action === 'enter'){
            if(editSection) return;
            target?.classList.add('section-hover-active');
            // get child div with class add-section-btn  remove invisible class and add class visible
            addSectionBtn.forEach((btn) => {
                btn.classList.remove('invisible');
                btn.classList.add('visible');
            });
            // target?.classList.add('section-hover-active');
        } else {
            target?.classList.remove('section-hover-active');
            addSectionBtn.forEach((btn) => {
                btn.classList.remove('visible');
                btn.classList.add('invisible');
            });
        }
        setShowpageSettings(!showpageSettings)
    }
    const duplicateSection = (sectionId:string) => {
        let section = sections.find((section) => section.id === sectionId);
        if(section){
            let newSection = {
                ...section,
                id: uuidv4(),  
                name: section.name + ' Copy',
                order: sections.length + 1,
            }
            let allSections = [...sections, newSection];
            if (pageDetails && pageDetails._id) {
                // update the pageDetails with the new section
                let updatedPageDetails = {
                    ...pageDetails,
                    pageContent: {
                        ...pageDetails.pageContent,
                        sections: allSections
                    }
                };
                setPageDetails(updatedPageDetails);
                // dispatch to update the store
                try{
                    const data = updatePage(updatedPageDetails);
                    console.log("Page updated:", data);
                }catch(error){
                    console.error("Error updating page:", error);
                }
            }
            setSections([...sections, newSection])
        }
    }
    const moveSection = (sectionId:string, direction:'up' | 'down') => {
        // Find the index of the section to move
        let index = sections.findIndex((section) => section.id === sectionId);
        // If found, swap it with the previous or next section based on direction
        if(index !== -1){
            // Create a copy of the sections array
            let newSections = [...sections];
            // Swap the sections based on direction
            if(direction === 'up'){
                // Move the section up
                if(index > 0){
                    // Swap with the previous section
                    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
                }
            }else{
                if(index < sections.length - 1){
                    [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
                }
            }
            setSections(newSections);
            if (pageDetails && pageDetails._id) {
                // update the pageDetails with the new section
                let updatedPageDetails = {
                    ...pageDetails,
                    pageContent: {
                        ...pageDetails.pageContent,
                        sections: newSections
                    }
                };
                setPageDetails(updatedPageDetails);
                // dispatch to update the store
                try{
                    const data = updatePage(updatedPageDetails);
                    console.log("Page updated:", data);
                }catch(error){
                    console.error("Error updating page:", error);
                }
            }
        }
    }
    const updateRowCount = async (e: React.ChangeEvent<HTMLInputElement>, sectionId: string) => {
        let allSections = [];
        let section = sections.find((section) => section.id === sectionId);
        if(section){
            // update the section with the new row count
            // find if the block is already added to the section
            console.log("updateRowCount:", e.target.value);
            // show grid when row count is changed
            showGrids(true);
            let gridDivs = createGridDivs(Number(e.target.value), 24);
            let updatedSection = {
                ...section,
                gridDivs: gridDivs,
                grid:{
                    ...section.grid, rows: Number(e.target.value), cols: 24
                }
            };
            allSections = sections.map((sec) => sec.id === section.id ? updatedSection : sec);
            setSections(allSections);
            // togglePageSettings(e, 'enter', section.id);
        }
        // update the pageDetails with the new section
        if (pageDetails && pageDetails._id) {
            let updatedPageDetails = {
                ...pageDetails,
                pageContent: {
                    ...pageDetails.pageContent,
                    sections: [...allSections]
                }
            }
            console.log("Updating existing page with details:", updatedPageDetails);
            setPageDetails(updatedPageDetails);
            // dispatch to update the store
            try{
                const data = await updatePage(updatedPageDetails);
                console.log("Page updated:", data);

            }catch(error){
                console.error("Error updating page:", error);

            }
        }
        showGrids(false);

    }
    const removeSection = async (sectionId:string) => {
        let allSections = sections.filter((section) => section.id !== sectionId);
        // remove the section from sections array
        let updatedSections = sections.filter((sec) => sec.id !== sectionId);
        setSections(updatedSections);
        if (pageDetails && pageDetails._id) {
            // update the pageDetails with the new section
            let updatedPageDetails = {
                ...pageDetails,
                pageContent: {
                    ...pageDetails.pageContent,
                    sections: [...allSections]
                }
            }
            console.log("Updating existing page with details:", updatedPageDetails);
            setPageDetails(updatedPageDetails);
            // dispatch to update the store
            try{
                const data = await updatePage(updatedPageDetails);
                console.log("Page updated:", data);
            }catch(error){
                console.error("Error updating page:", error);
            }
        }
    }
    const showAddBlockMenu = () => {
        setShowBlockMenu(!showBlockMenu)
        let adminBodyContentwidth = document.getElementById('adminBodyContent')?.clientWidth;
        let adminSidebarContainerWidth = document.getElementById('adminSidebarContainer')?.clientWidth;
        let leftPos = adminSidebarContainerWidth;
        let topPos = window.scrollY + 300;
        let menu = document.getElementById('adminBlockMenu');
        if(menu){
            if(adminBodyContentwidth === adminSidebarContainerWidth){
                menu.style.left = '10%';
            }else{
                menu.style.left = leftPos + 'px';
            }
            // menu.style.top = topPos + 'px';
        }
    }
    const expandBlock = async (sectionId: any, blockId: any, direction: 'top' | 'bottom' | 'left' | 'right', action: 'increase' | 'reduce') => {
        // find the block from sections by sectionId and blockId
        let section = sections.find((section) => section.id === sectionId);
        let sectionBlocks = section?.blocks || [];
        let block = sectionBlocks.find((block: any) => block.uid === blockId);
        // return
        // Modify block based on direction
            if (direction === 'top') {
                if (action === 'reduce') {
                    if (block.rowSpan > 1) {
                        block = {
                            ...block,
                            rowstart: block.rowstart + 1,
                            rowSpan: block.rowSpan - 1,
                        };
                    }
                } else {
                    if (block.rowstart > 1) {
                        block = {
                            ...block,
                            rowstart: block.rowstart - 1,
                            rowSpan: block.rowSpan + 1,
                        };
                    }
                }
            } else if (direction === 'bottom') {
                if (action === 'reduce') {
                    if (block.rowSpan > 1) {
                        block = {
                            ...block,
                            rowSpan: block.rowSpan - 1,
                        };
                    }
                } else {
                    if ((block.rowstart + block.rowSpan - 1) < section.grid.rows) {
                        block = {
                            ...block,
                            rowSpan: block.rowSpan + 1,
                        };
                    }
                }
            } else if (direction === 'left') {
                if (action === 'reduce') {
                    if (block.colSpan > 1) {
                        block = {
                            ...block,
                            colstart: block.colstart + 1,
                            colSpan: block.colSpan - 1,
                        };
                    }
                } else {
                    if (block.colstart > 1) {
                        block = {
                            ...block,
                            colstart: block.colstart - 1,
                            colSpan: block.colSpan + 1,
                        };
                    }
                }
            } else if (direction === 'right') {
                if (action === 'reduce') {
                    if (block.colSpan > 1) {
                        block = {
                            ...block,
                            colSpan: block.colSpan - 1,
                        };
                    }
                } else {
                    if ((block.colstart + block.colSpan - 1) < section.grid.cols) {
                        block = {
                            ...block,
                            colSpan: block.colSpan + 1,
                        };
                    }
                }
            }
        console.log("block after expand:", block);
        // update the block in sectionBlocks
        let updatedSectionsBlocks: any[] = sectionBlocks.map((b: { uid: any; }) => b.uid === block.uid ? block : b);
        let updatedSection = {
            ...section,
            blocks: updatedSectionsBlocks
        }
        let updatedSections = sections.map((sec) => sec.id === section.id ? updatedSection : sec);
        setSections(updatedSections);
        if (pageDetails && pageDetails._id) {
            // update the pageDetails with the new section
            let updatedPageDetails = {
                ...pageDetails,
                pageContent: {
                    ...pageDetails.pageContent,
                    sections: [...updatedSections]
                }
            }
            console.log("Updating existing page with details:", updatedPageDetails);
            setPageDetails(updatedPageDetails);
            // dispatch to update the store
            // return
            try{
                const data = await updatePage(updatedPageDetails);
                console.log("Page updated:", data);
            }catch(error){
                console.error("Error updating page:", error);
            }
        }
        // let block = document.getElementById(`content_block_${blockId}`);
    }
    const showEditSectionModal = (e: React.MouseEvent<Element, MouseEvent>, sectionId:any) => {
          e.stopPropagation(); // prevent this click from triggering outside handler
        let modal = document.getElementById(`section_editor_${sectionId}`);
        if(!editSection){
            if(modal){
                modal.classList.remove('d-none');
                modal.classList.add('d-block');
            }
            toggleSectionEditBtns('hide', sectionId);
            // click outside the modal to close it
            setEditSection(true);
            setTimeout(() => {
                let handleclick=(event: MouseEvent) => {};
                let handleClickOutside = (event: MouseEvent) => {
                    if (modal && !modal.contains(event.target as Node)) {
                        modal.classList.remove('d-block');
                        modal.classList.add('d-none');
                        setEditSection(false);
                        togglePageSettings(e, 'enter', sectionId)
                    }
                    // remove the event listener after first click
                    document.removeEventListener('click',handleclick);
                };
                document.addEventListener('click', handleClickOutside);
            }, 0);
        }else{
            if(modal){
                modal.classList.remove('d-block');
                modal.classList.add('d-none');
            }
            // add section_edit_btns
            toggleSectionEditBtns('show', sectionId);
            setEditSection(false);
        }
    }
    const toggleSectionEditBtns= (action: 'show' | 'hide', sectionId:string) => {
        let sectionEditBtns = document.getElementsByClassName(`section_edit_btns_${sectionId}`);
        Array.from(sectionEditBtns).forEach((btn) => {
            btn.classList.toggle('invisible', action === 'hide');
            btn.classList.toggle('visible', action === 'show');
        });
    }
    const updateSection = async (section:any) => {
        console.log("Updating section:", section);
        let updatedSections = sections.map((sec) => sec.id === section.id ? section : sec);
        setSections(updatedSections);
        if (pageDetails && pageDetails._id) {
            // update the pageDetails with the new section
            let updatedPageDetails = {
                ...pageDetails,
                pageContent: {
                    ...pageDetails.pageContent,
                    sections: [...updatedSections]
                }
            };
            console.log("Updating existing page with details:", updatedPageDetails);
            setPageDetails(updatedPageDetails);
            // dispatch to update the store
            try{
                const data = await updatePage(updatedPageDetails);
                console.log("Page updated:", data);
            }catch(error){
                console.error("Error updating page:", error);
            }
        }
    }
    const menuRef = useRef(null);
        let r = document.querySelector(':root') as HTMLElement | null;

    // Attach event listener on mount
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // console.log("Clicked outside:", event.target);
            // if click target is NOT inside the menu
            if(menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
                setShowBlockMenu(false);
            }
            // if dragging, remove turn of showBlockMenu
        }
        // needs to be outside the useEffect to avoid re-creating the function on every render
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        console.log('store: ', storeInfo)
        console.log('store test: ', store)
        if(pageDetailById){
            console.log("pageDetailById:", pageDetailById);
            // If pageDetailById is an array, use the first element
            const pageDetail = Array.isArray(pageDetailById) ? pageDetailById[0] : pageDetailById;
            setPageDetails(pageDetail);
            setSections(pageDetail?.pageContent?.sections || []);
        }
        if(store){
            setStoreDetails(store);
            if(store.storeTheme){
                setStoreTheme(store.storeTheme);
                setStoreBodyFont(store.storeTheme.fonts.body);
                setStoreHeadingFont(store.storeTheme.fonts.heading);
                r?.style.setProperty('--bodyFont', store.storeTheme.fonts.body);
                r?.style.setProperty('--headingFont', store.storeTheme.fonts.heading);
            }
        }
    }, [pageDetailById, storeInfo,store]);

    return (
        <>
            {
                store ?
                <GoogleFont fonts={[{ font: store.storeTheme.fonts.heading, weights: [400, 700] }, { font: store.storeTheme.fonts.body, weights: [400, 700] }]} subsets={['latin', 'latin-ext']}/>
            : <></>
            }
            <div className={`body-font admin-format-page position-relative ${isDragging ? 'is-dragging' : ''}`} style={{ minHeight: '100vh' }}>
                {/* <GoogleFont fonts={[{ font: headingFont, weights: [400, 700] }, { font: bodyFont, weights: [400, 700] }]} subsets={['latin', 'latin-ext']} /> */}
                <div className='text-capitalize w-100 bg-light p-4 my-2 rounded rounded-2'>FormatPage: <strong>{pageName}</strong>
                </div>
                <div className={ showBlockMenu ? "m-3 visible" : "d-none"} ref={menuRef}>
                    <div className="card position-fixed " id='adminBlockMenu' style={{width: '300px', zIndex: 50000, maxHeight: '80vh', overflowY: 'auto',}} >
                        <div className="card-body">
                            <h5 className="card-title">Add Content</h5>
                            <p className="card-text">Drag and drop to add content to your page</p>
                            <h5>Basic</h5>
                            <div className='d-flex flex-wrap justify-content-between'>
                            {
                                designBlocks.map((block, index) => (
                                    <div className="col-6" key={index}>
                                        <div className="border p-4 bg-white content-block" style={{cursor: 'grab'}} draggable={true} 
                                        onDragStart={(e) => dragstartHandler(e, block, 'addBlockMenu')} 
                                        onDragEnd={onBlockDragEnd}
                                        id={`content_block_${block.type}`}>
                                            <i className={block.icon}></i> {block.name}
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='position-fixed top-10 start-50 translate-middle' style={{zIndex: 1050}}>
                {
                    currentSection && editBlock &&
                    <BlockEditingModal type={editBlock.type} section={currentSection} editBlock={editBlock} setEditBlock={setEditBlock} updateSection={updateSection} closeEditBlockMenu={closeEditBlockMenu} storeHeadingFont={storeHeadingFont} storeTheme={storeTheme} storeBodyFont={storeBodyFont} storeInfo={storeInfo} pageDetails={pageDetails}/>
                }

                </div>
                <div className="position-relative" style={{zIndex: 100}}>
                    <div className="">
                        <div className="rounded 0">
                            {
                                sections.length > 0 ?
                                <div>
                                    {
                                        sections.map((section, index) => (
                                            <div key={'section'+index} className='border-2 rounded position-relative hover-container' id={`section_${section.id}`} 
                                            onMouseEnter={(e)=>{
                                                togglePageSettings(e, 'enter', section.id);
                                            }} 
                                            onMouseLeave={(e)=>{
                                                togglePageSettings(e, 'leave', section.id);
                                            }}
                                            >
                                                {
                                                    section.background.image.url && section.background.image.show &&
                                                    <div className='position-absolute top-0 start-0 bottom-0 end-0' style={section.background.image ? {backgroundImage: `url(${URL.createObjectURL(section.background.image.file)})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative',
                                                    zIndex: -1,
                                                } : {}} ></div>
                                                }
                                                <div className={`d-flex justify-content-center bg-transparent position-absolute start-50 translate-middle-x translate-middle-y invisible section_edit_btns_${section.id} section-edit-btns`} style={{zIndex: 10}}>
                                                    <button className='btn btn-primary' onClick={() => addSectionHandler('before', section.id)}>add Section</button>
                                                </div>
                                                <button className={`bg-light rounded rounded-2 p-3 position-absolute top-0 start-0 section_edit_btns_${section.id} section-edit-btns`} 
                                                onClick={() => {
                                                    showAddBlockMenu();
                                                }
                                                }><i className="fas fa-plus"></i> Add Block</button>

                                                <div className={`list-group p-2 bg-light position-absolute top-0 end-0 rounded section_edit_btns_${section.id} section-edit-btns`} role="tablist" aria-orientation="vertical">
                                                    <button type="button" className="list-group-item list-group-item-action p-3" aria-current="true" onClick={(e) => showEditSectionModal(e,section.id)}>
                                                        <i className="fas fa-edit"></i> Edit Section
                                                    </button>
                                                    <div className="list-group-item p-0">
                                                        <ToolTip text="Duplicate" position="top">
                                                            <button><i className="fas fa-copy" onClick={() => duplicateSection(section.id)}></i></button>
                                                        </ToolTip>
                                                        <ToolTip text="Move up" position="top">
                                                            <button onClick={() => moveSection(section.id, 'up')}><i className="fas fa-arrow-up"></i></button>
                                                        </ToolTip>
                                                        <ToolTip text="Move down" position="left">
                                                            <button onClick={() => moveSection(section.id, 'down')}><i className="fas fa-arrow-down"></i></button>
                                                        </ToolTip>
                                                    </div>
                                                    <button type="button" className="list-group-item list-group-item-action p-3" aria-current="true" onClick={()=> {
                                                        removeSection(section.id);
                                                    }}>
                                                        <i className="fas fa-trash"></i> Remove
                                                    </button>
                                                </div>
                                                <SectionEditBlock  section={section} sections={sections} setSections={setSections} showGrids={showGrids} updateRowCount={updateRowCount} showEditSectionModal={showEditSectionModal}/>
                                                <div id={'section_grid'+section.id} className='section-grid w-100 sections-cst' 
                                                    style={
                                                        section.background.image.show ? {
                                                            gridTemplateRows: `repeat(${section.grid.rows}, 50px)`,
                                                            gap: section.grid.gap ? `${section.grid.gap}px` : '0',
                                                            backgroundColor: 'transparent'
                                                        } : {
                                                            gridTemplateRows: `repeat(${section.grid.rows}, 50px)`,
                                                            gap: section.grid.gap ? `${section.grid.gap}px` : '0',
                                                        }
                                                    }>
                                                    {
                                                        section.gridDivs.map((gridDiv:any) => (
                                                            <div 
                                                            className='grid-item'
                                                            key={`grid_item_${gridDiv.index}`}
                                                            id={`grid_item_${gridDiv.index}`} 
                                                            style={{gridArea: gridDiv.gridArea}}
                                                            onDrop={(e) => dropHandler(e, gridDiv, section.id)}
                                                            onDragLeave={(e) => {
                                                                e.preventDefault();
                                                                let dragIndicators = document.getElementsByClassName('drag-over-indicator');
                                                                Array.from(dragIndicators).forEach((indicator) => { indicator.remove(); });
                                                                togglePageSettings(e, 'drag', section.id)
                                                            }}
                                                            onDragOver={(e) => {
                                                                e.preventDefault()
                                                                dragHandler(e, gridDiv, `${'section_grid'+section.id}`, span)
                                                                togglePageSettings(e, 'drag', section.id)
                                                            }}
                                                            >
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        section.blocks?.length >0 ?
                                                        section.blocks.map((block:any, bIndex:number) => (
                                                            <Blocks key={bIndex} block={block} addEditOptions={addEditOptions} dragstartHandler={dragstartHandler}
                                                            removeEditOptions={removeEditOptions}
                                                            handleEditBlock={handleEditBlock}
                                                            section={section} expandBlock={expandBlock}
                                                            openEditBlockMenu={openEditBlockMenu}
                                                            handleDeleteBlock={handleDeleteBlock}
                                                            
                                                            />
                                                        ))
                                                        : null
                                                    }
                                                </div>
                                                <div className={`d-flex justify-content-center bg-transparent position-absolute start-50 translate-middle-x translate-middle-y section_edit_btns_${section.id} section-edit-btns`} style={{zIndex: 10}}>
                                                    <button className='btn btn-primary' onClick={() => addSectionHandler('after', section.id)}>add Section</button>
                                                </div>
                                                {/* {
                                                    showpageSettings ?
                                                    : null
                                                } */}
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div className='text-center p-5 border border-2 border min-vh-40 d-flex justify-content-center align-items-center'>
                                    <button className="btn btn-primary btn-lg" type="button" onClick={() => addSectionHandler('none', null)}>Add Section</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="staticBackdrop" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1> */}
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormatPage