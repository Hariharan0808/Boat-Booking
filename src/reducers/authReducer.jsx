const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
    isLogged: !!localStorage.getItem('user'),
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return { ...state, user: action.payload, error: null, isLogged: false };
      case 'REGISTER_FAIL':
        return { ...state, error: action.payload };
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload, error: null, isLogged: true };
      case 'LOGIN_FAIL':
        return { ...state, error: action.payload, isLogged: false };
      case 'LOGOUT':
        return { ...state, user: null, error: null, isLogged: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  