
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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { SearchIcon, RefreshCw, EyeIcon } from "lucide-react";
import { Input } from "../ui/input";

const statusColors = {
  confirmed: "bg-green-500 hover:bg-green-600",
  rejected: "bg-red-600 hover:bg-red-700",
  pending: "bg-yellow-500 hover:bg-yellow-600",
  inProcess: "bg-blue-500 hover:bg-blue-600",
  inShipping: "bg-purple-500 hover:bg-purple-600",
  delivered: "bg-green-600 hover:bg-green-700",
  default: "bg-gray-500 hover:bg-gray-600"
};

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const filteredOrders = orderList?.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  function handleRefreshOrders() {
    dispatch(getAllOrdersForAdmin());
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">All Orders</CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefreshOrders}
              className="hover:rotate-180 transition-transform duration-500"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search by order ID or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Order Date</TableHead>
                  <TableHead className="font-semibold">Order Status</TableHead>
                  <TableHead className="font-semibold">Order Price</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredOrders && filteredOrders.length > 0 ? (
                    filteredOrders.map((orderItem, index) => (
                      <motion.tr
                        key={orderItem._id}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{orderItem?._id}</TableCell>
                        <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                        <TableCell>
                          <Badge
                            className={`py-1 px-3 transition-colors ${
                              statusColors[orderItem?.orderStatus] || statusColors.default
                            }`}
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${orderItem?.totalAmount.toLocaleString()}
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
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFetchOrderDetails(orderItem?._id)}
                              className="hover:bg-gray-100"
                            >
                              <EyeIcon className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <AdminOrderDetailsView orderDetails={orderDetails} />
                          </Dialog>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No orders found
                      </TableCell>
                    </motion.tr>
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

export default AdminOrdersView;