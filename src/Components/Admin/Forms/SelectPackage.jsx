import React from 'react'
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import Packages from '../Packages';
export default function SelectPackage() {
    const location = useLocation();
    const stdID = location.state; 
  return (
    <Modal><Packages/></Modal>
  )
}
