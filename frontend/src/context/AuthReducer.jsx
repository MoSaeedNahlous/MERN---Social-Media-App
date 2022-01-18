const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        user: null,
        isLoading: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };
    case 'LOGIN_FAIL':
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case 'SIGNUP_SUCCESS':
      return {...state,
        isLoading: false,
        error: false,
      };
    case 'SIGNUP_FAIL':
      return {...state,
        isLoading: false,
        error: action.payload,
      };
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
