import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Card(props) {
    const notifyAddToCart = () => toast.success("Added to cart successfully");
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options)

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")


    const handlAddToCart = async () => {
        notifyAddToCart();
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "Update", id: props.foodItem._id, price: finalPrice, qty: qty })
                
                return
            }
            else {
                await dispatch({ type: "Add", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                
                return
            }
        }
        else {
            await dispatch({ type: "Add", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
            
        }

        
    }

    const priceRef = useRef();
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card m-3" style={{backgroundColor:"gainsboro"}} >
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "250px", objectFit: "fill" }}></img>
                <div className="card-body">
                    <h5 className="card-title fs-3 fw-bolder " style={{color:"black"}}>{props.foodItem.name}</h5>
                    <p className="card-text h6 fw-lighter fst-italic"  style={{color:"rgb(31, 34, 36)"}}>{props.foodItem.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>
                        <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline fs-4'style={{color:"green"}}>Rs {finalPrice}</div>
                    </div>
                    <hr />
                    <button className="btn btn-warning mx-1 fs-5 " data-bs-toggle="button" onClick={handlAddToCart} >add to cart</button>

                </div>
            </div>
        </div>
    )
}

