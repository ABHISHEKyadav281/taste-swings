import React from 'react'
import ReactDom from 'react-dom'

//saara data ek div ke andar hi render horaha hai to agar humee ek or div chahiye jo single page context me kaam are to uske liye modals ka use hota hai!

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(255,189,12)',
  transform: 'translate(-50%, -50%)',
  zIndex: 10000000000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}
export default function Modal({ children, onClose }) {
   
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <button className='btn bg-danger fs-4' style={{ width:"4vw" ,height:"4vw" ,position:"inherit" , right:"-1.5vw" ,top:"-1.5vw",display:"flex",alignItems:"center" ,justifyContent:"center",borderRadius:"22%",fontWeight:"800",fontSize:"4vw"}} onClick={onClose}> X </button>
          {children}
        </div>
      </>,
      document.getElementById('cart-root')
    )
  }