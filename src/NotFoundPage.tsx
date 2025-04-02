import { Link } from 'react-router-dom';

interface NotFoundPageProps {
  errorMessage?: string
}

const NotFoundPage = ({errorMessage}: NotFoundPageProps) => {
  return (
    <div className='grid gap-4 p-4'>
      <h1 className='text-gray-700'>Oops!</h1>
      <h5 className='text-gray-500'>We couldn't find the page you were looking for.</h5>
      <h5 className='text-gray-500'>{errorMessage ? errorMessage : ''}</h5>
      <Link to="/">
        <button>Go home</button>
      </Link>
    </div>
  )
}

export default NotFoundPage;
