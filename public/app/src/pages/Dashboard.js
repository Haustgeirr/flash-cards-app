import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <div className='bg-gray-50'>
        <header className=''>
          <div className='max-w-7xl mx-auto pb-2 pt-8 md:pb-6 md:pt-16 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          </div>
        </header>
        <main className='min-h-screen'>
          <div className='max-w-7xl mx-auto py-4 sm:px-6 lg:px-8'>
            <div className='px-4 py-6 sm:px-0'>
              <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
