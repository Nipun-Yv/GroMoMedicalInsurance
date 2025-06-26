import React, { createContext, useContext, useState } from "react"

type SelectedPolicyContextType = {
  selectedPolicy: string | null
  setSelectedPolicy: (id: string) => void
}

const SelectedPolicyContext = createContext<SelectedPolicyContextType | undefined>(undefined)

export const SelectedPolicyProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null)
  return (
    <SelectedPolicyContext.Provider value={{ selectedPolicy ,setSelectedPolicy}}>
      {children}
    </SelectedPolicyContext.Provider>
  )
}

export const useSelectedPolicy = () => {
  const context = useContext(SelectedPolicyContext)
  if (!context) {
    throw new Error("useSelectedPolicy must be used within a SelectedPolicyProvider")
  }
  return context
}
