import { useContext } from "react"
import { Store } from "../../Store"
import { useGetProductListByStoreIdQuery } from "../../hooks/productHooks"
import LoadingBox from "../../components/LoadingBox"
import MessageBox from "../../components/MessageBox"
import { ApiError } from "../../types/ApiError"
import { getError } from "../../utils"
import { Product } from "../../types/Product"
import { Form, Link } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import { useGetStoreDetailsByIdQuery } from "../../hooks/storeHooks"

function AdminProductPage() {
  const {state:{ storeInfo}, dispatch } = useContext(Store)

    const { data: stores }=useGetStoreDetailsByIdQuery(storeInfo?.storeId!)

      const { data: products, isLoading, error } =useGetProductListByStoreIdQuery(storeInfo?.storeId!)

  
  return isLoading ? (
              <LoadingBox />
          ) : error ? (
              <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
          ) :
  (
    <div>
        <Card className='w-100 my-3'>
          <Card.Body className='p-4'>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Store Details</h5> 
                    <Link variant="primary" size="md" to={`/Admin/Store/${storeInfo?.storeNumber}/Product/Create`} >Create Product</Link>
                </div>
                <ul className="list-group list-group">
                  <li className="list-group-item bg-primary-subtle text-capitalize fw-semibold d-flex">
                      <div className='col-3'>Product</div>
                      <div className="col-2">Price</div>
                      <div className="col-2">Status</div>
                      <div className="col-2">total sales</div>
                      <div className="col-2">created at</div>
                      <div className="col-1"></div>
                  </li>
                {
                  products ?
                  products?.map((product:Product)=>
                  <li className="list-group-item d-flex">
                      <div className='col-3'>
                        <Link to={`/Admin/Store/${storeInfo?.storeNumber}/Product/${product._id}`}>
                        <img className="me-2" src={product.image} alt="" style={{width:'50px', height: "50px", objectFit:"cover"}}/>
                        {product.name}
                        </Link>
                      </div>
                      <div className="col-2">{product.price} {stores?.currency}</div>
                      <div className="col-2">
                        {
                          product.status == 'draft' ? <span className="col-7 badge bg-secondary"> {product.status} </span>:

                          product.status == 'published' ? <span className="col-7 badge bg-success"> {product.status} </span>
                          :
                          
                          <span className="col-7 badge bg-danger"> {product.status} </span>

                        }
                        </div>
                      <div className="col-2">total sales</div>
                      <div className="col-2">{product.createdAt}</div>
                      <div className="col-1 text-center"><Link to={`/Admin/Store/${storeInfo?.storeNumber}/Product/${product._id}`}>View</Link></div>
                  </li>
                  )
                  :null
                }
                </ul>
        </Card.Body>
    </Card>
    </div>
  )
}

export default AdminProductPage