// import { useState, useEffect, useContext } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Pen, X, Check } from "lucide-react"
// import { AppContext } from '@/context/AppContext'

// export default function ContactInfo() {
//   const [userInfo, setUserInfo] = useState(null)
//   const [isEditingAccount, setIsEditingAccount] = useState(false)
//   const [isEditingLocation, setIsEditingLocation] = useState(false)
//   const [editedInfo, setEditedInfo] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const { auth } = useContext(AppContext);
//   const { token } = auth;

//   useEffect(() => {
//     fetchUserInfo()
//   }, [])

//   const fetchUserInfo = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/settings/profile',{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       })
//       const data = await response.json()
//       await new Promise((res) => setTimeout(res,2000))

//       setUserInfo(data.data)
//       setEditedInfo(data.data)
//     } catch (error) {
//       console.error('Error fetching user info:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleEdit = (section) => {
//     if (section === 'account') {
//       setIsEditingAccount(true)
//     } else if (section === 'location') {
//       setIsEditingLocation(true)
//     }
//   }

//   const handleCancel = (section) => {
//     setEditedInfo(userInfo)
//     if (section === 'account') {
//       setIsEditingAccount(false)
//     } else if (section === 'location') {
//       setIsEditingLocation(false)
//     }
//   }

//   const handleSave = async (section) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/settings/profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           full_name: `${editedInfo.first_name} ${editedInfo.last_name}`,
//           first_name: editedInfo.first_name,
//           last_name: editedInfo.last_name,
//           phone: editedInfo.phone,
//           company_name: editedInfo.company_name,
//           location: editedInfo.location,
//         }),
//       })
//       if (response.ok) {
//         setUserInfo(editedInfo)
//         if (section === 'account') {
//           setIsEditingAccount(false)
//         } else if (section === 'location') {
//           setIsEditingLocation(false)
//         }
//       } else {
//         console.error('Error updating user info')
//       }
//     } catch (error) {
//       console.error('Error updating user info:', error)
//     }
//   }

//   const handleChange = (e) => {
//     setEditedInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' }
//     return new Date(dateString).toLocaleDateString(undefined, options)
//   }

//   const SkeletonField = () => (
//     <div className="space-y-2">
//       <Skeleton className="h-4 w-[100px]" />
//       <Skeleton className="h-6 w-full" />
//     </div>
//   )

