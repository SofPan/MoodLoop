import { useEffect, useState } from "react";
import EntryForm from "./EntryForm";
import { useEntries } from "@/app/contexts/EntriesContext";

const FormDrawer = () => {
  const {editingEntry} = useEntries();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(editingEntry) setIsOpen(true);
  },[editingEntry])

  return(
    <div className="md:px-12 relative">
 
        <button onClick={() => setIsOpen(true)} className="bg-sage-700 px-3 py-1 rounded-sm shadow-md fixed top-4 left-4 z-10 md:absolute md:-top-10 md:left-20 text-white font-normal md:text-5xl cursor-pointer hover:bg-sage-800 hover:shadow-lg">+</button>
        <div className={`h-screen overflow-y-auto flex flex-col w-screen md:w-2/3 p-4 pb-10 fixed bg-stone-50 z-99 items-end shadow-lg transition-left duration-350 ease-in top-0 ${isOpen ? "left-0" : "-left-full"}`}>
          <button onClick={() => setIsOpen(false)} className="bg-stone-400 px-3 py-1 rounded-sm shadow-md mt-4 mr-4 md:text-lg text-white font-bold cursor-pointer hover:bg-stone-600 hover:shadow-lg">X</button>
          <EntryForm setIsOpen={setIsOpen}/>
        </div>
      
    </div>
  )
}

export default FormDrawer;