import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  async function handleFetchOrderDetails(getId) {
    setLoading(true);
    await dispatch(getOrderDetails(getId));
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500 hover:bg-green-600';
      case 'rejected':
        return 'bg-red-600 hover:bg-red-700';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-2xl font-bold">Order History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Order Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="text-right font-semibold">
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {orderList && orderList.length > 0 ? (
                    orderList.map((orderItem, index) => (
                      <motion.tr
                        key={orderItem?._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="group hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">
                          {orderItem?._id}
                        </TableCell>
                        <TableCell>
                          {new Date(orderItem?.orderDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`
                              transition-colors duration-200
                              ${getStatusColor(orderItem?.orderStatus)}
                              py-1 px-3
                            `}
                          >
                            {orderItem?.orderStatus?.charAt(0).toUpperCase() + 
                             orderItem?.orderStatus?.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${orderItem?.totalAmount?.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              onClick={() => handleFetchOrderDetails(orderItem?._id)}
                              className="bg-black hover:bg-yellow-700 transition-colors"
                              disabled={loading}
                            >
                              {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              View Details
                            </Button>
                            <ShoppingOrderDetailsView orderDetails={orderDetails} />
                          </Dialog>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-gray-500"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ShoppingOrders;