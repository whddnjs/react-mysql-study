function DefaultLayout({ children }) {
  return (
    <div className="flex items-center justify-center w-full h-screen font-nanum-regular">
      {children}
    </div>
  );
}

export default DefaultLayout;
