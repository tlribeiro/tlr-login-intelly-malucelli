import axios from 'axios';

export const isAuthenticated = async () => {
  try {
    //RECUPERA O TOKEN NO LOCAL.
    const token = sessionStorage.getItem('token');
    if (token === null) {
      return false;
    }
    //VALIDA NA API O TOKEN GUARDADO NA APLICAÇÃO.
    const res = await axios.get('', {
      headers: { Authorization: token }
    });
    //VALIDA O RETORNO
    if (res.data && res.data === true) {
      return true;
    }
    return false;
  } catch (error) {
    sessionStorage.removeItem('token');
    console.log(error);
    return false;
  }
};
