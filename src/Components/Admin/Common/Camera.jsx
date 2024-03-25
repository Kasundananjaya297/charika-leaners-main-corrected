import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { FaCameraRetro } from 'react-icons/fa6';
import Swal from 'sweetalert2';

export default function Camera({}) {
  const webcamRef = useRef(null);
    const nav = useNavigate();
  const downloadScreenshot = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'profilePic.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    downloadScreenshot(imageSrc);
    Swal.fire({icon: 'success', 
    title: 'Image Captured'
}).then(()=>{
    Swal.fire({
        icon: 'info',
        title: 'Image Downloaded in your download Folder',
        text: 'Please upload the image in the form'
    }).then(()=>{
        nav(-1)
    })
})
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card style={{ width: '38rem' }}>
        <Card.Body>
          <div className="p-4">
            <Row>
              <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-4">
                Take Photo
              </div>
            </Row>
            <Row>
              <div>
                <Webcam ref={webcamRef} />
              </div>
            </Row>
            <Row>
              <div className="mt-3 w-full">
                <Button variant="primary" className="w-full" onClick={showImage}>
                  <div className="flex items-center justify-center gap-x-2 font-bold">
                    <FaCameraRetro className="text-lg" />
                    Capture
                  </div>
                </Button>
              </div>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
