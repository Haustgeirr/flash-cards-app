const ProfileSectionContent = (props) => {
  return (
    <div className='mt-5 md:mt-0 md:col-span-2'>
      <div className='px-4 sm:px-0'>{props.children}</div>
    </div>
  );
};

export default ProfileSectionContent;
