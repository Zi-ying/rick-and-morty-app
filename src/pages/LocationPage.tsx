import { useParams } from 'react-router-dom';

const LocationPage = () => {
  const {id} = useParams();

  return (
    <>
    <div>data {id}</div>
    </>
  )

}

export default LocationPage;
