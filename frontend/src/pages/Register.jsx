import React, { useState } from 'react'

export default function Register() {

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    }
  };

  const validate = () => {
    if (password !== passwordConfirm) {
      setError('Parolele nu coincid');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const body = {
        "email": event.target.elements.email.value,
        "pass": event.target.elements.password.value
      }
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message)
        }).catch((error) => {
          console.log(error)
        });
    }
    else
      console.log('didnt pass validation')
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Înscrieți-vă pentru un cont de student
            </h2>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Adresă email"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Parolă"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="off"
                  required
                  className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-600' : ''
                    }`}
                  placeholder="Confirmă parola"
                  value={passwordConfirm}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && <p className="error font-size-xs text-red-500">{error}</p>}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                ÎNREGISTRARE
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="absolute inset-x-0 bottom-0">
        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,500 C 0,500 0,250 0,250 C 39.32386237513872,212.24644222468862 78.64772475027743,174.49288444937724 141,182 C 203.35227524972257,189.50711555062276 288.73296337402894,242.27490442717965 340,264 C 391.26703662597106,285.72509557282035 408.420421753607,276.4074978419041 454,286 C 499.579578246393,295.5925021580959 573.5853496115428,324.0951042052041 643,327 C 712.4146503884572,329.9048957947959 777.238179800222,307.2120853372795 825,314 C 872.761820199778,320.7879146627205 903.4619311875692,357.0565544456777 951,340 C 998.5380688124308,322.9434455543223 1062.9140954495006,252.56169688000986 1123,230 C 1183.0859045504994,207.43830311999014 1238.8816870144283,232.6966580342829 1291,244 C 1343.1183129855717,255.3033419657171 1391.5591564927859,252.65167098285855 1440,250 C 1440,250 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="#600aff" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
      </div> */}
    </>
  )
}

