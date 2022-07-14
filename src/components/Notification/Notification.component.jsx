import React, { useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
export default function NotificationComponent(props) {
  useEffect(() => {
    NotificationManager.info(
      "Thông báo đơn đặt hàng mới",
      "Có 1 đơn đặt hàng mới",
      3000,
      () => {
        props.handleShow(false);
      }
    );
  }, []);
  return (
    <>
      <NotificationContainer />
    </>
  );
}
