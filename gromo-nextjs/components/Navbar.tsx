import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const NavbarRest = () => {
  return (
    <div
      className="w-full h-[10%] flex text-white
    justify-end items-center shadow-lg shadow-purple-300
    bg-white"
    >
      <div className="bg-purple-950 flex justify-around min-w-min gap-3 h-full items-center w-[42%] rounded-l-md pl-2">
        <div className=" text-center text-md font-extralight underline-offset-2 ">
          <a href="/home">Home</a>
        </div>
        <div className=" text-center text-md font-extralight underline-offset-2">
          <a href="/products">Products</a>
        </div>
        <div className="text-center text-md font-extralight underline-offset-2">
          <a href="/about-us">About Us</a>
        </div>
        <SignedIn>
          <div className="h-[40%] text-center text-md font-extralight underline-offset-2 flex justify-center rounded-full border-1 aspect-square">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className=" text-center text-md font-extralight underline-offset-2">
            <SignInButton />
          </div>
          <div className="text-center text-md font-extralight underline-offset-2 border-[0.5] px-5 py-2 rounded-md shadow-md">
            <SignUpButton />
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default NavbarRest;
