import React from 'react'

function BlockEditingModal({type}: {type: string}) {
  return (
    <div className='card col-md-5 mx-auto my-3 position-absolute top-10 end-10' style={{ zIndex: 2000 }}>
        <div className="card-body min-vh-45 position-relative">
            <button className='btn bg-primary btn-close position-absolute top-0 end-0 translate-middle' onClick={(e) => {
                // showEditSectionModal(e, section.id);
            }}> </button>
            
            {/* <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id={"nav-design-tab-" + section.id} data-bs-toggle="tab" data-bs-target={"#nav-design-" + section.id} type="button" role="tab" aria-controls={"#nav-design-" + section.id} aria-selected="true">Design</button>
                    <button className="nav-link" id={"nav-background-tab-" + section.id} data-bs-toggle="tab" data-bs-target={"#nav-background-" + section.id} type="button" role="tab" aria-controls={"#nav-background-" + section.id} aria-selected="false">Background</button>
                </div>
            </nav> */}
        </div>
    </div>
  )
}

export default BlockEditingModal