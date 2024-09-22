import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TodoWindow from "./ToDo";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import CalculatorWindow from "./CalculatorWindow";

type Props = {};

export default function Home({}: Props) {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const systemApps = [
    {
      id: 1,
      name: "Todo",
      icon: <Icon icon="ic:baseline-laptop-windows" fontSize={50} />,
    },
    {
      id: 2,
      name: "Calculator",
      icon: <Icon icon="ic:outline-calculator" fontSize={50} />,
    },
  ];

  const itemsPerPage = 44;
  const totalPages = Math.ceil(systemApps.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = systemApps.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenApp = (appName: string) => {
    if (appName === "Todo") {
      setIsTodoOpen(true);
    } else if (appName === "Calculator") {
      setIsCalculatorOpen(true);
    }
  };

  const handleCloseApp = (appName: string) => {
    if (appName === "Todo") {
      setIsTodoOpen(false);
    } else if (appName === "Calculator") {
      setIsCalculatorOpen(false);
    }
  };

  return (
    <ContextMenu>
        
      <ContextMenuTrigger>
        <div className="p-5 h-screen w-screen bg-gray-900 flex flex-col justify-between">
          {/* Desktop Icon Layout */}
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4">
            {currentItems.map((system, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-md border border-transparent hover:border-gray-500 hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                onClick={() => handleOpenApp(system.name)}
              >
                <div className="mb-2">{system.icon}</div>
                <span className="text-white text-xs">{system.name}</span>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center mb-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-500"
                    : "bg-gray-500 hover:bg-blue-400"
                } transition duration-300`}
              ></div>
            ))}
          </div>

          {/* Render the Todo app window if open */}
          {isTodoOpen && (
            <TodoWindow isVisible={true} onClose={() => handleCloseApp("Todo")} />
          )}

          {/* Render the Calculator app window if open */}
          {isCalculatorOpen && (
            <CalculatorWindow
              isVisible={true}
              onClose={() => handleCloseApp("Calculator")}
            />
          )}
        </div>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
