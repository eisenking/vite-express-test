import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Row, Col, Nav, NavDropdown, Form } from "react-bootstrap";
import "./Sortbar.css";

const categoryList = ['Все', 'Новинки', 'Детские', 'Свадебные', 'День Рождения','Праздничные', 'Корпоративные'];

const subCategoriesList = {
  'Новинки': ['Детские новинки', 'Свадебные новинки', 'Праздничные новинки', 'День Рождения новинки', 'Корпоративные новинки'],
  'Детские': ['Мальчикам', 'Девочкам', 'Самым маленьким'],
  'Свадебные': ['Классические', 'Оригинальные', 'С Цветами', 'Тренды'],
  'Праздничные': ['Новый год', 'День Влюбленных', 'День Защитника Отечества', '8 Марта'],
  'День Рождения': ['Мужчинам', 'Женщинам', 'Веселые посиделки', 'На Юбилей'],
  'Корпоративные': ['Огромным компаниям', 'Уютным Коллективам', 'Лучшему начальнику', 'Любимым коллегам']
};

    
const Sortbar = ( ) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'Все');
  const [subCategory, setSubCategory] = useState(searchParams.get('subCategory') || 'Все');
  const [cover, setCover] = useState(searchParams.get('cover') || 'Все');
  const [searchByName, setSearchByName] = useState(searchParams.get('searchByName') || '');

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchParams('category', selectedCategory);
    navigate(`page/1?category=${selectedCategory}`, { replace: true });
  }

  const handleSubCategory = (selectedSubCategory) => {
    setSubCategory(selectedSubCategory);
    setSearchParams('subCategory', selectedSubCategory);
    navigate(`page/1?category=${category}&subCategory=${selectedSubCategory}`, { replace: true });
  }

  const handleCover = (selectedCover) => {
    setCover(selectedCover);
    setSearchParams('cover', selectedCover);
    navigate(`page/1?category=${category}&subCategory=${subCategory}&cover=${selectedCover}&searchByName=${searchByName}`, { replace: true });

  }

  // Поиск по названию тортов
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams('searchByName', searchByName);
    navigate(`page/1?category=${category}&subCategory=${subCategory}&cover=${cover}&searchByName=${searchByName}`, { replace: true });
  };

  const handleInputChange = (e) => {
    setSearchByName(e.target.value);
  };

  useEffect(() => {
    if  (!location.state || Object.keys(location.state).length === 0) {
      navigate(`page/1?category=${category}&subCategory=${subCategory}&cover=${cover}&searchByName=${searchByName}`, { replace: true });
    } else {
      navigate(`page/${location.state.currentPage}?category=${category}&subCategory=${subCategory}&cover=${cover}&searchByName=${searchByName}`, { replace: true });
    }
  }, [searchByName]);
  

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-center text-center flex-wrap">
        {
          categoryList.map(categoryItem => (
            <Button 
              key={categoryItem}  
              className={`catalog-screen__category-button ${category === categoryItem ? 'active' : ''}`} 
              value={categoryItem} 
              variant="custom" 
              onClick={() => handleCategory(categoryItem)}
            >
              {categoryItem}
            </Button>
          ))
        }
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex align-items-center justify-content-around text-center flex-wrap">
          {subCategoriesList[category]?.map(subCategoryItem => (
            <Button
              key={subCategoryItem}
              className="catalog-screen__subcategory-button"
              value={subCategoryItem}
              variant=""
              onClick={() => handleSubCategory(subCategoryItem)}
            >
              {subCategoryItem}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className='coversAndSearch'>
            <Nav className="justify-content-start">
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={`Покрытие: ${cover}`}
                menuVariant="light"
                className='catalog-cover-selector'
                onSelect={(selectedCover) =>  handleCover(selectedCover)}                  
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
        </Col>
      </Row>
    </Container>
  )
}

export default Sortbar;