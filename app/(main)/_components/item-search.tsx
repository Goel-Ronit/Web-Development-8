"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "convex/react";
import { LucideIcon, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";


interface ItemSearchProps {
    id?: Id<"documents">;
    documentIcon?: string;
    onClick?: () => void;
    label: string;
    icon: LucideIcon;
};
const ItemSearch = ({
    id,
    documentIcon,
    onClick,
    label,
    icon: Icon
}: ItemSearchProps) => {
    const {user} = useUser();
    const archive = useMutation(api.documents.archive);

    const onArcihve = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;

        const promise = archive({id})

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note."
        })
    }

    return ( 
        <div
            onClick={onClick}
            role="button"
            style={{paddingLeft: "15px"}}
            className={"group min-h-[35px] text-base py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"}
        >
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}    
                </div>
            ) : <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
            }
            <span className="truncate">
                {label}
            </span>
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                            <DropdownMenuItem onClick={onArcihve}>
                                <Trash className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
     );
}
 
export default ItemSearch;