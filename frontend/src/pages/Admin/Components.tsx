import { useState } from 'react'
import designComponentTypes from '../../designComponentTypes.json'

function Components() {
    const [components] = useState(designComponentTypes.componentLibrary);
  return (
    <div>
        <h1>Design Components</h1>
        <div className="accordion accordion-flush" id="accordionFlushExample">
            {/* <h2>{component.name}</h2>
            <p>{component.description}</p>
            <ul>
                {component.purpose.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul> */}
            {components.map((component, idx) => (
                    <div className="accordion-item" key={idx}>
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${idx}`} aria-expanded="false" aria-controls={`flush-collapse${idx}`}>
                                {component.name}
                            </button>
                        </h2>
                        <div id={`flush-collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"><p>{component.description}</p>
                                <ul>
                                    {component.purpose.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
            ))}
            {/* <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Accordion Item #2
                </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Accordion Item #3
                </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Components