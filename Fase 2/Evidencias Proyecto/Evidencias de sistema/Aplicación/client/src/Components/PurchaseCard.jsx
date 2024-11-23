import React from "react";

const PurchaseCard = ({ purch }) => {
  const formatCLP = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  return (
    <div className="w-full mb-10">
      <div className="w-full justify-center items-center text-center py-2 text-white bg-blue-500 rounded-t-xl">
        <h1>Compra # {purch.transaction_id}</h1>
      </div>
      <div className="bg-slate-100  rounded-b-xl p-5">
        <div className="">
          <h1 className="font-semibold ">
            Compra: <span className="font-medium">{purch.buy_order}</span>
          </h1>
        </div>
        <div>
          <h1 className="font-semibold">
            Valor:{" "}
            <span className="font-semibold text-green-500 ">{formatCLP(purch.amount)}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
