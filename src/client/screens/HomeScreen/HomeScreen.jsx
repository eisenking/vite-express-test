import HeroSection from './ui/HeroSection/HeroSection';
import OrderStepsSection from './ui/OrderStepsSection/OrderStepsSection';
import WhyUsSection from './ui/WhyUsSection/WhyUsSection';
import CategoryPreviewSection from './ui/CategoryPreviewSection/CategoryPreviewSection'
import ProsList from './ui/ProsList/ProsList';
import WhatsAppSection from './ui/WhatsAppSection/WhatsAppSection';
import ReviewSection from './ui/ReviewSection/ReviewSection';
import OfficeInfo from './ui/OfficeInfo/OfficeInfo';
import './HomeScreen.css'

const HomeScreen = () => {
  return (
    <>
      <HeroSection />
      <OrderStepsSection />
      <WhyUsSection />
      <CategoryPreviewSection />
      <ProsList />
      <WhatsAppSection />
      <ReviewSection />
      <OfficeInfo />
    </>
  );
};

export default HomeScreen;