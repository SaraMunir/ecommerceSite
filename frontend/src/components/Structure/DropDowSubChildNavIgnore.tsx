import React from 'react'
import Button from 'react-bootstrap/esm/Button';

function DropDowSubChildNav(props: { category: { subCategories: any[];  }; categories: any}) {
  return (
    <>
        <Button variant="link" className=''><i className="fas fa-chevron-right"></i></Button>
        <div className='position-absolute top-0 start-100 hover-menu'>
            <div className="list-group bg-white border">
                {
                    props.category.subCategories.map((grandChild)=>

                        <>
                        {
                            props.categories.map((subGrandChild)=>
                            subGrandChild._id == grandChild ?
                            <div className='list-group-item list-group-item-action p-3 rounded-0'>{subGrandChild.name}</div>
                            :null
                            )
                        }
                        </>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default DropDowSubChildNav