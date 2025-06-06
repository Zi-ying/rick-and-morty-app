import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { Location } from "./types";

interface LocationCardProps {
  data: Location;
}

const LocationCard = ({ data }: LocationCardProps) => {
  return (
    <Card className="rounded-xl shadow-brand-md hover:shadow-pickle-400/50 backdrop-blur-xl py-2">
      <CardHeader className="text-pickle-400">{data.name}</CardHeader>
      <CardContent className="text-slate-300">{data.type}</CardContent>
      <CardContent className="text-slate-300">{data.dimension}</CardContent>
    </Card>
  );
};

export default LocationCard;