//   return (
//     <div className="min-h-screen  p-8">
//       <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact info</h1>
//       <Card className="mb-4 shadow-md">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-xl font-normal">Account</CardTitle>
//           {!isLoading && !isEditingAccount && (
//             <Button variant="ghost" size="icon" onClick={() => handleEdit('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//               <Pen className="h-4 w-4" />
//               <span className="sr-only">Edit account</span>
//             </Button>
//           )}
//           {isEditingAccount && (
//             <div className="flex space-x-2">
//               <Button variant="ghost" size="icon" onClick={() => handleCancel('account')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Cancel edit</span>
//               </Button>
//               <Button variant="ghost" size="icon" onClick={() => handleSave('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//                 <Check className="h-4 w-4" />
//                 <span className="sr-only">Save changes</span>
//               </Button>
//             </div>
//           )}
//         </CardHeader>
//         <CardContent className="pt-0">
//           <div className="space-y-4">
//             {isLoading ? (
//               <>
//                 <SkeletonField />
//                 <SkeletonField />
//                 <SkeletonField />
//                 <SkeletonField />
//               </>
//             ) : (
//               <>
//                 <div>
//                   <Label htmlFor="profileId" className="mb-1 text-sm text-gray-500">User ID</Label>
//                   <p className="text-gray-700 ml-6">{userInfo?.profileId}</p>
//                 </div>
//                 <div>
//                   <Label htmlFor="name" className="text-sm text-gray-500">{!isEditingAccount && "Full Name"}</Label>
//                   {isEditingAccount ? (
//                     <div className="space-y-2">
//                       <div className="flex space-x-4">
//                         <div className="flex-1">
//                           <Label htmlFor="first_name" className="text-sm text-gray-500">First Name</Label>
//                           <Input
//                             id="first_name"
//                             name="first_name"
//                             value={editedInfo.first_name}
//                             onChange={handleChange}
//                             className="border-gray-300 mt-1"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <Label htmlFor="last_name" className="text-sm text-gray-500">Last Name</Label>
//                           <Input
//                             id="last_name"
//                             name="last_name"
//                             value={editedInfo.last_name}
//                             onChange={handleChange}
//                             className="border-gray-300 mt-1"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-gray-700">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="email" className="text-sm text-gray-500">Email</Label>
//                   {isEditingAccount ? (
//                     <Input
//                       readOnly
//                       id="email"
//                       name="email"
//                       value={editedInfo?.email}
//                       onChange={handleChange}
//                       className={`border-gray-300 ${isEditingAccount && "bg-muted"}`}
//                     />
//                   ) : (
//                     <p className="text-gray-700">{userInfo?.email}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="company_name" className="text-sm text-gray-500">Company</Label>
//                   {isEditingAccount ? (
//                     <Input
//                       id="company_name"
//                       name="company_name"
//                       value={editedInfo?.company_name}
//                       onChange={handleChange}
//                       className="border-gray-300"
//                     />
//                   ) : (
//                     <p className={`text-gray-700 ${!userInfo?.company_name && "!text-gray-400 italic"}`}>{userInfo?.company_name || "Add Your Company Name"}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="created_at" className="text-sm text-gray-500">Joined at</Label>
//                   <p className="text-gray-700">{formatDate(userInfo?.created_at)}</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md mb-4">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-xl font-normal">Additional Information</CardTitle>
//           {!isLoading && !isEditingLocation && (
//             <Button variant="ghost" size="icon" onClick={() => handleEdit('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//               <Pen className="h-4 w-4" />
//               <span className="sr-only">Edit location</span>
//             </Button>
//           )}
//           {isEditingLocation && (
//             <div className="flex space-x-2">
//               <Button variant="ghost" size="icon" onClick={() => handleCancel('location')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Cancel edit</span>
//               </Button>
//               <Button variant="ghost" size="icon" onClick={() => handleSave('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
//                 <Check className="h-4 w-4" />
//                 <span className="sr-only">Save changes</span>
//               </Button>
//             </div>
//           )}
//         </CardHeader>
//         <CardContent className="pt-0">
//           <div className="space-y-4">
//             {isLoading ? (
//               <>
//                 <SkeletonField />
//                 <SkeletonField />
//               </>
//             ) : (
//               <>
//                 <div>
//                   <Label htmlFor="phone" className="text-sm text-gray-500">Phone Number</Label>
//                   {isEditingLocation ? (
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={editedInfo?.phone}
//                       onChange={handleChange}
//                       className="border-gray-300"
//                     />
//                   ) : (
//                     <p className={`text-gray-700 ${!userInfo?.phone && "!text-gray-400 italic"}`}>{userInfo?.phone || "Add Your Phone Number"}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="location" className="text-sm text-gray-500">Location</Label>
//                   {isEditingLocation ? (
//                     <Input
//                       id="location"
//                       name="location"
//                       value={editedInfo?.location}
//                       onChange={handleChange}
//                       className="border-gray-300"
//                     />
//                   ) : (
//                     <p className={`text-gray-700 ${!userInfo?.location && "!text-gray-400 italic"}`}>{userInfo?.location  || "Add Your Location"}</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


import { useState, useEffect, useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Pen, X, Check, User, Briefcase, Mail, Calendar, Phone, MapPin, Building } from "lucide-react"
import { AppContext } from '@/context/AppContext'

