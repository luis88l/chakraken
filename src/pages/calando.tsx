// import "../styles/globals.css";
// import { ChakraProvider } from "@chakra-ui/react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// import theme from "../theme";
// import { AppProps } from "next/app";
// import { useState } from "react";
// import Layout from "../components/layout/layout";
// import { SessionProvider, useSession } from "next-auth/react";
// export default function MyApp({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   console.log(pageProps);

//   return (
//     <SessionProvider session={session}>
//       {Component.auth ? (
//         <Auth>
//           <Component {...pageProps} />
//         </Auth>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </SessionProvider>
//   );
// }

// function Auth({ children }) {
//   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//   const { status } = useSession({ required: true });

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return children;
// }
