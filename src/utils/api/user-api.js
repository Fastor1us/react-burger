const API_URL = 'https://norma.nomoreparties.space/api';
const API_AUTH_URL = `${API_URL}/auth`;

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const registerNewUserApi = async (userData) => {
  return request(`${API_AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      name: userData.name
    })
  })
}

export const getUserInfoApi = async (accessToken) => {
  return fetchWithRefresh(`${API_AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken
    }
  })
}

export const logoutFromUserAccApi = async (refreshToken) => {
  return request(`${API_AUTH_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken
    })
  })
}

export const loginInToUserAccApi = async (userData) => {
  return request(`${API_AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password
    })
  })
}

export const recoveryEmailSendApi = async ({email}) => {
  return fetchWithRefresh(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email })
  })
}

export const passwordResetApi = async ({ password, token }) => {
  return fetchWithRefresh(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token })
  })
}

export const patchUserDataApi = async (accessToken, newUserData) => {
  return fetchWithRefresh(`${API_AUTH_URL}/user `, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken
    },
    body: JSON.stringify(newUserData)
  })
}


// =============================================================== //

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const refreshToken = async () => {
  const res = await fetch(`${API_AUTH_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
  return checkResponse(res);
}

// fetchWithRefresh возвращает checkRepons(res) = res.json()
const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}