export default function ContactInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedInfo, setEditedInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useContext(AppContext);
  const { token } = auth;

  const URL = "http://localhost:5000/api/v1"
  const Production = "https://dsf-saas.onrender.com/api/v1"

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${Production}/settings/profile`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await response.json()
      await new Promise((res) => setTimeout(res,2000))

      setUserInfo(data.data)
      setEditedInfo(data.data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (section) => {
    if (section === 'account') {
      setIsEditingAccount(true)
    } else if (section === 'location') {
      setIsEditingLocation(true)
    }
  }

  const handleCancel = (section) => {
    setEditedInfo(userInfo)
    if (section === 'account') {
      setIsEditingAccount(false)
    } else if (section === 'location') {
      setIsEditingLocation(false)
    }
  }

  const handleSave = async (section) => {
    try {
      const response = await fetch(`${Production}/settings/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: `${editedInfo.first_name} ${editedInfo.last_name}`,
          first_name: editedInfo.first_name,
          last_name: editedInfo.last_name,
          phone: editedInfo.phone,
          company_name: editedInfo.company_name,
          location: editedInfo.location,
        }),
      })
      if (response.ok) {
        setUserInfo(editedInfo)
        if (section === 'account') {
          setIsEditingAccount(false)
        } else if (section === 'location') {
          setIsEditingLocation(false)
        }
      } else {
        console.error('Error updating user info')
      }
    } catch (error) {
      console.error('Error updating user info:', error)
    }
  }

  const handleChange = (e) => {
    setEditedInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const SkeletonField = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-6 w-full" />
    </div>
  )

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact info</h1>
      <div className='md:flex gap-6'>
        <Card className="mb-4 shadow-md basis-1/2 ">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-gray-800 flex items-center font-semibold">
              <User className="mr-2 h-5 w-5" />
              My Account
            </CardTitle>
            {!isLoading && !isEditingAccount && (
              <Button variant="ghost" size="icon" onClick={() => handleEdit('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <Pen className="h-4 w-4" />
                <span className="sr-only">Edit account</span>
              </Button>
            )}
            {isEditingAccount && (
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleCancel('account')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSave('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Save changes</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-2.5">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <SkeletonField />
                  <SkeletonField />
                  <SkeletonField />
                  <SkeletonField />
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="profileId" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      User ID
                    </Label>
                    <p className="text-gray-700 ml-6">{userInfo?.profileId}</p>
                  </div>
                  <div>
                    <Label htmlFor="name" className="mb-1 text-sm text-gray-500 flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {!isEditingAccount && "Full Name"}
                    </Label>
                    {isEditingAccount ? (
                      <div className="space-y-2">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <Label htmlFor="first_name" className="mb-1 text-sm text-gray-500">First Name</Label>
                            <Input
                              id="first_name"
                              name="first_name"
                              value={editedInfo.first_name}
                              onChange={handleChange}
                              className="border-gray-300 mt-1"
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="last_name" className="mb-1 text-sm text-gray-500">Last Name</Label>
                            <Input
                              id="last_name"
                              name="last_name"
                              value={editedInfo.last_name}
                              onChange={handleChange}
                              className="border-gray-300 mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 ml-6 ">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Label>
                    {isEditingAccount ? (
                      <Input
                        readOnly
                        id="email"
                        name="email"
                        value={editedInfo?.email}
                        onChange={handleChange}
                        className={`border-gray-300 ${isEditingAccount && "bg-muted"}`}
                      />
                    ) : (
                      <p className="text-gray-700 ml-6">{userInfo?.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company_name" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Company
                    </Label>
                    {isEditingAccount ? (
                      <Input
                        id="company_name"
                        name="company_name"
                        value={editedInfo?.company_name}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className={`text-gray-700 ml-6 ${!userInfo?.company_name && "!text-gray-400 italic"}`}>{userInfo?.company_name || "Add Your Company Name"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="created_at" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Joined at
                    </Label>
                    <p className="text-gray-700 ml-6">{formatDate(userInfo?.created_at)}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md mb-4 basis-1/2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold flex items-center text-gray-800">
              <MapPin className="mr-2 h-5 w-5" />
              Additional Information
            </CardTitle>
            {!isLoading && !isEditingLocation && (
              <Button variant="ghost" size="icon" onClick={() => handleEdit('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <Pen className="h-4 w-4" />
                <span className="sr-only">Edit location</span>
              </Button>
            )}
            {isEditingLocation && (
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleCancel('location')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel edit</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSave('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Save changes</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-2.5">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <SkeletonField />
                  <SkeletonField />
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="phone" className="mb-1 text-sm text-gray-500 flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone Number
                    </Label>
                    {isEditingLocation ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={editedInfo?.phone}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className={`text-gray-700 ml-6 ${!userInfo?.phone && "!text-gray-400 italic"}`}>{userInfo?.phone || "Add Your Phone Number"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="location" className="mb-1 text-sm text-gray-500 flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Location
                    </Label>
                    {isEditingLocation ? (
                      <Input
                        id="location"
                        name="location"
                        value={editedInfo?.location}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    ) : (
                      <p className={`text-gray-700 ml-6 ${!userInfo?.location && "!text-gray-400 italic"}`}>{userInfo?.location  || "Add Your Location"}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}