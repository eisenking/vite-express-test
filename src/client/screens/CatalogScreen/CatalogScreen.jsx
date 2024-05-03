import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Product from './ui/Product/Product';
import Sortbar from './ui/Sortbar/Sortbar';
import Paginate from './ui/Pagination/Paginate';
import EmptyProduct from './ui/EmptyProduct/EmptyProduct';
import './CatalogScreen.css';

const CatalogScreen = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { pageNumber } = useParams(); 
  const category = searchParams.get('category') || 'Все';
  const subCategory = searchParams.get('subCategory') || 'Все';
  const cover = searchParams.get('cover') || 'Все';
  const searchByName = searchParams.get('searchByName') || '';
  
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber, category, subCategory, cover, searchByName });

  const currentPage = pageNumber;
  // console.log(location.state)
  return (
    <section className='catalog-section p-2'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Sortbar />
          </Row>
          <Row>
            { 
            data.products.length > 0 ?
            data.products.map((product) => 
              (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} currentPage={currentPage} />
                </Col>
              ))
              :
                <Col>
                  <EmptyProduct />
                </Col>
            }
          </Row>
          <Row className="justify-content-center"> 
            <Col className='catalog-screen__pagination' xs="auto"> 
              <Paginate
                pages={data.pages}
                page={data.page}
              />
            </Col>
          </Row>     
        </>
      )}
    </section>
  )
}

export default CatalogScreen;