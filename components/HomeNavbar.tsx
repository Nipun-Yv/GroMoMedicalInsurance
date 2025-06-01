import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const Navbar= () => {
  return (
    <div className="w-full h-[90px]
    bg-[linear-gradient(-135deg,black,black,black,var(--primary),rgb(90,0,90))] flex text-white
    justify-end items-center">
        <div className="w-[9%] text-center text-lg font-extralight underline-offset-2">
          <a href="/home">Home</a>
            
        </div>
        <div className="w-[9%] text-center text-lg font-extralight underline-offset-2">
          <a href="/fitness-index">Your Health</a>
            
        </div>
        <div className="w-[9%] text-center text-lg font-extralight underline-offset-2">
          <a href="about-us">About Us</a>
            
        </div>
        <SignedIn>
          <div className="h-[40%] text-center text-lg font-extralight underline-offset-2 flex justify-center rounded-full border-1 aspect-square">
              <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="w-[9%] text-center text-lg font-extralight underline-offset-2">
              <SignInButton/>
          </div>
          <div className="w-[9%] text-center text-lg font-extralight underline-offset-2 border-[0.5] p-2 rounded-md shadow-md">
              <SignUpButton/>
          </div>
        </SignedOut>
    </div>
  )
}

export default Navbar