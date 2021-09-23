import decode from 'jwt-decode';

const checkAdminAuth = () => {
  const token = localStorage.getItem('user_token');

  if (!token) {
    return false;
  }

  try {
    const { role } = decode(token);

    if (role !== 'admin') {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

export default checkAdminAuth;
