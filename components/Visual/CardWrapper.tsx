import { useEntries } from "@/app/contexts/EntriesContext";
import Spinner from "../Loading/Spinner";

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  const {loading} = useEntries();
  return(
    <div className="border-stone-200 border shadow-xs px-3 py-2 bg-stone-50 rounded-lg text-pretty w-xs min-h-24 text-center flex justify-center items-center">
      {loading 
        ?
        <Spinner />
        :
        children
      }
    </div>
  )
}

export default CardWrapper;