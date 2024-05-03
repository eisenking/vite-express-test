import './App.css'
import '../../src/client/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import '@mantine/carousel/styles.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Navbar } from './layouts/Navbar/Navbar.jsx';
import Footer from './layouts/Footer/Footer.jsx';
import ScrollToTop from './features/ScrollToTop/ScrollToTop.jsx';

function App() {
  return (
    <>
    <ScrollToTop />
    <Container className='d-flex flex-column'>
      <Navbar />
      <main className='main flex-grow-1'>
          <Outlet />
      </main>
      <Footer className='' />
    </Container>
    </>
  )
}

export default App