import { product,  } from "@/shared/schemes/product";
import React from "react";

export const HomeCard = ({urls}:product) => {
  return (
    <div>
      <img src={urls?.regular} alt="" />
    </div>
  );
};
