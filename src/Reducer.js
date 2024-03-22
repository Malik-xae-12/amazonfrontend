export const initialState = {
  basket: [],
  user: null,
  address: null, // or an empty object/array as per your requirement
};

export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {
  // console.log("action >>>>", action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      console.log(state);
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      let newBasket = state.basket.filter((item) => item.id !== action.id);
      // console.log(state);
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_ADDRESS":
      // console.log(state);
      return {
        ...state,
        address: action.item, // Directly assign action.item without spreading
      };

      case "EMPTY_BASKET":
        return{
          ...state,
            basket: []
        }

    default:
      return state;
  }
};
