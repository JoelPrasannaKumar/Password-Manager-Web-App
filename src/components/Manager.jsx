import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const ref = useRef()
  const passwordref = useRef()
  const [showpass, setShowpass] = useState(false)
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords=async() => {
    let req=await fetch("http://localhost:3000/")
       let passwords = await req.json()
      console.log(passwords)
      setPasswordArray(passwords)
  
  }
  

  useEffect( () => {
 getPasswords()

  }, [])

  const showPassword = () => {
    // passwordref.current.type="text"
    if (ref.current.src.includes("/public/eyecross.svg")) {
      ref.current.src = "/public/eye.svg"
      passwordref.current.type = "text"
    }
    else {
      ref.current.src = "/public/eyecross.svg"
      passwordref.current.type = "password"
    }
  }

  const savePassword = async() => {
    if(form.site.length>3&&form.username.length>3&& form.password.length>3){

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })


      setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
    
    
    await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
    
    setform({site:"",username:"",password:""})
     toast('Password saved Successfully', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });}
    else{
      toast('Error! Length of all fields should be > 3', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    }
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    navigator.clipboard.writeText(text)
  }

  const editPassword=(id) => {
    setform({...passwordArray.filter(item=>item.id===id)[0],id:id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  }
  
  const deletePassword=async(id) => {
    let c=confirm("Are you sure you want to delete the password")
    if(c){
    setPasswordArray(passwordArray.filter(item=>item.id!==id))


   await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id }) })


 toast('Password Deleted!', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }
}
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <div className='min-h-[82vh]'>
        <div className='flex flex-col m-3 mt-5 items-center justify-center'>
          <div className='font-bold text-3xl p-2 '><span className='text-teal-400'>&lt; </span>Pass<span className='text-teal-400'>Pocket /&gt;</span></div>
          <div className="desc">Your own Password Manager</div>
        </div>
        <div className="inputs">
          <div className="input1 flex justify-center m-2">
            <input className='md:w-[450px]  w-[300px] lg:w-2/3 border-gray-300 border p-1 rounded-2xl ' type="text" placeholder='Enter Site Name' value={form.site} onChange={handleChange} name='site' id='site' />
          </div>
          <div className='flex mx-auto m-2 sm:w-full justify-center flex-col lg:flex-row items-center '>
            <div className="input-2 m-1 ">
              <input className=' border-gray-300 w-[300px]   md:w-[450px] border p-1 rounded-2xl ' type="text" placeholder='Enter Username' value={form.username} onChange={handleChange} name='username' id='username' />
            </div>
            <div className="input-3 m-1  ">
              <input className=' border-gray-300 w-[300px] md:w-[450px] border p-1 rounded-2xl ' type={showpass?"text":"password"} placeholder='Enter Password' ref={passwordref} value={form.password} onChange={handleChange} name='password' id='password' />
              <div className="show-icon relative">
                <img src="/public/eyecross.svg" alt="" className='absolute right-3 top-[-25.5px] cursor-pointer' ref={ref} onClick={() => { showPassword();
                  setShowpass(s=>!s)
                 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="save">
          <button className='flex items-center mx-auto gap-2 m-2 bg-teal-200 p-2 pr-4 rounded-3xl py-2 cursor-pointer' onClick={() => savePassword()}>
            <img src="/public/save.svg" alt="" />
            <span className=''>Save</span>
          </button>
        </div>
        <h1 className='font-bold  text-xl flex justify-center m-2 mt-4'>
          Your Passwords
        </h1>
        {passwordArray.length === 0 && (
          <div className="text-center text-gray-500 mt-4">No passwords saved to display.</div>
        )}

        {passwordArray.length !== 0 && (
          <div className="overflow-x-auto flex justify-center mt-4">
            <table className=" sm:w-[70%]">
              <thead className="bg-teal-400 text-white">
                <tr>
                  <th className="py-1 w-[40%]">Site</th>
                  <th className="py-1 w-[30%]">Username</th>
                  <th className="py-1 w-[17.8%]">Password</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => (
                  <tr
                    key={index}
                    className='bg-teal-100'
                  >
   <td className="py-2 border-5 border-white text-center "><div className='flex justify-center'>{item.site}<img src='/public/copy.svg' onClick={() => copyText(item.site)} className='  top-2 cursor-pointer' /></div></td>
  <td className="py-2 border-5 border-white text-center"><div className='flex justify-center'>{item.username} <img src='/public/copy.svg' onClick={() => copyText(item.username)}  className=' top-2 cursor-pointer' /></div></td>
  <td className="py-2 border-5 border-white text-center"><div className='flex justify-center'>{"*".repeat(item.password.length)} <img src='/public/copy.svg' onClick={() => copyText(item.password)}  className=' top-2 cursor-pointer' /></div></td>
  <td className="py-2 border-5 border-white text-center">


                      <div className='flex justify-center gap-2.5'>
                        <button className="cursor-pointer " onClick={()=>{editPassword(item.id)}}><img src="/public/edit.svg" alt="" /></button>
                        <button className="cursor-pointer " onClick={()=>{deletePassword(item.id)}}><img src="/public/delete.svg" alt="" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  )
}

export default Manager
