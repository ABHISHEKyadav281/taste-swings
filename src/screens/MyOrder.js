import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Axios from "../components/Axios"

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    const res = await Axios.post("/myorder", {
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
    let response = await res.json();
    setOrderData(response);

  };
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container" style={{minHeight:"72vh"}}>
        <div className="row">
          {orderData !== {}
            ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data.slice(0).reverse().map((item) => {
                  return item.map((arrayData) => {
                    return (
                      <div>
                        {arrayData.order_date ? (
                          <div className="m-auto mt-5">
                            <h3> {arrayData.order_date}</h3>
                            <hr />
                          </div>
                        ) : (
                          <div className="col-12 col-md-6 col-lg-3">
                            <div
                              className="card mt-3"
                              style={{ width: "16rem", maxHeight: "360px", }} >

                              <div className="card-body">
                                <h5 className="card-title">
                                  {arrayData.name}
                                </h5>
                                <div
                                  className="container w-100 p-0" style={{ height: "38px" }}>
                                  <span className="m-1">
                                    {arrayData.qty}
                                  </span>
                                  <span className="m-1">
                                    {arrayData.size}
                                  </span>
                                  <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                    ₹{arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  });
                })
                : <div style={{width:"100%",height:"72vh",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2vw"}}> Food you order appear here</div>
            })
            : ""}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}