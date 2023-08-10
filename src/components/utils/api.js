export const API_URL = 'https://norma.nomoreparties.space/api';

export async function getData() {
  const response = await fetch(`${API_URL}/ingredients`);
  if (response.ok) {
    let res;
    try {
      res = response.json();
    } catch {
      res = false;
    }
    return res;
  }
}

export async function postOrder(data) {
  const response = await fetch(
      `${API_URL}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'ingredients': data,
        })
      });

  if (response.ok) {
    let res;
    try {
      res = response.json();
    } catch {
      res = false;
    }
    return res;
  }
}
