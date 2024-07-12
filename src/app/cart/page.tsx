"use client"

import Cookies from "js-cookie";
import React from "react";

const Cart = () => {
  const [user_id, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const id = Cookies.get("id");
    setUserId(id || null);
  }, []);

  return (
    <div>{user_id}</div>
  );
}

export default Cart;