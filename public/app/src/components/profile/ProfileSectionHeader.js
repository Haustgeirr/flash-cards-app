const ProfileSectionHeader = (props) => {
  return (
    <div className='md:col-span-1'>
      <div className='px-4 sm:px-0'>
        <div className='px-4 py-5'>{props.children}</div>
      </div>
    </div>
  );
};

export default ProfileSectionHeader;
