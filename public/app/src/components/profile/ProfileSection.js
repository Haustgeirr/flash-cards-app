const ProfileSection = (props) => {
  return (
    <div className='md:grid md:grid-cols-3 md:gap-6'>{props.children}</div>
  );
};

export default ProfileSection;
