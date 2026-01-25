import { useEntries } from "@/app/contexts/EntriesContext";

interface EditProps {
  id: string;
}

const EditEntry = ({id}:EditProps) => {

  const {editEntry} = useEntries();

  return(
    <button onClick={() => editEntry(id)} className="border border-slate-400 bg-slate-100 rounded-full px-2.5 py-1 text-slate-500 font-bold">Edit Entry</button>
  )
}

export default EditEntry;