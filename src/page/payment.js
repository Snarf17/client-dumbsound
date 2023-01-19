import { Button, Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap"
import NavHeader from "../component/navbar"
// import './component/style.css'
import { useContext, useEffect, useState} from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { API } from "../config/api"
import { addDays } from '@progress/kendo-date-math';
import moment from 'moment'
import Swal from "sweetalert2"


// import { useState } from "react"
// import navStyle from './navbar.module.css'

function Pay() {
    const navigate = useNavigate()
    const [state] = useContext(UserContext)
    const [date, setDate] = useState(new Date())
    const seven = addDays(date, 7)
    const fourten = addDays(date, 14)
    const one = addDays(date, 30)
    const sevenDays =  moment(seven).format("YYYY-MM-DD")
    const fourtenDays =  moment(fourten).format("YYYY-MM-DD")
    const oneMonth =  moment(one).format("YYYY-MM-DD")

    console.log(sevenDays);
    console.log(fourtenDays);
   
    // const 
    // useEffect(() => {
    //     //change this to the script source you want to load, for example this is snap.js sandbox env
    //     const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //   //   change this according to your client-key
    //     const myMidtransClientKey = "SB-Mid-client-YzIRPoOShKOps2nD";
      
    //     let scriptTag = document.createElement("script");
    //     scriptTag.src = midtransScriptUrl;
    //   //   optional if you want to set script attribute
    //   //   for example snap.js have data-client-key attribute
    //     scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
    //     document.body.appendChild(scriptTag);
    //     return () => {
    //       document.body.removeChild(scriptTag);
    //     };
    //   }, []);
    const PayPremium7 = useMutation( async() => {
    try { 
        let formData = new FormData() 
        formData.set('dueDate', sevenDays)
        formData.set('user_id', state.user.id)
        // console.log(formData);
        const response = await API.post('/transaction', formData)
        if (response.status === 200) {
            const formData = new FormData()
            formData.set("status", "success")
            const resUpdate = API.patch(`/transaction/${response.data.data.id}`, formData)
            console.log("Berhasil Update", resUpdate.data);
        }else{
        
        }
        
        // console.log(response);
        console.log("response beli", response)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Please Waiting Approvement Admin"
            // text: 'Berhasil Login',
          })
    } catch (error) {
        console.log(error);
    }
    })  
    const PayPremium14 = useMutation( async() => {
    try { 
        let formData = new FormData() 
        formData.set('dueDate', fourtenDays )
        formData.set('user_id', state.user.id)
        // console.log(formData);
        const response = await API.post('/transaction', formData)
        // console.log(response);
        console.log("response beli", response)
        if (response.status === 200) {
            const formData = new FormData()
            formData.set("status", "success")
            const resUpdate = API.patch(`/transaction/${response.data.data.id}`, formData)
            console.log("Berhasil Update", resUpdate.data)
        }else{
        
        }
        Swal.fire({
            icon: 'success',
            title: 'Success',
            // text: 'Berhasil Login',
          })
    } catch (error) {
        console.log(error);
    }
    })  
    const PayPremium30 = useMutation( async() => {
    try { 
        let formData = new FormData() 
        formData.set('dueDate', oneMonth )
        formData.set('user_id', state.user.id)
        // console.log(formData);
        const response = await API.post('/transaction', formData)
        // console.log(response);
        console.log("response beli", response)
        if (response.status === 200) {
            const formData = new FormData()
            formData.set("status", "success")
            const resUpdate = API.patch(`/transaction/${response.data.data.id}`, formData)
            console.log("Berhasil Update", resUpdate);
        }else{
        
        }
        Swal.fire({
            icon: 'success',
            title: 'Success',
            // text: 'Berhasil Login',
          })
    } catch (error) {
        console.log(error);
    }
    })  
    return(
        <>
            <NavHeader/>
            <Container className='d-flex flex-column justify-content-center pt-5'>
            <div className='font-title text-center modal-login'>
                <h4 className='fw-bold text-white fs-2' >Premium</h4>
                <p className="fs-6 text-weight-light ">Bayar sekarang dan nikmati streaming music yang kekinian dari <Image src="../../img/logo.png"/> <br/><Image src="../../img/logo.png"/> : <span className="fw-bold fs-6">Platform Music</span></p>
                {/* <Form className="d-flex flex-column align-items-center pt-3 gap-4">
                <Row>
                    <Col >
                    <Form.Control
                        className="w-50"
                        type="file"
                        name="thumbnail"
                        id="thumbnail"
                        accept="image/*"
                        onChange={imageChange}
                        hidden
                    />
                    <label htmlFor="upload" className="customFilePay bg-dark  d-flex justify-content-between px-2 text-danger gap-4 fs-6" for="thumbnail" >
                        Attache proof of transfer
                        <span>
                            <Image src="../../icon/attache.png" className="me-2" alt="attach" width={15}/>
                        </span>
                    </label>
                    {selectImg && (
                    <div className="d-flex flex-column align-items-center">
                        <Image
                        src={URL.createObjectURL(selectImg)}
                        style={{width:200}}
                        className="py-3 rounded"
                        alt="Thumb"
                        />
                        <Button onClick={removeSelectImage} className="btn-danger">
                            Remove This Image
                        </Button>
                    </div>
                    )}
                    </Col>
                </Row>
                </Form> */}
                {state.user.subscribe === "premium" ?  
                <p className="text-white pt-5">Anda Sudah <span className="text-danger">Premium</span></p> 
                :
                <>
                <Dropdown>
                    <Dropdown.Toggle className='bg-transparent' style={{border: 'none'}} >
                        {/* <Image style={{cursor:'pointer'}} src="../../icon/icon-action.png"/> */}
                        <Button className="btn-orange-pay" style={{width:300}} >Premium 7/hari ( IDR. 40,000,00 )</Button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark text-center w-50">
                         <Dropdown.Item className="text-success" onClick={() => PayPremium7.mutate()}>Pay Now</Dropdown.Item>
                        <Dropdown.Item className="text-danger" >Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle className='bg-transparent' style={{border: 'none'}} >
                        {/* <Image style={{cursor:'pointer'}} src="../../icon/icon-action.png"/> */}
                        <Button className="btn-orange-pay" style={{width:300}} >Premium 14/hari ( IDR. 70,000,00 )</Button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark text-center w-50">
                         <Dropdown.Item className="text-success" onClick={() => PayPremium14.mutate()}>Pay Now</Dropdown.Item>
                        <Dropdown.Item className="text-danger" >Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle className='bg-transparent' style={{border: 'none',}} >
                        {/* <Image style={{cursor:'pointer'}} src="../../icon/icon-action.png"/> */}
                        <Button className="btn-orange-pay" style={{width:300}} >Premium 30/hari ( IDR. 100,000,00 )</Button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark text-center w-50">
                         <Dropdown.Item className="text-success" onClick={() => PayPremium30.mutate()}>Pay Now</Dropdown.Item>
                        <Dropdown.Item className="text-danger" >Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </>
                }
                {/* <Button style={{width:300}} onClick={() => PayPremium.mutate()} className="btn-orange-pay mt-5">Pay</Button> */}
            </div>
            </Container> 
        </>
    )
}

export default Pay
