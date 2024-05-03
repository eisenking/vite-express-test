import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import './SomethingWrongWithOrderScreen.css'

const SomethingWrongWithOrderScreen = () => {
  return (
    <section>
      <Card className='my-3'>
        <Card.Img
         src='/sorry.jpg'
         variant='top'
         height="300px"
         style={{ objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title as='div' className='product-title text-center'>
            <strong>Что-то пошло не так...</strong>
          </Card.Title>
        <Card.Text className='text-center mb-4'>Но не переживайте, наши менеджеры с радостью и быстро Вам помогут!</Card.Text>
        <div className='something-went-wrong-screen__socials mb-4'>
            <a href='https://api.whatsapp.com/send/?phone=79104582034&text&type=phone_number' rel='noreferrer' target='_blank'>
              <Image src="/whatsapp-black.svg" width='40px' height='40px' />
            </a>
            <a href='https://vk.com/klubnichkatortik' rel='noreferrer' target='_blank'>
              <Image src="/vk-black.svg" width='40px' height='40px' />
            </a>
            <a className='something-went-wrong-screen__socials--phone' href='tel:+74956498871'>
              +7(495)649-88-71
            </a>
        </div>
        </Card.Body>
      </Card>
    </section>
  )
}

export default SomethingWrongWithOrderScreen;