import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store.js";
import { onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from '../firebaseConfig'

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Prevent hydration mismatch

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
      const logoutUser = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
          dispatch(setUser(currentUser))
          setIsLoading(false); // Only render after checking auth
        }
      })

      return  () => logoutUser()
    }, [dispatch])

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            dispatch(setUser(result.user))
        } catch(error) {
            console.error("Google Sign-In Error:", error);
        }
    }

    const loginWithEmailAndPassword = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            dispatch(setUser(result.user))
        } catch(error) {
            console.error("Email Login Error:", error);
        }
    }

    const registerWithEmailAndPassword = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setUser(result.user))
        } catch(error) {
            console.error("Registration Error:", error);
        }
    }

    const logout = async () => {
        try {
            const result = await signOut(auth)
            dispatch(setUser(null))
        } catch(error) {
            console.error("Logout Error:", error);
        }
    }


    return (
        <div className="p-4">
            {user ? (
              <div>
                  <h2>Welcome, {user.displayName || user.email}</h2>
                  <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
              </div>
            ) : (
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                  <button onClick={loginWithGoogle} className="bg-blue-500 text-white p-2 rounded">Sign in with Google</button>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input type="email" onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                          Password
                        </label>
                        <div className="text-sm">
                          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-2">
                        <input type="password" onChange={(e) => setPassword(e.target.value)}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      {/* <button onClick={loginWithEmailAndPassword}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button> */}
                      <button onClick={loginWithEmailAndPassword} className="bg-green-500 text-white p-2 rounded">Login with Email</button>
                      <button onClick={registerWithEmailAndPassword} className="bg-purple-500 text-white p-2 rounded">Register</button>
                    </div>
                </div>
              </div>
            )}
        </div>
    )
}

export default Auth;