// import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Modal from 'react-bootstrap/Modal';
// import { ReactComponent as Whatsapp } from "../../assets/icons/whatsapp-black.svg";
// import { ReactComponent as VK } from "../../assets/icons/vk-black.svg";
// import CustomButton from '../../components/CustomButton/CustomButtom';
// import './ContactsModal.css';

// function ContactsModal( { show, handleClose } ) {

//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header className='flex-column'>
//           <Modal.Title className='contacts-modal__title'>Наши контакты:</Modal.Title>
//           <h5>
//             <a className='contacts-modal__contact--phone' href='tel:+74956498871'>+7 (495) 649-88-71</a>
//           </h5>
//           <h5>
//               <a className='contacts-modal__contact--mail' href='mailto:klubnichka-tort@mail.ru'>klubnichka-tort@mail.ru</a>
//           </h5>
//           <div className='d-flex'>
//             <div className='m-2'>
//               <a href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
//                 <Whatsapp />
//               </a>
//             </div>
//             <div className='m-2'>
//               <a href='https://vk.com/klubnichkatortik' rel='noreferrer' target='_blank'>
//                 <VK />
//               </a>
//             </div>
//           </div>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
//               <Form.Text>
//                 <p>
//                   Остались вопросы? Мы с радостью ответим на них!
//                 </p>
//                 <p>
//                   Выберете любой удобный Вам способ связи, наши менеджеры свяжутся с Вами и помогут с любым вопросом!
//                 </p>
//               </Form.Text>
//               <FloatingLabel
//                 controlId="floatingInput"
//                 label="Телефон"
//                 className="mb-2"
//               >
//                 <Form.Control type="phone" placeholder="По возможности напишем в Whats App илои позвоним" />
//               </FloatingLabel>

//               <FloatingLabel
//                 controlId="floatingInput"
//                 label="Электронная почта"
//                 className="mb-2"
//               >
//                 <Form.Control type="email" placeholder="name@example.com" />
//               </FloatingLabel>

//               <Form.Control as="textarea" rows={3} placeholder='Ваш вопрос.'/>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className='justify-content-center'>
//           <CustomButton onClick={handleClose}>
//             Закрыть
//           </CustomButton>
//           <CustomButton onClick={handleClose}>
//             Задать вопрос
//           </CustomButton>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default ContactsModal;

import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { ReactComponent as Whatsapp } from "../../assets/icons/whatsapp-black.svg";
import { ReactComponent as VK } from "../../assets/icons/vk-black.svg";
import CustomButton from '../../components/CustomButton/CustomButtom';
import './ContactsModal.css';

function ContactsModal({ show, handleClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Заявка успешно отправлена');
        handleClose();
      } else {
        console.log('Что-то пошло не так. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      console.log('Что-то пошло не так. Попробуйте снова.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='flex-column'>
          <Modal.Title className='contacts-modal__title'>Наши контакты:</Modal.Title>
          <h5>
            <a className='contacts-modal__contact--phone' href='tel:+74956498871'>+7 (495) 649-88-71</a>
          </h5>
          <h5>
              <a className='contacts-modal__contact--mail' href='mailto:klubnichka-tort@mail.ru'>klubnichka-tort@mail.ru</a>
          </h5>
          <div className='d-flex'>
            <div className='m-2'>
              <a href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
                <Whatsapp />
              </a>
            </div>
            <div className='m-2'>
              <a href='https://vk.com/klubnichkatortik' rel='noreferrer' target='_blank'>
                <VK />
              </a>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
              <Form.Text>
                <p>
                  Остались вопросы? Мы с радостью ответим на них!
                </p>
                <p>
                  Выберете любой удобный Вам способ связи, наши менеджеры свяжутся с Вами и помогут с любым вопросом!
                </p>
              </Form.Text>
              <FloatingLabel
                controlId="phone"
                label="Телефон"
                className="mb-2"
              >
                <Form.Control
                  type="phone"
                  placeholder="Введите номер телефона"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <span className="text-danger">Поле обязательно для заполнения</span>}
              </FloatingLabel>

              <FloatingLabel
                controlId="email"
                label="Электронная почта"
                className="mb-2"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-danger">Поле обязательно для заполнения</span>}
              </FloatingLabel>

              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ваш вопрос."
                {...register("question", { required: true })}
              />
              {errors.question && <span className="text-danger">Поле обязательно для заполнения</span>}
            </Form.Group>
            <Modal.Footer className='justify-content-center'>
              <CustomButton onClick={handleClose}>
                Закрыть
              </CustomButton>
              <CustomButton type="submit">
                Задать вопрос
              </CustomButton>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContactsModal;