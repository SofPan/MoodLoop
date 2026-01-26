const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return(
    <div className="border-slate-200 border px-3 py-2 bg-white rounded-lg text-pretty w-xs text-center">
      {children}
    </div>
  )
}

export default CardWrapper;