import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: ""
  });

  const [submitted, setSubmitted ] = useState(false);

  const phoneRegex = /^(?:\+251|0)(?:9|7)\d{8}$/;

  const phoneValid = phoneRegex.test(form.phone);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Delivery details:", form);

    setSubmitted(true);
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
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

      <label>
        Area
        <input
          type="text"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
        />
      </label>

      <button
        type="submit"
        disabled={!phoneValid}
      >
        Place Order
      </button>
      {submitted && (
        <p>Order submitted successfully!</p>
      )}
    </form>
  );
}

export default OrderForm;