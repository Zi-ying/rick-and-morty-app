import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { Episode, } from "@/types/types";

interface EpisodeCardProps {
  data: Episode;
}

const EpisodeCard = ({ data }: EpisodeCardProps) => {
  return (
    <Card className='rounded-xl hover:shadow-xl shadow-pickle-400/50 backdrop-blur-md py-2'>
      <CardHeader className='text-pickle-400'>{data.name}</CardHeader>
      <CardContent className='text-slate-300'>{data.air_date}</CardContent>
      <CardContent className='text-slate-300'>{data.episode}</CardContent>
    </Card>
  );
};

export default EpisodeCard;
