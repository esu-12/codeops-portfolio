const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        items: [...state.items, action.dish]
      };

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id)
      };

    case "CLEAR":
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
}

export { initialState, cartReducer };