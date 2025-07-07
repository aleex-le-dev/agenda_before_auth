import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

export const agendaSlice = createSlice({
  name: "agenda",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events = [...state.events, action.payload];
    },
    updateEvent: (state, action) => {
      if (state.events && Array.isArray(state.events)) {
        const eventToUpdate = state.events.find(
          (evt) => evt.id === action.payload.id
        );
        if (eventToUpdate) {
          const index = state.events.indexOf(eventToUpdate);
          state.events[index] = action.payload;
        }
      }
    },
    removeEvent: (state, action) => {
      if (state.events && Array.isArray(state.events)) {
        state.events = state.events.filter((evt) => evt.id !== action.payload.id);
      }
    },
  },
});

export const { addEvent, updateEvent, removeEvent, setEvent } =
  agendaSlice.actions;

export default agendaSlice.reducer;
