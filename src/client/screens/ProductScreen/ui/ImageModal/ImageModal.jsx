import Modal from 'react-bootstrap/Modal';
import { Image } from 'react-bootstrap';
import CustomButton from '../../../../components/CustomButton/CustomButtom';
import './ImageModal.css'

function ImageModal(props) {
  const { name, image, imgAlt, weightOnPhoto, onHide } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          {name} - Вес на фото - {weightOnPhoto} кг.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image className='product-screen-image-modal__image' src={image} alt={imgAlt} fluid/>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          onClick={onHide}
        >
          Закрыть
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;