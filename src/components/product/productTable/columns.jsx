import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";


/** @type import('@tanstack/react-table).columnDef<any> */
export const columns = ({ onDelete }) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Product",
    accessorKey: "product_name",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const getStatusStyling = (itemStatus) => {
        let statusStyling = "p-[3px] px-3 rounded-xl ";

        switch (itemStatus) {
          case "active":
            statusStyling = statusStyling + "text-green-500 bg-green-100";
            break;
          case "draft":
            statusStyling = statusStyling + "text-blue-500 bg-blue-100";
            break;
        }

        return statusStyling;
      };

      const itemStatus = status.getValue();
      const statusStyling = getStatusStyling(itemStatus);

      return (
        <span className="inline-flex justify-center">
          <p className={statusStyling}>{itemStatus}</p>
        </span>
      );
    },
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
    cell: (inventory) => {
      let inStock = inventory.getValue();

      const getInventoryStatus = (inStock) => {
        switch (true) {
          case inStock === 0:
            return <p className="text-red-400">out of stock</p>;
          case inStock <= 10:
            return <p className="text-amber-400">{inStock} out of stock</p>;
          default:
            return <p>{inStock}</p>;
        }
      };
      return getInventoryStatus(inStock);
    },
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      
    

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit product</DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-700">
                  Delete product
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View product details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this product?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                sending product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete(product);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
