import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { Location } from "@/types/types";

interface LocationCardProps {
  data: Location;
}

const LocationCard = ({ data }: LocationCardProps) => {
  return (
    <Card>
      <CardHeader>{data.name}</CardHeader>
      <CardContent>{data.dimension}</CardContent>
      <CardContent>{data.type}</CardContent>
    </Card>
  );
};

export default LocationCard;
