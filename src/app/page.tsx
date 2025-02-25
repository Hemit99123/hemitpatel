"use client"

import Loading from "@/components/Loading";
import Image from "next/image";
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
      {isLoading ?
        (<Loading />)
      : (
          <div>
            Hello world
          </div>
      )
      }
    </>
  );
}
