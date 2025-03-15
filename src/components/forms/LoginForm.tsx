import InputField from "@/components/shared/InputField";

const  LoginForm =()=> {
    return (
        <div className="flex flex-1 flex-col justify-center px-6 items-center lg:px-8">
            
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-4">
            <InputField type="email" name="email" label="Email address" required={true}/>
            <InputField type="password" name="password" label="Password" required={true}/>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center cursor-pointer rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
{/*   
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p> */}
          </div>
        </div>
    )
  }
  

  export default LoginForm;