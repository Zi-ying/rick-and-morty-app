import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
  text?: string;
}

/**
 * A reusable back button component that navigates to the previous page in history.
 * Uses React Router's useNavigate hook for navigation.
 */
const BackButton = ({ className, text = 'Back' }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className={className}
      aria-label="Go back to previous page"
    >
      {text}
    </Button>
  );
};

export default BackButton;
