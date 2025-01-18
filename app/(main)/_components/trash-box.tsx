"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import TrashList from "./trash-list";
import { Search } from "lucide-react";

const TrashBox = () => {

    const [search, setSearch] = useState("");


    return ( 
        <div className="text-sm mb-1 mx-1">
            <div className="my-1 flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>
            <TrashList search={search}/>
        </div>
     );
};
 
export default TrashBox;