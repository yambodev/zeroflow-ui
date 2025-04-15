import { Card } from '../ui/card'
import { Token } from '@/mock/tokens'
import { SelectTokenButton } from './SelectTokenButton'

interface SwapCardProps {
  label: string
  token: Token | null
  isSelected: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  value: string // controlled input value
  onValueChange: (value: string) => void // function to update the input value
  setToken: React.Dispatch<React.SetStateAction<Token | null>>
}

export function SwapCard({ label, token, isSelected, inputRef, value, onValueChange, setToken }: SwapCardProps) {
  // Function to handle token selection from the modal
  const handleTokenSelect = (token: Token) => {
    console.log('Token selected:', token)
    setToken(token)
    // Optionally, dispatch changes to a global state here
  }

  const numericValue = Number(value)
  // Calculate the total price (if NaN, default to 0)
  const calculatedPrice = (token?.price || 0) * (isNaN(numericValue) ? 0 : numericValue)

  return (
    <Card className={`p-4 cursor-pointer rounded-xl ${isSelected ? 'bg-background' : 'bg-secondary'} m-1`}>
      <div className="rounded-xl gap-3 flex flex-col">
        {/* Card label */}
        <p className="text-sm">{label}</p>
        {/* Controlled input for the swap value */}
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="bg-transparent w-full text-3xl outline-none"
          placeholder="0"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">${isNaN(calculatedPrice) ? 0 : calculatedPrice}</p>
          <SelectTokenButton label={token?.slug || 'select token'} onTokenSelect={handleTokenSelect} token={token} />
        </div>
      </div>
    </Card>
  )
}
