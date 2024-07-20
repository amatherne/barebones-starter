// utils/importIcon.js

const importIcon = async (iconName) => {
  try {
    const url = `../app/components/icons/uploads/${iconName}.tsx`;
    console.log(iconName)
    const icon = await import(`../app/components/icons/uploads/${iconName}.tsx`);
    // console.log(icon)
    // console.log(icon.default)
    return icon.default;
  } catch (error) {
    console.error(`Error importing icon: ${iconName}`, error);
    return null;
  }
};

export default importIcon;
