import { useParams } from 'react-router-dom';

const Character = () => {
  const {id} = useParams();

  return (
    <div>
      {`One character ${id}`}
    </div>
  )
}

export default Character
