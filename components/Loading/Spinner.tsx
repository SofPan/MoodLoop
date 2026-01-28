import { useEntries } from "@/app/contexts/EntriesContext"

const Spinner = () => {
  const {loading} = useEntries();
  return(
    <>
      {
      !loading
        &&
        <div className="w-8 h-8 border-4 border-sage-500 border-t-transparent rounded-full animate-spin"></div>
      }
    </>
  )
}

export default Spinner;