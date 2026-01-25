import { useEntries } from "@/app/contexts/EntriesContext";

interface DeleteProps {
  id: string;
}

const DeleteEntry = ({id}:DeleteProps) => {

  const {deleteEntry} = useEntries();

  return(
    <button onClick={() => deleteEntry(id)} className="ml-2 border border-slate-400 bg-red-500 rounded-full px-2.5 py-1 text-white font-bold">Delete Entry</button>
  )
}

export default DeleteEntry;