"use client"

import MainScene from "../components/MainScene";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  })
  
  return (
    <>
      <MainScene />
    </>
  );
}
