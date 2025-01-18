"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon, Trash, Undo } from "lucide-react";
import React from "react";


interface ItemTrashProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    level?: number;
    onExpand?: () => void;
    onClick?: () => void;
    label: string;
    icon: LucideIcon;
    onRestore: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onRemove: () => void;
};
const ItemTrash = ({
    id,
    documentIcon,
    active,
    expanded,
    level,
    onExpand,
    onClick,
    label,
    icon: Icon,
    onRestore,
    onRemove,
}: ItemTrashProps) => {

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return ( 
        <div
            onClick={onClick}
            role="button"
            style={{paddingLeft: level ? `${(level*12) + 12}px` : "12px"}}
            className={cn("min-h-[27px] pr-1 text-sm w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium", active && "bg-primary/5 text-primary")}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}    
                </div>
            ) : <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>
            }
            <span className="truncate">
                {label}
            </span>
            <div className="ml-auto flex">
                <div onClick={onRestore} role="button" className="rounded-sm pr-1 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                    <Undo className="h-4 w-4 text-muted-foreground"/>
                </div>
                <ConfirmModal onConfirm={onRemove}>
                    <div role="button" className="rounded-sm pl-1 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                        <Trash className="h-4 w-4 text-muted-foreground"/>
                    </div>
                </ConfirmModal>
            </div>
        </div>
     );
}
 
export default ItemTrash;