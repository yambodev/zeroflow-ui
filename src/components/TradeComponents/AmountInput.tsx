'use client'

import React, { ChangeEvent } from 'react'

export interface AmountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onValueChange: (value: string) => void
  isUSD: boolean
  currencySymbol?: string
}

export function AmountInput({
  value,
  onValueChange,
  isUSD,
  currencySymbol = '$',
  className = '',
  ...props
}: AmountInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '')
    onValueChange(sanitizedValue)
  }

  return (
    <div className="flex items-center justify-center text-4xl font-semibold space-x-2 w-full relative">
      <span className="text-gray-600 text-[60px] text-center items-center justify-center flex py-5 absolute left-3">
        {isUSD ? currencySymbol : ''}
      </span>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className={`pl-9 bg-transparent border-none outline-none text-gray-600 text-[60px] font-semibold text-center w-full items-center ${className}`}
        {...props}
      />
    </div>
  )
}

export default AmountInput
