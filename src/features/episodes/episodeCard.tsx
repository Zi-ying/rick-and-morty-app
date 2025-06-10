import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { Episode } from "./types";

interface EpisodeCardProps {
  data: Episode;
}

const EpisodeCard = ({ data }: EpisodeCardProps) => {

  return (
    <Card
      className='rounded-xl shadow-brand-md hover:shadow-pickle-400/50 backdrop-blur-xl py-2'
      role="article"
      aria-label={`Episode ${data.episode}: ${data.name}`}
    >
      <CardHeader className='text-pickle-400'>{data.name}</CardHeader>
      <CardContent className='text-slate-300'>
        <time dateTime={data.air_date}>{data.air_date}</time>
      </CardContent>
      <CardContent className='text-slate-300'>{data.episode}</CardContent>
    </Card>
  );
};

export default EpisodeCard;
