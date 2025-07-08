import { useContext, useEffect } from 'react'
import { Store } from '../../Store'
import { useGetAdminByIdQuery } from '../../hooks/userHooks'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { Button, Card } from 'react-bootstrap'

function AdminProfilePage() {
    const {state:{ userAdminInfo} } = useContext(Store)
    // const params = useParams()
    const id = userAdminInfo?._id
    console.log('id:', id)
    const { data: adminUser, isLoading, error }=useGetAdminByIdQuery(userAdminInfo?._id!)
    useEffect(() => {
        console.log("userAdminInfo:", userAdminInfo)
        // localStorage.getItem('userAdminInfo')
    }, [userAdminInfo])
    

    return (
        <div>
            <h4 className='mb-4'>Profile</h4>
            <Card className='w-100'>
                <Card.Header>Profile</Card.Header>
                <Card.Body>
                    {
                        isLoading ? (
                        <LoadingBox /> ) :
                        error?
                        (
                            <MessageBox variant='danger'> User Not Found</MessageBox>
                        )
                        :
                        (
                            <div>
                                <Card.Title>Special title treatment</Card.Title>
                                    <div className="d-flex">
                                        <img className='rounded-circle col-1' src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
                                        <div className='col-11 ps-5'>
                                            <h1>{adminUser?.firstName} {adminUser?.lastName}</h1>
                                            <p>{adminUser?.adminType}</p>
                                        </div>

                                    </div>
                            </div>
                        )
                    }
                    <Button variant="primary">Save Changes</Button>
                </Card.Body>
            </Card>
            <Card className='w-100 my-3'>
                {/* <Card.Header>
                </Card.Header> */}
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Personal Information</h5>
                        <Button variant="primary"  size="sm">edit</Button>
                    </div>
                    <hr />
                    <div>
                        email address : {adminUser?.email}

                    </div>
                    
                    <Button variant="primary">Save Changes</Button>
                </Card.Body>

            </Card>
        </div>
    )
}

export default AdminProfilePage