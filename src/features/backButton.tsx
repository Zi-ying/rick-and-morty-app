import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({className}:BackButtonProps) => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)} className={className}>Back</Button>;
};

export default BackButton;
