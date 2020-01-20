export const login = (user) => (
    {
      type: actions.LOGIN,
      user: user
    }
);

export const logout = () => (
    {
        type: actions.LOGOUT
    }
);

export const actions = {
    LOGIN: 'login',
    LOGOUT: 'logout'
}