import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)}>Back</Button>;
};

export default BackButton;
