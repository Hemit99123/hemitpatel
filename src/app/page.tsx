"use client"

import Loading from "@/components/Loading";
import MainScene from "@/components/MainScene";
import { Leva } from "leva";
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
          <>
            <Leva  hidden />
            <MainScene />
          </>
      )
      }
    </>
  );
}
