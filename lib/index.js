import axios from "axios";

export const createEvent = async (event) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_API_URL + "events.json",
    event
  );
  return response.data.name;
};

export const getAllEvents = async () => {
  const events = [];
  try {
    const response = await axios.get(
      process.env.EXPO_PUBLIC_API_URL + "events.json"
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

export const updateAnEvent = async ({ id, ...event }) => {
  const response = await axios.patch(
    process.env.EXPO_PUBLIC_API_URL + `events/${id}.json`,
    event
  );
  return response.data;
};

export const deleteAnEvent = async ({ id }) => {
  const response = await axios.delete(
    process.env.EXPO_PUBLIC_API_URL + `events/${id}.json`
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
