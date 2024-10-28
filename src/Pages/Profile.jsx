import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen, X, Check } from "lucide-react"

export default function ContactInfo() {
  const [userInfo, setUserInfo] = useState({
    userId: 'a94fa92d',
    name: 'Khalil Araiche',
    email: 'k******24@gmail.com',
    company: 'Acme Inc.',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY'
  })
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [editedInfo, setEditedInfo] = useState(userInfo)

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

  const handleSave = (section) => {
    setUserInfo(editedInfo)
    if (section === 'account') {
      setIsEditingAccount(false)
    } else if (section === 'location') {
      setIsEditingLocation(false)
    }
  }

  const handleChange = (e) => {
    setEditedInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact info</h1>
      <Card className="mb-8 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold text-primary">Account</CardTitle>
          {!isEditingAccount ? (
            <Button variant="ghost" size="icon" onClick={() => handleEdit('account')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
              <Pen className="h-4 w-4" />
              <span className="sr-only">Edit account</span>
            </Button>
          ) : (
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
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <Label htmlFor="userId" className="text-sm text-gray-500">User ID</Label>
              <p className="text-gray-700">{userInfo.userId}</p>
            </div>
            <div>
              <Label htmlFor="name" className="text-sm text-gray-500">Name</Label>
              {isEditingAccount ? (
                <Input
                  id="name"
                  name="name"
                  value={editedInfo.name}
                  onChange={handleChange}
                  className="border-gray-300"
                />
              ) : (
                <p className="text-gray-700">{userInfo.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-sm text-gray-500">Email</Label>
              {isEditingAccount ? (
                <Input
                  id="email"
                  name="email"
                  value={editedInfo.email}
                  onChange={handleChange}
                  className="border-gray-300"
                />
              ) : (
                <p className="text-gray-700">{userInfo.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="company" className="text-sm text-gray-500">Company</Label>
              {isEditingAccount ? (
                <Input
                  id="company"
                  name="company"
                  value={editedInfo.company}
                  onChange={handleChange}
                  className="border-gray-300"
                />
              ) : (
                <p className="text-gray-700">{userInfo.company}</p>
              )}
            </div>
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 px-0">
              Close my account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold ">Location</CardTitle>
          {!isEditingLocation ? (
            <Button variant="ghost" size="icon" onClick={() => handleEdit('location')} className="text-green-600 hover:text-green-700 hover:bg-green-50">
              <Pen className="h-4 w-4" />
              <span className="sr-only">Edit location</span>
            </Button>
          ) : (
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
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm text-gray-500">Phone Number</Label>
              {isEditingLocation ? (
                <Input
                  id="phone"
                  name="phone"
                  value={editedInfo.phone}
                  onChange={handleChange}
                  className="border-gray-300"
                />
              ) : (
                <p className="text-gray-700">{userInfo.phone}</p>
              )}
            </div>
            <div>
              <Label htmlFor="location" className="text-sm text-gray-500">Location</Label>
              {isEditingLocation ? (
                <Input
                  id="location"
                  name="location"
                  value={editedInfo.location}
                  onChange={handleChange}
                  className="border-gray-300"
                />
              ) : (
                <p className="text-gray-700">{userInfo.location}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}