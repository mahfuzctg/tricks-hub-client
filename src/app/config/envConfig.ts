const envConfig = {
    baseApi: process.env.NEXT_PUBLIC_BASE_API,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
  
    paymentKey : process.env.NEXT_PAYMENT_KEY,
  };
  
  export default envConfig;
  