import axios from "axios";

export const createEvent = async (event, token) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_API_URL + "events.json?auth=" + token,
    event
  );
  return response.data.name;
};

export const getAllEvents = async (token) => {
  const events = [];
  try {
    const response = await axios.get(
      process.env.EXPO_PUBLIC_API_URL + "events.json?auth=" + token
    );
    for (const key in response.data) {
      const evt = {
        id: key,
        ...response.data[key],
      };
      events.push(evt);
    }
    return events;
  } catch (error) {
    console.log(error);
  }
};

export const updateAnEvent = async ({ id, ...event }, token) => {
  const response = await axios.patch(
    process.env.EXPO_PUBLIC_API_URL + `events/${id}.json?auth=` + token,
    event
  );
  return response.data;
};

export const deleteAnEvent = async ({ id }, token) => {
  const response = await axios.delete(
    process.env.EXPO_PUBLIC_API_URL + `events/${id}.json?auth=` + token
  );
  return response.status;
};

export const register = async ({ email, password }) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_URL +
      `:signUp?key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await axios.post(  
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_URL +
      `:signInWithPassword?key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return response.data;
};
