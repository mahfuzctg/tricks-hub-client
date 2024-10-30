"use client";

import * as React from "react";
import { Toaster } from "sonner";

// redux 
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "@/redux/store";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {

  return (
         <>
       
          <Toaster position="top-center"  />
            
         <Provider store={store}>    
         <PersistGate loading={null} persistor={persistor}>
              {children}
             </PersistGate>
       
         </Provider>
         </>
 
  
  );
}
