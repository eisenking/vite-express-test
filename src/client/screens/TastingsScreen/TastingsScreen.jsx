import { tastings } from "./allTastings";
import { Row, Col, Card } from "react-bootstrap";
import "./TastingsScreen.css"

const TastingsScreen = () => {
  return (
    <section className="tastings-section">
      <Row>
        <Col>
          <Row className="text-center p-2">
            <h3 className="tastings-section__title">Начинки</h3>
            <h5 className="tastings-section__subtitle">Весь список наших проверенных начинок, их описание и состав.</h5>
          </Row>
          <Row className="g-3">
            {tastings.map((tasting, idx) => (
              <Col lg={3} md={4} sm={3} key={idx}>
                <Card className="tasting-section__tasting-card">
                  <Card.Img className="tasting-section__tasting-image" variant="top" src={tasting.image} />
                    {tasting.tastingPrice > 0 ? 
                    <span className="tasting-section__tasting-info"> 
                      +{tasting.tastingPrice} руб/кг.
                    </span>
                    : 
                    <span className="tasting-section__tasting-info">
                      Без доплаты
                    </span>
                    }
                    {tasting.isForAllTiers ? 
                    <span className="tasting-section__tasting-info"> 
                      Для любых ярусов
                    </span>
                    : 
                    <span className="tasting-section__tasting-info">
                      Только верхние яруса
                    </span>
                    }
                  <Card.Body className="tasting-section__tasting-desc-container text-center">
                    <Card.Title>{tasting.name}</Card.Title>
                    <Card.Text className="tasting-section__tasting-description">
                      <span>
                        {tasting.description}
                      </span>
                      <span className="tasting-section__tasting-ingredients mt-3">
                        Состав: {tasting.ingredients}
                      </span>
                    </Card.Text>
                    <input type="checkbox" className="tasting-section__tasting-expand-button"></input>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  )
}

export default TastingsScreen;