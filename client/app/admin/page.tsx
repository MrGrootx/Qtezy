import React from 'react'

const AdminPage = async () => {
  // Simulate a delay to test loading component
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to the admin dashboard. Manage your application from here.
      </p>
    </div>
  )
}

export default AdminPage