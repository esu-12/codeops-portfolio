// src/cart/cartReducer.js

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.items.find(
        (item) => item.id === action.dish.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.dish.id
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          )
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.dish,
            quantity: 1
          }
        ]
      };
    }

        case "INCREASE":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      };

    case "DECREASE":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id
              ? {
                  ...item,
                  quantity: item.quantity - 1
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      };

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.id
        )
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