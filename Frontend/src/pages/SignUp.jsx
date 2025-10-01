function SignUp() {
  const primaryColor = "#ff4d2d"; // Example primary color
  const hoverColor = "#e64323"; // Example hover color
  const bgColor = "#fff9f6"; // Example background color
  const borderColor = "#ddd"; // Example border color
  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-[${borderColor}]`}>
        <h1 className={`text-3xl font-bold mb-2 text-`} style={{ color: primaryColor }}>Eatre</h1>
      </div>
    </div>
  );
}

export default SignUp;
