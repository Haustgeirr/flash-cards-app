const ProfileSectionContent = (props) => {
  return (
    <div className='mt-5 md:mt-0 md:col-span-2'>
      <div className=' sm:rounded-md'>{props.children}</div>
    </div>
  );
};

export default ProfileSectionContent;
