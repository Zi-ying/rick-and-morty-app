import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { Location } from "./types";

interface LocationCardProps {
  data: Location;
}

const LocationCard = ({ data }: LocationCardProps) => {
  const { name, type, dimension } = data;

  return (
    <Card
      className="rounded-xl shadow-brand-md hover:shadow-pickle-400/50 backdrop-blur-xl py-2"
      role="article"
      aria-label={`Location: ${name}`}
    >
      <CardHeader className="text-pickle-400" aria-label="Location name">
        {name}
      </CardHeader>
      <CardContent className="text-slate-300" aria-label="Location type">
        {type}
      </CardContent>
      <CardContent className="text-slate-300" aria-label="Location dimension">
        {dimension}
      </CardContent>
    </Card>
  );
};

export default LocationCard;
