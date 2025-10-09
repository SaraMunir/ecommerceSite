import { video } from '@cloudinary/url-gen/qualifiers/source';
import React from 'react'

function SectionEditBlock({ section, sections, setSections, showGrids, updateRowCount, showEditSectionModal }: { section: any, sections: any[], setSections: React.Dispatch<React.SetStateAction<any[]>>, showGrids: (show: boolean) => void, updateRowCount: (e: React.ChangeEvent<HTMLInputElement>, sectionId: string) => void, showEditSectionModal: (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => void }) {
  return (
    <div id={`section_editor_${section.id}`} className='card col-md-5 mx-auto my-3 position-absolute top-10 end-10 d-none' style={{ zIndex: 2000 }}>
        <div className="card-body min-vh-45 position-relative">
            <button className='btn bg-primary btn-close position-absolute top-0 end-0 translate-middle' onClick={(e) => {
                showEditSectionModal(e, section.id);
            }}> </button>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id={"nav-design-tab-" + section.id} data-bs-toggle="tab" data-bs-target={"#nav-design-" + section.id} type="button" role="tab" aria-controls={"#nav-design-" + section.id} aria-selected="true">Design</button>
                    <button className="nav-link" id={"nav-background-tab-" + section.id} data-bs-toggle="tab" data-bs-target={"#nav-background-" + section.id} type="button" role="tab" aria-controls={"#nav-background-" + section.id} aria-selected="false">Background</button>
                </div>
            </nav>
            <div className="tab-content m-3" id="nav-tabContent">
                <div className="tab-pane fade show active" id={"nav-design-" + section.id} role="tabpanel" aria-labelledby={"nav-design-tab-" + section.id} tabIndex={0}>
                    <h6>Grid</h6>
                    <div className="d-flex">
                        <label htmlFor='rowCount' className='form-label col-md-7'>Row Count: {section.grid.rows}   </label>
                        <input type="number" className='form-control' value={section.grid.rows} min={1} max={24} onChange={(e)=>{
                            updateRowCount(e, section.id);
                        }}/>
                    </div>
                    <div className="d-flex">
                        <label htmlFor='rowCount' className='form-label col-md-7'>Gap:</label>
                        <input type="number" className='form-control' value={section.grid.gap} min={0} onChange={(e)=>{
                            showGrids(true);
                            let updatedSection = {
                                ...section,
                                gap: Number(e.target.value)
                            };
                            setSections(sections.map((sec) => sec.id === section.id ? updatedSection : sec));
                        }} />
                    </div>
                </div>
                <div className="tab-pane fade" id={"nav-background-" + section.id} role="tabpanel" aria-labelledby={"nav-background-tab-" + section.id} tabIndex={0}>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id={"pills-image-tab-" + section.id} data-bs-toggle="pill" data-bs-target={"#pills-image-" + section.id} type="button" role="tab" aria-controls={"pills-image-" + section.id} aria-selected="true">Image</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id={"pills-video-tab-" + section.id} data-bs-toggle="pill" data-bs-target={"#pills-video-" + section.id} type="button" role="tab" aria-controls={"pills-video-" + section.id} aria-selected="false">video</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id={"pills-color-tab-" + section.id} data-bs-toggle="pill" data-bs-target={"#pills-color-" + section.id} type="button" role="tab" aria-controls={"pills-color-" + section.id} aria-selected="false">color</button>
                        </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id={"pills-image-" + section.id} role="tabpanel" aria-labelledby={"pills-image-tab-" + section.id} tabIndex={0}>
                                Image Content
                                <div>
                                    {/* upload image */}
                                    <input type="file" className='form-control' id={'bgImage' + section.id} />
                                    <button className='btn btn-secondary mt-2' onClick={()=>{
                                        showGrids(true);
                                        let updatedSection = {
                                            ...section,
                                            background: {
                                                image: {
                                                    url: (document.getElementById('bgImage' + section.id) as HTMLInputElement)?.files?.[0] || null,
                                                    alt: '',
                                                    file: (document.getElementById('bgImage' + section.id) as HTMLInputElement)?.files?.[0] || null,
                                                    show: true
                                                }
                                            }
                                        };
                                        setSections(sections.map((sec) => sec.id === section.id ? updatedSection : sec));
                                    }}>Upload</button>
                                </div>
                            </div>
                            <div className="tab-pane fade" id={"pills-video-" + section.id} role="tabpanel" aria-labelledby={"pills-video-tab-" + section.id} tabIndex={0}>
                                video Content
                                <div>
                                    <input type="text" className='form-control' placeholder='Video URL' />
                                    <button className='btn btn-secondary mt-2' onClick={() => {
                                        // add video url to section
                                        let videoUrl = (document.getElementById('videoUrl' + section.id) as HTMLInputElement)?.value || '';
                                        // set img show to false if video url is added
                                        showGrids(true);

                                        let updatedSection = {
                                            ...section,
                                            background: {
                                                ...section.background,
                                                image: {
                                                    ...section.background.image,
                                                    show: false
                                                },
                                                video: { url: videoUrl, show: true }
                                            }
                                        };
                                        setSections(sections.map((sec) => sec.id === section.id ? updatedSection : sec));
                                    }}>Add Video</button>
                                </div>
                            </div>
                            <div className="tab-pane fade" id={"pills-color-" + section.id} role="tabpanel" aria-labelledby={"pills-color-tab-" + section.id} tabIndex={0}>Color Content</div>
                        </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SectionEditBlock