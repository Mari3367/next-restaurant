"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endingDate = new Date("2024-06-25");

const CountDown = () => {
  return (
    <Countdown className="font-bold text-2xl sm:text-5xl text-yellow-400" date={endingDate}/>
  )
}

export default CountDown;