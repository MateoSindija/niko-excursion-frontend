'use client';

import React, { createContext } from 'react';

interface IProps {
  children: any;
  dictionary: any;
}
export const NavbarContext = createContext<any>({});

const NavbarDictionaryProvider = ({ children, dictionary }: IProps) => {
  return (
    <NavbarContext.Provider value={dictionary}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarDictionaryProvider;
