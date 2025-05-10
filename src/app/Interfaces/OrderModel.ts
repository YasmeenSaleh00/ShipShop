import { OrderItem } from "./OrderItem";

export interface OrderModel{
    orderNumber: number;
    customerName: string;
    customerPhone: string;
    orderStatus: string;
    orderStatusId:number;
    orderDate: string;
    shippingAddress: string;
    deliveryDate: string;
    notes: string | null;
    totalPrice:number;
    items: OrderItem[];
}