import Button from 'react-bootstrap/Button';
import './CustomButton.css';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button className="custom-button" variant='' {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;