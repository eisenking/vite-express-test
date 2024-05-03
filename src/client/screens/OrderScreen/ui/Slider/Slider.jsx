import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import './Slider.css'

const Slider = () => {

  const [ value, setValue ] = useState(5);

  return (
    <Form className="order-screen-card__label">
      <Form.Label>
          <strong>Выберите вес торта:</strong>
      </Form.Label>
      <Form.Group as={Row} className="mt-3">
        <Col xs="9">
          <RangeSlider
            min={2}
            max={25}
            value={value}
            onChange={e => setValue(e.target.value)}
            tooltip='auto'
            tooltipPlacement='top'
          />
        </Col>
        <Col xs="3">
          <Form.Control value={value} onChange={(e) => setValue(e.target.value)}/>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Slider;