import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import './Searchbar.css'

const Searchbar = ( {category = 'All', subCategory = 'All'} ) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchByName, setSearchByName] = useState('');
  const [cover, setCover] = useState('Все');

  // Поиск по названию тортов
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams('searchByName', searchByName);
    navigate(`page/1?category=${category}&subCategory=${subCategory}&cover=${cover}&searchByName=${searchByName}`, { replace: true });
  };

  const handleInputChange = (e) => {
    setSearchByName(e.target.value);
  };

  // Выбор покрытия торта 
  const handleCover = (selectedCover) => {
    setCover(selectedCover);
    setSearchParams('cover', selectedCover);
    navigate(`page/1?category=${category}&subCategory=${subCategory}&cover=${selectedCover}&searchByName=${searchByName}`, { replace: true });
  }

  // useEffect(() => {
  //   navigate(`page/1?category=${category}&subCategory=${subCategory}&cover=${cover}&searchByName=${searchByName}`, { replace: true });
  // }, [searchByName]);

  // useEffect(() => {
  //   console.log(cover)
  // }, [cover])

  return (
    <Row className='coversAndSearch'>
      <Nav className="justify-content-start mb-3">
        <NavDropdown
          id="nav-dropdown-dark-example"
          title={`Покрытие: ${cover}`}
          menuVariant="light"
          className='catalog-cover-selector'
          onSelect={(selectedCover) =>  handleCover(selectedCover)} 
          // onSelect={(selectedCover) => {
          //   setCover(selectedCover);
          //   handleCover(selectedCover);
          // }}                   
        >
          <NavDropdown.Item eventKey="Все">Все</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="Сливки">Сливки</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="Мастика">Мастика</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="Крем-чиз">Крем-чиз</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="Велюр">Велюр</NavDropdown.Item>
        </NavDropdown>
        <Form className="d-flex ms-auto" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Поиск"
            className="me-2"
            aria-label="Search"
            value={searchByName}
            onChange={handleInputChange}
          />
        </Form>
      </Nav>
    </Row>
  );
};

export default Searchbar;