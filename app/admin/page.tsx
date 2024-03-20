"use client";

import React, { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    window.location.href = "/admin/dashboard";
  });

  return <></>;
}
