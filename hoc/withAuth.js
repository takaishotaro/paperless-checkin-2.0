import { useQuery, gql } from '@apollo/client';
import Redirect from '../components/Redirect';

const CURRENT_USER = gql`
  query{
    user{
      id
      email
    }
  }
`

const withAuth = (WrappedComponent) => (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER)
  const user = data && data.user || null

  if (
    !loading &&
    (!user || error) &&
    typeof window !== 'undefined'
  ) {
    return <Redirect to="/login" />
  }

  // TODO: Check for role
  if (user) {
    return <WrappedComponent {...props} />
  }

  return <p>認証中...</p>;
}
export default withAuth