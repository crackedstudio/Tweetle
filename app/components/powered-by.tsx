import React from "react";

export default function PoweredBy() {
  return (
    <h5 className="flex w-full  justify-center items-center text-sm leading-5 text-white text-center">
      Powered by{" "}
      <span className="mx-2">
        <img src="/assets/starknet-logo.svg" alt="" />
      </span>{" "}
      Starknet
    </h5>
  );
}
