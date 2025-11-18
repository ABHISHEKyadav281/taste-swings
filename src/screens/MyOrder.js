import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Axios from "../components/Axios"
const baseURL= process.env.REACT_APP_API_URL;

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    const res = await fetch(`${baseURL}/myorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

  // return (
  //   <div>
  //     <div>
  //       <Navbar />
  //     </div>
  //     <div className="container" style={{minHeight:"72vh"}}>
  //       <div className="row">
  //         {orderData !== {}
  //           ? Array(orderData).map((data,didx) => (
  //              <div key={didx}>
  //            { data.orderData
  //               ? data.orderData.order_data.slice(0).reverse().map((item) => {
  //                 return  item.map((arrayData,idx) => {
  //                   return (
  //                     <div key={idx}> 
  //                       {arrayData.order_date ? (
  //                         <div className="m-auto mt-5">
  //                           <h3> {arrayData.order_date}</h3>
  //                           <hr />
  //                         </div>
  //                       ) : (
  //                         <div className="col-12 col-md-6 col-lg-3">
  //                           <div
  //                             className="card mt-3"
  //                             style={{ width: "16rem", maxHeight: "360px", }} >

  //                             <div className="card-body">
  //                               <h5 className="card-title">
  //                                 {arrayData.name}
  //                               </h5>
  //                               <div
  //                                 className="container w-100 p-0" style={{ height: "38px" }}>
  //                                 <span className="m-1">
  //                                   {arrayData.qty}
  //                                 </span>
  //                                 <span className="m-1">
  //                                   {arrayData.size}
  //                                 </span>
  //                                 <div className=" d-inline ms-2 h-100 w-20 fs-5">
  //                                   ₹{arrayData.price}/-
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </div>
  //                       )}
  //                     </div>
  //                   );
  //                 });
  //               })
  //               : <div style={{width:"100%",height:"72vh",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2vw"}}> Food you order appear here</div>
  //               }</div>
  //           ))
  //           : ""}
  //       </div>
  //     </div>

  //     <div>
  //       <Footer />
  //     </div>
  //   </div>
  // );

  return (
  <div>
    <div style={{position:'fixed',width:"100vw",zIndex:"10000"}}>
    <Navbar />
    </div>

    {/* Background Gradient */}
    <div
      style={{
        minHeight: "72vh",
        paddingTop: "40px",
        paddingBottom: "40px",
        background:
          "linear-gradient(to bottom right, rgba(255,208,142,0.25), rgba(255,255,255,0.3))",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="container">
        <div className="row g-4">

          {orderData !== {} ? (
            Array(orderData).map((data, didx) => (
              <div key={didx}>
                {data.orderData ? (
                  data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) =>
                      item.map((arrayData, idx) => (
                        <div key={idx}>

                          {/* ORDER DATE LABEL */}
                          {arrayData.order_date ? (
                            <div className="text-center mt-5 mb-3">
                              <h4
                                className="fw-bold"
                                style={{
                                  color: "#4b2e14",
                                  textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                                }}
                              >
                                {arrayData.order_date}
                              </h4>
                              <hr style={{ borderColor: "rgba(0,0,0,0.2)" }} />
                            </div>
                          ) : (
                            /* Glassmorphism CARD */
                            <div className="col-12 col-md-6 col-lg-3">
                              <div
                                style={{
                                  background: "rgba(255, 255, 255, 0.25)",
                                  borderRadius: "16px",
                                  border: "1px solid rgba(255,255,255,0.4)",
                                  boxShadow:
                                    "0 8px 32px rgba(31, 38, 135, 0.1)",
                                  backdropFilter: "blur(8px)",
                                  WebkitBackdropFilter: "blur(8px)",
                                  padding: "18px",
                                  transition: "0.3s",
                                }}
                                className="glass-card"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "scale(1.03)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                }}
                              >
                                <h5
                                  className="fw-bold mb-3"
                                  style={{
                                    color: "#3b2e19",
                                    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
                                  }}
                                >
                                  {arrayData.name}
                                </h5>

                                {/* Qty & Size badges */}
                                <div className="d-flex justify-content-between mb-3">
                                  <span
                                    className="badge"
                                    style={{
                                      background: "rgba(255, 255, 255, 0.35)",
                                      color: "#3b2e19",
                                      backdropFilter: "blur(6px)",
                                      padding: "8px 12px",
                                      borderRadius: "10px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Qty: {arrayData.qty}
                                  </span>
                                  <span
                                    className="badge"
                                    style={{
                                      background: "rgba(255, 255, 255, 0.35)",
                                      color: "#3b2e19",
                                      backdropFilter: "blur(6px)",
                                      padding: "8px 12px",
                                      borderRadius: "10px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Size: {arrayData.size}
                                  </span>
                                </div>

                                {/* Price */}
                                <div
                                  className="fw-bold fs-5"
                                  style={{
                                    color: "#1f6f3f",
                                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                                  }}
                                >
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "72vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2vw",
                      color: "#4b2e14",
                      textShadow: "0px 1px 2px rgba(0,0,0,0.15)",
                    }}
                  >
                    Food you order appears here
                  </div>
                )}
              </div>
            ))
          ) : (
            ""
          )}

        </div>
      </div>
    </div>

    <Footer />
  </div>
);

}