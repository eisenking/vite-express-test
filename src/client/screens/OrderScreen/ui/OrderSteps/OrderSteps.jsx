import { useState } from 'react';
import {
  IconTruckDelivery,
  IconCake,
  IconCircleCheck,
} from '@tabler/icons-react';
import { Stepper, rem } from '@mantine/core';

const OrderSteps = ( { activeStep, setActiveStep } ) => {
  // const [active, setActive] = useState(1);

  return (
    <Stepper
      active={activeStep}
      onStepClick={setActiveStep}
      completedIcon={<IconCircleCheck style={{ width: rem(24), height: rem(24) }} />}
    >
      <Stepper.Step
        icon={<IconCake style={{ width: rem(24), height: rem(24) }} />}
        label="Шаг 1"
        description="Выберите вес и начинку"
      />
      <Stepper.Step
        icon={<IconTruckDelivery style={{ width: rem(24), height: rem(24) }} />}
        label="Шаг 2"
        description="Введите адрес и контакты"
      />
    </Stepper>
  );
}

export default OrderSteps;