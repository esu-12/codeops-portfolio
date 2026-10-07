// app/(components)/OrdeForm/OrderForm.jsx

"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";

const initialState = {
  fieldErrors: {},
  success: false,
};

function OrderForm() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <form
      className="checkout-form"
      action={formAction}
    >
      <h2>Delivery Details</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          required
        />
      </label>

      {state.fieldErrors?.name && (
        <p>{state.fieldErrors.name[0]}</p>
      )}

      <label>
        TeleBirr Phone
        <input
          type="tel"
          name="phone"
          placeholder="0912345678"
          required
        />
      </label>

      {state.fieldErrors?.phone && (
        <p>{state.fieldErrors.phone[0]}</p>
      )}

      <label>
        Dish ID
        <input
          type="text"
          name="dishId"
          defaultValue="dish_1"
        />
      </label>

      {state.fieldErrors?.dishId && (
        <p>{state.fieldErrors.dishId[0]}</p>
      )}

      <label>
        Quantity
        <input
          type="number"
          name="quantity"
          min="1"
          defaultValue="1"
        />
      </label>

      {state.fieldErrors?.quantity && (
        <p>{state.fieldErrors.quantity[0]}</p>
      )}

      <label>
        Notes
        <textarea
          name="notes"
          maxLength="200"
        />
      </label>

      {state.fieldErrors?.notes && (
        <p>{state.fieldErrors.notes[0]}</p>
      )}

      <button
        type="submit"
        disabled={pending}
      >
        {pending ? "Placing Order..." : "Place Order"}
      </button>

      {state.success && (
        <p>Order submitted successfully!</p>
      )}
    </form>
  );
}

export default OrderForm;