import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { Episode, } from "@/types/types";

interface EpisodeCardProps {
  data: Episode;
}

const EpisodeCard = ({ data }: EpisodeCardProps) => {
  return (
    <Card>
      <CardHeader>{data.name}</CardHeader>
      <CardContent>{data.air_date}</CardContent>
      <CardContent>{data.episode}</CardContent>
    </Card>
  );
};

export default EpisodeCard;
