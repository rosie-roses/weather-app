"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { github } from '../utils/icons';
import ThemeDropdown from './theme-dropdown/theme-dropdown';
import SearchDialog from './search-dialog/search-dialog';
import { UseGlobalContext } from '../context/global-context';

function Navbar() {
  const router = useRouter();
  const { state } = UseGlobalContext();
  
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="search-container flex shrink-0 gap-2">
        <SearchDialog />
      </div>
      <div className="btn-group flex items-center gap-2">
        <ThemeDropdown />
        <Button 
          className="source-code flex items-center gap-2"
          onClick={() => {
            router.push("https://github.com/rosie-roses/weather-app");
          }}
        >
          {github} 
          <span className="hidden sm:inline">Source Code</span>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
