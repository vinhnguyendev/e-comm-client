import { useMemo, useState, useEffect } from "react";
import DataTable from "./productTable/data-table";
import { columns } from "@/components/product/productTable/columns";

import MOCK_DATA from "./data.json";

export default function Product() {
  const [productData, setProductData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  //   const data = useMemo(() => MOCK_DATA, []);

  useEffect(() => {
    setProductData(MOCK_DATA);
  }, []);

  return (
    <div>
      <DataTable
        columns={columns({
          onDelete: (product) => {
            setProductData(productData.filter((p) => p.id !== product.id));
          },
        })}
        data={productData}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
}
