// app/(components)/OrdeForm/OrderForm.jsx

"use client";

import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dishId: "dish_1",
    quantity: 1,
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const phoneRegex = /^(09|\+2519)\d{8}$/;

  const phoneValid = phoneRegex.test(form.phone);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "quantity" ? Number(value) : value,
    });

    setErrors({});
    setServerError("");
    setSubmitted(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(false);
    setErrors({});
    setServerError("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    // 422 validation error
    if (response.status === 422) {
      setErrors(data.fieldErrors || {});
      return;
    }

    // Other server errors
    if (!response.ok) {
      setServerError(
        "Something went wrong. Please try again."
      );
      return;
    }

    // 201 success
    setSubmitted(true);

    setForm({
      name: "",
      phone: "",
      dishId: "dish_1",
      quantity: 1,
      notes: "",
    });
  }

  return (
    <form
      className="checkout-form"
      onSubmit={handleSubmit}
    >
      <h2>Delivery Details</h2>

      <label>
        Name

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      {errors.name && (
        <p>{errors.name[0]}</p>
      )}

      <label>
        TeleBirr Phone

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0912345678"
          required
        />
      </label>

      {!phoneValid && form.phone !== "" && (
        <p>Enter a valid TeleBirr number.</p>
      )}

      {errors.phone && (
        <p>{errors.phone[0]}</p>
      )}

      <label>
        Dish ID

        <input
          type="text"
          name="dishId"
          value={form.dishId}
          onChange={handleChange}
        />
      </label>

      {errors.dishId && (
        <p>{errors.dishId[0]}</p>
      )}

      <label>
        Quantity

        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
        />
      </label>

      {errors.quantity && (
        <p>{errors.quantity[0]}</p>
      )}

      <label>
        Notes

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          maxLength="200"
        />
      </label>

      {errors.notes && (
        <p>{errors.notes[0]}</p>
      )}

      <button
        type="submit"
        disabled={!phoneValid}
      >
        Place Order
      </button>

      {serverError && (
        <p>{serverError}</p>
      )}

      {submitted && (
        <p>Order submitted successfully!</p>
      )}
    </form>
  );
}

export default OrderForm;