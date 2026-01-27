const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return(
    <div className="border-stone-200 border shadow-xs px-3 py-2 bg-stone-50 rounded-lg text-pretty w-xs text-center">
      {children}
    </div>
  )
}

export default CardWrapper;