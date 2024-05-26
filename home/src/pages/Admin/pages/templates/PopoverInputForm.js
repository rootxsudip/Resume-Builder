import React, { useState, useRef } from 'react';
import { Button, Overlay, Popover, Form } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth'
import 'bootstrap/dist/css/bootstrap.min.css';
const PopoverInputForm = () => {
    const { auth } = useAuth();
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        templateName: formData.get('templateName'),
        templateFormat: formData.get('templateFormat'),
        premium: formData.get('premium'),
      };
      console.log(data);
      try {
        const response = await axios.post(
          `http://localhost:8080/api/admin/templates`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data); // Log response from the backend
        // Optionally, you can handle response data or update the UI
      } catch (error) {
        console.error('Error updating templates:', error);
        // Optionally, you can handle errors and display a message to the user
      }
      setShow(false); // Close the popover after submitting
    };
  
    return (
      <div ref={ref}>
        <Button onClick={handleClick}>Open Form</Button>
        <Overlay
          show={show}
          target={target}
          placement="right"
          container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">Template Form</Popover.Header>
            <Popover.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formtemplateName">
                  <Form.Label>Template Name</Form.Label>
                  <Form.Control type="text" name="templateName" placeholder="Enter template name" />
                </Form.Group>
                <Form.Group controlId="formtemplateFormat">
                  <Form.Label>Template Format</Form.Label>
                  <Form.Control type="text" name="templateFormat" placeholder="Enter template format" />
                </Form.Group>
                <Form.Group controlId="formpremium">
                  <Form.Label>Premium</Form.Label>
                  <Form.Control type="text" name="premium" placeholder="Enter premium" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    );
  };
  
  export default PopoverInputForm;
  