import React, { useState, useEffect } from 'react'
import { ArrowLongRightIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { login } from '../../request/api'
import { message } from 'antd'

export default function Login() {
  type accountType = {
    username: string
    password: string
  }

  const { username, password } = JSON.parse(localStorage.getItem('accountLogin') || '{}')

  //用户名和密码
  const [account, setAccount] = useState<accountType>({ username, password })

  const usernameChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setAccount({ ...account, username: e.target.value })
  }
  const passwordChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setAccount({ ...account, password: e.target.value })
  }

  //记住账户名和密码
  const [remember, setRemember] = useState(Boolean(username))
  const rememberChnage = function (e: React.ChangeEvent<HTMLInputElement>) {
    setRemember(e.target.checked)
  }

  type requestType = {
    code: number
  }

  //提交
  const submitHandle = function (e: any) {
    e.preventDefault()

    login({
      phone: account.username,
      password: account.password,
    }).then((res: any) => {
      if (res.code === 200) {
        message.success('success')
        localStorage.setItem('userInfo', JSON.stringify(res))
        if (remember) {
          localStorage.setItem('accountLogin', JSON.stringify(account))
        } else {
          localStorage.removeItem('accountLogin')
        }
      }
    })
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandle}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={usernameChange}
                  value={account.username}
                  id="email-address"
                  name="email"
                  type="email or tel"
                  autoComplete="email or tel"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email or phone number"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={passwordChange}
                  value={account.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  onChange={rememberChnage}
                  checked={remember}
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
            </div>

            <div>
              <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
